import {
  Component,
  Event,
  Element,
  EventEmitter,
  Prop,
  Listen,
  Method,
  h,
  Host,
} from '@stencil/core';

@Component({
  tag: 'fw-toggle-group-button',
  styleUrl: 'toggle-group-button.scss',
  shadow: true,
})
export class ToggleGroupButton {
  private button: HTMLButtonElement;

  @Element() host!: HTMLElement;

  /**
   * Sets the state to selected. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) selected = false;
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) disabled = false;
  /**
   * sets the default base class name and the rest of the class names for the other states are automatically appended to this
   */
  @Prop({ mutable: true }) baseClassName = 'fw-card-radio';
  /**
   * sets the type of the button
   */
  @Prop() type: 'card' | 'icon' | 'custom' = 'card';
  /**
   * Enables the component to be used as a toggle button or just to be used as a normal button
   */
  @Prop() selectable = true;
  /**
   * Enables the component to be used as a part of multi selection group
   */
  @Prop() isCheckbox = false;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;
  /**
   * Identifier corresponding to the component, that is saved when the form data is saved.
   */
  @Prop() value = '';
  /**
   * Label displayed as header in the card.
   */
  @Prop() header = '';
  /**
   * Label displayed as description in the card.
   */
  @Prop() description = '';
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Triggered when the card in focus is selected.
   */
  @Event() fwToggled!: EventEmitter;
  /**
   * Public method exposed to set the focus for the button component - to be used for accessibility
   */
  @Method()
  async setFocus(): Promise<void> {
    this.button.focus();
  }

  @Listen('click')
  listenClickHandler(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.detail && event.detail > 1) {
      return;
    }

    let boolEmitEvent = true;
    let boolSelected = false;
    if (this.selectable) {
      if (this.isCheckbox) {
        boolSelected = !this.selected;
      } else {
        boolSelected = true;
        if (this.selected) {
          boolEmitEvent = false;
        }
      }
    }

    this.selected = boolSelected;
    if (boolEmitEvent) {
      this.fwToggled.emit({
        index: this.index,
        value: this.value,
        selected: boolSelected,
      });
    }
  }

  componentWillLoad(): void {
    switch (this.type) {
      case 'card':
        this.baseClassName = 'fw-toggle-card-button';
        break;
      case 'icon':
        this.baseClassName = 'fw-toggle-icon-button';
        break;
    }
  }

  private getClassName() {
    const strComponentClassName = this.baseClassName;
    let strClassName = strComponentClassName;

    if (this.selectable && this.selected) {
      strClassName += ' ' + strComponentClassName + '--selected';

      if (this.isCheckbox) {
        strClassName += ' ' + strComponentClassName + '--selected--checkbox';
      } else {
        strClassName += ' ' + strComponentClassName + '--selected--radio';
      }
    }
    if (this.disabled) {
      strClassName += ' ' + strComponentClassName + '--disabled';
    }
    return strClassName;
  }

  render() {
    const strComponentClassName = this.baseClassName;
    const strButtonClassName = this.getClassName();
    const strBtnType = this.type;

    return (
      <Host tabIndex='-1'>
        {strBtnType === 'card' && (
          <button
            ref={(button) => (this.button = button)}
            class={strButtonClassName}
            aria-disabled={this.disabled}
          >
            <label class={`${strComponentClassName}-header`}>
              {this.header}
            </label>
            {this.description && this.description !== '' && (
              <p class={`${strComponentClassName}-description`}>
                {this.description}
              </p>
            )}
            {this.selected ? (
              <span class={`${strComponentClassName}-tick`}>
                <fw-icon
                  size={10}
                  name='check'
                  color='#FFFFFF'
                  library='system'
                />
              </span>
            ) : (
              ''
            )}
          </button>
        )}
        {strBtnType === 'icon' && (
          <button
            ref={(button) => (this.button = button)}
            class={strButtonClassName}
            aria-disabled={this.disabled}
          >
            <slot name='toggle-icon'></slot>
          </button>
        )}
        {strBtnType === 'custom' && <slot></slot>}
      </Host>
    );
  }
}
