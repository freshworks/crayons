import { Component, h } from '@stencil/core';

const formSchema = {
  title: 'Test Form',
  name: 'Test Form',
  fields: [
    {
      id: 'first_name_id',
      type: 'text',
      label: 'First Name',
      name: 'first_name',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'text-field',
      placeholder: 'Enter...',
      required: true,
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'gender_id',
      type: 'dropdown',
      label: 'Gender',
      name: 'gender',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'power-select-field',
      placeholder: 'Enter...',
      optionLabelPath: 'value',
      optionValuePath: 'value',
      getChoices: [
        {
          id: 'male_id',
          value: 'Male',
          position: 1,
        },
        {
          id: 'female_id',
          value: 'Female',
          position: 2,
        },
      ],
      fields: [],
    },
    {
      id: 'email_id',
      type: 'email',
      label: 'Email',
      name: 'email',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'email-field',
      placeholder: 'Enter email...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'phone_number_id',
      type: 'phone_number',
      label: 'Phone Number',
      name: 'phone_number',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'text-field',
      placeholder: 'Enter...',
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
      inputType: 'checkbox-field',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'description_id',
      type: 'paragraph',
      label: 'Description',
      name: 'description',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'textarea-field',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'starts_at_id',
      type: 'date_time',
      label: 'Starts At',
      name: 'starts_at',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'datetime-field',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'appointment_date_id',
      type: 'text',
      label: 'Appointment Date',
      name: 'appointment_date',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'date-field',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'age_id',
      type: 'number',
      label: 'Age',
      name: 'age',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'number-field',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'personal_page_link_id',
      type: 'url',
      label: 'Personal Page Link',
      name: 'personal_page_link',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'url-field',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'interested_id',
      type: 'dropdown',
      label: 'Interested',
      name: 'interested',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'radio-field',
      placeholder: 'Enter...',
      optionLabelPath: 'value',
      optionValuePath: 'value',
      getChoices: [
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
      id: 'income_id',
      parent: null,
      type: 'decimal',
      label: 'Income',
      name: 'income',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'number-field',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [],
    },
    {
      id: 'address_id',
      type: 'section',
      label: 'Income',
      name: 'income',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'nested-section',
      placeholder: 'Enter...',
      fieldOptions: {},
      fields: [
        {
          id: 'street_id',
          parent: null,
          type: 'text',
          label: 'Street Number',
          name: 'street',
          position: 1,
          editable: true,
          custom: false,
          inputType: 'text-field',
          placeholder: 'Enter...',
          fieldOptions: {},
          fields: [],
        },
      ],
    },
    {
      id: 'skills_id',
      type: 'multi_select_dropdown',
      label: 'Skills',
      name: 'skills',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'multi-select-dropdown-field',
      placeholder: 'Enter...',
      optionLabelPath: 'value',
      optionValuePath: 'value',
      getChoices: [
        {
          id: 'java_id',
          value: 'Java',
          position: 1,
        },
        {
          id: 'ruby_id',
          value: 'Ruby',
          position: 2,
        },
      ],
      fields: [],
    },
    {
      id: 'interests_id',
      type: 'auto_complete',
      label: 'Interests',
      name: 'interests',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'auto-complete',
      placeholder: 'Enter...',
      optionLabelPath: 'name',
      optionValuePath: 'name',
      link: 'https://jsonplaceholder.typicode.com/users',
      fields: [],
    },
    {
      id: 'appointment_start_time_id',
      type: 'date_time_split',
      label: 'Appointment Start Time',
      name: 'appointment_start_time',
      position: 1,
      editable: true,
      custom: false,
      inputType: 'date-time-split-field',
      placeholder: 'Select date...;Select time...',
      required: false,
      choices: [],
      fieldOptions: {
        twenty_four_hr_format: true,
        autoclose: true,
        calendar_weeks: true,
        placeholder: { date: 'Date...', time: 'Time...' },
      },
      fields: [],
    },
  ],
};

const getType = ({ type, inputType }) => {
  if (type === 'text' && inputType === 'text-field')
    return { cmp: 'input', type: 'text' };
  else if (type === 'email' && inputType === 'email-field')
    return { cmp: 'input', type: 'email' };
  else if (type === 'phone_number' && inputType === 'text-field')
    return { cmp: 'input', type: 'phone' };
  else if (type === 'paragraph' && inputType === 'textarea-field')
    return { cmp: 'text-area' };
  else if (type === 'date_time' && inputType === 'datetime-field')
    return { cmp: 'timepicker' };
  else if (type === 'text' && inputType === 'date-field')
    return { cmp: 'datepicker' };
  else if (type === 'number' && inputType === 'number-field')
    return { cmp: 'input', type: 'number' };
  else if (type === 'url' && inputType === 'url-field')
    return { cmp: 'input', type: 'url' };
  else if (type === 'decimal' && inputType === 'number-field')
    return { cmp: 'input', type: 'number' };
  else return { cmp: 'input', type: 'text' };
};

@Component({
  tag: 'fw-form-control',
  styleUrl: 'form-control.scss',
  shadow: true,
})
export class FormControl {
  render() {
    return (
      <form>
        {formSchema.fields.map((field) => {
          const cmp2 = getType(field).cmp;
          console.log('ok', cmp2);
          let cmp = '';

          switch (cmp2) {
            case 'input':
              cmp = (
                <fw-input
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                ></fw-input>
              );
              break;

            case 'textarea':
              cmp = (
                <fw-textarea
                  label={field.label}
                  placeholder={field.placeholder}
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
          return cmp;
        })}
      </form>
    );
  }
}
