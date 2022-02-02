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
          editable: true,
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
          pincode: '123345',
          amount_paid: '10',
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
});
