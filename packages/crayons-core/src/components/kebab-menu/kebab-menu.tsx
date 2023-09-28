import { Component, Prop, h, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'fw-kebab-menu',
  shadow: true,
})
export class KebabMenu {
  private popoverRef?: HTMLFwPopoverElement;

  /**
   * The data for the kebab menu component, the options will be of type array of fw-select-options.
   */
  @Prop() options = [];

  /**
   * Standard is the default option without any graphics other option is icon which places the icon at the beginning of the row.
   * The props for the icon are passed as an object via the graphicsProps.
   */
  @Prop() variant: 'standard' | 'icon' = 'standard';

  /**
   * fwSelect event is emitted when an option is clicked from the list.
   */
  @Event() fwSelect: EventEmitter;

  /**
   * fwSelectAttempted
   * @param selectedItem
   */
  @Listen('fwSelectAttempted')
  fwSelectHandler(selectedItem) {
    const { value } = selectedItem.detail;
    this.fwSelect.emit({
      value,
    });
    this.closeDropdown();
  }

  /**
   * Private
   * closeDropdown
   */
  private closeDropdown = () => {
    this.popoverRef.hide();
  };

  render() {
    if (this.options?.length) {
      return (
        <fw-popover
          ref={(popoverRef) => (this.popoverRef = popoverRef)}
          sameWidth={false}
          placement='bottom-end'
          hoist
        >
          <fw-button slot='popover-trigger' size='icon' color='text'>
            <fw-icon name='more-vertical' size={14}></fw-icon>
          </fw-button>
          <fw-list-options
            slot='popover-content'
            options={this.options}
            variant={this.variant}
            allowSelect={false}
            hideTick
          ></fw-list-options>
        </fw-popover>
      );
    } else {
      return;
    }
  }
}
