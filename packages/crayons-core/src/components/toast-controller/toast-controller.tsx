import { Host, Component, h, Element, Method, Listen } from '@stencil/core';

@Component({
  tag: 'fw-toast-controller',
  styleUrl: 'toast-controller.scss',
  shadow: true,
})
export class ToastController {
  @Element() controllerEl: HTMLElement;

  @Listen('removeToastChild', { target: 'window' })
  removeToastChild(event: any): void {
    this.controllerEl.removeChild(event.target);
  }

  @Method()
  async trigger(opts: any) {
    this.createToastNotification(opts);
  }

  private createToastNotification(opts: any) {
    const options = this.setDefaults(opts);
    const toastElem = document.createElement('fw-toast');

    Object.entries(options).map(([key, val]) => {
      toastElem.setAttribute(key, val as string);
    });

    this.controllerEl.appendChild(toastElem);
  }

  private setDefaults(opts: any | string) {
    if (typeof opts === 'string') {
      opts = {
        content: opts,
        timeout: 4000,
        type: 'warning',
      };
    } else {
      Object.assign(
        {
          timeout: 4000,
          type: 'warning',
        },
        opts
      );
    }
    return opts;
  }

  render(): JSX.Element {
    return (
      <Host class='fw-toast-stack'>
        <slot></slot>
      </Host>
    );
  }
}
