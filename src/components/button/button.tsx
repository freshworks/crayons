import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
@Component({
  tag: 'fw-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {

  /**
   *  Button type based on which actions are performed when the button is clicked.
   */
  @Prop() type: 'button' | 'reset' | 'submit' = 'button';

  /**
   * Identifier of  the theme based on which the button is styled.
   */
  @Prop() color: 'primary' | 'secondary' | 'danger' | 'link' | 'text' = 'primary';

  /**
   * Disables the button on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() expand = false;

  /**
   * Size of the button.
   */
  @Prop() size: 'normal' | 'mini' | 'small' = 'normal';

  /**
   *  Accepts the id of the fw-modal component to open it on click
   */
  @Prop() modalTriggerId = '';

  /**
   * Triggered when the button is clicked.
   */
  @Event() fwClick!: EventEmitter<void>;

  /**
   * Triggered when the button comes into focus.
   */
  @Event() fwFocus!: EventEmitter<void>;

  /**
   * Triggered when the button loses focus.
   */
  @Event() fwBlur!: EventEmitter<void>;

  private onFocus() {
    this.fwFocus.emit();
  }

  private onBlur() {
    this.fwBlur.emit();
  }

  private handleClick() {
    if (this.modalTriggerId !== '') {
      const modal: any = document.getElementById(this.modalTriggerId);
      modal.visible = true;
    }
    this.fwClick.emit();
  }

  private hasOptions() {
    const spanOptions = this.host.querySelectorAll('span');
    return spanOptions && Array.from(spanOptions).length > 0;
  }

  private setDropdownOptions() {
    this.options = Array.from(
      this.host.querySelectorAll('span')
    ).map(option => ({
      id: option.id,
      value: option.getAttribute('value'),
      label: option.textContent,
    }));

    if (this.searchable) {
      this.filteredOptions = this.options;
    }
  }

  private handleDropdownToggle() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  private handleOptionClick(option) {
    if (this.searchable) {
      return;
    }

    this.value = option.value;
    this.fwOptionClick.emit(this.value);
    this.handleDropdownToggle();
  }

  private handleAddClick() {
    this.fwOptionsAdd.emit(this.value);
    this.handleDropdownToggle();
  }

  private setSearchInput() {
    this.optionInput = this.dropdownInput.value;

    this.filteredOptions = this.optionInput !== ''
      ? this.options.filter(option => option.label.toLowerCase()
        .startsWith(this.optionInput.toLowerCase()))
      : this.options;
  }

  private handleCheckboxChange(ev) {
    if (ev.target.checked) {
      this.value = [
        ...(this.value || []),
        this.options.find(({ value }) => value === ev.target.id).value,
      ];
    } else {
      this.value = this.value.filter(val => val !== ev.target.id);
    }
  }

  iconComponent = () => {
    const iconColor = this.color === 'secondary' ? '#12344d' : '#fff';
    const direction = this.isDropdownOpen ? 'up' : 'down';
    return <fw-icon name={`chevron-${direction}`} color={iconColor} size="8"> </fw-icon>;
  }

  render() {
    return (
    <Host
      onClick={() => this.handleClick()}
      onFocus={() => this.onFocus()}
      onBlur={() => this.onBlur()}>
        <button
          type = {this.type}
          class={`
            fw-btn fw-btn--${this.color.toLowerCase()}
            fw-btn--${this.size.toLowerCase()}
            ${this.expand ? 'fw-btn--block' : ''}
            `}
          disabled = {this.disabled}>
          <slot/>
        </button>
    </Host>);
  }
}
