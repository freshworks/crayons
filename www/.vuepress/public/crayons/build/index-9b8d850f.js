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
    Array.from(element.children).forEach((el) => {
      if (isFocusable(el)) {
        focusableElements.push(el);
      }
      else if (el.nodeName === 'SLOT') {
        el.assignedElements({ flatten: true }).forEach((assignedEl) => getAllNodes(assignedEl, false));
      }
      else if (el.children.length > 0 || el.shadowRoot) {
        if (!(parseInt(el.getAttribute('tabindex')) < 0)) {
          getAllNodes(el, false);
        }
      }
    });
  };
  getAllNodes(node);
  return focusableElements;
};
const isFocusable = (element) => {
  if (parseInt(element.getAttribute('tabindex')) < 0) {
    return false;
  }
  if (element.disabled) {
    return false;
  }
  const boundingRect = element.getBoundingClientRect();
  if (boundingRect.bottom === 0 &&
    boundingRect.top === 0 &&
    boundingRect.left === 0 &&
    boundingRect.right === 0 &&
    boundingRect.height === 0 &&
    boundingRect.width === 0 &&
    boundingRect.x === 0 &&
    boundingRect.y === 0) {
    return false;
  }
  if (element.style.display === 'none' ||
    element.style.visibility === 'hidden' ||
    element.style.opacity === 0) {
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
const addRTL = (host) => {
  if (document.documentElement.dir === 'rtl') {
    host.setAttribute('dir', 'rtl');
  }
  else {
    host.setAttribute('dir', 'ltr');
  }
};
const popperModifierRTL = {
  name: 'popperModifierRTL',
  enabled: true,
  phase: 'beforeRead',
  fn({ state }) {
    var _a, _b, _c, _d, _e, _f;
    if (document.documentElement.dir === 'rtl' ||
      ((_a = state.modifiersData['popperModifierRTL#persistent']) === null || _a === void 0 ? void 0 : _a._previousDirection)) {
      if (!((_b = state.modifiersData['popperModifierRTL#persistent']) === null || _b === void 0 ? void 0 : _b._skip) ||
        ((_c = state.modifiersData['popperModifierRTL#persistent']) === null || _c === void 0 ? void 0 : _c._previousDirection) !== document.documentElement.dir) {
        const replaceMap = {
          end: 'start',
          start: 'end',
          left: 'right',
          right: 'left',
        };
        const rtlPlacement = state.placement.replace(/right|left|start|end/, (matched) => replaceMap[matched]);
        state.placement = rtlPlacement;
        if ((_d = state.options) === null || _d === void 0 ? void 0 : _d.placement) {
          state.options.placement = rtlPlacement;
        }
        if ((_e = state.options) === null || _e === void 0 ? void 0 : _e.modifiers) {
          const fallbackPlacementModIndex = state.options.modifiers.findIndex((mod) => {
            return mod.name === 'flip';
          });
          const fallbackPlacementOrderModIndex = state.orderedModifiers.findIndex((mod) => {
            return mod.name === 'flip';
          });
          if (state.options.modifiers[fallbackPlacementModIndex]) {
            const fallbackPlacements = [];
            (_f = state.options.modifiers[fallbackPlacementModIndex].options.fallbackPlacements) === null || _f === void 0 ? void 0 : _f.forEach((fp) => {
              fallbackPlacements.push(fp.replace(/right|left|start|end/, (matched) => replaceMap[matched]));
            });
            state.options.modifiers[fallbackPlacementModIndex].options.fallbackPlacements = fallbackPlacements;
            state.orderedModifiers[fallbackPlacementOrderModIndex].options.fallbackPlacements = fallbackPlacements;
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
const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export { addRTL as a, hasSlot as b, cloneNodeWithEvents as c, debounce as d, cyclicDecrement as e, findCheckedOption as f, getFocusableChildren as g, handleKeyDown as h, cyclicIncrement as i, isEqual as j, popperModifierRTL as p, renderHiddenField as r, throttle as t, watchForOptions as w };
