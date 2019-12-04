import { Component, Prop, State, getAssetPath, h } from '@stencil/core';

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

  /**
   * The color of the icon in CSS standard color
   */
  @Prop() color = '#1234DD';

  @State() svgHTML = '';

  private async getSVGHTML() {
    const response = await fetch(getAssetPath(`./assets/icons/${this.name}.svg`));
    const data = await response.text();
    return data;
  }

  componentWillLoad() {
    this.getSVGHTML().then(res => {
      this.svgHTML = res;
    }).catch();
  }

  render() {
    return (
      <div class="icon"
        style={
          {
            color: `${this.color}`,
            height: `${this.size}px`,
            width: `${this.size}px`,
          }
        }
        innerHTML={this.svgHTML}/>
    );
  }
}
