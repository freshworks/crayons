import {
  Build,
  Component,
  Element,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
import { fetchIcon } from './icon-assets/icon-utils/icon-fetch-memoize';

@Component({
  tag: 'fw-icon',
  styleUrl: 'icon.scss',
  assetsDirs: ['icon-assets'],
  shadow: true,
})
/**
   * Class of the icon. Suppoprts Intersection Observer, Icon Cache, JS Imports for Tree shaking inline SVGs and SVGs from external CDNs or custom path within project.
*/
export class Icon {
  /**
   * Identifier of the icon. The attribute’s value must be a valid svg file name or a JS Export of the svg file in the repo of icons (icon-assets/icons) or a named export of svg.
   */
  @Prop() name: string;
  /**
   * Size of the icon, specified in number of  pixels. This will be square coordinates of (w X h) = size X size
   */
  @Prop() size = '';
  /**
   * Root Margin in px or percentage for intersection observer
   */
  @Prop() xRootMargin = '50px';
  /**
   * Width of the icon, specified in number of  pixels.
   */
  @Prop() width = undefined;
  /**
   * Height of the icon, specified in number of  pixels.
   */
  @Prop() height = undefined;
  /**
   * Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.
   */
  @Prop() color = '';
  /**
   * Enable Intersection Observer. Default is true.
   */
  @Prop() lazy = "true";
  /**
   * Name of External Library to be used
   */
  @Prop() library = "crayons";

  @Element() el: HTMLElement;

  @State() private visible = false;

  private intersectionObserver: IntersectionObserver;

  @State() svgHTML = '';

  @State() ico_height = undefined;

  @State() ico_width = undefined;

  @State() eval_xOb = false;

  @Watch('name') private async setSVGState(): Promise<void> {
    const { name, visible, lazy, library } = this;
    if(lazy=="false")
      this.eval_xOb = true;
    else if(lazy=="true" || lazy==undefined){
      this.eval_xOb = visible;
    }
    if (!Build.isBrowser || !name || !this.eval_xOb ) {
      return;
    }
   
    if (
      name.indexOf('svg') > -1 &&
      name.indexOf('viewBox') > -1 &&
      name.indexOf('fill') > -1
    )
      this.svgHTML = this.name;
    else {
      this.svgHTML = await fetchIcon(name, library);
    }
    this.ico_height = this.height !== undefined ? this.height : this.size;
    this.ico_width = this.width !== undefined ? this.width : this.size;
  }

  connectedCallback(): void {
    this.waitUntilVisible(() => {
      this.visible = true;
      this.setSVGState();
    });
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
    return (
      <div
        class='icon'
        style={{
          '--icon-color': `${this.color}`,
          'height': ` ${this.ico_height}px`,
          'width': `${this.ico_width}px`,
        }}
        innerHTML={this.svgHTML}
      ></div>
    );
  }

  private waitUntilVisible(callback: () => void): void {
    if (
      !Build.isBrowser ||
      typeof window === 'undefined' ||
      !(window as any).IntersectionObserver
    ) {
      callback();
      return;
    }
    if (this.lazy=="false") {
      if(this.intersectionObserver){
        this.intersectionObserver.disconnect();
        this.intersectionObserver = undefined;
      }
      
    }else{
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.intersectionObserver.disconnect();
              this.intersectionObserver = undefined;
              callback();
            }
          });
        },
        { rootMargin: this.xRootMargin }
      );
  
      this.intersectionObserver.observe(this.el);
    }
  }
}
