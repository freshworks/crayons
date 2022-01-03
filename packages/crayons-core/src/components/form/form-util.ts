/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import isPlainObject from 'lodash/isPlainObject';
import clone from 'lodash/clone';
import toPath from 'lodash/toPath';
import * as Yup from 'yup';
import { FormValues } from './form-declaration';

export const isSelectType = (type: string): boolean =>
  !!type && type === 'select';

export const getElementValue = (
  _type: string,
  event: any,
  result: any
): any => {
  let value: any = result && result.value;
  if (!result) {
    value = event && event.target && event.target.value;
  }
  return value;
};

/**
 * Recursively prepare values.
 */
export function prepareDataForValidation(values: [] | any) {
  const data: any = Array.isArray(values) ? [] : {};
  for (const k in values) {
    if (Object.prototype.hasOwnProperty.call(values, k)) {
      const key: any = String(k);
      if (Array.isArray(values[key]) === true) {
        data[key] = values[key].map((value: any) => {
          if (Array.isArray(value) === true || isPlainObject(value)) {
            return prepareDataForValidation(value);
          } else {
            return value !== '' ? value : undefined;
          }
        });
      } else if (isPlainObject(values[key])) {
        data[key] = prepareDataForValidation(values[key]);
      } else {
        data[key] = values[key] !== '' ? values[key] : undefined;
      }
    }
  }
  return data;
}

export function validateYupSchema(values: any, schema: any): Promise<any> {
  const validateData = prepareDataForValidation(values);
  return schema['validate'](validateData, {
    abortEarly: false,
  });
}

export function yupToFormErrors(yupError: any) {
  let errors = {};
  if (yupError.inner) {
    if (yupError.inner.length === 0) {
      return setIn(errors, yupError.path, yupError.message);
    }
    for (const err of yupError.inner) {
      if (!getIn(errors, err.path)) {
        errors = setIn(errors, err.path, err.message);
      }
    }
  }
  return errors;
}
/** @private is the given object an Object? */
export const isObject = (obj: any) => obj !== null && typeof obj === 'object';

/** @private is the given object an integer? */
export const isInteger = (obj: any): boolean =>
  String(Math.floor(Number(obj))) === obj;

/**
 * Deeply get a value from an object via its path.
 */
export function getIn(obj: any, key: string | string[], def?: any, p = 0) {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }
  return obj === undefined ? def : obj;
}
/** set values recursively on the object based on the given path */
export function setIn(obj: any, path: string, value: any): any {
  const res: any = clone(obj);
  let resVal: any = res;
  let i = 0;
  const pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath: string = pathArray[i];
    const currentObj: any = getIn(obj, pathArray.slice(0, i + 1));

    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = clone(currentObj);
    } else {
      const nextPath: string = pathArray[i + 1];
      resVal = resVal[currentPath] =
        isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  // Return original object if new value is the same as current
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }

  // If the path array has a single element, the loop did not run.
  // Deleting on `resVal` had no effect in this scenario, so we delete on the result instead.
  if (i === 0 && value === undefined) {
    delete res[pathArray[i]];
  }

  return res;
}

/**
 * Recursively a set the same value for all keys and arrays nested object, cloning
 * @param object
 * @param value
 * @param visited
 * @param response
 */
export function setNestedObjectValues<T>(
  object: any,
  value: any,
  visited: any = new WeakMap(),
  response: any = {}
): T {
  for (const k of Object.keys(object)) {
    const val = object[k];
    if (isObject(val)) {
      if (!visited.get(val)) {
        visited.set(val, true);
        // In order to keep array values consistent for both dot path  and
        // bracket syntax, we need to check if this is an array so that
        // this will output  { friends: [true] } and not { friends: { "0": true } }
        response[k] = Array.isArray(val) ? [] : {};
        setNestedObjectValues(val, value, visited, response[k]);
      }
    } else {
      response[k] = value;
    }
  }

  return response;
}

function mergeSchema(...schemas: any) {
  const [first, ...rest] = schemas;

  const merged =
    rest?.reduce((mergedSchemas: string | any[], schema: any) => {
      if (!schema || !Object.keys(schema).length) return mergedSchemas;
      return mergedSchemas.concat(schema);
    }, first) || {};

  return merged;
}

function createYupSchema(schema: any, config: any) {
  const { type, required, name } = config;
  let yupType;
  switch (type) {
    case 'TEXT':
    case 'PARAGRAPH':
    case 'DATE':
    case 'TIME':
    case 'RADIO':
    case 'EMAIL':
    case 'TEL':
    case 'URL':
      yupType = 'string';
      break;
    case 'DROPDOWN':
    case 'MULTI_SELECT':
      yupType = 'array';
      break;
    case 'NUMBER':
    case 'DECIMAL':
      yupType = 'number';
      break;
    case 'CHECKBOX':
      yupType = 'boolean';
      break;
    default:
      yupType = 'string';
  }
  if (!Yup[yupType as keyof typeof Yup]) {
    return schema;
  }
  const yupMethod = yupType as keyof typeof Yup;
  let validator = Yup[yupMethod] as any;
  validator = validator();
  if (required) validator = validator['required'](...[`${name} is required`]);
  else validator = validator['notRequired']();

  if (type === 'URL') validator = validator['url'](...[`Enter a valid url`]);

  if (type === 'EMAIL')
    validator = validator['email'](...[`Enter a valid Email`]);

  if (type === 'CHECKBOX' && required)
    validator = validator['oneOf']([true], `${name} is required`);

  if ((type === 'DROPDOWN' || type === 'MULTI_SELECT') && required)
    validator = validator.min(1, `${name} is required`);

  schema[name] = validator;
  return schema;
}
export const generateDynamicValidationSchema = (
  formSchema: any = {},
  validationSchema: any = {}
): any => {
  const yupSchema = formSchema?.fields?.reduce(createYupSchema, {}) || {};
  const dynamicValidationSchema =
    (formSchema?.fields && Yup.object().shape(yupSchema as any)) || {};
  const formValidationSchema = mergeSchema(
    dynamicValidationSchema,
    validationSchema
  );
  return formValidationSchema;
};

export const generateDynamicInitialValues = (
  formSchema: any,
  initialValues: FormValues = {}
): FormValues => {
  const dynamicInitialValues =
    formSchema?.fields?.reduce((acc: any, field: any) => {
      return {
        ...acc,
        [field.name]: field.type === 'CHECKBOX' ? false : undefined,
      };
    }, {}) || {};
  const formInitialValues = { ...dynamicInitialValues, ...initialValues };
  return formInitialValues;
};
