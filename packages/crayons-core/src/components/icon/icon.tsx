import {
  Build,
  Component,
  Element,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
import { fetchIcon, waitUntilVisible, iconRegistry } from './icon-utils';
@Component({
  tag: 'fw-icon',
  styleUrl: 'icon.scss',
  assetsDirs: ['icon-assets'],
  shadow: true,
})
export class Icon {
  /**
   * Identifier of the icon. Type values 'registry' or 'icon'.
   */
  @Prop() type = 'icon';
  /**
   * Identifier of the icon. The attribute’s value must be a valid svg Name in the Crayons-Icon set.
   */
  @Prop() name: string;
  /**
   * Identifier of the icon. The attribute’s value must be a valid JS Import Name of the svg in the named export from @freshworks/crayons-icon.
   */
  @Prop() dataSvg = '';
  /**
   * Valid for fw-icon-type - registry only. This sets a context setter object which can then be used to render related icon from libraries.
   */
  @Prop() dataRegisterLibs: any;
  /**
   * Identifier of the icon. The attribute’s value must be a valid cdn path.
   */
  @Prop() src: string;
  /**
   * Size of the icon, specified in number of  pixels. This will be square coordinates of (w X h) = size X size
   */
  @Prop() size: number;
  /**
   * Root Margin in px or percentage for Intersection-Observer. This means from ref to bottom of loaded view , the item loads when it crosses above the negative y margin.
   */
  @Prop() xRootMargin = '50px';
  /**
   * Width of the icon, specified in number of  pixels.
   */
  @Prop() width: number;
  /**
   * Height of the icon, specified in number of  pixels.
   */
  @Prop() height: number;
  /**
   * Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.
   */
  @Prop() color = '';
  /**
   * Enable Intersection Observer. Default is false.
   */
  @Prop() lazy = false;
  /**
   * Name of External Library to be used
   */
  @Prop() library = 'crayons';

  @Element() el: HTMLElement;

  @State() private visible = false;

  @State() private intersectionObserver: IntersectionObserver;

  @State() private svgHTML = '';

  @State() private eval_xOb = false;

  @Watch('name')
  @Watch('src')
  @Watch('library')
  private async setSVGState(): Promise<void> {
    const { name, visible, library, lazy, dataSvg, src } = this;

    if (!lazy) this.eval_xOb = true;
    else this.eval_xOb = visible;

    if (!Build.isBrowser || !this.eval_xOb) {
      return;
    }
    if (!name && dataSvg) {
      this.svgHTML = dataSvg;
    } else if (name) {
      try {
        let path = src;
        if (library !== 'crayons' && !src) {
          path = iconRegistry.fetchIconlibUrl[library];
        }
        const lib = src ? 'cdn' : library;
        if (library === 'crayons' || path !== undefined) {
          this.svgHTML = await fetchIcon(name, lib, path);
        } else {
          throw 'URL Not Valid.';
        }
      } catch (ex) {
        console.info(
          `Cannot load ${name}|${library} from CDN. Please check the url & proide a live path.`,
          ex
        );
        this.loadFallbackImage();
      }
    } else {
      console.error(
        "Please provide valid props 'name' or 'icon'.Check the usage docs."
      );
      return;
    }
  }

  async loadFallbackImage() {
    this.svgHTML = await fetchIcon('image', 'crayons', undefined);
    this.dataSvg = this.svgHTML;
  }

  connectedCallback(): void {
    if (this.dataRegisterLibs && this.type === 'registry') {
      const data = JSON.parse(this.dataRegisterLibs);
      iconRegistry.addLib(data);
      return;
    } else {
      this.lazy &&
        waitUntilVisible(
          this.intersectionObserver,
          this.xRootMargin,
          this.el,
          () => {
            this.visible = true;
            this.setSVGState();
          }
        );
    }
  }

  disconnectedCallback(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }
  }

  async componentWillLoad(): Promise<void> {
    if (this.type === 'icon') this.setSVGState();
  }

  render() {
    const style = {};
    if (this.size !== undefined) style['--icon-size'] = `${this.size}px`;

    if (this.color !== undefined) style['--icon-color'] = this.color;
    return (
      <div
        class='icon'
        style={{
          height: ` ${this.height}px`,
          width: `${this.width}px`,
          ...style,
        }}
        innerHTML={this.svgHTML}
      ></div>
    );
  }
}
