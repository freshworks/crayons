import { Host, Component, Prop, h, Method } from '@stencil/core';

import {
  ToastOptions,
  createToastStack,
  createToastNotification,
} from './toast-util';

@Component({
  tag: 'fw-toast',
  shadow: true,
})
export class Toast {
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

  /**
   * Type of the toast - success,failure, warning, inprogress
   */
  @Prop() type: 'success' | 'error' | 'warning' | 'inprogress' = 'warning';

  /**
   * The content to be displayed in toast
   */
  @Prop() content: string;

  /**
   *  The Content of the action link
   */
  @Prop() actionLinkText = '';

  /**
   *  won't close automatically
   */
  @Prop() sticky = false;

  /**
   *  Pause the toast from hiding on mouse hover
   */
  @Prop() pauseOnHover: boolean;

  componentWillLoad(): void {
    this.toastContainer = createToastStack(this);
  }

  @Method()
  async trigger(opts: ToastOptions): Promise<void> {
    createToastNotification(opts, this.toastContainer, this);
  }

  render(): JSX.Element {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
