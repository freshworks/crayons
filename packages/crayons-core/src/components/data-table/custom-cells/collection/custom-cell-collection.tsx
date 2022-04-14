import { Component, h, Prop, State, Host, Element } from '@stencil/core';

@Component({
  tag: 'fw-custom-cell-collection',
  styleUrl: 'custom-cell-collection.scss',
  shadow: true,
})
export class CustomCellCollection {
  @Element() el: HTMLElement;

  @Prop() collection = [];

  @Prop() show = 2;

  @State() open = false;

  showMoreButton = null;

  toggleCollection() {
    this.open = !this.open;
  }

  onFocus() {
    if (this.showMoreButton) {
      this.showMoreButton.focus();
    } else {
      this.el.parentElement.setAttribute('tabindex', '0');
      this.el.parentElement.focus();
    }
  }

  render() {
    return (
      <Host onFocus={() => this.onFocus()}>
        <div>
          {this.collection.length <= this.show ? (
            <span>{this.collection.join(', ')}</span>
          ) : (
            <span>
              <span>
                {this.open
                  ? this.collection.join(', ')
                  : this.collection.slice(0, this.show).join(', ')}{' '}
              </span>
              {
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  class='show-more'
                  role='button'
                  tabIndex={0}
                  onKeyUp={(event) => {
                    if (event.code === 'Space' || event.code === 'Enter') {
                      event.preventDefault();
                      this.toggleCollection();
                    }
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    this.toggleCollection();
                  }}
                  ref={(el) => (this.showMoreButton = el)}
                >
                  {this.open ? 'show less' : 'show more'}
                </a>
              }
            </span>
          )}
        </div>
      </Host>
    );
  }
}
