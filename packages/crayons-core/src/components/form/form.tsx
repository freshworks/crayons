import { Component, Prop, State, Element, h, Method } from '@stencil/core';
import {
  FormRenderProps,
  FormState,
  FormValues,
  FormConfig,
  FormComputedProps,
  FormHandlers,
  FormValidity,
  FormTouched,
  FormErrors,
  FormUtils,
} from './form-declaration';
import {
  getElementValue,
  validateYupSchema,
  prepareDataForValidation,
  yupToFormErrors,
} from './form-util';

@Component({
  tag: 'fw-form',
  shadow: true,
})
export class Form implements FormConfig {
  @Element() el!: any;
  private dirty = false;

  @Prop() initialValues?: any = {};
  //@Prop() renderer: (props: FormRenderProps<any>) => any = () => null;
  @Prop() initialErrors?: any = {};
  @Prop() validate?: any = () => {};
  @Prop() validationSchema?: any = {};

  /** Tells Form to validate the form on each input's onInput event */
  @Prop() validateOnInput? = true;
  /** Tells Form to validate the form on each input's onBlur event */
  @Prop() validateOnBlur? = true;

  @State() isValid = false;
  @State() isValidating = false;
  @State() isSubmitting = false;

  @State() focused: keyof FormValues = null;
  @State() values: FormValues = {} as any;
  @State() touched: FormTouched<FormValues> = {} as any;
  @State() validity: FormValidity<FormValues> = {} as any;
  @State() errors: FormErrors<FormValues> = {} as any;

  componentWillLoad() {
    this.values = this.initialValues;

    for (const field of Object.keys(this.values)) {
      this.touched[field] = false;
      this.errors[field] = null;
    }

    this.errors = { ...this.errors, ...this.initialErrors };

    Object.keys(this.initialErrors).forEach((f) => (this.touched[f] = true));

    console.log({ errors: this.errors });
  }

  setSubmitting = (value: boolean) => {
    this.isSubmitting = value;
  };

  handleSubmit = async (event: Event) => {
    event?.preventDefault();
    event?.stopPropagation();

    let isValid = false;
    // on clicking submit, mark all fields as touched

    await this.handleValidation();

    console.log({ errors: this.errors });

    const keys = [...Object.keys(this.values), ...Object.keys(this.errors)];

    keys.forEach((k) => (this.touched = { ...this.touched, [k]: true }));

    isValid = !this.errors || Object.keys(this.errors).length === 0;

    console.log('is Valid Form ', isValid);

    if (!isValid) {
      return;
    }
    this.isSubmitting = true;

    console.log({ values: this.values });

    return this.values;
  };

  handleReset = (event?: Event) => {
    event?.preventDefault();
    event?.stopPropagation();
    this.isSubmitting = false;
    this.values = this.initialValues;
    this.errors = {};
    this.touched = {};
    this.focused = null;
  };

  handleValidation = async (field?: string, _target?: any) => {
    this.isValidating = true;
    console.log(`validating ${field}`);

    if (this.validationSchema && Object.keys(this.validationSchema).length) {
      const pr = validateYupSchema(
        prepareDataForValidation(this.values),
        this.validationSchema
      );
      try {
        const resultV = await pr;
        console.log({ resultV });
        this.errors = {}; // reset errors if no errors from validation
      } catch (err) {
        this.errors = yupToFormErrors(err);
      }
    } else if (this.validate && typeof this.validate === 'function') {
      try {
        const errors = await this.validate(this.values);
        this.errors = errors || {};
      } catch (err) {
        console.error(`Error in calling validate function ${err.message}`);
      }
    }

    this.isValidating = false;
  };

  handleInput =
    (field: string, inputType: string) => async (event: Event, ref: any) => {
      const target = event?.target as HTMLInputElement | HTMLTextAreaElement;
      const value: any = getElementValue(inputType, event, ref);

      this.values = { ...this.values, [field]: value };

      /** Validate, if user wants to validateOnInput */
      if (this.validateOnInput) this.handleValidation(field, target);
    };

  handleBlur =
    (field: string, inputType: string) => (event: Event, ref: any) => {
      if (this.focused) this.focused = null;
      if (!this.touched[field])
        this.touched = { ...this.touched, [field]: true };
      const value: any = getElementValue(inputType, event, ref);

      this.values = { ...this.values, [field]: value };
      /** Validate, if user wants to validateOnInput */
      if (this.validateOnBlur) this.handleValidation(field);
    };

  handleFocus =
    (field: string, _inputType: string) => (_event: Event, _ref: any) => {
      this.focused = field;
    };

  private composedState = (): FormState<FormValues> => {
    const {
      focused,
      values,
      errors,
      validity,
      touched,
      isValidating,
      isSubmitting,
    } = this;
    return {
      focused,
      values,
      errors,
      validity,
      touched,
      isValidating,
      isSubmitting,
    };
  };

  private composedHandlers = (): FormHandlers<FormValues> => {
    const { handleSubmit, handleReset, handleInput, handleFocus, handleBlur } =
      this;
    return { handleSubmit, handleReset, handleInput, handleFocus, handleBlur };
  };

  private computeProps = () => {
    this.dirty = !Object.values(this.touched).every((x) => !x);
    this.isValid = Object.values(this.validity).every((x) => (x as any).valid);
  };

  private composedComputedProps = (): FormComputedProps<FormValues> => {
    this.computeProps();
    const { dirty, isValid, initialValues } = this;
    return { dirty, isValid, initialValues };
  };

  private composedUtils = (): FormUtils<FormValues, keyof FormValues> => {
    const inputProps = (field, inputType) => ({
      name: field,
      type: inputType,
      handleInput: this.handleInput(field, inputType),
      handleChange: this.handleInput(field, inputType),
      handleBlur: this.handleBlur(field, inputType),
      handleFocus: this.handleFocus(field, inputType),
      id: `input-${field}`,
      value: this.values[field],
    });

    const radioProps = (field, value) => ({
      ...inputProps(field, 'radio'),
      type: 'radio',
      id: `input-${field}--radio-${value}`,
      value: value,
      checked: this.values[field] === value,
    });

    const checkboxProps = (field) => ({
      ...inputProps(field, 'checkbox'),
      type: 'checkbox',
      checked: !!this.values[field],
    });

    const selectProps = (field, inputType) => ({
      type: 'select',
      name: field,
      id: `input-${field}`,
      handleChange: this.handleInput(field, 'select'),
      handleBlur: this.handleBlur(field, 'select'),
      value:
        inputType === 'MULTI_SELECT' // for multiselect pass Array
          ? this.values[field]?.map((v) => v.value || v) || []
          : Array.isArray(this.values[field]) // single select but the value is an array, pass 0th index
          ? this.values[field]?.map((v) => v.value || v)[0] || ''
          : this.values[field] || '',
    });

    const labelProps = (field, value) => ({
      htmlFor: !value ? `input-${field}` : `input-${field}--radio-${value}`,
    });

    const formProps = {
      action: 'javascript:void(0);',
      onSubmit: this.handleSubmit,
      onReset: this.handleReset,
    };

    return {
      inputProps,
      selectProps,
      checkboxProps,
      radioProps,
      labelProps,
      formProps,
    };
  };

  getAllNodesRecursively = (node: HTMLElement) => {
    let nodes = [];
    const getAllNodes = (element: any, root = true) => {
      root && (nodes = []);
      if (element.shadowRoot) {
        nodes.push(element);
      }
      element = element.shadowRoot ? element.shadowRoot : element;
      element.querySelectorAll('*').forEach((el: any) => {
        if (el.nodeName !== 'SLOT') {
          nodes.push(el);
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
    return nodes;
  };

  getFormControls() {
    let children = [];
    children = Array.from(this.el.querySelectorAll('*')).filter(
      (el: HTMLElement) =>
        ['fw-form-control'].includes(el.tagName.toLowerCase())
    );
    return children;
  }

  // attach event listeners and set initial values and errors
  componentDidLoad() {
    this.passPropsToChildren();
  }

  passPropsToChildren() {
    const controls = this.getFormControls();
    controls.forEach((f) => {
      this.passPropsToChild(f);
    });
  }

  passPropsToChild(f) {
    const error = this.errors[(f as any).name];
    const touched = this.touched[(f as any).name];
    (f as any).controlProps = this.composedUtils();
    if (error) (f as any).error = error;
    else (f as any).error = '';
    if (touched) (f as any).touched = true;
    else (f as any).touched = false;
  }

  @Method()
  async setFieldValue(obj) {
    this.values = { ...this.values, ...obj };
    Object.keys(obj).forEach(
      (k) => (this.touched = { ...this.touched, [k]: true })
    );
  }

  @Method()
  async setFieldErrors(obj) {
    this.errors = { ...this.errors, ...obj };
    Object.keys(obj).forEach(
      (k) => (this.touched = { ...this.touched, [k]: true })
    );
  }

  @Method()
  async doSubmit(e) {
    this.handleSubmit(e);
  }

  @Method()
  async doReset(e) {
    this.handleReset(e);
  }

  render() {
    const state: FormState<FormValues> = this.composedState();
    const handlers: FormHandlers<FormValues> = this.composedHandlers();
    const computedProps: FormComputedProps<FormValues> =
      this.composedComputedProps();
    const utils: FormUtils<FormValues, keyof FormValues> = this.composedUtils();
    this.passPropsToChildren();

    const renderProps: FormRenderProps<any> = {
      ...state,
      ...handlers,
      ...computedProps,
      ...utils,
    };
    console.log(renderProps);
    //return this.renderer(renderProps);
    return (
      <form id='fw_form_wrapper' {...utils.formProps}>
        <slot></slot>
      </form>
    );
  }
}
