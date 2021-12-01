import { Component, Host, h, Prop, Method, Watch } from '@stencil/core';
import {
  createProgressLoaderContainer,
  ProgressLoaderMethods,
  getPropOptions,
} from './progress-loader-util';
@Component({
  tag: 'fw-progress-loader',
  shadow: true,
})
export class ProgressLoader {
  private progressObj: ProgressLoaderMethods;

  /**
   * Specify a selector to change the parent container. Default is `body`
   * Selector is accessed internally via document.querySelector method
   */
  @Prop()
  parent = 'body';
  /**
   * Changes the minimum percentage used upon starting. Default is `0.08`
   */
  @Prop()
  minimum = 0.08;
  /**
   * Adjust animation settings using easing (a CSS easing string). Default is `ease`
   */
  @Prop()
  easing = 'ease';
  /**
   * Add speed (in ms). Default is `200`
   */
  @Prop()
  speed = 200;
  /**
   * Turn on/off the automatic incrementing behavior by setting this to false. Default is `true`
   */
  @Prop()
  trickle = true;
  /**
   * Adjust how often to trickle/increment, in ms. Default is `200`
   */
  @Prop()
  trickleSpeed = 200;
  /**
   * Use Custom markup. To keep the progress bar working, keep an element with class='bar' in there
   */
  @Prop()
  template =
    '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="1"></div>';
  /**
   * Show progress loader. Default `false`
   */
  @Prop({ reflect: true })
  show = false;
  /**
   * Method to start showing the progress loader
   */
  @Method()
  async start(): Promise<void> {
    try {
      this.show = true;
      this.progressObj.start();
    } catch (err) {
      console.error('Error in start method', err);
    }
  }
  /**
   * Method to end the progress. This hides the progress loader
   */
  @Method()
  async done(): Promise<void> {
    try {
      this.show = false;
      this.progressObj.done();
    } catch (err) {
      console.error('Error in done method', err);
    }
  }
  /**
   * Increments the progress status by a random amount.
   */
  @Method()
  async inc(): Promise<void> {
    try {
      this.progressObj.inc();
    } catch (err) {
      console.error('Error in inc method', err);
    }
  }
  /**
   * Sets the progress loader status, where `n` is a number from `0.0` to `1.0`.
   */
  @Method()
  async set(n: number): Promise<void> {
    try {
      this.progressObj.set(n);
    } catch (err) {
      console.error('Error in set method', err);
    }
  }

  @Watch('show')
  showChanged(show: boolean): void {
    if (show) {
      this.progressObj.start();
    } else {
      this.progressObj.done();
    }
  }

  disconnectedCallback(): void {
    this.progressObj.done();
  }

  componentWillLoad(): void {
    this.progressObj = createProgressLoaderContainer(getPropOptions(this));
    if (this.show) this.progressObj.start();
  }

  render(): JSX.Element {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
