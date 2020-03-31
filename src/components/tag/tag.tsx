import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-tag',
  styleUrl: 'tag.scss',
  shadow: true,
})
export class Tag {
  @Element() host: HTMLElement;
  /**
   * Display text in the tag component.
   */
  @Prop({ reflect: true }) text: string;

  /**
   * Value associated with the tag component, that is saved when the form data is saved.
   */
  @Prop({ reflect: true }) value: string;
  /**
   * Triggered when the tag is deselected.
   */
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
