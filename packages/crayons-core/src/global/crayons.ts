/** use this file for exposing global functions and ways to set global config **/

import {
  ToastOptions,
  createToastStack,
  createToastNotification,
  ToastResult,
} from '../components/toast/toast-util';

import {
  createProgressLoaderContainer,
  ProgressLoaderMethods,
  ProgressLoaderOptions,
} from '../components/progress-loader/progress-loader-util';

export function ToastController(
  config: ToastOptions = { position: 'top-center' }
): ToastResult {
  const toastContainer = createToastStack(config);

  function trigger(opts: ToastOptions) {
    createToastNotification(opts, toastContainer, config);
  }

  return { trigger };
}

export function ProgressLoaderController(
  config: ProgressLoaderOptions
): ProgressLoaderMethods {
  return createProgressLoaderContainer(config);
}

export {
  registerIconLibrary,
  unregisterIconLibrary,
} from '../components/icon/library.icon.utils';

export const CRAYONS_ICONS_ASSET_PATH =
  'https://cdn.jsdelivr.net/npm/@freshworks/crayons-icon/icons';
