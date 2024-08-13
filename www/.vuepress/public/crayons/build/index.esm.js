export { T as TranslationController, i as i18n } from './Translation-ce9b2559.js';
import { c as createToastStack, a as createToastNotification } from './toast-util-53cae873.js';
import { c as createProgressLoaderContainer } from './progress-loader-util-2abfc50e.js';
import { f as formatDate } from './format-date-util-cbbbafe3.js';
export { r as registerIconLibrary, u as unregisterIconLibrary } from './library.icon.utils-d80b0d21.js';
import './index-44c267ce.js';
import './index-9b8d850f.js';
import './_commonjsHelpers-2088bffa.js';

/** use this file for exposing global functions and ways to set global config **/
function ToastController(config = { position: 'top-center' }) {
  const toastContainer = createToastStack(config);
  function trigger(opts) {
    createToastNotification(opts, toastContainer, config);
  }
  return { trigger };
}
function ProgressLoaderController(config) {
  return createProgressLoaderContainer(config);
}
function DateFormatController({ date, locale, options, } = {
  date: new Date(),
  locale: [],
  options: {},
}) {
  return formatDate({ date, locale, options });
}

export { DateFormatController, ProgressLoaderController, ToastController };
