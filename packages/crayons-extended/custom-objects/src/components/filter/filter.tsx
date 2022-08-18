import {
  Component,
  Prop,
  h,
  Element,
  Listen,
  State,
  Watch,
  Method,
  Event,
  EventEmitter,
} from '@stencil/core';
import { TranslationController } from '../../global/Translation';
import { handleKeyDown } from '../../utils/utils';
import { v4 as uuidv4 } from 'uuid';

@Component({
  tag: 'fw-filter',
  styleUrl: 'filter.scss',
  shadow: true,
})
export class Filter {
  private identifier = uuidv4();
  @Element() host!: HTMLElement;
  @State() sourceFilterOptions = [];
  @State() filterOptions;
  @State() initialFilterConditions;
  @State() filterConditions = {};
  @State() showSearch = true;

  /**
   * Data for the filter ex., { hotel_name: { text: 'Hotel Name', type: 'TEXT' }, hotel_rating: {} }
   */
  @Prop() filters = {};
  /**
   * The condition schema
   */
  @Prop() conditionSchema = {};
  /**
   * The value to populate the filters
   */
  @Prop() value;
  /**
   * Triggered whenever the user selects/removes a filter option.
   */
  @Event() fwFilterChange: EventEmitter;

  @Listen('fwChange')
  onSelection(e) {
    const { value, id, meta } = e.detail;
    if (id === 'searchDropdown') {
      const { value: filterOn } = meta.selectedOptions[0];
      // Remove the selected item from the search dropdown.
      this.filterOptions = this.filterOptions.filter(
        (filter) => filter.value !== value
      );
      const { type } = this.filters[filterOn];
      if (!type) {
        throw Error(`Filter type is not defined for ${filterOn}`);
      } else if (!this.conditionSchema[type]) {
        throw Error(`Condition schema type is not defined for ${type}`);
      }
      // Add the selected item to refresh the UI state.
      this.filterConditions[filterOn] = {};
      this.filterConditions = { ...this.filterConditions };
      e.stopImmediatePropagation();
      e.stopPropagation();
      this.showSearch = false;
    }
  }

  @Listen('fwDelete')
  onConditionDelete(e) {
    const deletedFilter = e.detail.value;
    delete this.filterConditions[deletedFilter];
    this.setFilterOptions(Object.keys(this.filterConditions));
    this.emitFilterSelection(this.filterConditions);
    e.stopImmediatePropagation();
    e.stopPropagation();
  }

  @Watch('filters')
  onFiltersChange(newValue) {
    this.setFilterOptions(newValue);
  }

  @Watch('filterConditions')
  onFilterConditions(newValue) {
    this.emitFilterSelection(newValue);
  }

  @Method()
  async getValue(): Promise<any> {
    const conditions = {};
    const filterConditions = Array.from(
      this.host.shadowRoot.querySelectorAll('fw-filter-condition')
    );
    const conditionPromises = filterConditions.map((conditionElement: any) => {
      return conditionElement.isValid().then((valid) => {
        if (valid) {
          return Promise.resolve(
            (conditions[conditionElement.filterOn] = {
              condition: conditionElement.selectedCondition,
              value: conditionElement.valueState,
            })
          );
        }
        return Promise.reject('Invalid Filter');
      });
    });
    return Promise.all(conditionPromises)
      .then(() => {
        const orderedCondition = this.orderCondition(conditions);
        this.saveCurrentState(orderedCondition);
        return Promise.resolve(orderedCondition);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }

  @Method()
  async clearFilter(): Promise<any> {
    this.filterOptions = this.sourceFilterOptions;
    this.filterConditions = {};
    this.initialFilterConditions = {};
    this.showSearch = true;
  }

  @Method()
  async resetFilter(): Promise<any> {
    this.sourceFilterOptions.length > 0 && this.loadSavedState();
  }

  orderCondition(conditions) {
    return Object.keys(this.filterConditions).reduce((acc, filterOn) => {
      acc[filterOn] = conditions[filterOn];
      return acc;
    }, {});
  }

  isFiltersAvailable() {
    return (
      this.filterConditions && Object.keys(this.filterConditions).length > 0
    );
  }

  setSourceFilterOptions(filters) {
    this.sourceFilterOptions = Object.keys(filters).map((filter) => {
      return { ...filters[filter], value: filter };
    });
  }

  getDefaultCondition(conditionSchema) {
    return Object.keys(conditionSchema).filter((condition) => {
      return conditionSchema[condition].default;
    })[0];
  }

  emitFilterSelection(selectedFilters) {
    const filters = selectedFilters ? Object.keys(selectedFilters) : [];
    this.fwFilterChange.emit({ filters });
  }

  setInitialState(value) {
    this.initialFilterConditions = { ...value } || {};
    this.filterConditions = { ...this.initialFilterConditions };
    this.setFilterOptions(this.filterConditions);
  }

  saveCurrentState(newValue) {
    this.initialFilterConditions = { ...newValue };
  }

  loadSavedState() {
    this.filterConditions = { ...this.initialFilterConditions };
    this.setFilterOptions(this.filterConditions);
    this.identifier = uuidv4();
  }

  setFilterOptions(value) {
    const selectedFilters = Object.keys(value);
    if (selectedFilters.length > 0) {
      this.filterOptions = this.sourceFilterOptions.filter(
        (filter) => !selectedFilters.includes(filter.value)
      );
      this.showSearch = false;
    } else {
      this.filterOptions = this.sourceFilterOptions;
      this.showSearch = true;
    }
  }

  renderContent(filterConditions) {
    return Object.keys(filterConditions).map((filterOn) => {
      const { text: filterText, type, controlProps } = this.filters[filterOn];
      const conditionSchema = this.conditionSchema[type];
      const { value, condition = this.getDefaultCondition(conditionSchema) } =
        filterConditions[filterOn];
      const defaultProps = {
        conditionSchema,
        filterOn,
        filterText,
        controlProps,
        value,
        condition,
        identifier: this.identifier,
      };
      return (
        <fw-filter-condition
          key={filterOn}
          {...defaultProps}
        ></fw-filter-condition>
      );
    });
  }

  componentWillLoad() {
    this.setSourceFilterOptions(this.filters);
    this.setInitialState(this.value);
  }

  render() {
    return (
      <div class='filter'>
        {this.isFiltersAvailable() && (
          <div class='filter-content'>
            {this.renderContent(this.filterConditions)}
          </div>
        )}
        <div class='filter-action'>
          {this.showSearch ? (
            <fw-search-dropdown
              id='searchDropdown'
              options={this.filterOptions}
            ></fw-search-dropdown>
          ) : (
            this.filterOptions.length !== 0 && (
              <span
                class='add-filter'
                role='button'
                tabIndex={0}
                onClick={() => {
                  this.showSearch = true;
                }}
                onKeyDown={handleKeyDown(() => {
                  this.showSearch = true;
                })}
              >
                {TranslationController.t('filters.addFilter')}
              </span>
            )
          )}
        </div>
        {!this.isFiltersAvailable() && (
          <slot name='filter-empty-state'>
            <div
              style={{
                display: 'flex',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>{TranslationController.t('filters.noFilter')}</span>
            </div>
          </slot>
        )}
      </div>
    );
  }
}
