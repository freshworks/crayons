import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'fw-spinner',
  styleUrl: 'spinner.scss',
  shadow: true,
})
export class Spinner {
  /**
   * Size of the loader.
   */
  @Prop() size: 'small' | 'medium' | 'large' | 'default' = 'default';

  /**
   * Color in which the loader is displayed, specified as a standard CSS color.
   */
  @Prop() color = '';

  sizeMap = {
    small: 12,
    default: 16,
    medium: 24,
    large: 32,
  };

  getSize() {
    return this.sizeMap[this.size] || 16;
  }

  render() {
    const diameter = this.getSize();

    return (
      <Host>
        <svg
          class={`spinner ${this.size}`}
          style={{
            'width': `${diameter}px`,
            'height': `${diameter}px`,
            '--fw-spinner-color': `${this.color}`,
          }}
          viewBox={`0 0 50 50`}
        >
          <circle
            class='path'
            cx='25'
            cy='25'
            r='18'
            fill='none'
            stroke-width='8'
          ></circle>
        </svg>
      </Host>
    );
  }
}
