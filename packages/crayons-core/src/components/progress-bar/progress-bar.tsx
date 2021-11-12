import { Component, Host, h, Prop, Method } from '@stencil/core';
import {
  createProgressContainer,
  NProgressType,
  getPropOptions,
} from './progress-util';
@Component({
  tag: 'fw-progress-bar',
  shadow: true,
})
export class ProgressBar {
  private progressObj: NProgressType;

  /**
   * Specify a selector to change the parent container. Default is `body`
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
   * Specify a background color for the progress bar. Default is `#29d`
   */
  @Prop()
  template = '<div class="bar" role="bar"></div>';

  @Method()
  async start(): Promise<void> {
    return this.progressObj.start();
  }

  @Method()
  async done(): Promise<void> {
    return this.progressObj.done();
  }

  componentWillLoad(): void {
    this.progressObj = createProgressContainer(getPropOptions(this));
  }

  render(): JSX.Element {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
