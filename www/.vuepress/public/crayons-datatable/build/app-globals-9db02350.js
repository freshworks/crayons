import { c as createToastStack, a as createToastNotification } from './toast-util-96968d8c.js';

/** use this file for exposing global functions and ways to set global config **/
function ToastController(config) {
  const toastContainer = createToastStack(config);
  function trigger(opts) {
    createToastNotification(opts, toastContainer, config);
  }
  return { trigger };
}
const globalFn$1 = () => { };

const globalFn = () => { };

const globalScripts = () => {
  globalFn();
  globalFn$1();
};

export { globalScripts as g };
