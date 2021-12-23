import {
  Component,
  Event,
  Element,
  EventEmitter,
  Prop,
  h,
  Host,
} from '@stencil/core';

@Component({
  tag: 'field-type-menu-item',
  styleUrl: 'field-type-menu-item.scss',
  shadow: true,
})
export class FieldTypeMenuItem {
  @Element() host!: HTMLElement;
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) disabled = false;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;
  /**
   * data source used to set and edit the field values
   */
  @Prop() dataProvider = null;
  /**
   * field type attached to the item which will be broadcasted for adding the field type.
   */
  @Prop() value = '';
  /**
   * Label displayed as header in the card.
   */
  @Prop() label = '';
  /**
   * backgroundcolor for the icon
   */
  @Prop() iconBackgroundColor = '#ebeff3';
  /**
   * set the icon path to be used
   */
  @Prop() iconName = '';
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Triggered when the card in focus is selected.
   */
  @Event() fwAddClick!: EventEmitter;

  componentWillLoad(): void {
    this.onAddItemHandler = this.onAddItemHandler.bind(this);
  }

  private onAddItemHandler(): void {
    this.fwAddClick.emit({
      value: this.value,
      data: this.dataProvider,
      index: this.index,
    });
  }

  render() {
    const strComponentClassName = 'field-type-menu-item';

    return (
      <Host tabIndex='-1'>
        <div class={strComponentClassName} draggable={true}>
          <span
            class={`${strComponentClassName}-icon-container`}
            style={{ backgroundColor: this.iconBackgroundColor }}
          >
            <fw-icon size={14} name={this.iconName} color='#475867' />
          </span>
          <label class={`${strComponentClassName}-label`}>{this.label}</label>
          <span class={`${strComponentClassName}-add-button-container`}>
            <fw-button size='icon' color='link' onClick={this.onAddItemHandler}>
              <fw-icon name='plus' color='#12344D'></fw-icon>
            </fw-button>
          </span>
        </div>
      </Host>
    );
  }
}
