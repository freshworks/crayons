import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'fw-select-option',
  styleUrl: 'select-option.scss',
  shadow: true
})
export class SelectOption {
  /**
   * The Key associated with this select option
   */
  @Prop() key: string;
  /**
   * Text that will be shown in the select option
   */
  @Prop() value: string;
  /**
   * Flag to indicate if the option is selected or not
   */
  @Prop() selected: boolean = false;

  @Event({ bubbles: true, composed: true }) fwSelectOptionChosen: EventEmitter;

  private onOptionSelected(e) {
    const {key, value} = this;
    this.fwSelectOptionChosen.emit({ key: key, value: value });
  }

  render() {
    return (
      <li class={{ 'select-option': true, 'selected': this.selected }} onMouseDown={e => this.onOptionSelected(e)}>
        {this.value}
      </li>
    );
  }
}
