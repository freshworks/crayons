/** use this file for exposing global functions and ways to set global config **/

import {
  ToastOptions,
  createToastStack,
  createToastNotification,
  ToastResult,
} from '../components/toast/toast-util';

import { setTranslations, fetchTranslations } from './Translation';

export function ToastController(config: ToastOptions): ToastResult {
  const toastContainer = createToastStack(config);

  function trigger(opts: ToastOptions) {
    createToastNotification(opts, toastContainer, config);
  }

  return { trigger };
}

export const TranslationController = {
  setTranslations,
  fetchTranslations,
};
