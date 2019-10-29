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
              viewBox={`0 0 ${diameter} ${diameter}`}>
            <circle
              class="path"
              cx={diameter / 2}
              cy={diameter / 2}
              r={diameter / 2 - 3}
              fill="none"
              stroke-width={diameter / 8}></circle>
          </svg>;
  }
}
