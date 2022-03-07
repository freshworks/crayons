import {
  Build,
  Component,
  Element,
  Prop,
  State,
  h,
  Watch,
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
  @Element() el: HTMLElement;
  /**
   * Identifier of the icon. The attribute’s value must be a valid svg Name in the Crayons-Icon set.
   */
  @Prop({ reflect: true }) name: string;
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
   * Name of External Library to be used
   */
  @Prop() library = 'crayons';
  /**
   * Enable Intersection Observer. Default is false.
   */
  @Prop() lazy = false;

  @State() private setElVisible = false;

  @State() private visible = false;

  @State() private intersectionObserver: IntersectionObserver;

  @State() private svg: string;

  async componentWillLoad(): Promise<void> {
    if (!this.lazy) this.visible = true;
    else this.visible = this.setElVisible;

    if (!Build.isBrowser || !this.visible) {
      return;
    }
    this.applyIconPropstoState();
  }

  connectedCallback(): void {
    watchIcon(this);
    this.lazy &&
      waitUntilVisible(
        this.intersectionObserver,
        this.xRootMargin,
        this.el,
        () => {
          this.setElVisible = true;
          this.applyIconPropstoState();
        }
      );
  }

  @Watch('name')
  nameChangeHandler() {
    this.applyIconPropstoState();
  }

  disconnectedCallback(): void {
    unwatchIcon(this);
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }
  }

  private async applyIconPropstoState(): Promise<void> {
    const { name, dataSvg, library } = this;
    try {
      if (!name && dataSvg) {
        this.svg = dataSvg;
      } else if (name) {
        const url = this.getIconUrl(name, library);
        this.svg = await this.drawIcon(url);
      } else {
        console.error(
          "Please provide valid props either 'name' or 'data-svg'.Check the usage docs."
        );
        throw '-invalid props-';
      }
    } catch (e) {
      console.error(e.message);
      this.loadFallbackImage();
    }
  }

  private async drawIcon(url: string): Promise<string> {
    const { name, library } = this;
    try {
      const svgEl = await getSVGElement(url);
      this.applySVGMutation(library, name, svgEl);
      return svgEl.outerHTML;
    } catch (ex) {
      throw new Error(
        `Exception occured while drawing Icon- ${name} : ${ex.message}`
      );
    }
  }

  /** Fetches the icon and redraws it. Used to handle library registrations. */
  redrawIcon() {
    this.applyIconPropstoState();
  }

  async loadFallbackImage() {
    this.svg = await fetchIcon(this.getIconUrlfromlib('image', 'system'));
  }

  private getIconUrl(icon: string, lib: string): string {
    let url = '';
    if (!this.src) {
      url = this.getIconUrlfromlib(icon, lib);
      if (url === undefined) {
        console.error(
          `Error while resolving url for ${this.name}|${this.library}. Please check the lib registration/resolver function.`
        );
        return;
      }
    } else url = `${this.src}/${this.name}.svg`;
    return url;
  }

  private getIconUrlfromlib(icon: string, lib: string): string {
    const library = getIconLibrary(lib);
    if (icon && library) {
      return library.resolver(icon);
    } else {
      console.error(
        `Icon ${icon}/${lib} not registered.Check the Implementation.`
      );
      return;
    }
  }

  private applySVGMutation(library: string, icon: string, svgEl: SVGElement) {
    const iconlibrary = getIconLibrary(library);
    if (iconlibrary && iconlibrary.mutator) {
      iconlibrary.mutator(svgEl, icon);
    }
  }

  render() {
    const style = {};
    const accessibilityProps = { 'aria-hidden': true };

    const hasLabel = typeof this.label === 'string' && this.label.length > 0;
    if (hasLabel) {
      accessibilityProps['role'] = 'img';
      accessibilityProps['aria-label'] = this.label;
    }
    if (this.size !== undefined) style['--fw-icon-size'] = `${this.size}px`;

    if (this.color !== undefined) style['--fw-icon-color'] = this.color;
    return (
      <div
        class='icon'
        {...accessibilityProps}
        style={{
          height: ` ${this.height}px`,
          width: `${this.width}px`,
          ...style,
        }}
        innerHTML={this.svg}
      ></div>
    );
  }
}
