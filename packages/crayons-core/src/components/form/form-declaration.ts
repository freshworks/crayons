import * as React from 'react';

/**
 * Values of fields in the form
 */
export interface FormValues {
  [field: string]: any;
}

/**
 * An object containing error messages whose keys correspond to FormValues.
 * Should be always be an object of strings or empty object
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
  /** Form values */
  values: Values | unknown;
  /** map of field names to specific error for that field */
  errors: FormErrors<Values>;
  /** map of field names to whether the field has been touched */
  touched: FormTouched<Values>;
}

export interface FormHandlers<Values> {
  handleSubmit: (e?: Event) => Promise<FormSubmit>;
  handleReset: (e?: Event) => Promise<any>;
  handleInput(field: keyof Values, type: string): (e: Event, ref: any) => void;
  handleBlur(field: keyof Values, type: string): (e: Event, ref: any) => void;
}

export interface FormProps {
  action: any;
  onSubmit: (event?: any) => Promise<FormSubmit>;
  onReset: (event?: any) => Promise<void>;
}

export interface FormUtils {
  inputProps: (field: string) => any;
  selectProps: (field: string, inputType: string) => any;
  checkboxProps: (field: string) => any;
  radioProps: (field: string) => any;
  formProps: FormProps;
}

export type FwFormEventDetail = {
  values: FormValues;
  actions: { setSubmitting: (value: boolean) => void };
};

export type FormRenderProps<Values> = FormState<Values> &
  FormHandlers<Values> &
  FormUtils & {
    controlProps: FormUtils;
  };

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

type ImperativeMethods<Values> = {
  doSubmit: (event?: Event) => Promise<FormSubmit>;
  doReset: (event?: Event) => Promise<void>;
  setFieldErrors: (errorObj: FormErrors<Values>) => Promise<void>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate: boolean
  ) => Promise<void>;
};

export type FormParams<Values> = {
  initialValues?: Values;
  formSchema?: any;
  renderer?: (props: FormRenderProps<Values>) => React.ReactNode;
  initialErrors?: FormErrors<Values>;
  validationSchema?: any;
  validateOnInput?: boolean;
  validateOnBlur?: boolean;
  formRef: React.Ref<ImperativeMethods<Values>>;
  validate?: (values: Values) => Promise<FormErrors<Values>>;
  ref?: React.Ref<any>;
};

export type FormAction<Values> =
  | { type: 'SUBMIT_ATTEMPT' }
  | { type: 'SUBMIT_FAILURE' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SET_ISVALIDATING'; payload: boolean }
  | { type: 'SET_ISSUBMITTING'; payload: boolean }
  | { type: 'SET_VALUES'; payload: FormValues }
  | { type: 'SET_FIELD_VALUE'; payload: { field: string; value?: any } }
  | { type: 'SET_FIELD_TOUCHED'; payload: { field: string; value?: boolean } }
  | { type: 'SET_FIELD_ERROR'; payload: { field: string; value?: string } }
  | { type: 'SET_TOUCHED'; payload: FormTouched<Values> }
  | { type: 'SET_FIELD_FOCUSED'; payload: string }
  | { type: 'SET_ERRORS'; payload: FormErrors<Values> }
  | {
      type: 'RESET_FORM';
      payload: { values: FormValues; touched: FormTouched<FormValues> };
    }
  | {
      type: 'SET_VALIDATION_RESULT';
      payload: {
        errors: FormErrors<Values>;
        isValidating: boolean;
      };
    }
  | {
      type: 'SET_INITIAL_STATE';
      payload: {
        errors: FormErrors<Values>;
        values: FormValues;
        touched: FormTouched<Values>;
      };
    }
  | {
      type: 'SET_HANDLE_VALUE_CHANGE';
      payload: {
        field: string;
        value: any;
        touched: boolean;
        focused: string | null;
      };
    };

export type FormSubmit = {
  values: FormValues;
  errors: FormErrors<FormValues>;
  isValid: boolean;
};
