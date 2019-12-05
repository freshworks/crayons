import { Component, Prop, State, Watch, getAssetPath, h } from '@stencil/core';

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
  @Prop() color = '#12344D';

  @State() svgHTML = '';

  private async getSVGHTML(iconName: string) {
    const response = await fetch(getAssetPath(`assets/icons/${iconName}.svg`));
    const data = await response.text();
    return data;
  }

  @Watch('name')
  private setSVGState(iconName: string) {
    this.getSVGHTML(iconName).then(res => {
      this.svgHTML = res;
    }).catch();
  }

  componentWillLoad() {
    this.setSVGState(this.name);
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
