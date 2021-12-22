import {
  Component,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
} from '@stencil/core';
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
  FwFormEventDetail,
} from './form-declaration';
import {
  getElementValue,
  validateYupSchema,
  prepareDataForValidation,
  yupToFormErrors,
  setNestedObjectValues,
} from './form-util';

let formIds = 0;

@Component({
  tag: 'fw-form',
  shadow: true,
})
export class Form implements FormConfig {
  @Element() el!: any;
  private formId = `crayons-form-${formIds++}`;
  private dirty = false;

  @State() isValid = false;
  @State() isValidating = false;
  @State() isSubmitting = false;

  @State() focused: keyof FormValues = null;
  @State() values: FormValues = {} as any;
  @State() touched: FormTouched<FormValues> = {} as any;
  @State() validity: FormValidity<FormValues> = {} as any;
  @State() errors: FormErrors<FormValues> = {} as any;

  @Prop() initialValues;
  @Prop() renderer: (props: FormRenderProps<any>) => any = () => null;
  @Prop() initialErrors;
  @Prop() validate;
  @Prop() validationSchema;

  /** Tells Form to validate the form on each input's onInput event */
  @Prop() validateOnInput? = true;
  /** Tells Form to validate the form on each input's onBlur event */
  @Prop() validateOnBlur? = true;

  @Event({ eventName: 'fwFormSubmit' })
  onFormSubmit: EventEmitter<FwFormEventDetail>;

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
    this.touched = setNestedObjectValues(this.values, true);

    this.handleValidation();

    console.log({ errors: this.errors });

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

    const pr = validateYupSchema(
      prepareDataForValidation(this.values),
      this.validationSchema
    );

    try {
      const resultV = await pr;
      console.log({ resultV });
      this.errors = {}; // reset errors if no errors from validation
    } catch (err) {
      console.log('validation error ', err);
      this.errors = yupToFormErrors(err);
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
    const inputProps = (field: keyof FormValues, inputType: string) => ({
      name: field,
      type: inputType,
      handleInput: this.handleInput(field as string, inputType),
      handleChange: this.handleInput(field as string, inputType),
      handleBlur: this.handleBlur(field as string, inputType),
      handleFocus: this.handleFocus(field as string, inputType),
      id: `${this.formId}-input-${field}`,
      value: this.values[field],
    });

    const radioProps = (field: keyof FormValues, value: string) => ({
      ...inputProps(field, 'radio'),
      type: 'radio',
      id: `${this.formId}-input-${field}--radio-${value}`,
      value: value,
      checked: this.values[field] === value,
    });

    const checkboxProps = (field: keyof FormValues) => ({
      ...inputProps(field, 'checkbox'),
      type: 'checkbox',
      checked: !!this.values[field],
    });

    const selectProps = (field: keyof FormValues) => ({
      type: 'select',
      name: field,
      id: `${this.formId}-input-${field}`,
      handleChange: this.handleInput(field as string, 'select'),
      handleBlur: this.handleBlur(field as string, 'select'),
      handleFocus: this.handleFocus(field as string, 'select'),
    });

    const labelProps = (field: keyof FormValues, value?: string) => ({
      htmlFor: !value
        ? `${this.formId}-input-${field}`
        : `${this.formId}-input-${field}--radio-${value}`,
    });

    const formProps: any = {
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

  getFormControls() {
    const children =
      this.el.shadowRoot
        .querySelector('#fw_form_wrapper')
        ?.querySelector('slot')
        ?.assignedElements({ flattened: true }) || [];
    const controls = children
      .reduce(
        (all: HTMLElement[], el: HTMLElement) =>
          all.concat(el, [...el.querySelectorAll('*')] as HTMLElement[]),
        []
      )
      .filter(
        (el: HTMLElement) =>
          [
            'fw-input',
            'fw-textarea',
            'fw-select',
            'fw-radio-group',
            // 'fw-radio',
            'fw-checkbox',
            'fw-datepicker',
            'fw-timepicker',
            'fw-form-control',
            'input',
            'textarea',
            'date',
            'select',
          ].includes(el.tagName.toLowerCase()) &&
          !['hidden-input'].includes(el.className)
      ) as HTMLElement[];
    return controls;
  }

  // attach event listeners and set initial values and errors
  componentDidLoad() {
    const controls = this.getFormControls();
    controls.forEach((f) => {
      // dont attach listener on form-control
      if (f.tagName.toLowerCase() === 'fw-form-control') this.setValues(f);
      else {
        const field = (f as any).name;
        (f as any).handleInput = this.handleInput(
          field as string,
          (f as any).type
        );
        (f as any).handleChange = this.handleInput(
          field as string,
          (f as any).type
        );
        (f as any).handleBlur = this.handleBlur(
          field as string,
          (f as any).type
        );
        (f as any).handleFocus = this.handleFocus(
          field as string,
          (f as any).type
        );
        if (
          ['input', 'select', 'textarea', 'checkbox'].includes(
            f.tagName.toLowerCase()
          )
        ) {
          console.log('input');
          (f as any).addEventListener(
            'change',
            this.handleInput(field as string, (f as any).type)
          );

          (f as any).addEventListener(
            'focus',
            this.handleFocus(field as string, (f as any).type)
          );

          (f as any).addEventListener(
            'blur',
            this.handleBlur(field as string, (f as any).type)
          );
        }
        this.setValues(f);
      }
    });
  }

  updateState() {
    const controls = this.getFormControls();
    controls.forEach((f) => {
      this.setValues(f);
    });
  }

  setValues(f) {
    const value = this.values[(f as any).name];
    const error = this.errors[(f as any).name];
    const touched = this.touched[(f as any).name];
    const type = f.tagName.toLowerCase();

    if (['fw-form-control'].includes(type)) {
      if (error) (f as any).error = error;
      else (f as any).error = '';
      if (touched) (f as any).touched = true;
      else (f as any).touched = false;
    } else if (['fw-checkbox', 'checkbox'].includes(type)) {
      if (value) (f as any).checked = value;
      else (f as any).checked = false;
    } else if (['fw-select'].includes(type)) {
      (f as any).value = f.multiple // for multiselect pass Array
        ? value?.map((v) => v.value || v) || []
        : Array.isArray(value) // single select but the value is an array, pass 0th index
        ? value?.map((v) => v.value || v)[0] || ''
        : value || '';
    } else if (['fw-radio', 'fw-radio-group'].includes(type)) {
      if (value) (f as any).value = value;
      else (f as any).value = undefined;
    } else {
      if (value) (f as any).value = value;
      else (f as any).value = '';
    }
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
    this.updateState();

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
