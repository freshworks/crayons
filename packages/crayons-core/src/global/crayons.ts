/** use this file for exposing global functions and ways to set global config **/

import {
  ToastOptions,
  createToastStack,
  createToastNotification,
  ToastResult,
} from '../components/toast/toast-util';

export function ToastController(
  config: ToastOptions = { position: 'top-center' }
): ToastResult {
  const toastContainer = createToastStack(config);

  function trigger(opts: ToastOptions) {
    createToastNotification(opts, toastContainer, config);
  }

  return { trigger };
}
