import { cloneNodeWithEvents } from '../../utils';
export interface ToastOptions {
  /**
   * The Content of the action link
   */
  actionLinkText?: string;
  /**
   * The content to be displayed in toast
   */
  content?: string;

  /**
   * The document selector for the toast-message component
   * which can be used to embed custom html content in the toast message
   */
  contentref?: string;

  /**
   * Pause the toast from hiding on mouse hover
   */
  pauseOnHover?: boolean;
  /**
   * won't close automatically
   */
  sticky?: boolean;
  /**
   * Time duration of the toast visibility
   */
  timeout?: number;
  /**
   * Type of the toast - success,failure, warning, inprogress
   */
  type?: 'success' | 'error' | 'warning' | 'inprogress';

  /**
   *  position of the toast notification in screen
   */
  position?: 'top-center' | 'top-left' | 'top-right';
}
export type ToastResult = {
  trigger: any;
};

export function createToastStack(config: ToastOptions): HTMLElement {
  if (!Object.prototype.hasOwnProperty.call(window, 'fwRemoveToast'))
    window.addEventListener('fwRemoveToast', removeChildToast);

  const existingToastStack = document.querySelector(
    `.fw-toast-stack.${config.position}`
  ) as HTMLElement;

  let toastContainer: HTMLElement | null;

  if (existingToastStack) {
    toastContainer = existingToastStack;
  } else {
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

export function createToastNotification(
  opts: ToastOptions = {},
  containerElem: HTMLElement,
  defaultOpts: ToastOptions
): void {
  const props = getProps(opts, defaultOpts);
  let toastElem;

  if (opts.contentref) {
    const ref = document.querySelector(opts.contentref);
    //toastElem = ref.cloneNode(true);
    // since we are cloning nodes, the events don't get cloned by default. we have to copy the events manually
    toastElem = cloneNodeWithEvents(ref, true, true);
    props.content = '';
  } else {
    toastElem = document.createElement('fw-toast-message');
  }
  Object.entries(props).map(([key, val]) => {
    if (val) toastElem.setAttribute(kebabCase(key), val as string);
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

function getProps(opts: ToastOptions = {}, defaultOpts: ToastOptions) {
  const props = Object.assign(
    {},
    {
      timeout: opts.timeout ?? defaultOpts.timeout,
      type: opts.type ?? defaultOpts.type,
      content: opts.content ?? defaultOpts.content,
      actionLinkText: opts.actionLinkText ?? defaultOpts.actionLinkText,
      sticky: opts.sticky ?? defaultOpts.sticky,
      pauseOnHover: opts.pauseOnHover ?? defaultOpts.pauseOnHover,
      open: true,
    }
  );

  return props;
}

function kebabCase(string) {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
