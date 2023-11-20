import { Component, h, Listen, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'fw-nested-node',
  // styleUrl: 'nested-select.scss',
  shadow: true,
})
export class NestedNode {
  private selectRef: HTMLFwSelectElement;
  @State() selectedOption = null;
  @Prop() options = [];
  @Prop() level = 0;
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

    //event.stopPropagation();
  }
  private getFirstlevelNestedSelect() {
    return this.selectedOption ? (
      <div class='nest_indent'>
        <fw-nested-node
          options={this.selectedOption.choices}
          level={this.level + 1}
        ></fw-nested-node>
      </div>
    ) : null;
  }
  private getNestedSelect() {
    return this.selectedOption ? (
      <fw-nested-node
        options={this.selectedOption.choices}
        level={this.level + 1}
      ></fw-nested-node>
    ) : null;
  }
  private getLabel = () => 'Level ' + this.level;
  render() {
    return (
      <div class='nest'>
        <fw-select
          label={this.getLabel()}
          options={this.options}
          ref={(select) => (this.selectRef = select)}
        ></fw-select>
        {this.level === 0
          ? this.getFirstlevelNestedSelect()
          : this.getNestedSelect()}
      </div>
    );
  }
}
