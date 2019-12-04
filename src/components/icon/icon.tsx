import { Component, Prop, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'fw-icon',
  styleUrl: 'icon.scss',
  assetsDirs: ['assets'],
  shadow: true,
})
export class Icon {
  /**
   * The name of the icon
   */
  @Prop() name: string;

  /**
   * The size of the icon in pixels
   */
  @Prop() size = 12;

  render() {
    return (
    <img
      src={getAssetPath(`./assets/icons/${this.name}.svg`)}
      height={this.size}
      width={this.size}
    ></img>);
  }
}
