export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
  );
}
/* tslint:enable */

export const watchForOptions = <T extends HTMLElement>(
  containerEl: HTMLElement,
  tagName: string,
  onChange: (el: T | undefined) => void
) => {
  const mutation = new MutationObserver((mutationList) => {
    onChange(getSelectedOption<T>(mutationList, tagName));
  });
  mutation.observe(containerEl, {
    childList: true,
    subtree: true,
  });
  return mutation;
};

const getSelectedOption = <T extends HTMLElement>(
  mutationList: MutationRecord[],
  tagName: string
): T | undefined => {
  let newOption: HTMLElement | undefined;
  mutationList.forEach((mut) => {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < mut.addedNodes.length; i++) {
      newOption = findCheckedOption(mut.addedNodes[i], tagName) || newOption;
    }
  });
  return newOption as any;
};

export const findCheckedOption = (el: any, tagName: string) => {
  if (el.nodeType !== 1) {
    return undefined;
  }
  const options: HTMLElement[] =
    el.tagName === tagName.toUpperCase()
      ? [el]
      : Array.from(el.querySelectorAll(tagName));

  return options.find((o: any) => o.checked === true);
};

export const renderHiddenField = (
  container: HTMLElement,
  name: string,
  value: string | null
) => {
  let input: HTMLInputElement = container.querySelector('input.hidden-input');
  if (!input) {
    input = container.ownerDocument.createElement('input');
    input.type = 'hidden';
    input.classList.add('hidden-input');
    container.appendChild(input);
  }
  input.name = name;
  input.value = value || '';
};
type handlerArg = (event?: KeyboardEvent) => void;

// handle jsx-a11y/click-events-have-key-events
export const handleKeyDown =
  (handler: handlerArg, skipSpace = false) =>
  (e: KeyboardEvent): void => {
    const event = e;
    const key = event.key || event.keyCode;

    if (
      key === 'Enter' ||
      key === 13 ||
      key === 32 ||
      (!skipSpace && ['Spacebar', ' '].indexOf(key as string) >= 0)
    ) {
      // In IE11 and lower, event.key will equal "Spacebar" instead of ' '

      // Default behavior is prevented to prevent the page to scroll when "space" is pressed
      event.preventDefault();
      handler(event);
    }
  };

export const throttle = (func, context, delay) => {
  let lastExecutedAt;
  return (...args) => {
    if (!lastExecutedAt || Date.now() - lastExecutedAt >= delay) {
      func.apply(context, args);
      lastExecutedAt = Date.now();
    }
  };
};

export const getFocusableChildren = (node: HTMLElement) => {
  let focusableElements = [];
  const getAllNodes = (element: any, root = true) => {
    root && (focusableElements = []);
    element = element.shadowRoot ? element.shadowRoot : element;
    element.querySelectorAll('*').forEach((el: any) => {
      if (isFocusable(el)) {
        focusableElements.push(el);
      } else if (el.nodeName === 'SLOT') {
        el.assignedElements({ flatten: true }).forEach(
          (assignedEl: HTMLElement) => getAllNodes(assignedEl, false)
        );
      } else if (el.shadowRoot) {
        getAllNodes(el, false);
      }
    });
  };
  getAllNodes(node);
  return focusableElements;
};

export const isFocusable = (element) => {
  if (element.tabIndex < 0) {
    return false;
  }
  if (element.disabled) {
    return false;
  }
  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel !== 'ignore';
    case 'INPUT':
      return element.type !== 'hidden';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

export const hasSlot = (el: HTMLElement, name?: string) => {
  // Look for a named slot
  if (name) {
    return el.querySelector(`:scope > [slot="${name}"]`) !== null;
  }

  // Look for a default slot
  const nodeList = Array.from(el.childNodes);
  return nodeList.some((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent!.trim() !== '') {
      return true;
    }

    if (node.nodeType === node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (!el.hasAttribute('slot')) {
        return true;
      }
    }

    return false;
  });
};

export const debounce = (fn, context, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, timeout);
  };
};

// deep clone the node along with its attached events.
export function cloneNodeWithEvents(
  oElm: Node,
  shouldCopyDeep = false,
  shouldCopyEvents = false
): Node {
  let aInputSubElements, aNodeCopySubElements, n1, n2;

  const allEvents = [
    'onabort',
    'onbeforecopy',
    'onbeforecut',
    'onbeforepaste',
    'onblur',
    'onchange',
    'onclick',
    'oncontextmenu',
    'oncopy',
    'ondblclick',
    'ondrag',
    'ondragend',
    'ondragenter',
    'ondragleave',
    'ondragover',
    'ondragstart',
    'ondrop',
    'onerror',
    'onfocus',
    'oninput',
    'oninvalid',
    'onkeydown',
    'onkeypress',
    'onkeyup',
    'onload',
    'onmousedown',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onmouseup',
    'onmousewheel',
    'onpaste',
    'onreset',
    'onresize',
    'onscroll',
    'onsearch',
    'onselect',
    'onselectstart',
    'onsubmit',
    'onunload',
  ];

  // deep clone node
  const eNodeCopy = oElm.cloneNode(shouldCopyDeep);

  // copy events
  if (shouldCopyEvents) {
    aInputSubElements = (oElm as HTMLElement).getElementsByTagName('*');
    aNodeCopySubElements = (eNodeCopy as HTMLElement).getElementsByTagName('*');

    // The node root
    for (n2 = 0; n2 < allEvents.length; n2++) {
      if (oElm[allEvents[n2]]) {
        eNodeCopy[allEvents[n2]] = oElm[allEvents[n2]];
      }
    }

    // Node descendants copy events
    for (n1 = 0; n1 < aInputSubElements.length; n1++) {
      for (n2 = 0; n2 < allEvents.length; n2++) {
        if (aInputSubElements[n1][allEvents[n2]]) {
          aNodeCopySubElements[n1][allEvents[n2]] =
            aInputSubElements[n1][allEvents[n2]];
        }
      }
    }
  }

  return eNodeCopy;
}

export const cyclicIncrement = (value: number, maxValue: number): number => {
  value++;
  return value > maxValue ? 0 : value;
};

export const cyclicDecrement = (value: number, maxValue: number): number => {
  value--;
  return value < 0 ? maxValue : value;
};
