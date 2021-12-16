import {
  Build,
  Component,
  Element,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
import { fetchIcon, waitUntilVisible } from './icon.utils';
import {
  getIconLibrary,
  watchIcon,
  unwatchIcon,
  getSVGElement,
} from './library.icon.utils';
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
   * An alternate description to use for accessibility. If omitted, the icon will be ignored by assistive devices.
   */
  @Prop() label: string;
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

  @Watch('name')
  @Watch('src')
  @Watch('library')
  @Watch('dataSvg')
  @Watch('lazy')
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
        let url = src;
        if (!src) {
          url = this.getUrl(name, library);
        } else url = `${src}/${name}.svg`;
        if (url !== undefined) {
          const svgEl = await getSVGElement(url);
          this.applySVGMutation(library, name, svgEl);
          this.svgHTML = svgEl.outerHTML;
        } else {
          throw 'Icon-URL Not Valid.';
        }
      } catch (ex) {
        console.info(
          `Cannot load ${name}|${library} from CDN. Please check the url & provide a live path.`,
          ex
        );
        this.loadFallbackImage();
        return;
      }
    } else {
      console.error(
        "Please provide valid props either 'name' or 'data-svg'.Check the usage docs."
      );
      return;
    }
  }

  private getUrl(icon: string, lib: string): string {
    const library = getIconLibrary(lib);
    if (icon && library) {
      return library.resolver(icon);
    } else {
      throw 'Icon name/library not registered.';
    }
  }

  private applySVGMutation(library: string, icon: string, svgEl: SVGElement) {
    const iconlibrary = getIconLibrary(library);
    if (iconlibrary && iconlibrary.mutator) {
      iconlibrary.mutator(svgEl, icon);
    }
  }

  /** Fetches the icon and redraws it. Used to handle library registrations. */
  redraw() {
    this.setSVGState();
  }

  async loadFallbackImage() {
    this.svgHTML = await fetchIcon(this.getUrl('image', 'system'));
    this.dataSvg = this.svgHTML;
  }

  connectedCallback(): void {
    watchIcon(this);
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
    unwatchIcon(this);
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
    const accessibilityProps = {};

    const hasLabel = typeof this.label === 'string' && this.label.length > 0;
    if (hasLabel) {
      accessibilityProps['role'] = 'img';
      accessibilityProps['aria-label'] = this.label;
      accessibilityProps['aria-hidden'] = true;
    }
    if (this.size !== undefined) style['--icon-size'] = `${this.size}px`;

    if (this.color !== undefined) style['--icon-color'] = this.color;
    return (
      <div
        class='icon'
        {...accessibilityProps}
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
