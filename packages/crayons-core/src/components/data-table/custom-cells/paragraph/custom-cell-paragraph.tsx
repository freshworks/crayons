import { Component, h, Prop, State, Watch, Element, Host } from '@stencil/core';

@Component({
  tag: 'fw-custom-cell-paragraph',
  styleUrl: 'custom-cell-paragraph.scss',
  shadow: true,
})
export class CustomCellParagraph {
  @Element() el: HTMLElement;

  @Prop() text = '';

  @State() maxHeight = '60px';

  @State() showToggle = false;

  hide = true;

  toggleParaButton: HTMLElement = null;

  @Watch('text')
  textChangeHandler() {
    this.showToggleOnTextChange();
  }

  componentDidLoad() {
    this.showToggleOnTextChange();
  }

  onFocus() {
    if (this.toggleParaButton) {
      this.toggleParaButton.focus();
    } else {
      this.el.parentElement.focus();
    }
  }

  showToggleOnTextChange() {
    const paraHeight = this.el.getBoundingClientRect().height;
    if (paraHeight >= parseInt(this.maxHeight)) {
      this.showToggle = true;
    } else {
      this.showToggle = false;
    }
  }

  async toggleParagraph() {
    this.hide = !this.hide;
    if (this.hide) {
      this.maxHeight = '60px';
    } else {
      this.maxHeight = 'none';
    }
  }

  render() {
    const para = (
      <p
        class={{
          'paragraph-text': true,
          'open': this.showToggle,
        }}
        style={{
          maxHeight: this.maxHeight,
        }}
      >
        {this.text}
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
            <fw-tooltip
              content={this.hide ? 'show' : 'hide'}
              hoist={true}
              placement='bottom-start'
              fallbackPlacements={['top-start']}
            >
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
                  <fw-icon
                    name='more-horizontal'
                    library='crayons'
                    size={10}
                  ></fw-icon>
                ) : (
                  <fw-icon
                    name='chevron-up'
                    library='crayons'
                    size={8}
                  ></fw-icon>
                )}
              </div>
            </fw-tooltip>
          )}
        </div>
      </Host>
    );
  }
}
