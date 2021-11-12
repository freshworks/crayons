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
   * Default value is 12px defined using the --icon-size css variable.
   */
  @Prop() size: number;

  /**
   * Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.
   */
  @Prop() color = '';

  @State() svgHTML = '';

  @Watch('name')
  private setSVGState(iconName: string) {
    this.svgHTML = icons[iconName];
  }

  componentWillLoad() {
    this.setSVGState(this.name);
  }

  render() {
    const style = {
      '--icon-color': this.color,
    };

    if (this.size !== undefined) {
      style['--icon-size'] = `${this.size}px`;
    }

    return <div class='icon' style={style} innerHTML={this.svgHTML} />;
  }
}
