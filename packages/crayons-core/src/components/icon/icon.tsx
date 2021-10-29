import { Component, Prop, State, Watch, h, Element } from '@stencil/core';
import { registerIcons, config } from '../../global/crayons';

// Icons Object
//import icons from './icon-assets/icons.json';

const iconContent = new Map<string, string>();
const requests = new Map<string, Promise<any>>();

@Component({
  tag: 'fw-icon',
  styleUrl: 'icon.scss',
  assetsDirs: ['icon-assets'],
  shadow: true,
})
export class Icon {
  private io?: IntersectionObserver;

  @Element() el!: HTMLElement;

  /**
   * Identifier of the icon. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).
   */
  @Prop() name: string;

  /**
   * Content of the icon. This will be used instead of pulling the icon content from the cdn
   */
  @Prop({ reflect: false }) icon = '';

  /**
   * Namespace for icon library.
   * Call registerIcons with the library name and set the path for custom icons.
   * Uses pre-defined icons by default. See readme.md for more details.
   * Default, `default`.
   */
  @Prop() library = 'default';

  /**
   * Size of the icon, specified in number of  pixels.
   */
  @Prop() size = 12;

  /**
   * Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.
   */
  @Prop() color = '';

  /**
   * Specifies the root folder `path` of an SVG file to use.
   * This is used in combination with `name` attribute
   * svg src is path+name.svg
   */

  @Prop() path = '';

  /**
   * If enabled, fw-icon will be loaded lazily when it's visible in the viewport.
   * Default, `false`.
   */
  @Prop() lazy = false;

  @State() svgHTML = '';

  @State() private isVisible = false;

  @Watch('name')
  @Watch('path')
  private async loadIcon() {
    if (this.isVisible) {
      const iconName = this.name;
      let url = '';

      // tree-shaking
      if (this.icon) {
        this.svgHTML = this.icon;
        return;
      }
      // load from cdn with default library or use custom path with registerIcon
      else {
        const lib = config.get(`icon:${this.library}`);
        const path = this.path || lib?.path;
        if (path?.endsWith('/')) url = `${path}${iconName}.svg`;
        else url = `${path}/${iconName}.svg`;
      }

      if (iconContent.has(url)) {
        // use the content if its already loaded
        this.svgHTML = iconContent.get(url);
      } else {
        // request if it hasn't been loaded
        this.getSVGContent(url).then(
          () => (this.svgHTML = iconContent.get(url))
        );
      }
    }
  }

  private getSVGContent(url: string) {
    let req = requests.get(url);

    console.log({ url, req });

    if (!req) {
      // request is not already present
      req = fetch(url)
        .then((rsp) => {
          if (rsp.ok) {
            return rsp.text().then((svgContent) => {
              iconContent.set(url, svgContent);
            });
          }
          iconContent.set(url, '');
        })
        .catch((err) => {
          console.error(
            `Error occurred in fetching icon with path : ${url} - ${err.message}`
          );
          iconContent.set(url, '');
        });

      // cache the request based on the url
      requests.set(url, req);
    }
    return req;
  }

  connectedCallback(): void {
    // set default library pointing to crayons icons
    registerIcons('default', {
      path: 'https://cdn.jsdelivr.net/npm/crayons-icons@latest/dist/icons/',
    });
    // loading svg file should not block the loading of the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  disconnectedCallback(): void {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  private waitUntilVisible(
    el: HTMLElement,
    rootMargin: string,
    cb: () => void
  ) {
    if (
      this.lazy &&
      typeof window !== 'undefined' &&
      (window as any).IntersectionObserver
    ) {
      const io = (this.io = new (window as any).IntersectionObserver(
        (data: IntersectionObserverEntry[]) => {
          if (data[0].isIntersecting) {
            io.disconnect();
            this.io = undefined;
            cb();
          }
        },
        { rootMargin }
      ));

      io.observe(el);
    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }

  render() {
    return (
      <div
        class='icon'
        style={{
          '--icon-color': `${this.color}`,
          'height': `${this.size}px`,
          'width': `${this.size}px`,
        }}
        innerHTML={this.svgHTML}
      />
    );
  }
}
