import { Component, Prop, h, Listen } from '@stencil/core';

@Component({
  tag: 'fw-kebab-menu',
  shadow: true,
})
export class KebabMenu {
  private popover?: HTMLFwPopoverElement;

  /**
   * The data for the kebab menu component, the options will be of type array of fw-select-options.
   */
  @Prop() options = [];

  /**
   * handler for selecting option from the list
   */
  @Prop() handleSelect;

  /**
   * Standard is the default option without any graphics other option is icon which places the icon at the beginning of the row.
   * The props for the icon are passed as an object via the graphicsProps.
   */
  @Prop() variant: 'standard' | 'icon' = 'standard';

  @Listen('fwSelectAttempted')
  fwSelectHandler(selectedItem) {
    const { value } = selectedItem.detail;
    this.handleSelect(value);
    this.closeDropdown();
  }

  private closeDropdown = () => {
    this.popover.hide();
  };

  render() {
    return (
      <fw-popover
        ref={(popover) => (this.popover = popover)}
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
  }
}
