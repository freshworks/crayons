import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'fw-custom-cell-anchor',
  styleUrl: 'custom-cell-anchor.scss',
  shadow: true,
})
export class CustomCellAnchor {
  @Prop() href = '';

  @Prop() text = '';

  @Prop() target = '_self';

  render() {
    return (
      <a class='anchor' href={this.href} target={this.target}>
        {this.text}
      </a>
    );
  }
}
