import { Component, h, Fragment } from '@stencil/core';
import * as Yup from 'yup';
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
      required: false,
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
      editable: true,
      custom: false,
      inputType: 'email',
      placeholder: 'Enter email...',
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
      inputType: 'number',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'personal_page_link_id',
      type: 'input',
      label: 'Personal Page Link',
      name: 'personal_page_link',
      position: 1,
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
      inputType: 'number',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
  ],
};
const validationSchema = Yup.object().shape({
  last_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  email: Yup.string().email('Invalid email').required('Required'),
  first_name: Yup.string()
    .min(2, 'First_name Too Short!')
    .max(50, 'First_name Too Long!')
    .when('last_name', (last_name, schema) => {
      return (
        last_name &&
        schema.required(' first name is required if last_name is entered')
      );
    }),
});

@Component({
  tag: 'fw-form-wrapper',
  styleUrl: 'form-wrapper.scss',
  shadow: true,
})
export class FormWrapper {
  private initialValues = {
    first_name: 'skdidiw',
    email: '',
    phone_number: '',
    description: '',
    age: '',
    personal_page_link: '',
    income: '',
  };

  private validate = (state) => {
    const {
      first_name,
      email,
      phone_number,
      description,
      age,
      personal_page_link,
      income,
    } = state;
    console.log({
      first_name,
      email,
      phone_number,
      description,
      age,
      personal_page_link,
      income,
    });
    if (first_name.value !== 'Arvind')
      first_name.setCustomValidity('First name should be Arvind.');
    return;
  };

  render() {
    return (
      <fw-form
        initialValues={this.initialValues}
        validate={this.validate}
        validationSchema={validationSchema}
        initialErrors={{
          email: 'ssss',
        }}
        renderer={(props) => {
          const {
            errors,
            formProps,
            groupProps,
            labelProps,
            inputProps,
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
                            {...inputProps(field.name)}
                            type={field.inputType}
                            label={field.label}
                            name={field.name}
                            placeholder={field.placeholder}
                            required='true'
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

                    // case 'textarea':
                    //   cmp = (
                    //     <fw-textarea
                    //       {...inputProps(field.name)}
                    //       label={field.label}
                    //       placeholder={field.placeholder}
                    //       name={field.name}
                    //     ></fw-textarea>
                    //   );
                    //   break;

                    case 'datepicker':
                      cmp = <fw-datepicker></fw-datepicker>;
                      break;
                    case 'timepicker':
                      cmp = <fw-timepicker></fw-timepicker>;
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
