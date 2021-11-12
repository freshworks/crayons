import { Component, Host, h, Prop, Method } from '@stencil/core';
import { createProgressContainer } from './progress-util';
@Component({
  tag: 'fw-progress-bar',
  shadow: true,
})
export class ProgressBar {
  progressObj: any;

  @Prop() parent = 'body';

  @Prop() speed = 200;

  @Prop() trickle = true;

  @Prop() trickleSpeed = 200;

  getOptions() {
    return Object.assign(
      {},
      {
        minimum: 0.08,
        easing: 'linear',
        positionUsing: '',
        speed: 200,
        trickle: true,
        trickleSpeed: 200,
        showSpinner: false,
        barSelector: '[role="bar"]',
        spinnerSelector: '[role="spinner"]',
        parent: 'body',
      },
      { parent: this.parent }
    );
  }

  @Method()
  async start(): Promise<void> {
    console.log('start');
    return this.progressObj.start();
  }

  @Method()
  async done() {
    return this.progressObj.done();
  }

  componentWillLoad() {
    this.progressObj = createProgressContainer(this.getOptions());
  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
