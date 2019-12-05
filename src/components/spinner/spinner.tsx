import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-spinner',
  styleUrl: 'spinner.scss',
  shadow: true,
})
export class Spinner {
  /**
   * The size of the spinner - Options ['small' , 'default', 'medium', 'large']
   */
  @Prop() size = 'default';

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

    return <svg
              class={`spinner ${this.size}`}
              style={
                {
                  width: `${diameter}px`,
                  height: `${diameter}px`,
                }
              }
              viewBox={`0 0 50 50`}>
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>;
  }
}
