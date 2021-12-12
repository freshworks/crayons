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
  FormValidator,
  FormValidity,
  FormTouched,
  FormErrors,
  FormUtils,
  StencilFormEventDetail,
  //  FormValidatorState,
} from './form-declaration';
import { getElementValue, copyValidityState } from './form-util';

let formIds = 0;

@Component({
  tag: 'fw-form',
})
export class Form implements FormConfig {
  @Element() el!: any;
  private groups: { [key: string]: HTMLElement } = {} as any;
  private inputs: HTMLInputElement[] = [];
  private formId = `stencil-form-${formIds++}`;
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

  @Prop() initialValues: FormValues;
  @Prop() renderer: (props: FormRenderProps<any>) => any = () => null;
  @Prop() validate: FormValidator<FormValues>;
  @Prop() initialErrors;

  /** Tells Form to validate the form on each input's onInput event */
  @Prop() validateOnInput? = true;
  /** Tells Form to validate the form on each input's onBlur event */
  @Prop() validateOnBlur? = true;
  /** Tell Form if initial form values are valid or not on first render */
  @Prop() isInitialValid? = true;

  // @Event({ eventName: 'formReset' }) onFormReset: { emit: () => StencilFormEvent<FormValues> };
  @Event({ eventName: 'submit1' })
  onFormSubmit: EventEmitter<StencilFormEventDetail>;

  getFormControls() {
    const children = this.formRef.children;

    const reportValidChild = [...children].filter(
      (c) => c.tagName === 'FW-INPUT'
    );

    return reportValidChild;
  }

  componentWillLoad() {
    console.log('this inputs ', this.inputs);
    for (const input of this.inputs) {
      this.validity = {
        ...this.validity,
        [input.name]: { ...copyValidityState(input) },
      };
    }
    this.isValid = this.isInitialValid;
    this.values = this.initialValues;

    for (const field of Object.keys(this.values)) {
      this.touched[field] = false;
      this.errors[field] = this.isInitialValid ? '' : null;
    }

    this.errors = { ...this.errors, ...this.initialErrors };
  }

  setSubmitting = (value: boolean) => {
    this.isSubmitting = value;
  };

  handleSubmit = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    //const form = event.target;

    const formControls = this.getFormControls();
    const isValid = true;
    for (const formControl of formControls) {
      const nr = await (formControl as any).nativeRef();

      this.handleValidation((nr as any).name, nr);

      // const result = await (formControl as any).checkValidity();
      // console.log('result ', result, formControl);
      // const nr = await (formControl as any).nativeRef();
      // if (!result) {
      //   isValid = false;
      //   const vms = nr.validationMessage;
      //   console.log(vms);
      //   this.errors = { ...this.errors, [(nr as any).name]: vms };
      // } else {
      //   this.errors = { ...this.errors, [(nr as any).name]: '' };
      // }
    }
    console.log({ errros: this.errors });

    console.log('is Valid ', isValid);

    // const formData = Array.from(
    //   new FormData(form as HTMLFormElement).entries()
    // );
    // console.log(formData);

    this.isSubmitting = true;
    this.submitCount++;
    const { setSubmitting } = this;
    this.onFormSubmit.emit({ values: this.values, actions: { setSubmitting } });
  };

  handleReset = () => {
    this.isSubmitting = false;
    this.submitCount = 0;
  };

  handleValidation = async (
    field: string,
    target: HTMLInputElement | HTMLTextAreaElement
  ) => {
    const validity = copyValidityState(target);
    const { validationMessage } = target;

    this.validity = { ...this.validity, [field]: validity };
    this.errors = { ...this.errors, [field]: validationMessage };

    const resetCustomValidity = async (_field: keyof FormValues) => {
      const controls = this.getFormControls().find((x) => x.name === _field);
      const localTarget: HTMLInputElement = await controls.nativeRef();
      localTarget.setCustomValidity('');

      const validity = copyValidityState(localTarget);
      this.validity = { ...this.validity, [_field]: validity };
      this.errors = { ...this.errors, [_field]: localTarget.validationMessage };
    };

    const setCustomValidity =
      (_field: keyof FormValues) => async (message: string) => {
        const controls = this.getFormControls().find((x) => x.name === _field);
        const localTarget: HTMLInputElement = await controls.nativeRef();
        // setCustomValidity because we want to #usetheplatform
        // allows users to style with :valid and :invalid
        localTarget.setCustomValidity(message);
        const validity = copyValidityState(localTarget);

        this.validity = { ...this.validity, [_field]: validity };
        this.errors = { ...this.errors, [_field]: message };
      };

    if (typeof this.validate === 'function') {
      if (!this.isSubmitting && !this.touched[field]) return;

      this.isValidating = true;

      let validatorState = {} as any;
      for (const [key, value] of Object.entries(this.values)) {
        if (this.touched[key]) resetCustomValidity(key);

        validatorState = {
          ...validatorState,
          [key]: {
            value,
            validity: this.validity[field],
            error: this.errors[field],
            setCustomValidity: setCustomValidity(key),
          },
        };
      }
      await this.validate(validatorState);
      this.isValidating = false;
    }
  };

  handleInput = (field: string) => async (event: Event) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const value: any = getElementValue(target);

    this.values = { ...this.values, [field]: value };

    /** Validate, if user wants to validateOnInput */
    if (this.validateOnInput) this.handleValidation(field, target);
  };

  handleBlur = (field: string) => (event: Event) => {
    if (this.focused) this.focused = null;
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const value: any = getElementValue(target);

    this.values = { ...this.values, [field]: value };
    /** Validate, if user wants to validateOnInput */
    if (this.validateOnBlur) this.handleValidation(field, target);
  };

  handleFocus = (field: string) => () => {
    this.focused = field;
    if (!this.touched[field]) this.touched = { ...this.touched, [field]: true };
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

    const inputProps = (field: keyof FormValues) => ({
      name: field,
      //ref: (el: HTMLInputElement) => (this.inputs = [...this.inputs, el]),
      type: 'text',
      onInput: this.handleInput(field as string),
      onBlur: this.handleBlur(field as string),
      onFocus: this.handleFocus(field as string),
      id: `${this.formId}-input-${field}`,
      value: this.values[field],
    });

    const radioProps = (field: keyof FormValues, value: string) => ({
      ...inputProps(field),
      type: 'radio',
      id: `${this.formId}-input-${field}--radio-${value}`,
      value: value,
      checked: this.values[field] === value,
    });

    const checkboxProps = (field: keyof FormValues) => ({
      ...inputProps(field),
      type: 'checkbox',
      value: null,
      checked: !!this.values[field],
    });

    const selectProps = (field: keyof FormValues) => ({
      name: field,
      id: `${this.formId}-input-${field}`,
      value: this.values[field],
      ref: (el: HTMLInputElement) => (this.inputs = [...this.inputs, el]),
      onChange: this.handleInput(field as string),
      onBlur: this.handleBlur(field as string),
      onFocus: this.handleFocus(field as string),
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
