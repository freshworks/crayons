import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  Method,
  h,
  Listen,
} from '@stencil/core';
import { handleKeyDown } from '../../utils';
import { TagVariant } from '../../utils/types';

@Component({
  tag: 'fw-tag',
  styleUrl: 'tag.scss',
  shadow: true,
})
export class Tag {
  private tagContainer: HTMLElement;

  @Element() host: HTMLElement;
  /**
   * Display text in the tag component.
   */
  @Prop() text: string;

  /**
   * Sets the state of the tag to disabled. The close button is disabled. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true }) disabled: false;

  /**
   * Value associated with the tag component, that is saved when the form data is saved.
   */
  @Prop() value: string | number;

  /**
   * The variant of tag to be displayed.
   */
  @Prop() variant: TagVariant = 'standard';

  /**
   * The props need to be passed for the variant. If the variant is avatar then use this prop to send the props for the fw-avatar component.
   */
  @Prop() graphicsProps = {};
  /**
   * Whether the Tag can be closed.
   */
  @Prop() closable = true;
  /**
   * Whether the Tag is focusable.
   */
  @Prop() focusable = true;
  /**
   * Triggered when the tag is deselected.
   */
  @Event() fwClosed: EventEmitter;

  @Listen('keydown')
  onKeyDown(event) {
    switch (event.key) {
      case 'Backspace':
        this.removeTag(event);
        event.preventDefault();
        break;
    }
  }

  @Method()
  async setFocus(): Promise<any> {
    this.tagContainer.focus();
  }

  removeTag = (e): void => {
    if (this.disabled || !this.closable) {
      return;
    }
    const { value, text } = this;
    this.fwClosed.emit({ value, text });
    e.stopPropagation();
  };

  renderContent() {
    switch (this.variant) {
      case 'standard':
        return <span class='content'>{this.text}</span>;
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
      <div
        role='button'
        tabindex='-1'
        class={`tag tag-${this.variant}`}
        ref={(tagContainer) => (this.tagContainer = tagContainer)}
      >
        {this.renderContent()}
        {this.closable && (
          <span
            role='button'
            tabIndex={this.focusable ? 0 : -1}
            class={`remove-btn ${this.variant} ${
              this.disabled ? 'disabled' : ''
            }`}
            onClick={(e) => this.removeTag(e)}
            onKeyDown={handleKeyDown(this.removeTag)}
          >
            <fw-icon name='cross' size={8} library='system'></fw-icon>
          </span>
        )}
      </div>
    );
  }
}
