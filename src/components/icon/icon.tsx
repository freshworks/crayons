import { Build, Component, Element, Prop, State, Watch, h } from '@stencil/core';

import { fetchIcon } from './icon-utils';
declare const window: any;
@Component({
  tag: 'fw-icon',
  styleUrl: 'icon.scss',
  assetsDirs: ['icon-assets'],
  shadow: true,
})
export class Icon {
  /**
   * Identifier of the icon. The attribute’s value must be a valid svg file in the repo of icons (icon-assets/icons).
   */
  @Prop() name: string;

  /**
   * Identifier of the icon. The attribute’s value must be a valid svg file path in the repo of icons (icon-assets/icons).
   */
  @Prop() path = '';

  /**
   * Size of the icon, specified in number of  pixels.
   */
  @Prop() size = 12;

  /**
   * Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.
   */
  @Prop() color = '';

  @Element() el: HTMLElement;

  @State() private visible = false;

  private intersectionObserver: IntersectionObserver;

  @State() svgHTML = '';

  @Watch('name') private async setSVGState(): Promise<void>
  {
    const { name, visible, path } = this;

    if (!Build.isBrowser || !name || !visible) {
      return;
    }
    const _svgHTML = await fetchIcon(name, path);
    this.svgHTML = _svgHTML;
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
      <div class="icon"
        style={
          {
            '--icon-color': `${this.color}`,
            'height': `${this.size}px`,
            'width': `${this.size}px`,
          }
        }
        innerHTML= {this.svgHTML}></div>
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

    this.intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = undefined;
            callback();
          }
        });
      },
      { rootMargin: '50px' }
    );

    this.intersectionObserver.observe(this.el);
  }
}
