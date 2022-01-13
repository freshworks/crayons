import { Component, Element, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-menu-item',
  styleUrl: 'menu-item.scss',
  shadow: true,
})
export class MenuItem {
  @Element() el: HTMLElement;
  /**
   * Sets the state of the option to selected. The selected option is highlighted and a check mark is displayed next to it. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;
  /**
   * Sets the state of the option to selected. The selected option is highlighted and a check mark is displayed next to it. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true, mutable: true }) selectable = false;

  toggleSelect() {
    this.selected = !this.selected;
  }

  render() {
    return (
      <div
        class={{ 'menu-item': true, 'selected': this.selected }}
        role='menuitem'
        tabIndex={-1}
        onMouseDown={() => {
          this.selectable && this.toggleSelect();
        }}
      >
        <span class='menu-item__prefix'>
          <slot name='prefix'></slot>
        </span>
        <span class='menu-item__label'>
          <slot></slot>
        </span>
        <span class='menu-item__suffix'>
          <slot name='suffix'></slot>
        </span>
        {this.selectable && (
          <span class='menu-item__check'>
            <fw-icon
              name='check'
              size={12}
              color='#2C5CC5'
              library='system'
            ></fw-icon>
          </span>
        )}
      </div>
    );
  }
}
