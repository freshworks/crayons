import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useReducer,
} from 'react';
import { FwFormControl } from './FwFormControl';
import {
  getElementValue,
  validateYupSchema,
  prepareDataForValidation,
  yupToFormErrors,
  setIn,
  generateDynamicInitialValues,
  generateDynamicValidationSchema,
} from './form-util';
import {
  FormParams,
  FormValues,
  FormState,
  FormAction,
  FormErrors,
  FormRenderProps,
  FormUtils,
  FormProps,
  FormSubmit,
} from './form-declaration';

function reducer<Values>(
  state: FormState<Values>,
  action: FormAction<Values>
): FormState<Values> {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, values: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SET_TOUCHED':
      return { ...state, touched: action.payload };
    case 'SET_FIELD_FOCUSED':
      return { ...state, focused: action.payload };
    case 'SET_ISVALIDATING':
      return { ...state, isValidating: action.payload };
    case 'SET_ISSUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        values: setIn(state.values, action.payload.field, action.payload.value),
      };
    case 'SET_FIELD_TOUCHED':
      return {
        ...state,
        touched: setIn(
          state.touched,
          action.payload.field,
          action.payload.value
        ),
      };
    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: setIn(state.errors, action.payload.field, action.payload.value),
      };
    case 'RESET_FORM':
      return {
        ...state,
        isSubmitting: false,
        values: action.payload.values,
        touched: action.payload.touched,
        focused: null,
      };
    case 'SET_VALIDATION_RESULT':
      return {
        ...state,
        isSubmitting: false,
        errors: action.payload.errors,
      };
    case 'SET_HANDLE_BLUR_RESULT':
      return {
        ...state,
        focused: action.payload.focused,
        touched: setIn(
          state.touched,
          action.payload.field,
          action.payload.touched
        ),
        values: setIn(state.values, action.payload.field, action.payload.value),
      };
    case 'SET_HANDLE_INPUT_RESULT':
      return {
        ...state,
        focused: action.payload.focused,
        touched: setIn(
          state.touched,
          action.payload.field,
          action.payload.touched
        ),
        values: setIn(state.values, action.payload.field, action.payload.value),
      };
    case 'SET_INITIAL_STATE': {
      return {
        ...state,
        values: action.payload.values,
        errors: action.payload.errors,
        touched: action.payload.touched,
      };
    }
    default:
      return state;
  }
}

function FwForm<Values extends FormValues = FormValues>({
  initialValues = {},
  formSchema = {},
  renderer,
  validationSchema = {},
  validateOnInput = true,
  validateOnBlur = true,
  formRef,
  validate,
}: FormParams<FormValues>) {
  const isMounted = useRef(false);

  const INITIAL_STATE: FormState<Values> = {
    isValidating: false,
    isSubmitting: false,
    focused: null,
    values: {},
    touched: {},
    errors: {},
  };

  const [formState, setFormState] = useReducer<
    React.Reducer<FormState<Values>, FormAction<Values>>
  >(reducer, INITIAL_STATE);

  const { isValidating, isSubmitting, focused, values, touched, errors } =
    formState;

  const formValidationSchema = useRef({});
  const formInitialValues = useRef({});

  useEffect(() => {
    console.log('initialize validation and state');

    formValidationSchema.current =
      generateDynamicValidationSchema(formSchema, validationSchema) || {};
    formInitialValues.current =
      generateDynamicInitialValues(formSchema, initialValues) || {};

    let touchedState = {};
    let errorState = {};
    for (const field of Object.keys(formInitialValues.current)) {
      errorState = { ...errorState, [field]: null };
      touchedState = { ...touchedState, [field]: false };
    }

    for (const field of Object.keys({ ...initialValues })) {
      touchedState = { ...touchedState, [field]: true };
    }

    setFormState({
      type: 'SET_INITIAL_STATE',
      payload: {
        values: formInitialValues.current,
        errors: { ...errorState },
        touched: touchedState,
      },
    });

    console.log('Initialized values, touched and error state');
  }, []);

  const handleSubmit = async (event?: Event): Promise<FormSubmit> => {
    event?.preventDefault();
    event?.stopPropagation();

    setFormState({
      type: 'SET_ISSUBMITTING',
      payload: true,
    });

    let isValid = false;

    const validationErrors = await handleValidation();

    console.log({ errors: validationErrors });

    const keys = [...Object.keys(values), ...Object.keys(validationErrors)];

    let touchedState = {};

    keys.forEach(
      (k: string) => (touchedState = { ...touchedState, [k]: true })
    );

    // on clicking submit, mark touched fields
    setFormState({
      type: 'SET_TOUCHED',
      payload: touchedState,
    });

    isValid = !validationErrors || Object.keys(validationErrors).length === 0;

    console.log({ values: values });

    console.log('is Valid Form', isValid);

    setFormState({
      type: 'SET_ISSUBMITTING',
      payload: false,
    });

    return { values, isValid };
  };

  const handleReset = async (event?: any): Promise<void> => {
    event?.preventDefault();
    event?.stopPropagation();

    let touchedState = {};
    Object.keys(initialValues).forEach(
      (k: string) => (touchedState = { ...touchedState, [k]: true })
    );
    setFormState({
      type: 'RESET_FORM',
      payload: {
        values: formInitialValues.current,
        touched: touchedState,
      },
    });
  };

  const setFieldValue = async (
    field: string,
    value: any,
    shouldValidate = true
  ): Promise<void> => {
    setFormState({
      type: 'SET_FIELD_VALUE',
      payload: {
        field,
        value,
      },
    });
    if (shouldValidate)
      setFormState({
        type: 'SET_FIELD_TOUCHED',
        payload: {
          field,
          value: true,
        },
      });
  };

  const setFieldErrors = async (
    errorObj: FormErrors<Values>
  ): Promise<void> => {
    Object.entries(errorObj)?.forEach(([k, val]) => {
      setFormState({
        type: 'SET_FIELD_ERROR',
        payload: {
          field: k,
          value: val,
        },
      });
      setFormState({
        type: 'SET_FIELD_TOUCHED',
        payload: {
          field: k,
          value: true,
        },
      });
    });
  };

  if (!formRef) {
    formRef = React.useRef();
  }
  useImperativeHandle(formRef, () => ({
    doSubmit: handleSubmit,
    doReset: handleReset,
    setFieldErrors,
    setFieldValue,
  }));

  const handleValidation = useCallback(async () => {
    setFormState({
      type: 'SET_ISVALIDATING',
      payload: true,
    });

    let validationErrors = {};

    // run validations against validationSchema if present
    if (
      formValidationSchema.current &&
      Object.keys(formValidationSchema.current)?.length
    ) {
      const pr = validateYupSchema(
        prepareDataForValidation(values),
        formValidationSchema.current
      );

      try {
        await pr;
        validationErrors = {}; // reset errors if no errors from validation
      } catch (err) {
        validationErrors = yupToFormErrors(err);
      }
    }

    // run validations with validate function if passed as prop and merge with the errors from the above step
    if (validate && typeof validate === 'function') {
      try {
        validationErrors = {
          ...validationErrors,
          ...((await validate(values)) || {}),
        };
      } catch (err) {
        console.error(`Error in calling validate function ${err.message}`);
        validationErrors = { ...validationErrors };
      }
    }
    setFormState({
      type: 'SET_VALIDATION_RESULT',
      payload: {
        errors: validationErrors,
        isValidating: false,
      },
    });

    return validationErrors;
  }, [values]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current) handleValidation();
  }, [values, handleValidation]);

  const memoizedHandleInput: any = useMemo(() => {
    return {};
  }, []);

  const handleInput = useCallback(
    (field: string, inputType: string) => {
      if (!memoizedHandleInput[field]) {
        memoizedHandleInput[field] = (event: any, ref: any) => {
          const value = getElementValue(inputType, event, ref);

          setFormState({
            type: 'SET_HANDLE_INPUT_RESULT',
            payload: {
              field: field,
              value: value,
              touched: (validateOnInput && true) || touched[field],
              focused: field,
            },
          });
        };
      }
      return memoizedHandleInput[field];
    },
    [memoizedHandleInput]
  );

  const memoizedHandleBlur: any = useMemo(() => {
    return {};
  }, []);

  const handleBlur = useCallback(
    (field: string, inputType: string) => {
      if (!memoizedHandleBlur[field]) {
        memoizedHandleBlur[field] = (event: any, ref: any) => {
          const value = getElementValue(inputType, event, ref);

          setFormState({
            type: 'SET_HANDLE_BLUR_RESULT',
            payload: {
              field: field,
              value: value,
              touched: (validateOnBlur && true) || touched[field],
              focused: null,
            },
          });
        };
      }
      return memoizedHandleBlur[field];
    },
    [memoizedHandleBlur]
  );

  const memoizedHandleFocus: any = useMemo(() => {
    return {};
  }, []);

  const handleFocus = useCallback(
    (field: string, _inputType: string) => {
      if (!memoizedHandleFocus[field]) {
        memoizedHandleFocus[field] = (_event: any, _ref: any) => {
          setFormState({
            type: 'SET_FIELD_FOCUSED',
            payload: field,
          });
        };
      }
      return memoizedHandleFocus[field];
    },
    [memoizedHandleFocus]
  );

  const composedState = () => {
    return {
      focused,
      values,
      errors,
      touched,
      isValidating,
      isSubmitting,
    };
  };

  const composedHandlers = () => {
    return {
      handleSubmit,
      handleReset,
      handleInput,
      handleFocus,
      handleBlur,
    };
  };

  const composedUtils = (): FormUtils => {
    const inputProps = (field: string, inputType: string): any => ({
      name: field,
      type: inputType,
      handleInput: handleInput(field, inputType),
      handleChange: handleInput(field, inputType),
      handleBlur: handleBlur(field, inputType),
      handleFocus: handleFocus(field, inputType),
      id: `input-${field}`,
      value: (values as Values)[field],
    });

    const radioProps = (field: string, inputType: string): any => ({
      ...inputProps(field, inputType),
      type: inputType,
      id: `input-${field}--radio-${(values as Values)[field]}`,
      value: (values as Values)[field],
    });

    const checkboxProps = (field: string, inputType: string): any => ({
      ...inputProps(field, inputType),
      type: inputType,
      checked: !!(values as Values)[field],
    });

    const selectProps = (field: string, inputType: string): any => ({
      type: 'text',
      name: field,
      id: `input-${field}`,
      handleChange: handleInput(field, inputType),
      handleBlur: handleBlur(field, inputType),
      value:
        inputType === 'multi_select' // for multiselect pass Array
          ? (values as Values)[field]?.map((v: any) => v.value || v) || []
          : Array.isArray((values as Values)[field]) // single select but the value is an array, pass 0th index
          ? (values as Values)[field]?.map((v: any) => v.value || v)[0] || ''
          : (values as Values)[field] || '',
    });

    const labelProps = (field: string, value: any): any => ({
      htmlFor: !value ? `input-${field}` : `input-${field}--radio-${value}`,
    });

    const formProps: FormProps = {
      action: '',
      onSubmit: handleSubmit,
      onReset: handleReset,
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

  const state = composedState();
  const handlers = composedHandlers();
  const utils = composedUtils();

  const renderProps: FormRenderProps<Values> = {
    ...state,
    ...handlers,
    ...utils,
    controlProps: utils,
  };
  return (
    <form id='fw_form_wrapper' {...utils.formProps} noValidate>
      {formSchema && Object.keys(formSchema).length > 0
        ? formSchema?.fields
            ?.sort((a: any, b: any) => a.position - b.position)
            .map((field: any) => {
              return (
                <FwFormControl
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  required={field.required}
                  hint={field.hint}
                  fieldProps={field}
                  controlProps={utils}
                  touched={touched[field.name]}
                  error={errors[field.name]}
                >
                  {field.component}
                </FwFormControl>
              );
            })
        : renderer(renderProps)}
    </form>
  );
}

export default React.memo(FwForm);
