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
  (handler: handlerArg) =>
  (e: KeyboardEvent): void => {
    const event = e;
    const key = event.key || event.keyCode;

    if (
      key === 'Enter' ||
      key === 13 ||
      key === 32 ||
      ['Spacebar', ' '].indexOf(key as string) >= 0
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
