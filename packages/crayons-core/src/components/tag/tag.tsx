import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
} from '@stencil/core';
import { handleKeyDown } from '../../utils';

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
   * Sets the state of the tag to disabled. The close button is disabled. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true }) disabled: false;

  /**
   * Value associated with the tag component, that is saved when the form data is saved.
   */
  @Prop({ reflect: true }) value: string;

  /**
   * Value associated with the tag component, that is saved when the form data is saved.
   */
  @Prop({ reflect: true }) variant: 'standard' | 'avatar' = 'standard';

  /**
   * Value associated with the tag component, that is saved when the form data is saved.
   */
  @Prop() graphicsProps = {};
  /**
   * Triggered when the tag is deselected.
   */
  @Event() fwClosed: EventEmitter;

  removeTag = (): void => {
    if (this.disabled) {
      return;
    }
    const { value, text } = this;
    this.fwClosed.emit({ value, text });
  };

  renderContent() {
    switch (this.variant) {
      case 'standard':
        return this.text;
      case 'avatar': {
        return [
          <fw-avatar size='xsmall' {...this.graphicsProps}></fw-avatar>,
          <span class='content'>{this.text}</span>,
        ];
      }
      default:
        break;
    }
  }

  render() {
    return (
      <div class={`tag tag-${this.variant}`}>
        {this.renderContent()}
        <span
          role='button'
          tabindex='0'
          class={`remove-btn ${this.variant} ${
            this.disabled ? 'disabled' : ''
          }`}
          onClick={() => this.removeTag()}
          onKeyDown={handleKeyDown(this.removeTag)}
        >
          ×
        </span>
      </div>
    );
  }
}
