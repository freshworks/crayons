import {
  Component,
  Prop,
  State,
  Element,
  Event,
  EventEmitter,
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
})
export class Form implements FormConfig {
  @Element() el!: any;
  private groups: { [key: string]: HTMLElement } = {} as any;
  private inputs: HTMLInputElement[] = [];
  private formId = `crayons-form-${formIds++}`;
  private dirty = false;
  private formRef;

  @State() isValid = false;
  @State() isValidating = false;
  @State() isSubmitting = false;
  @State() submitCount = 0;

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

  getFormControls() {
    const children = this.formRef.children;

    const reportValidChild = [...children].filter(
      (c) => c.tagName === 'FW-INPUT'
    );

    return reportValidChild;
  }

  componentWillLoad() {
    this.values = this.initialValues;

    for (const field of Object.keys(this.values)) {
      this.touched[field] = false;
      this.errors[field] = null;
    }

    this.errors = { ...this.errors, ...this.initialErrors };

    Object.keys(this.initialErrors).forEach((f) => (this.touched[f] = true));

    console.log({ errrros: this.errors });
  }

  setSubmitting = (value: boolean) => {
    this.isSubmitting = value;
  };

  handleSubmit = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const isValid = true;
    // on clicking submit, mark all fields as touched
    this.touched = setNestedObjectValues(this.values, true);

    this.handleValidation();

    console.log({ errros: this.errors });

    console.log('is Valid ', isValid);

    this.isSubmitting = true;
    this.submitCount++;
    const { setSubmitting } = this;

    console.log({ values: this.values });
    this.onFormSubmit.emit({ values: this.values, actions: { setSubmitting } });
  };

  handleReset = () => {
    this.isSubmitting = false;
    this.submitCount = 0;
  };

  handleValidation = async (
    field?: string,
    _target?: HTMLInputElement | HTMLTextAreaElement
  ) => {
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
      const value: any = getElementValue(inputType, ref);

      this.values = { ...this.values, [field]: value };

      /** Validate, if user wants to validateOnInput */
      if (this.validateOnInput) this.handleValidation(field, target);
    };

  handleBlur =
    (field: string, inputType: string) => (event: Event, ref: any) => {
      if (this.focused) this.focused = null;
      if (!this.touched[field])
        this.touched = { ...this.touched, [field]: true };
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      const value: any = getElementValue(inputType, ref);

      this.values = { ...this.values, [field]: value };
      /** Validate, if user wants to validateOnInput */
      if (this.validateOnBlur) this.handleValidation(field, target);
    };

  handleFocus =
    (field: string, _inputType: string) => (_event: Event, _ref: any) => {
      this.focused = field;
      if (!this.touched[field])
        this.touched = { ...this.touched, [field]: true };
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
      submitCount,
    } = this;
    return {
      focused,
      values,
      errors,
      validity,
      touched,
      isValidating,
      isSubmitting,
      submitCount,
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
    const groupProps = (field: keyof FormValues) => ({
      'data-for': field,
      'class': {
        'input-group': true,
        'was-touched': this.touched[field],
        'has-focus': this.focused === field,
        'has-value':
          typeof this.values[field] === 'string'
            ? !!this.values[field]
            : typeof this.values[field] === 'number'
            ? typeof this.values[field] !== null
            : false,
        'has-error':
          !this.validity[field] ||
          (this.validity[field] && !this.validity[field].valid),
      },
      'ref': (el) => (this.groups = { ...this.groups, [field]: el }),
    });

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
      ...inputProps(field, 'select'),
      name: field,
      id: `${this.formId}-input-${field}`,
      value: this.values[field],
      ref: (el: HTMLInputElement) => (this.inputs = [...this.inputs, el]),
    });

    const labelProps = (field: keyof FormValues, value?: string) => ({
      htmlFor: !value
        ? `${this.formId}-input-${field}`
        : `${this.formId}-input-${field}--radio-${value}`,
    });

    const formProps = {
      action: 'javascript:void(0);',
      onSubmit: this.handleSubmit,
      ref: async (el) => (this.formRef = el),
    };

    return {
      groupProps,
      inputProps,
      selectProps,
      checkboxProps,
      radioProps,
      labelProps,
      formProps,
    };
  };

  render() {
    const state: FormState<FormValues> = this.composedState();
    const handlers: FormHandlers<FormValues> = this.composedHandlers();
    const computedProps: FormComputedProps<FormValues> =
      this.composedComputedProps();
    const utils: FormUtils<FormValues, keyof FormValues> = this.composedUtils();

    const renderProps: FormRenderProps<any> = {
      ...state,
      ...handlers,
      ...computedProps,
      ...utils,
    };
    return this.renderer(renderProps);
  }
}
