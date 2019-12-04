import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-select-option',
  styleUrl: 'select-option.scss',
  shadow: true,
})
export class SelectOption {
  /**
   * The Key associated with this select option
   */
  @Prop() value: string;
  /**
   * Flag to indicate if the option is selected or not. A tick is shown
   */
  @Prop() selected = false;

  @Event({ bubbles: true, composed: true }) fwSelectOptionChosen: EventEmitter;

  private onOptionSelected() {
    const { value } = this;
    this.fwSelectOptionChosen.emit({ value });
  }

  render() {
    return (
      <li class={{ 'select-option': true, 'selected': this.selected }} onMouseDown={e => this.onOptionSelected(e)}>
       <slot/>
      </li>
    );
  }
}
