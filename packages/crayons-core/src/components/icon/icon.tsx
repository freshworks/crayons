import {
  Build,
  Component,
  Element,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
import { fetchIcon, waitUntilVisible } from './icon-utils';
import { getIconLibrary } from './icon-library';
@Component({
  tag: 'fw-icon',
  styleUrl: 'icon.scss',
  assetsDirs: ['icon-assets'],
  shadow: true,
})
export class Icon {
  /**
   * Identifier of the icon. The attribute’s value must be a valid svg Name in the Crayons-Icon set.
   */
  @Prop() name: string;
  /**
   * Identifier of the icon. The attribute’s value must be a valid JS Import Name of the svg in the named export from @freshworks/crayons-icon.
   */
  @Prop() dataSvg = '';
  /**
   * Identifier of the icon. The attribute’s value must be a valid path to svg file.
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

  @State() private parser = new DOMParser();

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
          path = this.getUrl();
        }
        const lib = src ? 'cdn' : library;
        if (library === 'crayons' || path !== undefined) {
          const div = document.createElement('div');
          div.innerHTML = await fetchIcon(name, lib, path);

          const svgEle = div.firstElementChild;
          const svg =
            svgEle && svgEle.tagName.toLowerCase() === 'svg'
              ? svgEle.outerHTML
              : '';
          const doc = this.parser.parseFromString(svg, 'text/html');
          const svgEl = doc.body.querySelector('svg');

          const iconlibrary = getIconLibrary(this.library);
          if (iconlibrary && iconlibrary.mutator) {
            iconlibrary.mutator(svgEl, name);
          }

          this.svgHTML = svgEl.outerHTML;
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

  private getUrl(): string {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver();
    } else {
      return this.src;
    }
  }

  async loadFallbackImage() {
    this.svgHTML = await fetchIcon('image', 'crayons', undefined);
    this.dataSvg = this.svgHTML;
  }

  connectedCallback(): void {
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

  disconnectedCallback(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }
  }

  async componentWillLoad(): Promise<void> {
    this.setSVGState();
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
