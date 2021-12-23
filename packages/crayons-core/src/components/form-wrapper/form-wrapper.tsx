import { Component, h, Prop, State, Method } from '@stencil/core';
// import * as Yup from 'yup';

// /** incoming props formSchema, initialvalues, validationSchema, initialErrors */
// const formSchema = {
//   title: 'Test Form',
//   name: 'Test Form',
//   fields: [
//     {
//       id: 'first_name_id',
//       type: 'input',
//       label: 'First Name',
//       name: 'first_name',
//       position: 1,
//       editable: true,
//       custom: false,
//       inputType: 'text',
//       placeholder: 'Enter firstname ...',
//       required: true,
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       id: 'last_name_id',
//       type: 'input',
//       label: 'Last Name',
//       name: 'last_name',
//       position: 1,
//       editable: true,
//       custom: false,
//       inputType: 'text',
//       placeholder: 'Enter last name...',
//       required: false,
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       name: 'languages_known',
//       label: 'Languages Known',
//       type: 'select',
//       inputType: 'MULTI_SELECT',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       required: true,
//       link: '',
//       choices: [
//         {
//           id: 111,
//           value: 'English',
//           position: 1,
//         },
//         {
//           id: 222,
//           value: 'Hindi',
//           position: 2,
//         },
//         {
//           id: 333,
//           value: 'Tamil',
//           position: 3,
//         },
//       ],
//     },

//     {
//       id: 'email_id',
//       type: 'input',
//       label: 'Email',
//       name: 'email',
//       position: 1,
//       required: true,
//       editable: true,
//       custom: false,
//       inputType: 'email',
//       placeholder: 'Enter email...',
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       id: 'date_id',
//       type: 'date',
//       label: 'Date',
//       name: 'date',
//       position: 1,
//       required: true,
//       editable: true,
//       custom: false,
//       inputType: 'date',
//       placeholder: 'Enter date...',
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       id: 'description_id',
//       type: 'textarea',
//       label: 'Description',
//       name: 'description',
//       position: 1,
//       editable: true,
//       custom: false,
//       inputType: 'textarea',
//       placeholder: 'Enter Description...',
//       required: true,
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       id: 'is_indian_citizen_id',
//       type: 'checkbox',
//       label: 'Indian Citizen ?',
//       name: 'is_indian_citizen',
//       position: 1,
//       editable: true,
//       custom: false,
//       required: true,
//       inputType: 'checkbox',
//       placeholder: 'Enter...',
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       id: 'phone_number_id',
//       type: 'input',
//       label: 'Phone Number',
//       name: 'phone_number',
//       position: 1,
//       editable: true,
//       custom: false,
//       required: false,
//       inputType: 'tel',
//       placeholder: 'Enter...',
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       id: 'age_id',
//       type: 'input',
//       label: 'Age',
//       name: 'age',
//       position: 1,
//       editable: true,
//       custom: false,
//       required: false,
//       inputType: 'number',
//       placeholder: 'Enter...',
//       fieldOptions: {},
//       fields: [],
//     },
//     {
//       id: 'interested_id',
//       type: 'radio',
//       label: 'Interested',
//       name: 'interested',
//       position: 1,
//       editable: true,
//       custom: false,
//       required: true,
//       inputType: 'radio',
//       placeholder: 'Enter...',
//       optionLabelPath: 'value',
//       optionValuePath: 'value',
//       choices: [
//         {
//           id: 'yes_id',
//           value: 'Yes',
//           position: 1,
//         },
//         {
//           id: 'no_id',
//           value: 'No',
//           position: 2,
//         },
//       ],
//       fields: [],
//     },
//     {
//       id: 'personal_page_link_id',
//       type: 'input',
//       label: 'Personal Page Link',
//       name: 'personal_page_link',
//       position: 1,
//       required: true,
//       editable: true,
//       custom: false,
//       inputType: 'url',
//       placeholder: 'Enter...',
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       id: 'time_id',
//       type: 'time',
//       label: 'Select Time',
//       name: 'time',
//       position: 1,
//       required: true,
//       editable: true,
//       custom: false,
//       inputType: 'time',
//       placeholder: 'Select Time...',
//       fieldOptions: {},
//       fields: [],
//     },

//     {
//       id: 'status',
//       name: 'status',
//       label: 'Status',
//       type: 'select',
//       inputType: 'select',
//       position: 3,
//       required: true,
//       editable: true,
//       visible: false,
//       deleted: false,
//       link: null,
//       placeholder: null,
//       hint: null,
//       field_options: {},
//       filterable: true,
//       searchable: false,
//       parent_id: null,
//       choices: [
//         {
//           id: 1,
//           value: 'open',
//           position: 1,
//         },
//         {
//           id: 2,
//           value: 'pending',
//           position: 2,
//         },
//         {
//           id: 3,
//           value: 'closed',
//           position: 3,
//         },
//       ],
//     },
//     {
//       id: 'income_id',
//       parent: null,
//       type: 'input',
//       label: 'Income',
//       name: 'income',
//       position: 1,
//       editable: true,
//       custom: false,
//       required: true,
//       inputType: 'number',
//       placeholder: 'Enter...',
//       fieldOptions: {},
//       fields: [],
//     },
//   ],
// };

// const initialValues = {
//   first_name: '',
//   age: '',
//   is_indian_citizen: true,
//   abc: '',
//   sss: '',
// };

// const staticValidationSchema = Yup.object().shape({
//   age: Yup.number().max(20, 'max 20').required('Age is req'),
//   abc: Yup.string().required('custom abc is req'),
//   sss: Yup.string().required('custom sss input is req'),
// });

// function mergeSchema(...schemas) {
//   const [first, ...rest] = schemas;

//   const merged = rest.reduce(
//     (mergedSchemas, schema) => mergedSchemas.concat(schema),
//     first
//   );

//   return merged;
// }

// function createYupSchema(schema: any, config: any) {
//   const { inputType, required, name } = config;
//   let yupType = '';
//   switch (inputType) {
//     case 'text':
//     case 'textarea':
//     case 'date':
//     case 'time':
//     case 'radio':
//       yupType = 'string';
//       break;

//     case 'select':
//     case 'MULTI_SELECT':
//       yupType = 'array';
//       break;
//     case 'url':
//       yupType = 'string';
//       break;
//     case 'number':
//       yupType = 'number';
//       break;
//     case 'tel':
//       yupType = 'string';
//       break;
//     case 'checkbox':
//       yupType = 'boolean';
//       break;
//     default:
//       yupType = 'string';
//   }
//   if (!Yup[yupType]) {
//     return schema;
//   }
//   let validator = Yup[yupType]();
//   if (required) validator = validator['required'](...[`${name} is required`]);
//   else validator = validator['notRequired']();

//   if (inputType === 'url')
//     validator = validator['url'](...[`Enter a valid url`]);

//   if (inputType === 'email')
//     validator = validator['email'](...[`Enter a valid Email`]);

//   if (inputType === 'checkbox' && required)
//     validator = validator['oneOf']([true], `Select the value`);

//   if (inputType === 'select' && required)
//     validator = validator.min(1, `${name} is required`);

//   if (inputType === 'MULTI_SELECT' && required)
//     validator = validator.min(1, `Select atleast 1 option`);

//   schema[name] = validator;
//   return schema;
// }

// const initialErrors = {
//   // email: 'ssss',
// };

@Component({
  tag: 'fw-form-wrapper',
  styleUrl: 'form-wrapper.scss',
  shadow: true,
})
export class FormWrapper {
  @Prop() formSchema?: any = {};
  @Prop() initialValues?: any = {};
  @Prop() validationSchema?: any = {};
  @Prop() initialErrors?: any = {};
  @Prop() validate?: any = () => {};

  @State()
  formValidationSchema;
  @State()
  formInitialValues;
  @State()
  formInitialErrors;

  formRef: any;

  componentWillLoad(): void {
    this.formValidationSchema = this.validationSchema;
    this.formInitialErrors = this.initialErrors;
    this.formInitialValues = this.initialValues;
  }

  @Method()
  async doSubmit(e) {
    this.formRef.doSubmit(e);
  }

  @Method()
  async doReset(e) {
    this.formRef.doReset(e);
  }

  // componentWillLoad(): void {
  //   const yupSchema = this.formSchema.fields.reduce(createYupSchema, {});

  //   const dynamicValidationSchema = Yup.object().shape(yupSchema as any);

  //   this.formValidationSchema = mergeSchema(
  //     dynamicValidationSchema,
  //     this.validationSchema
  //   );

  //   const dynamicInitialValues = this.formSchema.fields.reduce((acc, field) => {
  //     return {
  //       ...acc,
  //       [field.name]: field.type === 'checkbox' ? false : undefined,
  //     };
  //   }, {});

  //   this.formInitialErrors = this.initialErrors;
  //   this.formInitialValues = { ...dynamicInitialValues, ...this.initialValues };
  // }

  render() {
    return (
      <fw-form
        initialValues={this.formInitialValues}
        validationSchema={this.formValidationSchema}
        validate={this.validate}
        initialErrors={this.formInitialErrors}
        ref={(el) => (this.formRef = el)}
      >
        {this.formSchema.fields?.map((field) => {
          return (
            <fw-form-control
              type={field.type}
              inputType={field.inputType}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              label={field.label}
              choices={field.choices}
            ></fw-form-control>
          );
        })}
      </fw-form>
    );
  }
}
