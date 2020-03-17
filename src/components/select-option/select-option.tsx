import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-select-option',
  styleUrl: 'select-option.scss',
  shadow: true,
})
export class SelectOption {

  /**
   * Value corresponding to the option, that is saved  when the form data is saved.
   */
  @Prop({ reflect: true }) value: string;

  /**
   * Indicates whether the option is selected. The selected option is highlighted and a check mark is displayed next to it. If the attribute’s value is undefined, the value is set to true.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * Triggered when an option is selected.
   */
  @Event({ bubbles: true, composed: true }) fwSelected: EventEmitter;

  private onOptionSelected() {
    this.selected = true;
    const { value, selected } = this;
    this.fwSelected.emit({ value, selected });
  }

  render() {
    return (
      <li class={{ 'select-option': true, 'selected': this.selected }} onMouseDown={() => this.onOptionSelected()}>
        <slot />
      </li>
    );
  }
}
