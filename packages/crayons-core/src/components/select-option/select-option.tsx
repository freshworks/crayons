/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Component,
  Event,
  EventEmitter,
  Element,
  Prop,
  h,
  Fragment,
  Method,
  Listen,
} from '@stencil/core';
import { DropdownVariant } from '../../utils/types';

@Component({
  tag: 'fw-select-option',
  styleUrl: 'select-option.scss',
  shadow: true,
})
export class SelectOption {
  @Element() host: HTMLElement;
  private rowContainer?: HTMLElement;
  /**
   * Value corresponding to the option, that is saved  when the form data is saved.
   */
  @Prop() value: string | number;
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
   * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
   * The props for the icon or avatar are passed as an object via the graphicsProps.
   */
  @Prop() variant: DropdownVariant = 'standard';
  /**
   * The text to be displayed in the option.
   */
  @Prop() text: string;
  /**
   * Second line text can be description etc.
   */
  @Prop({ reflect: true }) subText: string;
  /**
   * Used in grouped list, provides the group in which the option belongs
   */
  @Prop() groupName: string;
  /**
   * The props for the graphics variant. ex., icon props in case of graphicsType = 'icon'
   */
  @Prop() graphicsProps;
  /**
   * Place a checkbox.
   */
  @Prop() checkbox = false;
  /**
   * Whether clicking on the already selected option disables it.
   */
  @Prop() allowDeselect = true;

  /**
   * Triggered when an option is selected.
   */
  @Event({ bubbles: true, composed: true }) fwSelected: EventEmitter;

  /**
   * Triggered when an option is focused.
   */
  @Event({ bubbles: true, composed: true }) fwFocus: EventEmitter;
  /**
   * Triggered when an option loses focus.
   */
  @Event({ bubbles: true, composed: true }) fwBlur: EventEmitter;

  @Method()
  async setFocus(): Promise<any> {
    this.rowContainer.focus();
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
    if (this.selected && !this.allowDeselect) {
      return;
    }
    this.selected = !this.selected;
    const { value, selected } = this;
    this.fwSelected.emit({ value, selected });
  }

  renderInnerHtml() {
    const description = this.createDescription();
    const checkbox = this.checkbox ? this.createCheckbox() : '';
    const selectedIconContainer = (
      <span class='selected-icon'>
        {this.selected && (
          <fw-icon
            name='check'
            size={12}
            color='#2C5CC5'
            library='system'
          ></fw-icon>
        )}
      </span>
    );
    switch (this.variant) {
      case 'standard':
        return (
          <Fragment>
            {checkbox}
            {description}
            {selectedIconContainer}
          </Fragment>
        );
      case 'icon':
        return (
          <Fragment>
            {checkbox}
            {this.createIcon()}
            {description}
            {selectedIconContainer}
          </Fragment>
        );
      case 'avatar':
        return (
          <Fragment>
            {checkbox}
            {this.createAvatar()}
            {description}
            {selectedIconContainer}
          </Fragment>
        );
      default:
        break;
    }
  }

  createDescription() {
    return this.subText ? (
      <div
        class={
          'description ' +
          (this.variant === 'icon' ? 'icon-margin ' : 'standard-margin ')
        }
      >
        <span class='description-text'>{this.text}</span>
        <span class='description-subText'>{this.subText}</span>
      </div>
    ) : (
      <span
        class={
          'description ' +
          (this.variant === 'icon' ? 'icon-margin ' : 'standard-margin ')
        }
      >
        {this.text}
      </span>
    );
  }

  createIcon() {
    return <fw-icon {...this.graphicsProps}></fw-icon>;
  }

  createCheckbox() {
    return <fw-checkbox checked={this.selected}></fw-checkbox>;
  }

  createAvatar() {
    return <fw-avatar size='small' {...this.graphicsProps}></fw-avatar>;
  }

  render() {
    return (
      <div
        role='option'
        tabindex='-1'
        aria-selected={this.selected}
        ref={(el) => (this.rowContainer = el)}
        class={
          'select-option ' +
          (this.selected && !this.checkbox ? 'selected ' : '') +
          (this.disabled ? 'disabled ' : '') +
          (this.html
            ? ''
            : (this.subText ? 'multi-line ' : 'single-line ') +
              (this.variant + ' ' + 'select-center'))
        }
        onMouseDown={() => this.onOptionSelected()}
        onFocus={() => this.fwFocus.emit({ id: this.host.id })}
        onBlur={(e) => this.fwBlur.emit(e)}
      >
        {this.html ? '' : this.text ? this.renderInnerHtml() : <slot />}
      </div>
    );
  }
  componentDidLoad() {
    if (this.html) {
      this.rowContainer.innerHTML = this.htmlContent;
    }
  }
}
