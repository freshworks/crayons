export const isFormParticipantElement = (
  element: HTMLElement
): element is HTMLInputElement | HTMLTextAreaElement =>
  !!element &&
  ['input', 'textarea', 'select'].includes(element.tagName.toLowerCase());
export const isInputElement = (
  element: HTMLElement
): element is HTMLInputElement =>
  !!element && element.tagName.toLowerCase() === 'input';
export const isCheckboxType = ({
  type,
}: HTMLInputElement | HTMLTextAreaElement) => type === 'checkbox';
export const isNumberType = ({
  type,
}: HTMLInputElement | HTMLTextAreaElement) =>
  ['number', 'range'].includes(type);
export const isDateType = ({ type }: HTMLInputElement | HTMLTextAreaElement) =>
  ['date', 'datetime-local', 'month', 'time', 'week'].includes(type);

/** TODO: Date gets funky here, because pickers are in UTC instead of local. wontfix, just document it */
export const copyValidityState = (
  element: HTMLInputElement | HTMLTextAreaElement
): ValidityState => {
  if (!element || (element && !element.validity)) return;

  const { validity } = element;

  let state: ValidityState = {} as any;
  for (const key in validity) {
    state = { ...state, [key]: validity[key] };
  }

  return state;
};

/** TODO: Date gets funky here, because pickers are in UTC instead of local. wontfix, just document it */
export const getElementValue = (element: HTMLElement): any => {
  if (isFormParticipantElement(element)) {
    let value: any = element.value;

    if (isInputElement(element)) {
      if (isNumberType(element)) {
        value = (element as HTMLInputElement).valueAsNumber;
      } else if (isCheckboxType(element)) {
        value = (element as HTMLInputElement).checked;
      }
      // } else if (isDateType(element)) {
      //     value = (element as HTMLInputElement).valueAsDate;
      // }
    }

    return value;
  }
};
