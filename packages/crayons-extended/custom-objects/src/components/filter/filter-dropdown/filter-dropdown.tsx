import { Component, Prop, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'fw-filter-dropdown',
  styleUrl: 'filter-dropdown.scss',
  shadow: true,
})
export class FilterDropdown {
  private dropdown;
  @State() selectedText;
  @State() isExpanded;

  /**
   * The filter schema
   */
  @Prop() options;
  /**
   * The selected value
   */
  @Prop() value;

  @Listen('fwChange')
  onSelection(e) {
    this.selectedText = e.detail.meta.selectedOptions[0].text;
    this.dropdown.hide();
  }

  @Listen('fwShow')
  onDropdownOpen() {
    this.isExpanded = true;
  }

  @Listen('fwHide')
  onDropdownClose() {
    this.isExpanded = false;
  }

  componentWillLoad() {
    this.selectedText = this.options.filter(
      (option) => option.value === this.value
    )[0].text;
  }

  render() {
    return (
      <fw-popover
        ref={(dropdown) => (this.dropdown = dropdown)}
        class='dropdown'
        same-width='false'
        placement='bottom-start'
        autoFocusOnContent
        hoist={true}
      >
        <div
          class='dropdown-container'
          slot='popover-trigger'
          tabIndex={0}
          role='button'
        >
          <span class='dropdown-label'>{this.selectedText}</span>
          <span
            class={{
              'dropdown-status-icon': true,
              'expanded': this.isExpanded,
            }}
          >
            <fw-icon
              name='chevron-down'
              color='#2c5cc5'
              size={8}
              library='system'
            ></fw-icon>
          </span>
        </div>
        <fw-list-options
          slot='popover-content'
          value={this.value}
          allowDeselect={false}
          options={this.options}
        ></fw-list-options>
      </fw-popover>
    );
  }
}
