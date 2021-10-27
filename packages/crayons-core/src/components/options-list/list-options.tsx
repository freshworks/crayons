/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Component, State, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-list-options',
  styleUrl: 'list-options.scss',
  shadow: true,
})
export class ListOptions {
  @State() filteredOptions = [];
  /**
   * Value corresponding to the option, that is saved  when the form data is saved.
   */
  @Prop() options = [];
  /**
   * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ mutable: true }) value: any;
  /**
   * Works with `multiple` enabled. Configures the maximum number of options that can be selected with a multi-select component.
   */
  @Prop() max = Number.MAX_VALUE;

  renderDropdown() {
    return this.options.map((option) => (
      <fw-select-option
        value={option.value}
        selected={option.selected}
        disabled={option.disabled || this.value?.length >= this.max}
        html={option.isHtml}
        htmlContent={option.htmlContent}
      >
        {option.text}
      </fw-select-option>
    ));
  }

  render() {
    return <ul> {this.renderDropdown()} </ul>;
  }
}
