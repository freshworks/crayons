import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'fw-custom-cell-icon',
  shadow: true,
})
export class CustomCellUser {
  @Prop() name = '';

  @Prop() size = 18;

  @Prop() color = '#647A8E';

  @Prop() library = 'crayons';

  render() {
    return (
      <fw-icon
        name={this.name}
        size={this.size}
        color={this.color}
        library={this.library}
      ></fw-icon>
    );
  }
}
