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
const handleKeyDown = (handler) => (e) => {
  const event = e;
  const key = event.key || event.keyCode;
  if (key === 'Enter' ||
    key === 13 ||
    key === 32 ||
    ['Spacebar', ' '].indexOf(key) >= 0) {
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
const isFocusable = (element) => {
  if (element.tabIndex < 0) {
    return false;
  }
  if (element.disabled) {
    return false;
  }
  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel != 'ignore';
    case 'INPUT':
      return element.type != 'hidden';
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

export { hasSlot as a, findCheckedOption as f, handleKeyDown as h, isFocusable as i, renderHiddenField as r, throttle as t, watchForOptions as w };
