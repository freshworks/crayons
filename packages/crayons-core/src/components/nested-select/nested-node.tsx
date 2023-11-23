import { Component, h, Listen, Prop, State, Watch } from '@stencil/core';

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
   * Fn to return initialValues from properties
   */
  @Prop() selectProps?: any;

  @Watch('options')
  optionsChanged() {
    this.selectedOption = null;
    this.selectRef.setSelectedValues('');
  }

  @Listen('fwChange')
  changed(event) {
    console.log('IN CHANGE in Level' + this.level, event.target.level);
    if (!event.detail.level) {
      event.detail.level = this.level;
      if (event.detail.meta.selectedOptions[0]?.choices) {
        this.selectedOption = event.detail.meta.selectedOptions[0];
      }
    }
  }

  componentWillLoad(): void {
    if (this.value) {
      this.selectedOption = this.options.find(
        (item) => item[this.optionValuePath] === this.value
      );
    }
  }

  private getFirstlevelNestedSelect() {
    if (!this.selectedOption) {
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
        ></fw-nested-node>
      </div>
    );
  }

  private getNestedSelect() {
    if (!this.selectedOption || !this.selectedOption.choices) {
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
      ></fw-nested-node>
    );
  }

  render() {
    return (
      <div class='nest'>
        <fw-select
          label={this.label}
          options={this.options}
          name={this.name}
          value={this.value}
          optionValuePath={this.optionValuePath}
          optionLabelPath={this.optionLabelPath}
          ref={(select) => (this.selectRef = select)}
        ></fw-select>
        {this.level === 0
          ? this.getFirstlevelNestedSelect()
          : this.getNestedSelect()}
      </div>
    );
  }
}
