import {
  Component,
  h,
  Listen,
  Prop,
  State,
  Watch,
  Event,
  EventEmitter,
} from '@stencil/core';

@Component({
  tag: 'fw-nested-node',
  styleUrl: 'nested-select.scss',
  shadow: true,
})
export class NestedNode {
  private selectRef: HTMLFwSelectElement;
  /**
   * State to maintain selectedOption
   */
  @State() selectedOption = null;
  /**
   * Options to pass through and loop
   */
  @Prop() options = [];
  /**
   * level to keep track of selected options and
   * reset on parent option changes
   */
  @Prop() level = 0;
  /**
   * Name of the field value gets updated to
   */
  @Prop() name = '';
  /**
   * Current selected value if passed from initialvalues
   */
  @Prop() value = '';
  /**
   * label
   */
  @Prop() label = '';
  /**
   * OptionValue path
   */
  @Prop() optionValuePath = 'id';
  /**
   * optionLabelPath
   */
  @Prop() optionLabelPath = 'value';
  /**
   * Specifies the select field as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() required = false;
  /**
   * Theme based on which the list box is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';
  /**
   * Hint text displayed below the text box.
   */
  @Prop() hintText = '';
  /**
   * Warning text displayed below the text box.
   */
  @Prop() warningText = '';
  /**
   * Error text displayed below the text box.
   */
  @Prop() errorText = '';
  /**
   * Fn to return initialValues from properties
   */
  @Prop() selectProps?: any;
  /**
   *
   */
  @Event() fwPropertyChange: EventEmitter;

  @Watch('options')
  optionsChanged() {
    this.selectedOption = null;
    this.selectRef.setSelectedValues('');
  }

  @Listen('fwChange')
  changed(event) {
    if (!event.detail.level) {
      event.detail.level = this.level;
      if (event.detail.meta.selectedOptions[0]?.choices) {
        this.selectedOption = event.detail.meta.selectedOptions[0];
      } else {
        this.selectedOption = null;
      }
    }
  }

  componentWillLoad(): void {
    if (this.value && Array.isArray(this.options)) {
      this.selectedOption = this.options.find(
        (item) => item[this.optionValuePath] === this.value
      );

      if (this.selectedOption) {
        this.fwPropertyChange.emit({
          level: this.level,
          selectedOption: this.selectedOption,
          name: this.name,
          value: this.selectProps(this.selectedOption?.name),
        });
      }
    }
  }

  private getFirstlevelNestedSelect() {
    if (!this.selectedOption?.choices?.length) {
      return null;
    }

    const { value } = this.selectProps(this.selectedOption.name);
    return (
      <div class='nest_indent'>
        <fw-nested-node
          options={this.selectedOption.choices}
          name={this.selectedOption.name}
          label={this.selectedOption.label}
          value={value}
          level={this.level + 1}
          optionValuePath={this.optionValuePath}
          optionLabelPath={this.optionLabelPath}
          selectProps={this.selectProps}
          state={this.state}
          hintText={this.hintText}
          warningText={this.warningText}
          errorText={this.errorText}
          required={this.required}
        ></fw-nested-node>
      </div>
    );
  }

  private getNestedSelect() {
    if (!this.selectedOption?.choices?.length) {
      return null;
    }

    const { value } = this.selectProps(this.selectedOption.name);
    return (
      <fw-nested-node
        options={this.selectedOption.choices}
        name={this.selectedOption.name}
        label={this.selectedOption.label}
        value={value}
        level={this.level + 1}
        optionValuePath={this.optionValuePath}
        optionLabelPath={this.optionLabelPath}
        selectProps={this.selectProps}
        state={this.state}
        hintText={this.hintText}
        warningText={this.warningText}
        errorText={this.errorText}
        required={this.required}
      ></fw-nested-node>
    );
  }

  render() {
    return (
      <div class='nest'>
        <fw-select
          ref={(select) => (this.selectRef = select)}
          label={this.label}
          options={this.options}
          name={this.name}
          value={this.value}
          optionValuePath={this.optionValuePath}
          optionLabelPath={this.optionLabelPath}
          state={this.state}
          hintText={this.hintText}
          warningText={this.warningText}
          errorText={this.errorText}
          required={this.required}
        ></fw-select>
        {this.level === 0
          ? this.getFirstlevelNestedSelect()
          : this.getNestedSelect()}
      </div>
    );
  }
}
