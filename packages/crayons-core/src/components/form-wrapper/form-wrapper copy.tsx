import { Component, h } from '@stencil/core';

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
      placeholder: 'Enter...',
      required: true,
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
      id: 'description_id',
      type: 'textarea',
      label: 'Description',
      name: 'description',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'textarea',
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

@Component({
  tag: 'fw-form-wrapper1',
  shadow: true,
})
export class FormWrapper1 {
  handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  // formserv
  // util function

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {formSchema.fields.map((field) => {
          let cmp = '';
          switch (field.type) {
            case 'input':
              cmp = (
                <fw-input
                  type={field.inputType}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                ></fw-input>
              );
              break;

            case 'textarea':
              cmp = (
                <fw-textarea
                  label={field.label}
                  placeholder={field.placeholder}
                  name={field.name}
                ></fw-textarea>
              );
              break;

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
          return (
            <div>
              {field.type} , {field.inputType}
              {cmp}
            </div>
          );
        })}
        <button type='submit'>Submit</button>
      </form>
    );
  }
}
