import { newE2EPage } from '@stencil/core/testing';

describe('fw-form', () => {
  const props = {
    formSchema: {
      title: 'Test Form',
      name: 'Test Form',
      fields: [
        {
          id: '2978f820-704b-46c7-9f88-110e14e34a8c',
          name: 'first_name',
          label: 'First Name',
          type: 'TEXT',
          position: 1,
          required: true,
          editable: false,
          visible: true,
          deleted: false,
          link: null,
          placeholder: 'Enter…',
          hint: 'Please provide a text of at max 100 characters',
          field_options: { lego_unique_field: 'true' },
          filterable: true,
          searchable: true,
          parent_id: null,
          choices: [],
        },

        {
          id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
          name: 'is_indian_citizen',
          label: 'Indian Citizen?',
          type: 'CHECKBOX',
          position: 2,
          required: true,
          editable: true,
          visible: true,
          deleted: false,
          link: null,
          placeholder: null,
          hint: 'Check or Uncheck the box',
          field_options: {},
          filterable: true,
          searchable: true,
          parent_id: null,
          choices: [],
        },

        {
          id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
          name: 'pincode',
          label: 'Pincode',
          type: 'NUMBER',
          position: 3,
          required: false,
          editable: true,
          visible: true,
          deleted: false,
          link: null,
          Placeholder: 'Enter…',
          hint: 'Please enter your Pincode',
          field_options: {},
          filterable: true,
          searchable: true, // For the field to be used as filter condition in search API, this needs to be set
          parent_id: null,
          choices: [],
        },

        {
          id: 'ba53775e-2948-4065-8a59-d99d4494e845',
          name: 'gender',
          label: 'Gender',
          type: 'RADIO',
          position: 4,
          required: true,
          editable: true,
          visible: true,
          deleted: false,
          link: null,
          placeholder: null,
          hint: 'Please specify your gender',
          field_options: {},
          filterable: true,
          searchable: true,
          parent_id: null,
          choices: [
            {
              id: 1,
              value: 'Female',
              position: 1,
              dependent_ids: {},
            },
            {
              id: 2,
              value: 'Male',
              position: 2,
              dependent_ids: {},
            },
          ],
        },

        {
          id: '42aecb8f-25cf-47ce-89c6-5410fe3d4315',
          name: 'order_status',
          label: 'Order Status',
          type: 'DROPDOWN',
          position: 5,
          required: true,
          editable: true,
          visible: true,
          deleted: false,
          link: null,
          placeholder: 'Enter…',
          hint: 'Select a value',
          field_options: {},
          filterable: true,
          searchable: true,
          parent_id: null,
          choices: [
            {
              id: 1,
              value: 'open',
              position: 1,
              dependent_ids: {},
            },
            {
              id: 2,
              value: 'pending',
              position: 2,
              dependent_ids: {},
            },
            {
              id: 3,
              value: 'closed',
              position: 3,
              dependent_ids: {},
            },
          ],
        },

        {
          id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
          name: 'amount_paid',
          label: 'Amount Paid',
          type: 'DECIMAL',
          position: 6,
          required: true,
          editable: true,
          visible: true,
          deleted: false,
          link: null,
          Placeholder: 'Enter…',
          hint: 'Please enter the amount paid',
          field_options: {},
          filterable: true,
          searchable: true,
          parent_id: null,
          choices: [],
        },
      ],
    },
  };
  const fieldOptionsData = {
    formSchema: {
      title: 'Test Form',
      name: 'Test Form',
      fields: [
        {
          id: '42edecb8f-25cf-47ce-89c6-5410fe3d4315',
          name: 'order_status',
          label: 'Order Status',
          type: 'DROPDOWN',
          position: 1,
          required: true,
          editable: true,
          visible: true,
          deleted: false,
          link: null,
          placeholder: 'Enter…',
          hint: 'Select a value',
          filterable: true,
          searchable: true,
          parent_id: null,
          field_options: {
            option_value_path: 'id',
            option_label_path: 'value',
          },
          choices: [
            {
              id: 1,
              value: 'open',
              position: 1,
              dependent_ids: {},
            },
            {
              id: 2,
              value: 'pending',
              position: 2,
              dependent_ids: {},
            },
          ],
        },
      ],
    },
  };
  const formServSchema = {
    name: 'Test Form',
    fields: [
      {
        id: '2978f820-704b-46c7-9f88-110e14e34a8c',
        name: 'first_name',
        label: 'First Name',
        type: 1,
        position: 3,
        required: true,
        placeholder: 'Enter…',
        hint: 'Please provide a text of at max 100 characters',
        choices: [],
      },

      {
        id: '3978f820-704b-46c7-9f88-110e14e34a8c',
        name: 'last_name',
        label: 'Last Name',
        type: 1,
        position: 3,
        required: true,
        placeholder: 'Enter…',
        hint: 'Please provide a text of at max 100 characters',
        choices: [],
      },

      {
        id: '42aecb8f-25cf-47ce-89c6-5410fe3d4315',
        name: 'languages_known',
        label: 'Languages Known',
        type: 18,
        position: 13,
        required: true,
        placeholder: 'Enter…',
        hint: 'Select one or more values',
        choices: [
          {
            id: 1,
            value: 'English',
            position: 1,
            dependent_ids: {},
          },
          {
            id: 2,
            value: 'Hindi',
            position: 2,
            dependent_ids: {},
          },
          {
            id: 3,
            value: 'Tamil',
            position: 3,
            dependent_ids: {},
          },
        ],
      },

      {
        id: '6978f820-704b-46c7-9f88-110e14e34a8c',
        name: 'email',
        label: 'Email',
        type: 3,
        position: 3,
        required: true,
        placeholder: 'Enter…',
        hint: 'Please provide an email Id',
        choices: [],
      },

      {
        id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
        name: 'date_of_birth',
        label: 'Date Of Birth',
        type: 7,
        position: 11,
        required: true,
        Placeholder: 'Enter…',
        hint: 'Please enter your date of birth',
        choices: [],
      },

      {
        id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
        name: 'landmark',
        label: 'Landmark',
        type: 6,
        position: 7,
        required: true,
        Placeholder: 'Enter some text…',
        hint: 'Please enter the nearest landmark',
        choices: [],
      },

      {
        id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
        name: 'is_indian_citizen',
        label: 'Indian Citizen?',
        type: 5,
        position: 7,
        required: true,
        placeholder: null,
        hint: 'Check or Uncheck the box',
        choices: [],
      },

      {
        id: '8978f820-704b-46c7-9f88-110e14e34a8c',
        name: 'phone_number',
        label: 'Phone number',
        type: 1,
        position: 3,
        required: true,
        placeholder: 'Enter…',
        hint: 'Please provide your phone number',
        choices: [],
      },

      {
        id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
        name: 'pincode',
        label: 'Pincode',
        type: 8,
        position: 8,
        required: false,
        Placeholder: 'Enter…',
        hint: 'Please enter your Pincode',
        choices: [],
      },

      {
        id: 'ba53775e-2948-4065-8a59-d99d4494e845',
        name: 'gender',
        label: 'Gender',
        type: 12,
        position: 5,
        required: true,
        placeholder: null,
        hint: 'Please specify your gender',
        choices: [
          {
            id: 1,
            value: 'Female',
            position: 1,
            dependent_ids: {},
          },
          {
            id: 2,
            value: 'Male',
            position: 2,
            dependent_ids: {},
          },
        ],
      },

      {
        id: '42aecb8f-25cf-47ce-89c6-5410fe3d4315',
        name: 'order_status',
        label: 'Order Status',
        type: 2,
        position: 4,
        required: true,
        placeholder: 'Enter…',
        hint: 'Select a value',
        choices: [
          {
            id: 1,
            value: 'open',
            position: 1,
            dependent_ids: {},
          },
          {
            id: 2,
            value: 'pending',
            position: 2,
            dependent_ids: {},
          },
          {
            id: 3,
            value: 'closed',
            position: 3,
            dependent_ids: {},
          },
        ],
      },

      {
        id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
        name: 'amount_paid',
        label: 'Amount Paid',
        type: 13,
        position: 10,
        required: true,
        Placeholder: 'Enter…',
        hint: 'Please enter the amount paid',
        choices: [],
      },
    ],
  };
  const customSchema = {
    name: 'Custom Form',
    fields: [
      {
        id: '42aecb8f-25cf-47ce-89c6-5410fe3d4315',
        name: 'languages_known',
        label: 'Languages Known',
        type: 'CUSTOM_DROPDOWN',
        position: 13,
        required: true,
        placeholder: 'Enter…',
        hint: 'Select one or more values',
        choices: [
          {
            id: 1,
            value: 'English',
            position: 1,
            dependent_ids: {},
          },
          {
            id: 2,
            value: 'Hindi',
            position: 2,
            dependent_ids: {},
          },
          {
            id: 3,
            value: 'Tamil',
            position: 3,
            dependent_ids: {},
          },
        ],
      },

      {
        id: 'f319f86f-1b6a-49cb-b4b6-cf487be94595',
        name: 'date_of_birth',
        label: 'Date Of Birth',
        type: 'CUSTOM_DATE',
        position: 11,
        required: true,
        Placeholder: 'Enter…',
        hint: 'Please enter your date of birth',
        choices: [],
      },
    ],
  };

  const loadFieldOptionsData = async (page) => {
    await page.$eval(
      'fw-form',
      (ele: any, { formSchema }) => {
        ele.formSchema = formSchema;
      },
      fieldOptionsData
    );
  };

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form></fw-form>');
    const element = await page.find('fw-form');
    expect(element).toHaveClass('hydrated');
  });

  it('should render correct number of form controls when schema is passed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
      },
      props
    );

    await page.waitForChanges();
    const element = await page.find('fw-form');
    expect(
      element.shadowRoot.querySelectorAll('fw-form-control').length
    ).toEqual(6);
  });

  it('should render correct crayons controls based on the field name', async () => {
    const map = {
      TEXT: 'fw-input',
      CHECKBOX: 'fw-checkbox',
      RADIO: 'fw-radio-group',
      DROPDOWN: 'fw-select',
      NUMBER: 'fw-input',
      DECIMAL: 'fw-input',
    };
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
      },
      props
    );

    await page.waitForChanges();

    const formControl = await page.findAll('fw-form >>> fw-form-control');

    const input = formControl[0].shadowRoot.querySelector('fw-input');
    const checkbox = formControl[1].shadowRoot.querySelector('fw-checkbox');
    const number = formControl[2].shadowRoot.querySelector('fw-input');
    const radiogroup =
      formControl[3].shadowRoot.querySelector('fw-radio-group');
    const dropdown = formControl[4].shadowRoot.querySelector('fw-select');
    const decimal = formControl[5].shadowRoot.querySelector('fw-input');

    expect(input).not.toBeNull();
    expect(props.formSchema.fields[0].id).toEqual(input.id);
    expect(map[props.formSchema.fields[0].type]).toEqual(
      input.tagName.toLowerCase()
    );
    expect(checkbox).not.toBeNull();
    expect(props.formSchema.fields[1].id).toEqual(checkbox.id);
    expect(map[props.formSchema.fields[1].type]).toEqual(
      checkbox.tagName.toLowerCase()
    );
    expect(number).not.toBeNull();
    expect(map[props.formSchema.fields[2].type]).toEqual(
      number.tagName.toLowerCase()
    );
    expect(radiogroup).not.toBeNull();
    expect(map[props.formSchema.fields[3].type]).toEqual(
      radiogroup.tagName.toLowerCase()
    );
    expect(dropdown).not.toBeNull();
    expect(map[props.formSchema.fields[4].type]).toEqual(
      dropdown.tagName.toLowerCase()
    );
    expect(decimal).not.toBeNull();
    expect(map[props.formSchema.fields[5].type]).toEqual(
      decimal.tagName.toLowerCase()
    );
  });

  it('should return entered values upon form submit', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
        elm.initialValues = {
          first_name: 'Test',
          is_indian_citizen: true,
          gender: 'Male',
          pincode: 123345,
          order_status: 'closed',
          amount_paid: 10,
        };
      },
      props
    );

    await page.waitForChanges();

    const element = await page.find('fw-form');
    const result = await element.callMethod('doSubmit');
    expect(result.values['first_name']).toEqual('Test');
    expect(result.values['is_indian_citizen']).toEqual(true);
    expect(result.values['gender']).toEqual('Male');
    expect(result.values['pincode']).toEqual(123345);
    expect(result.values['order_status']).toEqual('closed');
    expect(result.values['amount_paid']).toEqual(10);
  });

  it('should set errors if required field is passed as empty string', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
        elm.initialValues = {
          first_name: '',
          is_indian_citizen: false,
          gender: '',
          order_status: '',
          amount_paid: '',
        };
      },
      props
    );

    await page.waitForChanges();

    const element = await page.find('fw-form');
    const result = await element.callMethod('doSubmit');

    expect(result.errors['first_name']).toEqual('First Name is required');
    expect(result.errors['is_indian_citizen']).toEqual(
      'Indian Citizen? is required'
    );
    expect(result.errors['gender']).toEqual('Gender is required');
    expect(result.errors['order_status']).toEqual('Order Status is required');
    expect(result.errors['amount_paid']).toEqual('Amount Paid is required');
  });

  it('Should return number for decimal and number field type', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
        elm.initialValues = {
          pincode: 123345,
          amount_paid: 10,
        };
      },
      props
    );

    await page.waitForChanges();

    const element = await page.find('fw-form');
    const result = await element.callMethod('doSubmit');
    expect(result.values['pincode']).toEqual(123345);
    expect(result.values['amount_paid']).toEqual(10);
  });

  it('should render slot when formSchema is not passed in', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any) => {
        elm.formId = 'fw-form';
      },
      props
    );
    await page.waitForChanges();
    const element = await page.find('fw-form');
    expect(element.shadowRoot).toEqualHtml(`
         <form action="javascript:void(0);" id="form-fw-form">
           <slot></slot>
         </form>
       `);
  });

  it('should return appropriate values when multiple forms are present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<fw-form id="form1"></fw-form><fw-form id="form2"></fw-form>`
    );

    const form1 = await page.find('fw-form#form1');
    const form2 = await page.find('fw-form#form2');

    //Form1
    await page.$eval(
      'fw-form#form1',
      (elm: any, { formSchema }) => {
        elm.initialValues = {
          first_name: 'form1-first',
          last_name: 'form1-last',
        };
        elm.formSchema = formSchema;
      },
      props
    );
    await page.waitForChanges();

    //Form2
    await page.$eval(
      'fw-form#form2',
      (elm: any, { formSchema }) => {
        elm.initialValues = {
          first_name: 'form2-first',
          last_name: 'form2-last',
        };
        elm.formSchema = formSchema;
      },
      props
    );
    await page.waitForChanges();

    const result1 = await form1.callMethod('doSubmit');
    expect(result1.values['first_name']).toEqual('form1-first');
    expect(result1.values['last_name']).toEqual('form1-last');

    const result2 = await form2.callMethod('doSubmit');
    expect(result2.values['first_name']).toEqual('form2-first');
    expect(result2.values['last_name']).toEqual('form2-last');
  });

  it('should return the right value on submit when optionValuePath and optionLabelPath are passed via field_options object', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-form></fw-form>');
    await loadFieldOptionsData(page);
    await page.waitForChanges();
    const form = await page.find('fw-form >>> :first-child');
    const formControl = await form.find('fw-form-control >>> :first-child');
    await formControl.click();
    const popover = await formControl.find('fw-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    await options[1].click();
    await page.waitForChanges();
    const formEle = await page.find('fw-form');
    const result = await formEle.callMethod('doSubmit');
    await page.waitForChanges();
    const key =
      fieldOptionsData.formSchema.fields[0].field_options['option_value_path'];
    expect(result.values['order_status']).toEqual(
      fieldOptionsData.formSchema.fields[0].choices[1][key]
    );
  });

  it('Should render a form based on FORMSERV mapper type', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formServSchema }) => {
        elm.formSchema = formServSchema;
        elm.mapperType = 'FORMSERV';
        elm.initialValues = {
          pincode: 123345,
          amount_paid: 10,
        };
      },
      { formServSchema }
    );

    await page.waitForChanges();

    const element = await page.find('fw-form');
    const result = await element.callMethod('doSubmit');
    expect(result.values['pincode']).toEqual(123345);
    expect(result.values['amount_paid']).toEqual(10);
  });

  it('Should render a form based on CUSTOM mapper type', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { customSchema }) => {
        elm.formSchema = customSchema;
        elm.mapperType = 'CUSTOM';
        elm.customTypeMapper = {
          CUSTOM_DROPDOWN: { type: 'DROPDOWN' },
          CUSTOM_DATE: { type: 'DATE' },
        };
        elm.initialValues = {
          languages_known: 'English',
        };
      },
      { customSchema }
    );

    await page.waitForChanges();

    const element = await page.find('fw-form');
    const result = await element.callMethod('doSubmit');
    expect(result.values['languages_known']).toEqual('English');

    expect(
      element.shadowRoot.querySelectorAll('fw-form-control').length
    ).toEqual(2);
  });

  it('Should not render elements for which type mapper doesnt match via CUSTOM mapper type', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { customSchema }) => {
        elm.formSchema = customSchema;
        elm.mapperType = 'CUSTOM';
      },
      { customSchema }
    );

    await page.waitForChanges();

    const element = await page.find('fw-form');
    expect(
      element.shadowRoot.querySelectorAll('fw-form-control').length
    ).toEqual(0);
  });

  it('should update the dropdown with the new choices in the form on calling setFieldChoices method', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
        elm.initialValues = {
          first_name: 'Test',
          is_indian_citizen: true,
          gender: 'Male',
          pincode: 123345,
          amount_paid: 10,
        };
      },
      props
    );

    await page.waitForChanges();

    const newChoices = [
      {
        id: 1,
        text: 'idle',
        position: 1,
        dependent_ids: {},
      },
      {
        id: 2,
        text: 'in progress',
        position: 2,
        dependent_ids: {},
      },
      {
        id: 3,
        text: 'failure',
        position: 3,
        dependent_ids: {},
      },

      {
        id: 4,
        text: 'closed',
        position: 4,
        dependent_ids: {},
      },
    ];

    const formRef = await page.find('fw-form');

    await formRef.callMethod('setFieldChoices', 'order_status', newChoices);

    await page.waitForChanges();

    const formElemShadow = await page.find('fw-form >>> :first-child');
    // const formElemShadow = await document.querySelector('fw-form').shadowRoot;

    const formControlShadow = await formElemShadow.find(
      "fw-form-control[name='order_status'] >>> :first-child"
    );

    // const formControlShadow = await formElemShadow.querySelector(
    //   "fw-form-control[name='order_status']"
    // ).shadowRoot;

    const popover = await formControlShadow.find('fw-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    await page.waitForChanges();

    await expect(options.length).toBe(4);

    await expect(options[0].shadowRoot.textContent).toEqual('idle');
    await expect(options[1].shadowRoot.textContent).toEqual('in progress');
    await expect(options[2].shadowRoot.textContent).toEqual('failure');
    await expect(options[3].shadowRoot.textContent).toEqual('closed');
  });

  it('Should filter form fields on calling setFieldSearchText method on the form', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
        elm.initialValues = {
          pincode: 123345,
          amount_paid: 10,
        };
      },
      props
    );

    await page.waitForChanges();

    const element = await page.find('fw-form');

    await element.callMethod('setFieldSearchText', 'Pin');

    await page.waitForChanges();
    expect(
      element.shadowRoot.querySelectorAll('fw-form-control').length
    ).toEqual(1);
  });

  it('Should render all the form fields on calling setFieldSearchText method on the form with a empty string or null/undefined', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
        elm.initialValues = {
          pincode: 123345,
          amount_paid: 10,
        };
      },
      props
    );

    await page.waitForChanges();

    const element = await page.find('fw-form');

    await element.callMethod('setFieldSearchText', '');

    await page.waitForChanges();
    expect(
      element.shadowRoot.querySelectorAll('fw-form-control').length
    ).toEqual(6);
  });

  it('should disabled the fields for which the editable property is set to false in form schema', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-form></fw-form>`);

    await page.$eval(
      'fw-form',
      (elm: any, { formSchema }) => {
        elm.formSchema = formSchema;
      },
      props
    );

    await page.waitForChanges();

    const formElemShadow = await page.find('fw-form >>> :first-child');
    const formControlShadow = await formElemShadow.find(
      "fw-form-control[name='first_name'] >>> :first-child"
    );

    const input = await formControlShadow.find('fw-input');
    const isDisabled = await input.getProperty('disabled');

    await expect(isDisabled).toEqual(true);
  });
});
