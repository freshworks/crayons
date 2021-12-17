import { Component, h, Fragment, Prop, State } from '@stencil/core';
import * as Yup from 'yup';

/** incoming props formSchema, initialvalues, validationSchema, initialErrors */
const formSchema = {
  title: 'Test Form',
  name: 'Test Form',
  fields: [
    {
      id: 'first_name_id',
      type: 'input',
      label: 'First Name',
      name: 'first_name',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'text',
      placeholder: 'Enter firstname ...',
      required: true,
      fieldOptions: {},
      fields: [],
    },

    {
      id: 'last_name_id',
      type: 'input',
      label: 'Last Name',
      name: 'last_name',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'text',
      placeholder: 'Enter last name...',
      required: false,
      fieldOptions: {},
      fields: [],
    },

    {
      id: 'email_id',
      type: 'input',
      label: 'Email',
      name: 'email',
      position: 1,
      required: true,
      editable: true,
      custom: false,
      inputType: 'email',
      placeholder: 'Enter email...',
      fieldOptions: {},
      fields: [],
    },

    {
      id: 'date_id',
      type: 'date',
      label: 'Date',
      name: 'date',
      position: 1,
      required: true,
      editable: true,
      custom: false,
      inputType: 'date',
      placeholder: 'Enter date...',
      fieldOptions: {},
      fields: [],
    },

    {
      id: 'description_id',
      type: 'textarea',
      label: 'Description',
      name: 'description',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'textarea',
      placeholder: 'Enter Description...',
      required: true,
      fieldOptions: {},
      fields: [],
    },

    {
      id: 'is_indian_citizen_id',
      type: 'checkbox',
      label: 'Indian Citizen ?',
      name: 'is_indian_citizen',
      position: 1,
      editable: true,
      custom: false,
      required: true,
      inputType: 'checkbox',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },

    {
      id: 'phone_number_id',
      type: 'input',
      label: 'Phone Number',
      name: 'phone_number',
      position: 1,
      editable: true,
      custom: false,
      required: false,
      inputType: 'tel',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },

    {
      id: 'age_id',
      type: 'input',
      label: 'Age',
      name: 'age',
      position: 1,
      editable: true,
      custom: false,
      required: false,
      inputType: 'number',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'interested_id',
      type: 'radio',
      label: 'Interested',
      name: 'interested',
      position: 1,
      editable: true,
      custom: false,
      required: false,
      inputType: 'radio',
      placeholder: 'Enter...',
      optionLabelPath: 'value',
      optionValuePath: 'value',
      choices: [
        {
          id: 'yes_id',
          value: 'Yes',
          position: 1,
        },
        {
          id: 'no_id',
          value: 'No',
          position: 2,
        },
      ],
      fields: [],
    },
    {
      id: 'personal_page_link_id',
      type: 'input',
      label: 'Personal Page Link',
      name: 'personal_page_link',
      position: 1,
      required: true,
      editable: true,
      custom: false,
      inputType: 'url',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'income_id',
      parent: null,
      type: 'input',
      label: 'Income',
      name: 'income',
      position: 1,
      editable: true,
      custom: false,
      required: true,
      inputType: 'number',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
  ],
};

// const initialValues = {
//   first_name: 'skdidiw',
//   email: '',
//   phone_number: '',
//   description: '',
//   age: '',
//   personal_page_link: '',
//   income: '',
// };

const initialValues = {
  age: '',
  is_indian_citizen: true,
};

const staticValidationSchema = Yup.object().shape({
  age: Yup.number().max(20, 'max 20').required('Age is req'),
});

// const validationSchema = Yup.object().shape({
//   last_name: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .notRequired(),
//   email: Yup.string().email('Invalid email').required('Email is Required'),
//   first_name: Yup.string()
//     .min(2, 'First_name Too Short!')
//     .max(50, 'First_name Too Long!')
//     .when('last_name', (last_name, schema) => {
//       return (
//         last_name &&
//         schema.required(' first name is required if last_name is entered')
//       );
//     }),
//   age: Yup.number().required('Age is Required'),
//   income: Yup.number().required('Income is Required'),
//   personal_page_link: Yup.string()
//     .url('Invalid URL')
//     .required('URL is Required'),
//   phone_number: Yup.string().required('Phone no is Required'),
// });

function mergeSchema(...schemas) {
  const [first, ...rest] = schemas;

  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  );

  return merged;
}

function createYupSchema(schema, config) {
  const { inputType, required, name } = config;
  let yupType = '';
  switch (inputType) {
    case 'text':
    case 'textarea':
    case 'date':
    case 'radio':
      yupType = 'string';
      break;
    case 'url':
      yupType = 'string';
      break;
    case 'number':
      yupType = 'number';
      break;
    case 'tel':
      yupType = 'string';
      break;
    case 'checkbox':
      yupType = 'boolean';
      break;
    default:
      yupType = 'string';
  }
  if (!Yup[yupType]) {
    return schema;
  }
  let validator = Yup[yupType]();
  if (required) validator = validator['required'](...[`${name} is required`]);
  else validator = validator['notRequired']();

  if (inputType === 'url')
    validator = validator['url'](...[`Enter a valid url`]);

  if (inputType === 'email')
    validator = validator['email'](...[`Enter a valid Email`]);

  if (inputType === 'checkbox' && required)
    validator = validator['oneOf']([true], `Select the value`);

  schema[name] = validator;
  return schema;
}

const initialErrors = {
  // email: 'ssss',
};

@Component({
  tag: 'fw-form-wrapper',
  styleUrl: 'form-wrapper.scss',
  shadow: true,
})
export class FormWrapper {
  @Prop() formSchema = formSchema;
  @Prop() initialValues = initialValues;
  @Prop() validationSchema = staticValidationSchema as any;
  @Prop() initialErrors = initialErrors as any;

  @State()
  formValidationSchema;
  @State()
  formInitialValues;
  @State()
  formInitialErrors;

  componentWillLoad(): void {
    const yupSchema = this.formSchema.fields.reduce(createYupSchema, {});

    const dynamicValidationSchema = Yup.object().shape(yupSchema as any);

    this.formValidationSchema = mergeSchema(
      dynamicValidationSchema,
      this.validationSchema
    );

    const dynamicInitialValues = this.formSchema.fields.reduce((acc, field) => {
      return {
        ...acc,
        [field.name]: field.type === 'checkbox' ? false : '',
      };
    }, {});

    this.formInitialErrors = this.initialErrors;
    this.formInitialValues = { ...dynamicInitialValues, ...this.initialValues };
  }

  render() {
    return (
      <fw-form
        initialValues={this.formInitialValues}
        validationSchema={this.formValidationSchema}
        initialErrors={this.formInitialErrors}
        renderer={(props) => {
          const {
            errors,
            formProps,
            labelProps,
            inputProps,
            checkboxProps,
            touched,
          } = props;
          return (
            <div>
              <form {...formProps} novalidate>
                {formSchema.fields.map((field) => {
                  let cmp = '';
                  switch (field.type) {
                    case 'input':
                      cmp = (
                        <Fragment>
                          <fw-input
                            {...inputProps(field.name, field.inputType)}
                            type={field.inputType}
                            label={field.label}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                          ></fw-input>
                          {touched[field.name] && errors[field.name] && (
                            <label class='error' {...labelProps(field.name)}>
                              {' '}
                              {errors[field.name]}{' '}
                            </label>
                          )}
                        </Fragment>
                      );
                      break;

                    case 'textarea':
                      cmp = (
                        <Fragment>
                          <fw-textarea
                            {...inputProps(field.name, field.inputType)}
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.name}
                            required={field.required}
                          ></fw-textarea>
                          {touched[field.name] && errors[field.name] && (
                            <label class='error' {...labelProps(field.name)}>
                              {' '}
                              {errors[field.name]}{' '}
                            </label>
                          )}
                        </Fragment>
                      );
                      break;

                    case 'date':
                      cmp = (
                        <Fragment>
                          <fw-datepicker
                            {...inputProps(field.name, field.inputType)}
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.name}
                            required={field.required}
                          ></fw-datepicker>
                          {touched[field.name] && errors[field.name] && (
                            <label class='error' {...labelProps(field.name)}>
                              {' '}
                              {errors[field.name]}{' '}
                            </label>
                          )}
                        </Fragment>
                      );
                      break;

                    case 'checkbox':
                      cmp = (
                        <div>
                          <fw-checkbox
                            {...checkboxProps(field.name)}
                            placeholder={field.placeholder}
                            name={field.name}
                            required={field.required}
                          >
                            {field.label}
                          </fw-checkbox>
                          <div>
                            {touched[field.name] && errors[field.name] && (
                              <label class='error' {...labelProps(field.name)}>
                                {' '}
                                {errors[field.name]}{' '}
                              </label>
                            )}
                          </div>
                        </div>
                      );
                      break;

                    case 'radio':
                      cmp = (
                        <Fragment>
                          <div>
                            <fw-radio-group
                              allow-empty
                              {...inputProps(field.name, field.inputType)}
                              label={field.label}
                              placeholder={field.placeholder}
                              name={field.name}
                              required={field.required}
                            >
                              {' '}
                              {field.choices.map((ch, i) => {
                                return (
                                  <fw-radio value={ch.value}>
                                    {ch.value}
                                  </fw-radio>
                                );
                              })}
                            </fw-radio-group>
                            <div>
                              {touched[field.name] && errors[field.name] && (
                                <label
                                  class='error'
                                  {...labelProps(field.name)}
                                >
                                  {' '}
                                  {errors[field.name]}{' '}
                                </label>
                              )}
                            </div>
                          </div>
                        </Fragment>
                      );
                      break;
                    default:
                      cmp = <p>unknown</p>;
                      break;
                  }
                  return cmp;
                })}
                <br />
                <br />
                <button type='submit'>Submit</button>
              </form>
            </div>
          );
        }}
      ></fw-form>
    );
  }
}
