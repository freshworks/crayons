import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-tag',
  styleUrl: 'tag.scss',
  shadow: true,
})
export class Tag {
  @Element() host: HTMLElement;
  /**
   * The display text for the tag
   */
  @Prop({ reflect: true }) text: string;

  /**
   * The value of the tag
   */
  @Prop({ reflect: true }) value: string;

  @Event() fwClosed: EventEmitter;

  removeTag() {
    const { value, text } = this;
    this.fwClosed.emit({ value, text });
  }
  render() {
    return (
    <div class="tag">
      {this.text}
      <span role="button" class="remove-btn"
       onClick={() => this.removeTag()}>×</span>
    </div>
    );
  }
}
