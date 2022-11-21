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
  value: string | null,
  files: FileList | null = null
) => {
  let input: HTMLInputElement = container.querySelector('input.hidden-input');
  if (!input) {
    input = container.ownerDocument.createElement('input');
    if (files) {
      input.style.display = 'none';
      input.type = 'file';
    } else {
      input.type = 'hidden';
    }
    input.classList.add('hidden-input');
    container.appendChild(input);
  }
  input.name = name;
  if (files) {
    input.files = files;
  } else {
    input.value = value || '';
  }
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
    Array.from(element.children).forEach((el: any) => {
      if (isFocusable(el)) {
        focusableElements.push(el);
      } else if (el.nodeName === 'SLOT') {
        el.assignedElements({ flatten: true }).forEach(
          (assignedEl: HTMLElement) => getAllNodes(assignedEl, false)
        );
      } else if (el.children.length > 0 || el.shadowRoot) {
        if (!(parseInt(el.getAttribute('tabindex')) < 0)) {
          getAllNodes(el, false);
        }
      }
    });
  };
  getAllNodes(node);
  return focusableElements;
};

export const isFocusable = (element) => {
  if (parseInt(element.getAttribute('tabindex')) < 0) {
    return false;
  }
  if (element.disabled) {
    return false;
  }
  const boundingRect = element.getBoundingClientRect();
  if (
    boundingRect.bottom === 0 &&
    boundingRect.top === 0 &&
    boundingRect.left === 0 &&
    boundingRect.right === 0 &&
    boundingRect.height === 0 &&
    boundingRect.width === 0 &&
    boundingRect.x === 0 &&
    boundingRect.y === 0
  ) {
    return false;
  }
  if (
    element.style.display === 'none' ||
    element.style.visibility === 'hidden' ||
    element.style.opacity === 0
  ) {
    return false;
  }
  if (element.getAttribute('role') === 'button') {
    return true;
  }
  // All crayons input components have this function.
  if (element.setFocus) {
    return true;
  }
  // To identify other native focus elements.
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

export const isEqual = (a, b) => {
  if (Array.isArray(a)) {
    return isArrayEquals(a, b);
  } else {
    return a === b;
  }
};

export const isArrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

export const addRTL = (host) => {
  if (document.documentElement.dir === 'rtl') {
    host.setAttribute('dir', 'rtl');
  } else {
    host.setAttribute('dir', 'ltr');
  }
};

export const popperModifierRTL = {
  name: 'popperModifierRTL',
  enabled: true,
  phase: 'beforeRead',
  fn({ state }) {
    if (
      document.documentElement.dir === 'rtl' ||
      state.modifiersData['popperModifierRTL#persistent']?._previousDirection
    ) {
      if (
        !state.modifiersData['popperModifierRTL#persistent']?._skip ||
        state.modifiersData['popperModifierRTL#persistent']
          ?._previousDirection !== document.documentElement.dir
      ) {
        const replaceMap = {
          end: 'start',
          start: 'end',
          left: 'right',
          right: 'left',
        };
        const rtlPlacement = state.placement.replace(
          /right|left|start|end/,
          (matched) => replaceMap[matched]
        );
        state.placement = rtlPlacement;
        if (state.options?.placement) {
          state.options.placement = rtlPlacement;
        }
        if (state.options?.modifiers) {
          const fallbackPlacementModIndex = state.options.modifiers.findIndex(
            (mod) => {
              return mod.name === 'flip';
            }
          );
          const fallbackPlacementOrderModIndex =
            state.orderedModifiers.findIndex((mod) => {
              return mod.name === 'flip';
            });
          if (state.options.modifiers[fallbackPlacementModIndex]) {
            const fallbackPlacements = [];
            state.options.modifiers[
              fallbackPlacementModIndex
            ].options.fallbackPlacements?.forEach((fp: any) => {
              fallbackPlacements.push(
                fp.replace(
                  /right|left|start|end/,
                  (matched) => replaceMap[matched]
                )
              );
            });
            state.options.modifiers[
              fallbackPlacementModIndex
            ].options.fallbackPlacements = fallbackPlacements;
            state.orderedModifiers[
              fallbackPlacementOrderModIndex
            ].options.fallbackPlacements = fallbackPlacements;
          }
        }
        if (!state.modifiersData['popperModifierRTL#persistent']) {
          state.modifiersData['popperModifierRTL#persistent'] = {};
        }
        state.modifiersData['popperModifierRTL#persistent']._skip = true;
        state.modifiersData['popperModifierRTL#persistent']._previousDirection =
          document.documentElement.dir;
      }
    }
  },
};
