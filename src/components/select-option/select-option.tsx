import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-select-option',
  styleUrl: 'select-option.scss',
  shadow: true,
})
export class SelectOption {
  private nativeLi?: HTMLLIElement;
  /**
   * Value corresponding to the option, that is saved  when the form data is saved.
   */
  @Prop({ reflect: true }) value: string;
  /**
   * Indicates whether the option is selected. The selected option is highlighted and a check mark is displayed next to it. If the attribute’s value is undefined, the value is set to true.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;
  /**
   * Boolean saying if option is html
   */
  @Prop({ reflect: true, mutable: true }) html = false;
  /**
   * If option is html and alternate text is needed for label
   */
  @Prop({ reflect: true }) optionText: string;
  /**
   * String containing html content for option
   */
  @Prop() htmlContent?: string;

  /**
   * Triggered when an option is selected.
   */
  @Event({ bubbles: true, composed: true }) fwSelected: EventEmitter;

  private onOptionSelected() {
    this.selected = !this.selected;
    const { value, selected } = this;
    this.fwSelected.emit({ value, selected });
  }

  render() {
    return (
      <li ref={el => this.nativeLi = el} class={{ 'select-option': true, 'selected': this.selected }} onMouseDown={() => this.onOptionSelected()}>
        {this.html ? '' : <slot />}
      </li>
    );
  }
  componentDidLoad() {
    if (this.html) {
      this.nativeLi.innerHTML = this.htmlContent;
    }
  }
}
