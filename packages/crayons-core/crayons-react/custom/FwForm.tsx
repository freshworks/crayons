import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  useReducer,
} from 'react';
import { FwFormControl } from '../FwFormControl';
import {
  getElementValue,
  validateYupSchema,
  prepareDataForValidation,
  yupToFormErrors,
  setIn,
} from './form-util';

interface FormParams {
  initialValues?: any;
  formSchema?: any;
  renderer?: any;
  initialErrors?: any;
  validationSchema?: any;
  validateOnInput?: boolean;
  validateOnBlur?: boolean;
  formRef: any;
  validate?: any;
}

function FwForm({
  initialValues = {},
  formSchema = {},
  renderer = (_props: any) => {},
  initialErrors = {},
  validationSchema = {},
  validateOnInput = true,
  validateOnBlur = true,
  formRef,
  validate = (_val: any): Promise<any> => {
    return Promise.resolve();
  },
}: FormParams) {
  let dirty = false;

  const isMounted = useRef(false);

  const INITIAL_STATE: {
    isValidating: boolean;
    isSubmitting: boolean;
    focused: any;
    values: any;
    touched: any;
    errors: any;
  } = {
    isValidating: false,
    isSubmitting: false,
    focused: null,
    values: {},
    touched: {},
    errors: {},
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET_VALUES':
        return { ...state, values: action.payload };
      case 'SET_ERRORS':
        return { ...state, errors: action.payload };
      case 'SET_TOUCHED':
        return { ...state, touched: action.payload };
      case 'SET_FOCUSED':
        return { ...state, focused: action.payload };
      case 'SET_IS_VALIDATING':
        return { ...state, isValidating: action.payload };
      case 'SET_IS_SUBMITTING':
        return { ...state, isSubmitting: action.payload };
      case 'SET_FIELD_VALUE':
        return {
          ...state,
          values: setIn(
            state.values,
            action.payload.field,
            action.payload.value
          ),
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
          errors: setIn(
            state.errors,
            action.payload.field,
            action.payload.value
          ),
        };
      case 'RESET_FORM':
        return {
          ...state,
          isSubmitting: false,
          values: initialValues,
          errors: {},
          touched: {},
          focused: null,
        };
      case 'SET_VALIDATION_RESULT':
        return {
          ...state,
          isSubmitting: false,
          errors: action.payload.errors,
        };
      case 'SET_BLUR_RESULT':
        return {
          ...state,
          focused: action.payload.focused,
          touched: setIn(state.touched, action.payload.field, true),
          values: setIn(
            state.values,
            action.payload.field,
            action.payload.value
          ),
        };
      case 'SET_INITIAL_VALUES': {
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
  };

  const [formState, setFormState] = useReducer(reducer, INITIAL_STATE);

  const { isValidating, isSubmitting, focused, values, touched, errors } =
    formState;

  useEffect(() => {
    console.log('initialize state');

    let touchedState = {};
    let errorState = {};
    for (const field of Object.keys(initialValues)) {
      errorState = { ...errorState, [field]: null };
      touchedState = { ...touchedState, [field]: false };
    }
    errorState = { ...errorState, ...initialErrors };

    for (const field of Object.keys({ ...initialErrors })) {
      touchedState = { ...touchedState, [field]: true };
    }

    setFormState({
      type: 'SET_INITIAL_VALUES',
      payload: {
        errors: errorState,
        touched: touchedState,
        values: initialValues,
      },
    });

    console.log('Initialized values, touched and error state');
  }, []);

  const handleSubmit = async (event?: any) => {
    event?.preventDefault();
    event?.stopPropagation();

    setFormState({
      type: 'SET_IS_SUBMITTING',
      payload: true,
    });

    let isValid = false;

    const validationErrors = await handleValidation();

    console.log({ errors: validationErrors });

    const keys = [...Object.keys(values), ...Object.keys(validationErrors)];

    let touchedState = {};

    keys.forEach((k) => (touchedState = { ...touchedState, [k]: true }));

    // on clicking submit, mark touched fields
    setFormState({
      type: 'SET_TOUCHED',
      payload: touchedState,
    });

    isValid = !validationErrors || Object.keys(validationErrors).length === 0;

    console.log({ values: values });

    console.log('is Valid Form', isValid);

    setFormState({
      type: 'SET_IS_SUBMITTING',
      payload: false,
    });

    return { values, isValid };
  };

  const handleReset = (event?: any) => {
    event?.preventDefault();
    event?.stopPropagation();

    setFormState({
      type: 'RESET_FORM',
    });
  };

  const setFieldValue = (fieldObj: any) => {
    Object.entries(fieldObj)?.forEach(([field, value]) => {
      setFormState({
        type: 'SET_FIELD_VALUE',
        payload: {
          field,
          value,
        },
      });
      setFormState({
        type: 'SET_FIELD_TOUCHED',
        payload: {
          field,
          value: true,
        },
      });
    });
  };

  const setFieldErrors = (errorObj: any) => {
    setFormState({
      type: 'SET_ERRORS',
      payload: errorObj,
    });

    Object.keys(errorObj)?.forEach((k: any) =>
      setFormState({
        type: 'SET_FIELD_TOUCHED',
        payload: {
          field: k,
          value: true,
        },
      })
    );
  };

  const ref = React.useRef();
  if (!formRef) {
    formRef = ref;
  }
  useImperativeHandle(formRef, () => ({
    doSubmit: handleSubmit,
    doReset: handleReset,
    setFieldErrors,
    setFieldValue,
  }));

  const handleValidation = useCallback(async () => {
    console.log('handle validation');

    setFormState({
      type: 'SET_IS_VALIDATING',
      payload: true,
    });

    let validationErrors = {};
    if (validationSchema && Object.keys(validationSchema)?.length) {
      const pr = validateYupSchema(
        prepareDataForValidation(values),
        validationSchema
      );

      try {
        await pr;
        validationErrors = {}; // reset errors if no errors from validation
      } catch (err) {
        validationErrors = yupToFormErrors(err);
      }
    } else if (validate && typeof validate === 'function') {
      try {
        validationErrors = (await validate(values)) || {};
      } catch (err) {
        console.error(`Error in calling validate function ${err.message}`);
        validationErrors = {};
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
    if (validateOnInput || validateOnBlur) {
      if (isMounted.current) handleValidation();
      else isMounted.current = true;
    }
  }, [values, handleValidation, validateOnBlur, validateOnInput]);

  const memoizedHandleInput: any = useMemo(() => {
    return {};
  }, []);

  const handleInput = useCallback(
    (field: string, inputType: string) => {
      if (!memoizedHandleInput[field]) {
        memoizedHandleInput[field] = (event: any, ref: any) => {
          const value = getElementValue(inputType, event, ref);

          setFormState({
            type: 'SET_FIELD_VALUE',
            payload: {
              field: field,
              value: value,
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
            type: 'SET_BLUR_RESULT',
            payload: {
              field: field,
              value: value,
              touched: true,
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
            type: 'SET_FOCUSED',
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
    return { handleSubmit, handleReset, handleInput, handleFocus, handleBlur };
  };

  const computeProps = () => {
    dirty = !Object.values(touched).every((x: any) => !x);
  };

  const composedComputedProps = () => {
    computeProps();
    return { dirty, initialValues };
  };

  const composedUtils = () => {
    const inputProps = (field: string, inputType: string) => ({
      name: field,
      type: inputType,
      handleInput: handleInput(field, inputType),
      handleChange: handleInput(field, inputType),
      handleBlur: handleBlur(field, inputType),
      handleFocus: handleFocus(field, inputType),
      id: `input-${field}`,
      value: values[field],
    });

    const radioProps = (field: string, inputType: string) => ({
      ...inputProps(field, inputType),
      type: inputType,
      id: `input-${field}--radio-${values[field]}`,
      value: values[field],
    });

    const checkboxProps = (field: string, inputType: string) => ({
      ...inputProps(field, inputType),
      type: inputType,
      checked: !!values[field],
    });

    const selectProps = (field: string, inputType: string) => ({
      type: 'text',
      name: field,
      id: `input-${field}`,
      handleChange: handleInput(field, inputType),
      handleBlur: handleBlur(field, inputType),
      value:
        inputType === 'multi_select' // for multiselect pass Array
          ? values[field]?.map((v: any) => v.value || v) || []
          : Array.isArray(values[field]) // single select but the value is an array, pass 0th index
          ? values[field]?.map((v: any) => v.value || v)[0] || ''
          : values[field] || '',
    });

    const labelProps = (field: string, value: any) => ({
      htmlFor: !value ? `input-${field}` : `input-${field}--radio-${value}`,
    });

    const formProps = {
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
  const computedProps = composedComputedProps();
  const utils = composedUtils();

  const renderProps = {
    ...state,
    ...handlers,
    ...computedProps,
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
