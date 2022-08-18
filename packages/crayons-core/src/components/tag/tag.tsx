import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  Method,
  h,
  Listen,
  State,
} from '@stencil/core';
import { handleKeyDown } from '../../utils';
import { TagState, TagVariant } from '../../utils/types';

@Component({
  tag: 'fw-tag',
  styleUrl: 'tag.scss',
  shadow: true,
})
export class Tag {
  private tagContainer: HTMLElement;

  private divLabel: HTMLElement;

  private resizeObserver;

  @Element() host: HTMLElement;
  /**
   * Display text in the tag component.
   */
  @Prop() text: string;

  /**
   * Display secondary text in the tag component.
   */
  @Prop() secondaryText: string;

  /**
   * Sets the state of the tag to disabled. The close button is disabled. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true }) disabled = false;

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
   * Theme based on which the tag is styled.
   */
  @Prop() state: TagState = 'normal';
  /**
   * Index of tag in a group of tags
   */
  @Prop() index: string | number = '-1';
  /**
   * Triggered when the tag is deselected.
   */
  @Event() fwClosed: EventEmitter;

  @State() addTooltip = false;

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
    const { value, text, index } = this;
    this.fwClosed.emit({ value, text, index });
    e.stopPropagation();
  };

  private renderLabel() {
    return (
      <div
        class='ellipsis'
        ref={(el) => (this.divLabel = el)}
      >
        <span
          class={{
            primary: !!this.secondaryText,
            content: true,
            'end-padding': !this.secondaryText && !this.closable,
          }}>{this.text}</span>
        {this.secondaryText && <span class={`secondary content ${!this.closable ? 'end-padding' : ''}`}>{this.secondaryText}</span>}
      </div>
    );
  }

  renderContent() {
    switch (this.variant) {
      case 'standard':
        return <span class='content'>{this.text}</span>;
      case 'avatar': {
        return [
          <fw-avatar mode={this.state === 'error' ? this.state : 'dark'} size='xsmall' {...this.graphicsProps}></fw-avatar>,
          <div class={'avatar-content'}>
            {this.addTooltip ? <fw-tooltip trigger='hover' content={`${this.text}${this.secondaryText ? ` ${this.secondaryText}` : ''}`} hoist>
              {this.renderLabel()}
            </fw-tooltip> : this.renderLabel()}
          </div>
        ];
      }
      default:
        break;
    }
  }

  componentDidRender = () => {
    const elLabel = this.divLabel;
    if (elLabel && !this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        if (elLabel.offsetWidth > 0) {
          this.addTooltip =
            elLabel.offsetWidth < elLabel.scrollWidth ? true : false;
        }
      });
      this.resizeObserver.observe(elLabel);
    }
  };

  disconnectedCallback(): void {
    this.removeResizeObserver();
  }

  private removeResizeObserver = () => {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  };

  render() {
    return (
      <div
        role='button'
        tabindex='-1'
        class={`tag ${this.state} tag-${this.variant} ${this.disabled ? 'disabled' : ''}`}
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
