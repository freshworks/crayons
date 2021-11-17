/** use this file for exposing global functions and ways to set global config **/

import {
  ToastOptions,
  createToastStack,
  createToastNotification,
  ToastResult,
} from '../components/toast/toast-util';
import {
  setTranslations,
  i18n,
  getLocale,
  fetchDefaultTranslations,
} from './Translation';

export function ToastController(config: ToastOptions): ToastResult {
  const toastContainer = createToastStack(config);

  function trigger(opts: ToastOptions) {
    createToastNotification(opts, toastContainer, config);
  }

  return { trigger };
}

export const TranslationController = {
  setTranslations,
  i18n,
};

export default async function (): Promise<void> {
  console.log('GET Default Translations');

  fetchDefaultTranslations(getLocale());
}
