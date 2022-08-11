import { r as registerInstance, i as h, j as getElement } from './index-44c267ce.js';
import { b as hasSlot } from './index-a4741a9c.js';
import { T as TranslationController } from './Translation-c1d22902.js';

const formControlCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.error{color:#d72d30;font-weight:400;font-size:12px;line-height:20px;-webkit-padding-before:4px;padding-block-start:4px;-webkit-padding-start:2px;padding-inline-start:2px}label{font-size:12px;color:#475867;font-weight:600;-webkit-margin-after:4px;margin-block-end:4px;-webkit-padding-start:2px;padding-inline-start:2px;display:block}label.required::after{content:\"*\";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}.hint{font-weight:400;font-size:12px;color:#475867;line-height:20px;-webkit-padding-before:4px;padding-block-start:4px;-webkit-padding-start:2px;padding-inline-start:2px}.form-control-container{margin-inline:0em;margin-block:1em}";

const NATIVE_CONTROLS = ['input', 'select', 'textarea'];
let FormControl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'TEXT';
    this.required = false;
    this.hint = '';
    this.placeholder = '';
    this.choices = [];
    /**
     * Additional props can be passed here for crayons components. Useful when rendering crayons components implicitly via form-control.
     */
    this.fieldProps = {};
    this.touched = false;
    this.error = '';
    this.hasSlot = false;
  }
  renderControl() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    if (this.hasSlot)
      return null;
    if (!this.name)
      return null;
    let cmp;
    switch (this.type) {
      case 'TEXT':
      case 'NUMBER':
      case 'DECIMAL':
      case 'EMAIL':
      case 'TEL':
      case 'URL': {
        const type = this.type === 'DECIMAL' ? 'number' : (_a = this.type) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const componentProps = Object.assign(Object.assign(Object.assign(Object.assign({}, this.fieldProps), { name: this.name, placeholder: this.placeholder, label: this.label, required: this.required, type: type }), (_b = this.controlProps) === null || _b === void 0 ? void 0 : _b.inputProps(this.name, type)), { state: (this.touched && this.error && 'error') || 'normal', ['hint-text']: this.hint, ['error-text']: TranslationController.t(this.error, {
            field: this.label || this.name,
          }) });
        cmp = (h("fw-input", Object.assign({}, componentProps, { ref: (el) => (this.crayonsControlRef = el) })));
        break;
      }
      case 'PARAGRAPH':
        {
          const componentProps = Object.assign(Object.assign(Object.assign(Object.assign({}, this.fieldProps), { name: this.name, placeholder: this.placeholder, label: this.label, required: this.required }), (_c = this.controlProps) === null || _c === void 0 ? void 0 : _c.inputProps(this.name, (_d = this.type) === null || _d === void 0 ? void 0 : _d.toLowerCase())), { state: (this.touched && this.error && 'error') || 'normal', ['hint-text']: this.hint, ['error-text']: TranslationController.t(this.error, {
              field: this.label || this.name,
            }) });
          cmp = (h("fw-textarea", Object.assign({}, componentProps, { ref: (el) => (this.crayonsControlRef = el) })));
        }
        break;
      case 'DATE':
        {
          const componentProps = Object.assign(Object.assign(Object.assign(Object.assign({}, this.fieldProps), { name: this.name, placeholder: this.placeholder, label: this.label, required: this.required }), (_e = this.controlProps) === null || _e === void 0 ? void 0 : _e.inputProps(this.name, (_f = this.type) === null || _f === void 0 ? void 0 : _f.toLowerCase())), { state: (this.touched && this.error && 'error') || 'normal', ['hint-text']: this.hint, ['error-text']: TranslationController.t(this.error, {
              field: this.label || this.name,
            }) });
          cmp = (h("fw-datepicker", Object.assign({}, componentProps, { ref: (el) => (this.crayonsControlRef = el) })));
        }
        break;
      case 'CHECKBOX':
        {
          const componentProps = Object.assign(Object.assign(Object.assign(Object.assign({}, this.fieldProps), { name: this.name, placeholder: this.placeholder, label: '', required: this.required }), (_g = this.controlProps) === null || _g === void 0 ? void 0 : _g.checkboxProps(this.name, (_h = this.type) === null || _h === void 0 ? void 0 : _h.toLowerCase())), { state: (this.touched && this.error && 'error') || 'normal', ['hint-text']: this.hint, ['error-text']: TranslationController.t(this.error, {
              field: this.label || this.name,
            }) });
          cmp = (h("fw-checkbox", Object.assign({}, componentProps, { ref: (el) => (this.crayonsControlRef = el) }), this.label));
        }
        break;
      case 'RADIO':
        {
          const controlProps = (_j = this.controlProps) === null || _j === void 0 ? void 0 : _j.radioProps(this.name, (_k = this.type) === null || _k === void 0 ? void 0 : _k.toLowerCase());
          const componentProps = Object.assign(Object.assign(Object.assign({}, this.fieldProps), { 'name': this.name, 'placeholder': this.placeholder, 'label': this.label, 'required': this.required, 'allow-empty': true, 'state': (this.touched && this.error && 'error') || 'normal', ['hint-text']: this.hint, ['error-text']: TranslationController.t(this.error, {
              field: this.label || this.name,
            }) }), controlProps);
          cmp = (h("fw-radio-group", Object.assign({}, componentProps, { ref: (el) => (this.crayonsControlRef = el) }), (_l = this.choices) === null || _l === void 0 ? void 0 : _l.map((ch) => {
            const val = ch[componentProps.optionValuePath] || ch.value;
            const label = ch[componentProps.optionLabelPath] || ch.value;
            return (h("fw-radio", { name: this.name, value: val, state: this.touched && this.error ? 'error' : 'normal' }, label));
          })));
        }
        break;
      case 'DROPDOWN':
      case 'MULTI_SELECT':
        {
          const controlProps = (_m = this.controlProps) === null || _m === void 0 ? void 0 : _m.selectProps(this.name, (_o = this.type) === null || _o === void 0 ? void 0 : _o.toLowerCase());
          let componentProps = Object.assign(Object.assign({}, this.fieldProps), { name: this.name, placeholder: this.placeholder, label: this.label, required: this.required, multiple: this.type === 'MULTI_SELECT', state: (this.touched && this.error && 'error') || 'normal', ['hint-text']: this.hint, ['error-text']: TranslationController.t(this.error, {
              field: this.label || this.name,
            }) });
          componentProps = Object.assign(Object.assign(Object.assign({}, componentProps), controlProps), { options: this.choices });
          cmp = (h("fw-select", Object.assign({}, componentProps, { ref: (el) => (this.crayonsControlRef = el) })));
        }
        break;
      case 'RELATIONSHIP':
        {
          const controlProps = (_p = this.controlProps) === null || _p === void 0 ? void 0 : _p.selectProps(this.name, (_q = this.type) === null || _q === void 0 ? void 0 : _q.toLowerCase());
          const componentProps = Object.assign(Object.assign({}, this.fieldProps), { name: this.name, placeholder: this.placeholder, label: this.label, required: this.required, state: (this.touched && this.error && 'error') || 'normal', ['hint-text']: this.hint, ['error-text']: TranslationController.t(this.error, {
              field: this.label || this.name,
            }) });
          if (Array.isArray(controlProps.value) &&
            typeof controlProps.value[0] === 'object'
          // handle multi_select, select [{}] initialValues
          ) {
            componentProps.selectedOptions = controlProps.value;
          }
          if (((_r = componentProps.selectedOptions) === null || _r === void 0 ? void 0 : _r.length) > 0) {
            (_s = this.crayonsControlRef) === null || _s === void 0 ? void 0 : _s.setSelectedOptions(componentProps.selectedOptions);
          }
          else if (!controlProps.value) {
            (_t = this.crayonsControlRef) === null || _t === void 0 ? void 0 : _t.setSelectedOptions([]);
          }
          componentProps.noDataText =
            TranslationController.t('search.startTyping');
          cmp = (h("fw-select", Object.assign({}, componentProps, { ref: (el) => (this.crayonsControlRef = el) })));
        }
        break;
      case 'TIME':
        {
          const componentProps = Object.assign(Object.assign(Object.assign(Object.assign({}, this.fieldProps), { name: this.name, placeholder: this.placeholder, label: this.label, required: this.required }), (_u = this.controlProps) === null || _u === void 0 ? void 0 : _u.inputProps(this.name, (_v = this.type) === null || _v === void 0 ? void 0 : _v.toLowerCase())), { state: (this.touched && this.error && 'error') || 'normal', ['hint-text']: this.hint, ['error-text']: TranslationController.t(this.error, {
              field: this.label || this.name,
            }) });
          cmp = (h("fw-timepicker", Object.assign({}, componentProps, { ref: (el) => (this.crayonsControlRef = el) })));
        }
        break;
    }
    return cmp;
  }
  componentWillLoad() {
    this.handleSlotChange();
  }
  /**
   * Set Focus on the child
   */
  async setFocus() {
    var _a, _b, _c, _d;
    if (!this.hasSlot) {
      await ((_b = (_a = this.crayonsControlRef) === null || _a === void 0 ? void 0 : _a.setFocus) === null || _b === void 0 ? void 0 : _b.call(_a));
    }
    else {
      (_d = (_c = this.slotElement) === null || _c === void 0 ? void 0 : _c.focus) === null || _d === void 0 ? void 0 : _d.call(_c);
    }
  }
  handleSlotChange() {
    var _a;
    this.hasSlot = hasSlot(this.el);
    this.slotElement = (_a = [...this.el.querySelectorAll('*')].filter((el) => {
      var _a;
      return NATIVE_CONTROLS.includes((_a = el === null || el === void 0 ? void 0 : el.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase());
    })) === null || _a === void 0 ? void 0 : _a[0];
  }
  render() {
    return (h("div", { class: 'form-control-container' }, this.renderControl(), this.hasSlot && (h("label", { htmlFor: this.name, class: {
        label: true,
        required: this.required,
      } }, this.label)), h("slot", { onSlotchange: () => this.handleSlotChange() }), this.hasSlot && !(this.touched && this.error) && (h("div", { class: 'hint', id: `hint-${this.name}` }, this.hint)), this.hasSlot && this.touched && this.error && (h("div", { class: 'error', id: `error-${this.name}` }, TranslationController.t(this.error, {
      field: this.label || this.name,
    })))));
  }
  get el() { return getElement(this); }
};
FormControl.style = formControlCss;

export { FormControl as fw_form_control };
