function format(first, middle, last) {
  return ((first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : ''));
}
/* tslint:enable */
const watchForOptions = (containerEl, tagName, onChange) => {
  const mutation = new MutationObserver((mutationList) => {
    onChange(getSelectedOption(mutationList, tagName));
  });
  mutation.observe(containerEl, {
    childList: true,
    subtree: true,
  });
  return mutation;
};
const getSelectedOption = (mutationList, tagName) => {
  let newOption;
  mutationList.forEach((mut) => {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < mut.addedNodes.length; i++) {
      newOption = findCheckedOption(mut.addedNodes[i], tagName) || newOption;
    }
  });
  return newOption;
};
const findCheckedOption = (el, tagName) => {
  if (el.nodeType !== 1) {
    return undefined;
  }
  const options = el.tagName === tagName.toUpperCase()
    ? [el]
    : Array.from(el.querySelectorAll(tagName));
  return options.find((o) => o.checked === true);
};
const renderHiddenField = (container, name, value) => {
  let input = container.querySelector('input.hidden-input');
  if (!input) {
    input = container.ownerDocument.createElement('input');
    input.type = 'hidden';
    input.classList.add('hidden-input');
    container.appendChild(input);
  }
  input.name = name;
  input.value = value || '';
};
// handle jsx-a11y/click-events-have-key-events
const handleKeyDown = (handler, skipSpace = false) => (e) => {
  const event = e;
  const key = event.key || event.keyCode;
  if (key === 'Enter' ||
    key === 13 ||
    key === 32 ||
    (!skipSpace && ['Spacebar', ' '].indexOf(key) >= 0)) {
    // In IE11 and lower, event.key will equal "Spacebar" instead of ' '
    // Default behavior is prevented to prevent the page to scroll when "space" is pressed
    event.preventDefault();
    handler(event);
  }
};
const throttle = (func, context, delay) => {
  let lastExecutedAt;
  return (...args) => {
    if (!lastExecutedAt || Date.now() - lastExecutedAt >= delay) {
      func.apply(context, args);
      lastExecutedAt = Date.now();
    }
  };
};
const getFocusableChildren = (node) => {
  let focusableElements = [];
  const getAllNodes = (element, root = true) => {
    root && (focusableElements = []);
    element = element.shadowRoot ? element.shadowRoot : element;
    element.querySelectorAll('*').forEach((el) => {
      if (isFocusable(el)) {
        focusableElements.push(el);
      }
      else if (el.nodeName === 'SLOT') {
        el.assignedElements({ flatten: true }).forEach((assignedEl) => getAllNodes(assignedEl, false));
      }
      else if (el.shadowRoot) {
        getAllNodes(el, false);
      }
    });
  };
  getAllNodes(node);
  return focusableElements;
};
const isFocusable = (element) => {
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
const hasSlot = (el, name) => {
  // Look for a named slot
  if (name) {
    return el.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  // Look for a default slot
  const nodeList = Array.from(el.childNodes);
  return nodeList.some((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== '') {
      return true;
    }
    if (node.nodeType === node.ELEMENT_NODE) {
      const el = node;
      if (!el.hasAttribute('slot')) {
        return true;
      }
    }
    return false;
  });
};
const debounce = (fn, context, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, timeout);
  };
};
// deep clone the node along with its attached events.
function cloneNodeWithEvents(oElm, shouldCopyDeep = false, shouldCopyEvents = false) {
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
    aInputSubElements = oElm.getElementsByTagName('*');
    aNodeCopySubElements = eNodeCopy.getElementsByTagName('*');
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
const cyclicIncrement = (value, maxValue) => {
  value++;
  return value > maxValue ? 0 : value;
};
const cyclicDecrement = (value, maxValue) => {
  value--;
  return value < 0 ? maxValue : value;
};
const isEqual = (a, b) => {
  if (Array.isArray(a)) {
    return isArrayEquals(a, b);
  }
  else {
    return a === b;
  }
};
const isArrayEquals = (a, b) => {
  return (Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]));
};

export { hasSlot as a, cyclicDecrement as b, cloneNodeWithEvents as c, debounce as d, cyclicIncrement as e, findCheckedOption as f, getFocusableChildren as g, handleKeyDown as h, isFocusable as i, isEqual as j, renderHiddenField as r, throttle as t, watchForOptions as w };
