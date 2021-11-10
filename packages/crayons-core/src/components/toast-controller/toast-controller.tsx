import { Host, Component, Prop, h, Element, Method } from '@stencil/core';

let counterId = 1;
@Component({
  tag: 'fw-toast-controller',
  styleUrl: 'toast-controller.scss',
  shadow: true,
})
export class ToastController {
  @Element() controllerEl: HTMLElement;
  private toastContainer: HTMLElement | null;

  /**
   *  position of the toast notification in screen
   */
  @Prop()
  position: 'top-center' | 'top-left' | 'top-right' = 'top-center';

  /**
   * Time duration of the toast visibility
   */
  @Prop() timeout = 4000;

  componentWillLoad() {
    console.log('controller timeout ', this.timeout);
    if (!Object.prototype.hasOwnProperty.call(window, 'fwRemoveToast'))
      window.addEventListener('fwRemoveToast', this.removeChildToast);

    const existingToastStack = document.querySelector(
      `.fw-toast-stack.${this.position}`
    ) as HTMLElement;
    if (existingToastStack) {
      this.toastContainer = existingToastStack;
    } else {
      this.toastContainer = document.createElement('div');
      this.toastContainer.className = `fw-toast-stack ${this.position}`;
      this.toastContainer.id = 'toastId ' + counterId++;
      this.toastContainer.style.cssText = `position: fixed;
      z-index: 950;
      width: 400px;
      top: 10px;
      ${this.getStylePosition(this.position)}
      background-color: $color-milk;
      max-width: 100%;
      max-height: 100%;`;

      document.body.appendChild(this.toastContainer);
    }
  }

  @Method()
  async trigger(opts: any) {
    this.createToastNotification(opts);
  }

  createToastNotification(opts) {
    const options = this.setDefaults(opts);
    const toastElem = document.createElement('fw-toast');
    toastElem.id = 'fff ' + counterId++;

    Object.entries(options).map(([key, val]) => {
      toastElem.setAttribute(key, val as string);
    });

    this.toastContainer.appendChild(toastElem);
  }

  private setDefaults(opts: any | string) {
    if (typeof opts === 'string') {
      opts = {
        content: opts,
        timeout: this.timeout || 4000,
        type: 'warning',
      };
    } else {
      console.log(this.timeout);
      Object.assign(
        {
          timeout: this.timeout || 4000,
          type: 'warning',
        },
        opts
      );
    }
    return opts;
  }

  private removeChildToast(event) {
    const target = event.target;
    document.querySelectorAll('.fw-toast-stack').forEach((node) => {
      if (node.contains(target)) {
        node.removeChild(target);
      }
    });
  }

  private getStylePosition(position) {
    switch (position) {
      case 'top-left':
        return 'left: 10px;';
      case 'top-right':
        return 'right: 10px;';
      case 'top-center':
        return 'left: calc(50% - 200px);';
    }
  }

  render(): JSX.Element {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
