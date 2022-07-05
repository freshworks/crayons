import { Component, h, Prop, State, Watch, Element, Host } from '@stencil/core';
import { TranslationController } from '../../../../global/Translation';

@Component({
  tag: 'fw-custom-cell-paragraph',
  styleUrl: 'custom-cell-paragraph.scss',
  shadow: true,
})
export class CustomCellParagraph {
  /**
   * To get access to the host element
   */
  @Element() el: HTMLElement;

  /**
   * text to display inside the cell
   */
  @Prop() text = '';

  /** max height to restrict trimming. 60px to allow for 3 lines (3 * 20 line-height) */
  @State() maxHeight = '60px';

  /**
   * hide and show toggle button state based on how long the text is
   */
  @State() showToggle = false;

  /**
   * hide and show text
   */
  @State() hide = true;

  /**
   * toggle paragraph button
   */
  toggleParaButton: HTMLElement = null;

  @Watch('text')
  textChangeHandler() {
    this.showToggleOnTextChange();
  }

  /**
   * componentDidLoad lifecycle event
   */
  componentDidLoad() {
    this.showToggleOnTextChange();
  }

  /** on focusing of the para variant */
  onFocus() {
    if (this.toggleParaButton) {
      this.toggleParaButton.focus();
    } else {
      this.el.parentElement.setAttribute('tabindex', '0');
      this.el.parentElement.focus();
    }
  }

  /**
   * showToggleOnTextChange show the button based on number of lines in the paragraph
   */
  showToggleOnTextChange() {
    const paraHeight = this.el.getBoundingClientRect().height;
    if (paraHeight >= parseInt(this.maxHeight)) {
      this.showToggle = true;
    } else {
      this.showToggle = false;
    }
  }

  /**
   * toggleParagraph show and hide the longer paragraph text
   */
  toggleParagraph() {
    this.hide = !this.hide;
    if (this.hide) {
      this.maxHeight = '60px';
    } else {
      this.maxHeight = 'none';
    }
  }

  /**
   * render method
   */
  render() {
    const para = (
      <p
        class={{
          'paragraph-text': true,
          'open': this.showToggle,
          'expanded': !this.hide,
        }}
        style={{
          maxHeight: this.maxHeight,
        }}
      >
        {this.text}{' '}
      </p>
    );
    return (
      <Host onFocus={() => this.onFocus()}>
        <div class='paragraph-container'>
          {this.showToggle && this.hide ? (
            <fw-tooltip
              content={this.text}
              hoist={true}
              placement='bottom-start'
              fallbackPlacements={['top-start']}
            >
              {para}
            </fw-tooltip>
          ) : (
            para
          )}
          {this.showToggle && (
            <div
              class='paragraph-toggle'
              role='button'
              tabIndex={0}
              onKeyUp={(event) =>
                (event.code === 'Space' || event.code === 'Enter') &&
                this.toggleParagraph()
              }
              onClick={() => this.toggleParagraph()}
              ref={(el) => (this.toggleParaButton = el)}
            >
              {this.hide ? (
                <span>{TranslationController.t('datatable.showMore')}</span>
              ) : (
                <span>{TranslationController.t('datatable.showLess')}</span>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
