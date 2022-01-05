import { Component, Element, State, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'fw-drag-item',
  styleUrl: 'drag-item.scss',
  shadow: true,
})
export class DragItem {
  @Element() el: HTMLElement;
  @State() draggable = false;

  private dragIcon?: HTMLElement;

  /**
   * Whether the drag is disabled or not.
   */
  @Prop() disabled = false;

  componentDidLoad() {
    this.dragIcon.addEventListener('mousedown', () => {
      this.draggable = true;
    });

    this.dragIcon.addEventListener('mouseout', () => {
      this.draggable = false;
    });
  }

  render() {
    return (
      <Host draggable={this.draggable}>
        <div
          class={{
            'drag-item': true,
          }}
          draggable={this.draggable}
        >
          <span class='drag-item__prefix'>
            <fw-icon
              class='drag-icon'
              name='drag'
              ref={(dragIcon) => (this.dragIcon = dragIcon)}
            ></fw-icon>
          </span>
          <span class='drag-item__label'>
            <slot></slot>
          </span>
          <span class='drag-item__suffix'>
            <slot name='suffix'></slot>
          </span>
        </div>
      </Host>
    );
  }
}
