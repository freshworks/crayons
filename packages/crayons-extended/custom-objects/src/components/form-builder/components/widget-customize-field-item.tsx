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
  tag: 'fw-widget-customize-field-item',
  styleUrl: 'widget-customize-field-item.scss',
  shadow: true,
})
export class WidgetCustomizeFieldItem {
  @Element() host!: HTMLElement;

  /**
   * Pinned position of the drag item, other drag item cannot be placed above or below it.
   */
  @Prop() pinned: 'top' | 'bottom' | '';
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) disabled = false;
  /**
   * selected property of the component
   */
  @Prop({ mutable: true, reflect: true }) selected = false;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;
  /**
   * data source used to set and edit the field values
   */
  @Prop() dataProvider = null;
  /**
   * Label displayed as header in the card.
   */
  @Prop() label = '';
  /**
   * defines if the field is primary
   */
  @Prop() isPrimaryField = false;
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Triggered when the card in focus is selected.
   */
  @Event() fwCheck!: EventEmitter;

  private checkboxSelectionChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    this.selected = event.detail?.meta?.checked;
    this.fwCheck.emit({
      checked: this.selected,
      data: this.dataProvider,
      index: this.index,
    });
  };

  render() {
    if (!this.dataProvider) {
      return null;
    }

    const strBaseClassName = 'widget-customize-field-item';
    let strComponentClassName = strBaseClassName;
    if (this.disabled) {
      strComponentClassName += ` ${strBaseClassName}--disabled`;
    }

    return (
      <Host tabIndex='-1'>
        <div class={strComponentClassName}>
          <fw-checkbox
            class={`${strBaseClassName}-checkbox`}
            checked={this.selected}
            disabled={this.disabled}
            value={this.dataProvider.name}
            onFwChange={this.checkboxSelectionChangeHandler}
          >
            {this.label}
          </fw-checkbox>
        </div>
      </Host>
    );
  }
}
