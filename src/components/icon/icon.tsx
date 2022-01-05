import { Component, Prop, State, Watch, h } from '@stencil/core';

// Icons Object
import icons from './icon-assets/icons.json';

@Component({
  tag: 'fw-icon',
  styleUrl: 'icon.scss',
  assetsDirs: ['icon-assets'],
  shadow: true,
})
export class Icon {
  /**
   * Identifier of the icon. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).
   */
  @Prop() name: string;

  /**
   * Size of the icon, specified in number of  pixels.
   */
  @Prop() size = 12;

  /**
   * Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.
   */
  @Prop() color = '';

  @State() svgHTML = '';

  @Watch('name')
  private setSVGState(iconName: string) {
    this.svgHTML = icons[iconName].replace(/<title>(.*?)<\/title>/g, ``);
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
