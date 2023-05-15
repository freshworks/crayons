import { i as h } from './index-44c267ce.js';

const FieldControl = (props, children) => {
  const hasLabel = !!props.label;
  const hasHintText = props.hintText ? true : props.hasHintTextSlot;
  const hasErrorText = props.errorText ? true : props.hasErrorTextSlot;
  const hasWarningText = props.warningText ? true : props.hasWarningTextSlot;
  const showHintText = props.state === 'normal' ? true : false;
  const showErrorText = props.state === 'error' ? true : false;
  const showWarningText = props.state === 'warning' ? true : false;
  return (h("div", { class: {
      'field-control': true,
    } },
    hasLabel && (h("label", { id: props.labelId, class: { 'field-control-label': true, 'required': props.required }, htmlFor: props.inputId, "aria-hidden": hasLabel ? 'false' : 'true' }, props.label)),
    children,
    showHintText && hasHintText && (h("div", { id: props.hintTextId, class: 'field-control-hint-text', "aria-hidden": hasHintText ? 'false' : 'true' },
      h("slot", { name: 'hint-text' }, props.hintText))),
    showErrorText && hasErrorText && (h("div", { id: props.errorTextId, class: 'field-control-error-text', "aria-hidden": hasErrorText ? 'false' : 'true' },
      h("slot", { name: 'error-text' }, props.errorText))),
    showWarningText && hasWarningText && (h("div", { id: props.warningTextId, class: 'field-control-warning-text', "aria-hidden": hasWarningText ? 'false' : 'true' },
      h("slot", { name: 'warning-text' }, props.warningText)))));
};

export { FieldControl as F };
