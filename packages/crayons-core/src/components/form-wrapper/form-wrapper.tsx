import { Component, h, Prop, State, Method } from '@stencil/core';
// import * as Yup from 'yup';

// /** incoming props formSchema, initialvalues, validationSchema, initialErrors */
// const formSchema = {
//   title: 'Test Form',
//   name: 'Test Form',
//   fields: [
//     {
//       id: '2978f820-704b-46c7-9f88-110e14e34a8c',
//       name: 'first_name',
//       label: 'First Name',
//       type: 'TEXT',
//       position: 3,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       placeholder: 'Enter…',
//       hint: 'Please provide a text of at max 100 characters',
//       field_options: { lego_unique_field: 'true' },
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [],
//     },

//     {
//       id: '3978f820-704b-46c7-9f88-110e14e34a8c',
//       name: 'last_name',
//       label: 'Last Name',
//       type: 'TEXT',
//       position: 3,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       placeholder: 'Enter…',
//       hint: 'Please provide a text of at max 100 characters',
//       field_options: { lego_unique_field: 'true' },
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [],
//     },

//     {
//       id: '42aecb8f-25cf-47ce-89c6-5410fe3d4315',
//       name: 'languages_known',
//       label: 'Languages Known',
//       type: 'MULTI_SELECT',
//       position: 13,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       placeholder: 'Enter…',
//       hint: 'Select one or more values',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [
//         {
//           id: 1,
//           value: 'English',
//           position: 1,
//           dependent_ids: {},
//         },
//         {
//           id: 2,
//           value: 'Hindi',
//           position: 2,
//           dependent_ids: {},
//         },
//         {
//           id: 3,
//           value: 'Tamil',
//           position: 3,
//           dependent_ids: {},
//         },
//       ],
//     },

//     {
//       id: '6978f820-704b-46c7-9f88-110e14e34a8c',
//       name: 'email',
//       label: 'Email',
//       type: 'EMAIL',
//       position: 3,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       placeholder: 'Enter…',
//       hint: 'Please provide an email Id',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [],
//     },

//     {
//       id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
//       name: 'date_of_birth',
//       label: 'Date Of Birth',
//       type: 'DATE',
//       position: 11,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       Placeholder: 'Enter…',
//       hint: 'Please enter your date of birth',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [],
//     },

//     {
//       id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
//       name: 'landmark',
//       label: 'Landmark',
//       type: 'PARAGRAPH',
//       position: 7,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       Placeholder: 'Enter some text…',
//       hint: 'Please enter the nearest landmark',
//       field_options: {},
//       filterable: false,
//       searchable: true,
//       parent_id: null,
//       choices: [],
//     },

//     {
//       id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
//       name: 'is_indian_citizen',
//       label: 'Indian Citizen?',
//       type: 'CHECKBOX',
//       position: 7,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       placeholder: null,
//       hint: 'Check or Uncheck the box',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [],
//     },

//     {
//       id: '8978f820-704b-46c7-9f88-110e14e34a8c',
//       name: 'phone_number',
//       label: 'Phone number',
//       type: 'TEXT',
//       position: 3,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       placeholder: 'Enter…',
//       hint: 'Please provide your phone number',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [],
//     },

//     {
//       id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
//       name: 'pincode',
//       label: 'Pincode',
//       type: 'NUMBER',
//       position: 8,
//       required: false,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       Placeholder: 'Enter…',
//       hint: 'Please enter your Pincode',
//       field_options: {},
//       filterable: true,
//       searchable: true, // For the field to be used as filter condition in search API, this needs to be set
//       parent_id: null,
//       choices: [],
//     },

//     {
//       id: 'ba53775e-2948-4065-8a59-d99d4494e845',
//       name: 'gender',
//       label: 'Gender',
//       type: 'RADIO',
//       position: 5,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       placeholder: null,
//       hint: 'Please specify your gender',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [
//         {
//           id: 1,
//           value: 'Female',
//           position: 1,
//           dependent_ids: {},
//         },
//         {
//           id: 2,
//           value: 'Male',
//           position: 2,
//           dependent_ids: {},
//         },
//       ],
//     },

//     {
//       id: '42aecb8f-25cf-47ce-89c6-5410fe3d4315',
//       name: 'order_status',
//       label: 'Order Status',
//       type: 'DROPDOWN',
//       position: 4,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       placeholder: 'Enter…',
//       hint: 'Select a value',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [
//         {
//           id: 1,
//           value: 'open',
//           position: 1,
//           dependent_ids: {},
//         },
//         {
//           id: 2,
//           value: 'pending',
//           position: 2,
//           dependent_ids: {},
//         },
//         {
//           id: 3,
//           value: 'closed',
//           position: 3,
//           dependent_ids: {},
//         },
//       ],
//     },

//     {
//       id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
//       name: 'amount_paid',
//       label: 'Amount Paid',
//       type: 'DECIMAL',
//       position: 10,
//       required: true,
//       editable: true,
//       visible: true,
//       deleted: false,
//       link: null,
//       Placeholder: 'Enter…',
//       hint: 'Please enter the amount paid',
//       field_options: {},
//       filterable: true,
//       searchable: true,
//       parent_id: null,
//       choices: [],
//     },
//   ],
// };
// const initialValues = {
//   // is_indian_citizen: true,
// };

// const staticValidationSchema = Yup.object().shape({
//   age: Yup.number().max(20, 'max 20').required('Age is req'),
//   abc: Yup.string().required('custom abc is req'),
//   abc1: Yup.string().required('custom React abc1 is req'),
// });

// function mergeSchema(...schemas: any) {
//   const [first, ...rest] = schemas;

//   const merged = rest.reduce(
//     (mergedSchemas: string | any[], schema: any) =>
//       mergedSchemas.concat(schema),
//     first
//   );

//   return merged;
// }

// function createYupSchema(schema: any, config: any) {
//   const { type, required, name } = config;
//   let yupType;
//   switch (type) {
//     case 'TEXT':
//     case 'PARAGRAPH':
//     case 'DATE':
//     case 'TIME':
//     case 'RADIO':
//       yupType = 'string';
//       break;

//     case 'DROPDOWN':
//     case 'MULTI_SELECT':
//       yupType = 'array';
//       break;
//     case 'url':
//       yupType = 'string';
//       break;
//     case 'NUMBER':
//       yupType = 'number';
//       break;
//     case 'TEL':
//       yupType = 'string';
//       break;
//     case 'CHECKBOX':
//       yupType = 'boolean';
//       break;
//     default:
//       yupType = 'string';
//   }
//   if (!Yup[yupType as keyof typeof Yup]) {
//     return schema;
//   }
//   let yupMethod = yupType as keyof typeof Yup;
//   let validator = Yup[yupMethod] as any;
//   validator = validator();
//   if (required) validator = validator['required'](...[`${name} is required`]);
//   else validator = validator['notRequired']();

//   if (type === 'URL') validator = validator['url'](...[`Enter a valid url`]);

//   if (type === 'EMAIL')
//     validator = validator['email'](...[`Enter a valid Email`]);

//   if (type === 'CHECKBOX' && required)
//     validator = validator['oneOf']([true], `${name} is required`);

//   if ((type === 'DROPDOWN' || type === 'MULTI_SELECT') && required)
//     validator = validator.min(1, `${name} is required`);

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
              key={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              required={field.required}
              hint={field.hint}
              fieldProps={field}
            ></fw-form-control>
          );
        })}
      </fw-form>
    );
  }
}
