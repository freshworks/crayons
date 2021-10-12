/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Component,
  Event,
  EventEmitter,
  Prop,
  h,
  Fragment,
  Method,
  Listen,
} from '@stencil/core';

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
   * Sets the state of the option to selected. The selected option is highlighted and a check mark is displayed next to it. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;
  /**
   * Sets the state of the option to disabled. The selected option is disabled and greyed out. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true, mutable: true }) disabled = false;
  /**
   * States that the option is an HTML value. If the attribute's value is undefined, the value is set to true.
   */
  @Prop({ reflect: true, mutable: true }) html = false;
  /**
   * Alternate text displayed on the interface, in place of the actual HTML content.
   */
  @Prop({ reflect: true }) optionText: string;
  /**
   * HTML content that is displayed as the option.
   */
  @Prop() htmlContent?: string;
  /**
   * Standard is the default option, checkbox is the option with checkbox and graphics is the option with either icon or avatar.
   */
  @Prop() variant: DropdownVariant = 'standard';
  /**
   * Icon or Avatar to be placed on the left side of the option.
   */
  @Prop() graphicsType: 'icon' | 'avatar';
  /**
   * The text to be displayed in the option.
   */
  @Prop() text: string;
  /**
   * Second line text can be description etc.
   */
  @Prop({ reflect: true, mutable: true }) subText: string;
  /**
   * Used in grouped list, provides the group in which the option belongs
   */
  @Prop() groupName: string;
  /**
   * Used by FW-ICON to set the name of the Icon
   */
  @Prop() iconName: string;

  /**
   * Triggered when an option is selected.
   */
  @Event({ bubbles: true, composed: true }) fwSelected: EventEmitter;

  @Method()
  async setFocus(): Promise<any> {
    this.nativeLi.focus();
  }

  @Listen('keydown')
  onKeyDown(ev) {
    switch (ev.key) {
      case 'Enter':
        this.onOptionSelected();
        break;
    }
  }

  private onOptionSelected() {
    if (this.disabled) {
      return;
    }
    this.selected = !this.selected;
    const { value, selected } = this;
    this.fwSelected.emit({ value, selected });
  }

  renderInnerHtml() {
    const description = this.createDescription();
    switch (this.variant) {
      case 'standard':
        return description;
      case 'graphics':
        return (
          <Fragment>
            {this.createGraphics()}
            {description}
          </Fragment>
        );
      case 'checkbox':
        return (
          <Fragment>
            {this.createCheckbox()}
            {description}
          </Fragment>
        );
      default:
        break;
    }
  }

  createDescription() {
    return this.subText ? (
      <div class='description'>
        <span class='description-text'>{this.text}</span>
        <span class='description-subText'>{this.subText}</span>
      </div>
    ) : (
      <span class='description'>{this.text}</span>
    );
  }

  createGraphics() {
    return this.graphicsType === 'icon' ? (
      <fw-icon name={this.iconName} size={16} color='blue'></fw-icon>
    ) : (
      ''
    );
  }

  createCheckbox() {
    return <fw-checkbox checked={this.selected}></fw-checkbox>;
  }

  render() {
    return (
      <li
        ref={(el) => (this.nativeLi = el)}
        class={
          'select-option ' +
          (this.subText ? 'multi-line ' : 'single-line ') +
          (this.graphicsType === 'avatar' ? 'graphics ' : 'standard ') +
          (this.selected && this.variant !== 'checkbox' ? 'selected ' : '') +
          (this.disabled ? 'disabled ' : '')
        }
        onMouseDown={() => this.onOptionSelected()}
      >
        {this.text ? this.renderInnerHtml() : this.html ? '' : <slot />}
      </li>
    );
  }
  componentDidLoad() {
    if (this.html) {
      this.nativeLi.innerHTML = this.htmlContent;
    }
  }
}

export type DropdownVariant = 'standard' | 'checkbox' | 'graphics';
