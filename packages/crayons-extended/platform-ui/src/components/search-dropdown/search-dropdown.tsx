/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Component,
  Prop,
  h,
  Listen,
  State,
  Event,
  Element,
  EventEmitter,
} from '@stencil/core';
import { TranslationController } from '../../global/Translation';

@Component({
  tag: 'fw-search-dropdown',
  styleUrl: 'search-dropdown.scss',
  shadow: true,
})
export class SearchDropdown {
  private dropdown;
  @Element() host;
  @State() value;

  /**
   * The filter schema
   */
  @Prop() options;
  /**
   * On Change event
   */
  @Event() fwChange: EventEmitter;

  @Listen('fwInput')
  onInput(e) {
    this.value = e.detail.value;
  }

  @Listen('fwChange')
  onSelection(e) {
    if (e.composedPath()[0].tagName === 'FW-LIST-OPTIONS') {
      const { value, meta } = e.detail;
      this.fwChange.emit({ value, meta, id: this.host.id });
      this.dropdown.hide();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }

  componentWillLoad() {}

  render() {
    return (
      <fw-popover
        ref={(dropdown) => (this.dropdown = dropdown)}
        distance='4'
        same-width='true'
        placement='bottom'
      >
        <fw-input
          slot='popover-trigger'
          placeholder={TranslationController.t(
            'searchDropdown.placeholder.search'
          )}
          iconRight='search'
          tabIndex={0}
          role='button'
        ></fw-input>
        <fw-list-options
          slot='popover-content'
          filterText={this.value}
          options={this.options}
        ></fw-list-options>
      </fw-popover>
    );
  }
}
