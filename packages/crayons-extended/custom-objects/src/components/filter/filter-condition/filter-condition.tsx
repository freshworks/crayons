/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Component,
  Prop,
  h,
  Listen,
  State,
  Method,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';

@Component({
  tag: 'fw-filter-condition',
  styleUrl: 'filter-condition.scss',
  shadow: true,
})
export class FilterCondition {
  @State() conditionElement?;
  @State() conditions;
  @State() conditionOptions;
  /**
   * The selected condition
   */
  @Prop({ mutable: true }) selectedCondition;

  /**
   * The value state
   */
  @Prop({ mutable: true }) valueState;

  /**
   * The column key for the filter.
   */
  @Prop() filterOn;
  /**
   * The condition schema
   */
  @Prop() conditionSchema = {};
  /**
   * The column display name of the filter
   */
  @Prop() filterText = {};
  /**
   * The selected condition
   */
  @Prop() condition;
  /**
   * The value for the condition
   */
  @Prop({ mutable: true }) value;
  /**
   * The props to be passed to the crayons component
   */
  @Prop() controlProps = {};
  /**
   * An unique identifier for the element.
   */
  @Prop() identifier;
  /**
   * Event Triggered on deleting an filter condition
   */
  @Event({ cancelable: true }) fwDelete: EventEmitter;

  @Listen('fwChange')
  onSelection(e) {
    const { tagName } = e.composedPath()[0];
    if (tagName === 'FW-LIST-OPTIONS') {
      this.selectedCondition = e.detail.value;
      this.valueState = undefined;
      this.value = undefined;
      this.conditionElement?.refresh?.();
    } else if (tagName === 'FW-DATEPICKER') {
      if (this.conditionSchema[this.selectedCondition].type === 'DATE_RANGE') {
        const { fromDate: from, toDate: to } = e.detail.value;
        this.valueState = { from, to };
      } else {
        this.valueState = e.detail.value;
      }
    } else if (tagName === 'FW-SELECT') {
      this.valueState = e.detail.meta.selectedOptions;
    }
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
  }

  @Listen('fwInput')
  onInputChange(e) {
    this.valueState = e.detail.value;
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
  }

  @Watch('condition')
  onConditionChange(newValue) {
    this.selectedCondition = newValue;
  }
  @Watch('value')
  onValueChange(newValue) {
    this.valueState = newValue;
  }

  @Method()
  async isValid(): Promise<any> {
    if (this.conditionElement) {
      return this.conditionElement.isValid();
    }
    return true;
  }

  setConditionOptions(conditions: any) {
    this.conditionOptions = Object.keys(conditions).map((condition) => {
      const conditionOption = this.conditionSchema[condition];
      return { ...conditionOption, value: condition };
    });
  }

  renderContent(condition) {
    let props = {};
    switch (condition.type) {
      case 'TEXT':
      case 'NUMBER':
        props['type'] = condition.type === 'NUMBER' ? 'number' : 'text';
        return (
          <fw-input-condition
            key={`${this.filterOn}-${this.identifier}`}
            value={this.value}
            controlProps={{ ...this.controlProps, ...props }}
            ref={(conditionElement) =>
              (this.conditionElement = conditionElement)
            }
          ></fw-input-condition>
        );
      case 'NUMBER_RANGE':
        return (
          <fw-input-range-condition
            key={`${this.filterOn}-${this.identifier}`}
            value={this.value}
            controlProps={this.controlProps}
            ref={(conditionElement) =>
              (this.conditionElement = conditionElement)
            }
          ></fw-input-range-condition>
        );
      case 'DROPDOWN':
        return (
          <fw-select-condition
            key={`${this.filterOn}-${this.identifier}`}
            value={this.value}
            controlProps={this.controlProps}
            ref={(conditionElement) =>
              (this.conditionElement = conditionElement)
            }
          ></fw-select-condition>
        );
      case 'MULTI_SELECT':
        props['multiple'] = true;
        return (
          <fw-select-condition
            key={`${this.filterOn}-${this.identifier}`}
            value={this.value}
            controlProps={{ ...this.controlProps, ...props }}
            ref={(conditionElement) =>
              (this.conditionElement = conditionElement)
            }
          ></fw-select-condition>
        );
      case 'DATE':
        props = {
          displayFormat: 'dd MMM yyyy',
          readonly: true,
          value: this.value,
        };
        return (
          <fw-date-condition
            key={`${this.filterOn}-${this.selectedCondition}`}
            controlProps={{ ...this.controlProps, ...props }}
            ref={(conditionElement) =>
              (this.conditionElement = conditionElement)
            }
          ></fw-date-condition>
        );
      case 'DATE_RANGE':
        props = { displayFormat: 'dd MMM yyyy', readonly: true, mode: 'range' };
        if (this.value) {
          const { from: fromDate, to: toDate } = this.value;
          if (fromDate && toDate) {
            const value = { fromDate, toDate };
            props = { ...props, ...value };
          }
        }
        return (
          <fw-date-condition
            key={`${this.filterOn}-${this.selectedCondition}`}
            controlProps={{ ...this.controlProps, ...props }}
            ref={(conditionElement) =>
              (this.conditionElement = conditionElement)
            }
          ></fw-date-condition>
        );
    }
  }

  componentWillLoad() {
    this.onConditionChange(this.condition);
    this.onValueChange(this.value);
    this.setConditionOptions(this.conditionSchema);
  }

  render() {
    return (
      <div class='container'>
        <div class='header'>
          <div class='header-text'>
            <span class='displayText'>{this.filterText}</span>
            <fw-filter-dropdown
              id='condition-select'
              value={this.condition}
              options={this.conditionOptions}
            ></fw-filter-dropdown>
          </div>
          <span
            onClick={() => {
              this.fwDelete.emit({ value: this.filterOn });
            }}
            class='closeBtn'
          >
            <fw-icon name='cross' color='#264966' size={8}></fw-icon>
          </span>
        </div>
        <div class='content'>
          {this.renderContent(this.conditionSchema[this.selectedCondition])}
        </div>
      </div>
    );
  }
}
