import {
  Component,
  Prop,
  h,
  Element,
  Event,
  EventEmitter,
  Method,
  State,
} from '@stencil/core';
import { TranslationController } from '../../global/Translation';
import { debounce } from '../../utils/utils';
import { deepCloneObject } from '../form-builder/utils/form-builder-utils';

@Component({
  tag: 'fw-co-export',
  styleUrl: 'co-export.scss',
  shadow: true,
})
export class CoExport {
  @Element() host!: HTMLElement;

  private SEARCH_COUNT = 10;
  private debouncedHandleInput: any;
  private boolAddedClearFilterEvent = false;

  @State() allFieldsSelected = false;

  @State() arrSearchedFields = null;

  @State() searching = false;

  @State() searchText = '';

  @State() clearFilter = false;

  @State() selectedFieldCount = 0;

  /**
   * The value to show the modal or close
   */
  @Prop({ mutable: true, reflect: true }) isOpen = false;
  /**
   * The value to populate the export details in json format
   */
  @Prop({ mutable: true }) value = null;
  /**
   * Triggered whenever the export button is selected
   */
  @Event() fwExport: EventEmitter;
  /**
   * Triggered whenever the cancel/close button is selected
   */
  @Event() fwCloseExport: EventEmitter;

  @Method()
  async close() {
    this.resetStates();
    this.isOpen = false;
    return true;
  }

  @Method()
  async open() {
    this.initializeSearchDebounce();
    this.isOpen = true;
    return true;
  }

  componentWillLoad(): void {
    const boolApplyFilter = this.value?.filter?.value || false;
    this.clearFilter = !boolApplyFilter;
    this.updateSelectedCount();
    this.initializeSearchDebounce();
  }

  componentDidUpdate() {
    this.addClearFilterEvent();
  }

  disconnectedCallback(): void {
    this.resetStates();
  }

  private resetStates = () => {
    this.debouncedHandleInput = null;
    this.arrSearchedFields = null;
    this.searching = false;
    this.searchText = '';
    this.allFieldsSelected = false;
    this.clearFilter = false;
    this.selectedFieldCount = 0;
    this.value = null;
  };

  private initializeSearchDebounce = () => {
    if (!this.debouncedHandleInput) {
      this.debouncedHandleInput = debounce(this.searchChangeHandler, this);
    }
  };

  private addClearFilterEvent = () => {
    if (!this.boolAddedClearFilterEvent) {
      const linkClearFilter =
        this.host.shadowRoot.querySelector('.clearExportFilter');

      if (linkClearFilter) {
        this.boolAddedClearFilterEvent = true;
        linkClearFilter.addEventListener('click', this.clearFiltersHandler);
      }
    }
  };

  private updateSelectedCount() {
    if (this.value?.fields?.length > 0) {
      const arrFields = this.value.fields;
      const arrSelectedFields = arrFields.filter(
        (dataItem) =>
          Object.prototype.hasOwnProperty.call(dataItem, 'selected') &&
          dataItem.selected === true
      );
      const numSelectedCount = arrSelectedFields?.length || 0;
      this.selectedFieldCount = numSelectedCount;
      this.allFieldsSelected =
        numSelectedCount === arrFields.length ? true : false;
    } else {
      this.selectedFieldCount = 0;
      this.allFieldsSelected = false;
    }
  }

  private clearFiltersHandler = (event) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (this.value?.filter) {
      this.value.filter.value = false;
    }
    this.clearFilter = true;
  };

  private searchChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const strInputText = event?.detail?.value?.trim() || '';
    this.searchText = strInputText;

    if (strInputText) {
      if (this.value?.fields?.length > 0) {
        const strSearchableText = strInputText.toLowerCase();
        const arrResults = this.value.fields.filter(function (dataItem) {
          return dataItem.label.toLowerCase().indexOf(strSearchableText) !== -1;
        });
        this.searching = true;
        this.arrSearchedFields = deepCloneObject(arrResults);
        return;
      }
    }
    this.searching = false;
    this.arrSearchedFields = null;
  };

  private clearSearchHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.arrSearchedFields = null;
    this.searching = false;
    this.searchText = '';
  };

  private selectAllFieldsChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const boolSelected = event.detail.meta.checked;
    this.allFieldsSelected = boolSelected;

    if (this.searching && this.arrSearchedFields) {
      const intSearchLength = this.arrSearchedFields.length;
      for (let i1 = 0; i1 < intSearchLength; i1++) {
        const objField = this.arrSearchedFields[i1];
        if (
          !Object.prototype.hasOwnProperty.call(objField, 'disabled') ||
          !objField.disabled
        ) {
          this.arrSearchedFields[i1] = { ...objField, selected: boolSelected };
        }
      }
    }

    if (this.value?.fields?.length > 0) {
      const arrFields = this.value.fields;
      const intLength = arrFields.length;
      for (let i1 = 0; i1 < intLength; i1++) {
        const objField = arrFields[i1];
        if (
          !Object.prototype.hasOwnProperty.call(objField, 'disabled') ||
          !objField.disabled
        ) {
          arrFields[i1] = { ...objField, selected: boolSelected };
        }
      }
      this.updateSelectedCount();
    }
  };

  private fieldSelectionChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (this.value?.fields?.length > 0) {
      const boolSelected = event.detail.checked;
      const strSelectedValue = event.detail.value;
      const arrSelectedField = this.value.fields.filter(
        (dataItem) =>
          Object.prototype.hasOwnProperty.call(dataItem, 'id') &&
          dataItem.id === strSelectedValue
      );

      if (arrSelectedField && arrSelectedField.length > 0) {
        arrSelectedField[0].selected = boolSelected;
        this.updateSelectedCount();
      }
    }
  };

  private closeModalHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.fwCloseExport.emit();
  };

  private exportHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.fwExport.emit({ value: deepCloneObject(this.value) });
  };

  private exportFormatChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const strSelectedFormat = event?.detail?.value;
    if (strSelectedFormat && strSelectedFormat !== '' && this.value?.formats) {
      this.value.formats.selectedValue = strSelectedFormat;
    }
  };

  private renderCheckboxField(dataField) {
    const strKey =
      this.searching && this.searchText && this.searchText !== ''
        ? `search_${this.searchText}_${dataField.id}`
        : `${dataField.id}`;

    return (
      <fw-co-export-field
        key={strKey}
        value={dataField}
        onFwChange={this.fieldSelectionChangeHandler}
      ></fw-co-export-field>
    );
  }

  render() {
    const boolOpen = this.isOpen;
    const objFilter = boolOpen ? this.value?.filter : null;
    const boolShowFilteredRecords =
      !this.clearFilter && objFilter ? true : false;
    const strFilteredData = boolShowFilteredRecords
      ? TranslationController.t('export.filterInfo', {
          filtered: objFilter.filtered,
          total: objFilter.total,
        })
      : '';

    const objExportFormat = this.value?.formats || null;
    const strSelectedFormatValue = objExportFormat
      ? objExportFormat.selectedValue
      : '';
    const arrExportFormat = objExportFormat
      ? objExportFormat?.options || null
      : null;

    const arrFields = this.searching
      ? this.arrSearchedFields
      : this.value?.fields || null;
    const numTotalFieldCount = arrFields ? arrFields.length : 0;
    const boolShowSearch =
      this.searching || numTotalFieldCount > this.SEARCH_COUNT;
    const boolShowEmptySearch =
      boolShowSearch && this.searching && numTotalFieldCount <= 0;
    const numFirstColumnCount =
      numTotalFieldCount <= this.SEARCH_COUNT
        ? numTotalFieldCount
        : Math.ceil(numTotalFieldCount / 2);
    const numSecondColumnCount = boolShowSearch
      ? numTotalFieldCount - numFirstColumnCount
      : 0;
    const boolShowSecondColumn = numSecondColumnCount > 0;

    const fieldColumn1Elements =
      numFirstColumnCount > 0
        ? arrFields
            .slice(0, numFirstColumnCount)
            .map((dataItem) => this.renderCheckboxField(dataItem))
        : null;

    const fieldColumn2Elements = boolShowSecondColumn
      ? arrFields
          .slice(numFirstColumnCount + 1)
          .map((dataItem) => this.renderCheckboxField(dataItem))
      : null;

    let strBaseClassName = 'co-export-content';
    if (!boolShowFilteredRecords) {
      strBaseClassName += ' co-export-content--without-filter';
    }

    let strFirstColumnClassName = 'co-export-field-content-fields-column1';
    if (!boolShowSecondColumn) {
      strFirstColumnClassName +=
        ' co-export-field-content-fields-column1--full-width';
    }

    return (
      <fw-modal
        isOpen={this.isOpen}
        slider={true}
        icon='download'
        titleText={TranslationController.t('export.modalTitle')}
        onFwClose={this.closeModalHandler}
      >
        <fw-modal-content class='co-export-modal-content'>
          <div class={strBaseClassName}>
            {boolShowFilteredRecords && (
              <fw-inline-message open type='info' closable={false}>
                <span innerHTML={strFilteredData} />
              </fw-inline-message>
            )}
            <div class='co-export-format'>
              <span class='co-export-format-label'>
                {TranslationController.t('export.exportFormat')}
              </span>
              {arrExportFormat && arrExportFormat.length > 0 && (
                <fw-radio-group
                  orientation='row'
                  value={strSelectedFormatValue}
                  onFwChange={this.exportFormatChangeHandler}
                >
                  {arrExportFormat.map((dataItem) => {
                    return (
                      <fw-radio value={dataItem.value}>
                        {dataItem.label}
                      </fw-radio>
                    );
                  })}
                </fw-radio-group>
              )}
            </div>
            <div class='co-export-field-selection'>
              <div class='co-export-field-header'>
                <span class='co-export-field-header-label'>
                  {TranslationController.t('export.fields')}
                </span>
                <span class='co-export-field-header-selected-count-label'>
                  {TranslationController.t('export.selectedFields', {
                    count: this.selectedFieldCount,
                  })}
                </span>
              </div>
              <div class='co-export-field-content'>
                <div class='co-export-field-content-header'>
                  <fw-checkbox
                    class='co-export-field-select-all'
                    checked={this.allFieldsSelected}
                    onFwChange={this.selectAllFieldsChangeHandler}
                  >
                    <span class={`co-export-field-select-all-label`}>
                      {TranslationController.t('export.selectAllFields')}
                    </span>
                  </fw-checkbox>
                  {boolShowSearch && (
                    <fw-input
                      clear-input
                      icon-left='search'
                      placeholder={TranslationController.t(
                        'export.searchFieldsPrompt'
                      )}
                      onFwInput={this.debouncedHandleInput}
                      onFwInputClear={this.clearSearchHandler}
                      class='co-export-field-search'
                    ></fw-input>
                  )}
                </div>
                <div class='co-export-field-content-fields'>
                  {!boolShowEmptySearch && (
                    <div class={strFirstColumnClassName}>
                      {fieldColumn1Elements}
                    </div>
                  )}
                  {!boolShowEmptySearch && boolShowSecondColumn && (
                    <div class='co-export-field-content-fields-column2'>
                      {fieldColumn2Elements}
                    </div>
                  )}
                  {boolShowEmptySearch && (
                    <span class={`co-export-field-empty-search-message`}>
                      {TranslationController.t('export.noSearchResults')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </fw-modal-content>
        <fw-modal-footer>
          <span class='co-export-modal-footer'>
            <fw-button color='secondary' onFwClick={this.closeModalHandler}>
              {TranslationController.t('export.cancelButton')}
            </fw-button>
            <fw-button onFwClick={this.exportHandler}>
              {TranslationController.t('export.submitButton')}
            </fw-button>
          </span>
        </fw-modal-footer>
      </fw-modal>
    );
  }
}
