import { Component, Prop, State, Watch, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'fw-icon',
  styleUrl: 'icon.scss',
  assetsDirs: ['assets'],
  shadow: true,
})
export class Icon {
  /**
   * Identifier of the icon. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).
   */
  @Prop() name: string;

  /**
   * Size of the icon, specified in number of pixels.
   */
  @Prop() size: any = 12;

  /**
   * Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.
   */
  @Prop() color = '';

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
            '--icon-color': `${this.color}`,
            'height': `${this.size}px`,
            'width': `${this.size}px`,
          }
        }
        innerHTML={this.svgHTML}/>
    );
  }
}
