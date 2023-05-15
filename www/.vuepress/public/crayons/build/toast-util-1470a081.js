import { c as cloneNodeWithEvents } from './index-9d2a65d7.js';

function createToastStack(config) {
  if (!Object.prototype.hasOwnProperty.call(window, 'fwRemoveToast'))
    window.addEventListener('fwRemoveToast', removeChildToast);
  const existingToastStack = document.querySelector(`.fw-toast-stack.${config.position}`);
  let toastContainer;
  if (existingToastStack) {
    toastContainer = existingToastStack;
  }
  else {
    toastContainer = document.createElement('div');
    toastContainer.className = `fw-toast-stack ${config.position}`;
    toastContainer.style.cssText = `position: fixed;
      z-index: 950;
      top: 10px;
      ${getStylePosition(config.position)}
      background-color: $color-milk;
      max-width: 100%;
      max-height: 100%;`;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}
function createToastNotification(opts = {}, containerElem, defaultOpts) {
  const props = getProps(opts, defaultOpts);
  let toastElem;
  if (opts.contentref) {
    const ref = document.querySelector(opts.contentref);
    //toastElem = ref.cloneNode(true);
    // since we are cloning nodes, the events don't get cloned by default. we have to copy the events manually
    toastElem = cloneNodeWithEvents(ref, true, true);
    props.content = '';
  }
  else {
    toastElem = document.createElement('fw-toast-message');
  }
  Object.entries(props).map(([key, val]) => {
    if (val)
      toastElem.setAttribute(kebabCase(key), val);
  });
  containerElem.appendChild(toastElem);
}
function getStylePosition(position) {
  switch (position) {
    case 'top-left':
      return 'left: 10px;';
    case 'top-right':
      return 'right: 10px;';
    case 'top-center':
      return 'left: calc(50% - 200px);';
  }
}
function removeChildToast(event) {
  const target = event.target;
  document.querySelectorAll('.fw-toast-stack').forEach((node) => {
    if (node.contains(target)) {
      node.removeChild(target);
    }
  });
}
function getProps(opts = {}, defaultOpts) {
  var _a, _b, _c, _d, _e, _f;
  const props = Object.assign({}, {
    timeout: (_a = opts.timeout) !== null && _a !== void 0 ? _a : defaultOpts.timeout,
    type: (_b = opts.type) !== null && _b !== void 0 ? _b : defaultOpts.type,
    content: (_c = opts.content) !== null && _c !== void 0 ? _c : defaultOpts.content,
    actionLinkText: (_d = opts.actionLinkText) !== null && _d !== void 0 ? _d : defaultOpts.actionLinkText,
    sticky: (_e = opts.sticky) !== null && _e !== void 0 ? _e : defaultOpts.sticky,
    pauseOnHover: (_f = opts.pauseOnHover) !== null && _f !== void 0 ? _f : defaultOpts.pauseOnHover,
    open: true,
  });
  return props;
}
function kebabCase(string) {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export { createToastNotification as a, createToastStack as c };
