export const config = new Map<string, any>();

export const registerIcons = (
  namespace: string,
  iconConfig = { path: '' }
): void => {
  config.set(`icon:${namespace}`, iconConfig);
};

declare global {
  interface Window {
    crayons: any;
  }
}

// export class ToastController {
//   position: string;
//   toastContainer: HTMLElement;
//   constructor(config: any) {
//     this.position = config.position || 'top-center';
//     this.toastContainer = document.createElement('div');
//     this.toastContainer.className = 'fw-toast-stack';
//     this.toastContainer.style.cssText = `position: fixed;
//     z-index: 950;
//     width: 28rem;
//     background-color: $color-milk;
//     max-width: 100%;
//     max-height: 100%;`;

//     const tstack = document.querySelector('.fw-toast-stack');
//     if (tstack) {
//       tstack.remove();
//     }
//     window.addEventListener('fwRemoveToast', this.removeChildToast, {
//       once: true,
//     });
//     document.body.appendChild(this.toastContainer);
//     if (!window.crayons) window.crayons = {};
//     window.crayons.toast = this;
//   }

//   trigger(opts: any) {
//     this.createToastNotification(opts);
//   }

//   private createToastNotification(opts: any) {
//     const options = this.setDefaults(opts);
//     const toastElem = document.createElement('fw-toast');

//     Object.entries(options).map(([key, val]) => {
//       toastElem.setAttribute(key, val as string);
//     });

//     this.toastContainer.appendChild(toastElem);
//   }

//   private setDefaults(opts: any | string) {
//     if (typeof opts === 'string') {
//       opts = {
//         content: opts,
//         timeout: 4000,
//         type: 'warning',
//       };
//     } else {
//       Object.assign(
//         {
//           timeout: 4000,
//           type: 'warning',
//         },
//         opts
//       );
//     }
//     return opts;
//   }

//   removeChildToast(event) {
//     console.log(event.target);
//     console.log(document.querySelector('.fw-toast-stack'));
//     document.querySelector('.fw-toast-stack').removeChild(event.target);
//   }
// }
type ToastResult = {
  trigger: any;
};
let counterId = 1;
export function ToastController(config): ToastResult {
  const position = config.position || 'top-center';

  if (!Object.prototype.hasOwnProperty.call(window, 'fwRemoveToast'))
    window.addEventListener('fwRemoveToast', removeChildToast);

  let toastContainer: HTMLElement | null;

  const existingToastStack = document.querySelector(
    `.fw-toast-stack.${position}`
  ) as HTMLElement;
  if (existingToastStack) {
    toastContainer = existingToastStack;
  } else {
    toastContainer = document.createElement('div');
    toastContainer.className = `fw-toast-stack ${position}`;
    toastContainer.id = 'toastId ' + counterId++;
    toastContainer.style.cssText = `position: fixed;
      z-index: 950;
      width: 400px;
      top: 10px;
      ${getStylePosition(position)}
      background-color: $color-milk;
      max-width: 100%;
      max-height: 100%;`;

    document.body.appendChild(toastContainer);
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

  function createToastNotification(opts) {
    const options = setDefaults(opts);
    const toastElem = document.createElement('fw-toast');
    toastElem.id = 'fff ' + counterId++;

    Object.entries(options).map(([key, val]) => {
      toastElem.setAttribute(key, val as string);
    });

    toastContainer.appendChild(toastElem);
  }

  function setDefaults(opts) {
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

  function removeChildToast(event) {
    const target = event.target;
    document.querySelectorAll('.fw-toast-stack').forEach((node) => {
      if (node.contains(target)) {
        node.removeChild(target);
      }
    });
  }

  function trigger(opts) {
    createToastNotification(opts);
  }

  return { trigger };
}
