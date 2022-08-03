export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
  );
}
type handlerArg = (event?: KeyboardEvent) => void;
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

export const debounce = (fn, context, timeout = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, timeout);
  };
};
