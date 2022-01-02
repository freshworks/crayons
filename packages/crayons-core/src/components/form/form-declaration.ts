/**
 * Values of fields in the form
 */
export interface FormValues {
  [field: string]: any;
}

/**
 * An object containing error messages whose keys correspond to FormValues.
 * Should be always be and object of strings, but any is allowed to support i18n libraries.
 */
export type FormValidity<Values> = {
  [K in keyof Values]?: ValidityState;
};

/**
 * An object containing error messages whose keys correspond to FormValues.
 * Should be always be and object of strings, but any is allowed to support i18n libraries.
 */
export type FormErrors<Values> = {
  [K in keyof Values]?: string;
};

/**
 * An object containing touched state of the form whose keys correspond to FormValues.
 */
export type FormTouched<Values> = {
  [K in keyof Values]?: boolean;
};

export interface FormState<Values> {
  focused: string | null;
  /** Form values */
  values: Values | unknown;
  /** map of field names to specific error for that field */
  errors: FormErrors<Values>;
  /** map of field names to whether the field has been touched */
  touched: FormTouched<Values>;
  /** whether the form is currently validating */
  isValidating: boolean;
  /** whether the form is currently submitting */
  isSubmitting: boolean;
}

/**
 * Form computed properties. These are read-only.
 */
export interface FormComputedProps<Values> {
  /** True if any input has been touched. False otherwise. */
  readonly dirty: boolean;
  /** Result of isInitiallyValid on mount, then whether true values pass validation. */
  readonly isValid: boolean;
  /** initialValues */
  readonly initialValues: Values;
}

export interface FormHandlers<Values> {
  handleSubmit: (e?: Event) => void;
  handleReset: () => void;
  handleInput(field: keyof Values, type: string): (e: Event, ref: any) => void;
  handleBlur(field: keyof Values, type: string): (e: Event, ref: any) => void;
  handleFocus(
    field: keyof Values,
    type: string
  ): (e?: Event, ref?: any) => void;
}

export interface FormUtils<Values, Key extends keyof Values> {
  // groupProps: (key: Key) => any;
  inputProps: (key: Key, inputType: string) => any;
  labelProps: (key: Key, value?: Values[Key]) => any;
  selectProps: (key: Key, inputType: string) => any;
  checkboxProps: (key: Key, inputType: string) => any;
  radioProps: (key: Key, value: Values[Key]) => any;
  formProps: any;
}

export type FwFormEventDetail = {
  values: FormValues;
  actions: { setSubmitting: (value: boolean) => void };
};

export type FormRenderProps<Values> = FormState<Values> &
  FormHandlers<Values> &
  FormComputedProps<Values> &
  FormUtils<Values, keyof Values>;

export interface FormValidator<Values> {
  (state: FormValidatorState<Values>): FormValidatorResult;
}

export interface FieldState<Values, Key extends keyof Values> {
  value: Readonly<Values[Key]>;
  validity: Readonly<ValidityState>;
  error: Readonly<string>;
  setCustomValidity: (message: string) => void;
}

export type FormValidatorState<
  Values,
  Key extends keyof Values = keyof Values
> = { [K in Key]: FieldState<Values, K> };

export type FormValidatorResult = void | Promise<any>;

export type FormParams = {
  initialValues?: FormValues;
  formSchema?: any;
  renderer?: any;
  initialErrors?: FormValues;
  validationSchema?: any;
  validateOnInput?: boolean;
  validateOnBlur?: boolean;
  formRef: any;
  validate?: any;
  ref?: any;
};

export type FormAction<Values> =
  | { type: 'SUBMIT_ATTEMPT' }
  | { type: 'SUBMIT_FAILURE' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SET_ISVALIDATING'; payload: boolean }
  | { type: 'SET_ISSUBMITTING'; payload: boolean }
  | { type: 'SET_VALUES'; payload: Values }
  | { type: 'SET_FIELD_VALUE'; payload: { field: string; value?: any } }
  | { type: 'SET_FIELD_TOUCHED'; payload: { field: string; value?: boolean } }
  | { type: 'SET_FIELD_ERROR'; payload: { field: string; value?: string } }
  | { type: 'SET_TOUCHED'; payload: FormTouched<Values> }
  | { type: 'SET_FIELD_FOCUSED'; payload: string }
  | { type: 'SET_ERRORS'; payload: FormErrors<Values> }
  | { type: 'SET_STATUS'; payload: any }
  | {
      type: 'RESET_FORM';
      payload: { values: FormValues };
    }
  | {
      type: 'SET_VALIDATION_RESULT';
      payload: {
        errors: FormErrors<Values>;
        isValidating: boolean;
      };
    }
  | {
      type: 'SET_HANDLE_BLUR_RESULT';
      payload: {
        field: string;
        value: any;
        touched: boolean;
        focused: string | null;
      };
    }
  | {
      type: 'SET_INITIAL_STATE';
      payload: {
        errors: FormErrors<Values>;
        values: FormValues;
        touched: FormTouched<Values>;
      };
    };
