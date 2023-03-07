import { newE2EPage } from '@stencil/core/testing';
import presetSchema from './assets/form-builder-preset.json';
import formMapper from './assets/form-mapper.json';

describe('fw-form-builder', () => {
  const formValues: any = {
    CUSTOM_OBJECTS: {
      name: 'Company-Association-test',
      prefix: '_29',
      title: null,
      description: 'Company-Association-test',
      version: 4,
      deleted: false,
      id: 5938,
      form_options: {},
      created_time: 1659001461188,
      updated_time: 1659004708385,
      icon_link: 'https://d2lz1e868xzctj.cloudfront.net/icons/Accounts.svg',
      fields: [
        {
          id: '24a9531c-3c71-463e-9c63-8991396fde95',
          name: 'companyassociationtestname',
          label: 'Hotel Name',
          type: 'PRIMARY',
          required: true,
          field_options: {
            _analytic: 'true',
            _primary: 'true',
            unique: 'true',
          },
          filterable: true,
          searchable: true,
        },
        {
          id: 'eea9ed82-af63-43b2-aef0-a7e8de0f8607',
          name: 'companytest',
          label: 'Location',
          type: 'RELATIONSHIP',
          required: false,
          field_options: {
            _analytic: 'true',
            related_object_type: 'NATIVE',
            unique: 'false',
          },
          filterable: true,
          searchable: false,
          related_entity_id: 3,
          relationship_name: 'companytest',
          child_relationship_name: 'companyassociationtest_1659004707038',
        },
        {
          id: '7c7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'address',
          label: 'Address',
          type: 'TEXT',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '8c7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'summary',
          label: 'Summary',
          type: 'PARAGRAPH',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '9c7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'count',
          label: 'Count',
          type: 'NUMBER',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '88c7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'price',
          label: 'Price',
          type: 'DECIMAL',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '667ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'date',
          label: 'Date',
          type: 'DATE',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '9d7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'preference',
          label: 'Preference',
          type: 'DROPDOWN',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '127ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'access',
          label: 'Access',
          type: 'CHECKBOX',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '128ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'people',
          label: 'People',
          type: 'MULTI_SELECT',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
      ],
    },
    CONVERSATION_PROPERTIES: {
      name: 'Company-Association-test',
      prefix: '_29',
      title: null,
      description: 'Company-Association-test',
      version: 4,
      deleted: false,
      id: 5938,
      form_options: {},
      created_time: 1659001461188,
      updated_time: 1659004708385,
      icon_link: 'https://d2lz1e868xzctj.cloudfront.net/icons/Accounts.svg',
      fields: [
        {
          id: '7c7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'address',
          label: 'Address',
          type: '1',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '8c7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'summary',
          label: 'Summary',
          type: '6',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '9c7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'count',
          label: 'Count',
          type: '8',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '88c7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'price',
          label: 'Price',
          type: '13',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '667ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'date',
          label: 'Date',
          type: '17',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '9d7ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'preference',
          label: 'Preference',
          type: '2',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '127ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'access',
          label: 'Access',
          type: '5',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
        {
          id: '128ce74f-07f9-406a-bd18-bef23a5306a1',
          name: 'people',
          label: 'People',
          type: '18',
          required: false,
          field_options: {},
          filterable: true,
          searchable: false,
        },
      ],
    },
  };

  const fieldLabels = {
    CUSTOM_OBJECTS: [
      'Lookup relationship',
      'Text',
      'Paragraph',
      'Number',
      'Decimal',
      'Date',
      'Dropdown',
      'Checkbox',
      'Multi select',
    ],
    CONVERSATION_PROPERTIES: [
      'Single line text',
      'Multi line text',
      'Number',
      'Decimal',
      'Date',
      'Dropdown',
      'Checkbox',
      'Multiselect dropdown',
    ],
  };

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-builder></fw-form-builder>');
    const element = await page.find('fw-form-builder');
    expect(element).toHaveClass('hydrated');
  });

  describe.each(['CUSTOM_OBJECTS', 'CONVERSATION_PROPERTIES'])(
    'test %s fields',
    (productName) => {
      let fieldOrder = [...formMapper[productName].fieldOrder];
      if (productName === 'CUSTOM_OBJECTS') {
        fieldOrder = fieldOrder.slice(1);
      }
      let testIndex = -1;
      it.each(fieldOrder)(
        'clicking on add %s field triggers fwComposeNewField event with the expected detail',
        async (field) => {
          testIndex++;
          const page = await newE2EPage();

          await page.setContent(
            `<fw-form-builder product-name="${productName}"></fw-form-builder>`
          );
          const fwComposeNewField = await page.spyOnEvent('fwComposeNewField');
          const leftPanel = await page.find(
            'fw-form-builder >>> .form-builder-left-panel'
          );
          const fieldItems = await leftPanel.findAll(
            '.form-builder-left-panel-field-types-list > fw-field-type-menu-item >>> .field-type-menu-item-add-button-container'
          );
          expect(fieldItems.length).toBe(fieldOrder.length);
          await fieldItems[testIndex].click();
          await page.waitForChanges();
          expect(fwComposeNewField).toHaveReceivedEventDetail({
            maximumLimits: formMapper[productName].maximumLimits,
            fieldSchema: {
              ...presetSchema.fieldTypes[field],
              checkboxes:
                formMapper[productName].fieldProps[field].checkboxes || null,
              type:
                productName === 'CUSTOM_OBJECTS'
                  ? field
                  : formMapper[productName].mappedFieldTypes[field],
            },
            value: presetSchema.fieldTypes[field],
            index: -1,
          });
        }
      );

      it('renders field menu items in left panel', async () => {
        const page = await newE2EPage();

        await page.setContent(
          `<fw-form-builder product-name="${productName}"></fw-form-builder>`
        );
        const leftPanel = await page.find(
          'fw-form-builder >>> .form-builder-left-panel'
        );
        const fieldItemLabels = await leftPanel.findAll(
          '.form-builder-left-panel-field-types-list > fw-field-type-menu-item >>> label'
        );
        expect(fieldItemLabels.length).toBe(fieldLabels[productName].length);
        fieldItemLabels.forEach((item, index) => {
          expect(item.innerText).toBe(fieldLabels[productName][index]);
        });
      });

      it('opens a modal on click of delete button and on confirmation, emits fwDeleteField event with event details', async () => {
        const page = await newE2EPage();
        await page.setContent(
          `<fw-form-builder product-name="${productName}"></fw-form-builder>`
        );
        const fwDeleteField = await page.spyOnEvent('fwDeleteField');
        await page.waitForChanges();
        await page.$eval(
          'fw-form-builder',
          (elm: any, { formValues }: any) => {
            elm.formValues = formValues;
          },
          { formValues: formValues.CUSTOM_OBJECTS }
        );
        await page.waitForChanges();
        await page.waitForChanges();
        const rightPanel = await page.find(
          'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
        );
        const fieldEditors = await rightPanel.findAll(
          'fw-field-editor >>> .fw-field-editor'
        );
        const deleteBtn = await fieldEditors[1].find(
          '.fw-field-editor-delete-button'
        );
        await deleteBtn.click();
        await page.waitForChanges();
        const deleteModals = await rightPanel.findAll(
          'fw-field-editor >>> fw-modal'
        );
        expect(deleteModals[1]).toHaveAttribute('is-open');
        expect(deleteModals[1].innerText).toBe(
          productName === 'CUSTOM_OBJECTS'
            ? 'This field will be deleted permanently and all associated data will be lost. Do you still want to continue?'
            : 'This action is permanent and cannot be reversedAre you sure you want to delete this conversation property? This will impact the conversations, forms, automations and reports.'
        );
        await deleteModals[1].triggerEvent('fwSubmit');
        await page.waitForChanges();
        expect(fwDeleteField).toHaveReceivedEventDetail({
          index: 1,
        });
      });

      it('renders form values in right panel', async () => {
        const page = await newE2EPage();

        await page.setContent(
          `<fw-form-builder product-name="${productName}"></fw-form-builder>`
        );
        await page.waitForChanges();
        await page.$eval(
          'fw-form-builder',
          (elm: any, { formValues }: any) => {
            elm.formValues = formValues;
          },
          { formValues: formValues[productName] }
        );
        await page.waitForChanges();
        await page.waitForChanges();
        const rightPanel = await page.find(
          'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
        );
        const fieldItemLabels = await rightPanel.findAll(
          'fw-field-editor >>> label'
        );
        expect(fieldItemLabels.length).toBe(
          formValues[productName].fields.length
        );
        fieldItemLabels.forEach((item, index) => {
          expect(item.innerText).toBe(
            formValues[productName].fields[index].label
          );
        });
        const fieldItemIcons = await rightPanel.findAll(
          'fw-field-editor >>> .fw-field-editor-icon-container > fw-icon'
        );
        expect(fieldItemIcons.length).toBe(
          formValues[productName].fields.length
        );
        fieldItemIcons.forEach((item, index) => {
          const fieldType =
            productName === 'CUSTOM_OBJECTS'
              ? formValues[productName].fields[index].type
              : formMapper[productName].reverseMappedFieldTypes[
                  formValues[productName].fields[index].type
                ];
          expect(item.getAttribute('name')).toBe(
            presetSchema.fieldTypes[fieldType].icon.name
          );
        });
      });

      it('searching a value should filter the field elements', async () => {
        const page = await newE2EPage();

        await page.setContent(
          `<fw-form-builder product-name="${productName}"></fw-form-builder>`
        );
        await page.waitForChanges();
        await page.$eval(
          'fw-form-builder',
          (elm: any, { formValues }: any) => {
            elm.formValues = formValues;
          },
          { formValues: formValues[productName] }
        );
        await page.waitForChanges();
        await page.waitForChanges();
        const search = await page.find(
          'fw-form-builder >>> .form-builder-right-panel-header-search-input'
        );
        await search.click();
        await search.press('a');
        await search.press('d');
        await search.press('d');
        await page.waitForChanges();
        await page.waitForTimeout(2000);
        const rightPanel = await page.find(
          'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
        );
        const fieldItemLabels = await rightPanel.findAll(
          'fw-field-editor >>> label'
        );
        expect(fieldItemLabels.length).toBe(1);
        const addressIndex = productName === 'CUSTOM_OBJECTS' ? 2 : 0;
        expect(fieldItemLabels[0].innerText).toBe(
          formValues[productName].fields[addressIndex].label
        );
      });

      it('triggers fwSaveField event when a field is edited and save is clicked', async () => {
        const page = await newE2EPage();
        await page.setContent(
          `<fw-form-builder product-name="${productName}"></fw-form-builder>`
        );
        const fwSaveField = await page.spyOnEvent('fwSaveField');
        await page.waitForChanges();
        await page.$eval(
          'fw-form-builder',
          (elm: any, { formValues, expandedFieldIndex }: any) => {
            elm.formValues = formValues;
            elm.expandedFieldIndex = expandedFieldIndex;
          },
          {
            formValues: formValues[productName],
            expandedFieldIndex: 2,
          }
        );
        await page.waitForChanges();
        await page.waitForChanges();
        const rightPanel = await page.find(
          'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
        );
        const fieldEditors = await rightPanel.findAll(
          'fw-field-editor >>> .fw-field-editor'
        );
        const labelInput = await fieldEditors[2].find(
          '.fw-field-editor-content-required-input'
        );
        await labelInput.click();
        await labelInput.press('a');
        await labelInput.press('d');
        await page.waitForChanges();
        const saveBtn = await fieldEditors[2].find('#submitFieldBtn');
        await saveBtn.click();
        await page.waitForChanges();
        const expectedType = isNaN(formValues[productName].fields[2].type)
          ? formValues[productName].fields[2].type
          : parseInt(formValues[productName].fields[2].type);
        expect(fwSaveField).toHaveReceivedEventDetail({
          index: 2,
          isNew: false,
          value: {
            ...(productName === 'CUSTOM_OBJECTS'
              ? { filterable: formValues[productName].fields[2].filterable }
              : {}),
            internalName: formValues[productName].fields[2].name,
            isPrimaryField: false,
            name: 'ad' + formValues[productName].fields[2].label,
            required: false,
            type: expectedType,
          },
        });
      });

      it('validates choices and label field in field editor', async () => {
        const page = await newE2EPage();
        await page.setContent(
          `<fw-form-builder product-name="${productName}"></fw-form-builder>`
        );
        await page.waitForChanges();
        const validateIndex = formValues[productName].fields.length - 1;
        await page.$eval(
          'fw-form-builder',
          (elm: any, { formValues, expandedFieldIndex }: any) => {
            elm.formValues = formValues;
            elm.expandedFieldIndex = expandedFieldIndex;
          },
          {
            formValues: formValues[productName],
            expandedFieldIndex: validateIndex,
          }
        );
        await page.waitForChanges();
        await page.waitForChanges();
        const rightPanel = await page.find(
          'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
        );
        const fieldEditors = await rightPanel.findAll(
          'fw-field-editor >>> .fw-field-editor'
        );
        const labelInput = await fieldEditors[validateIndex].find(
          '.fw-field-editor-content-required-input'
        );
        await labelInput.click();
        await labelInput.press('a');
        await page.waitForChanges();
        let saveBtn = await fieldEditors[validateIndex].find('#submitFieldBtn');
        await saveBtn.click();
        await page.waitForChanges();
        const errorValidation = await fieldEditors[validateIndex].find(
          '.fw-field-editor-footer-field-error-msg'
        );
        expect(errorValidation.innerText).toBe('Enter a minimum of one choice');
        await labelInput.setProperty('value', '');
        await page.waitForChanges();
        saveBtn = await fieldEditors[validateIndex].find('#submitFieldBtn');
        await saveBtn.click();
        await page.waitForChanges();
        const errorText = await fieldEditors[validateIndex].find(
          '.fw-field-editor-content-required-input >>> .field-control-error-text'
        );
        expect(errorText.innerText).toBe('Field label is required.');
      });
    }
  );

  it('renders customize widget button', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-builder></fw-form-builder>');
    const element = await page.find(
      'fw-form-builder >>> #customizeWidgetFieldsBtn'
    );
    expect(element).toBeTruthy();
  });

  it('does not render customize widget button if productName is CONVERSATION_PROPERTIES', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-form-builder product-name="CONVERSATION_PROPERTIES"></fw-form-builder>'
    );
    const element = await page.find(
      'fw-form-builder >>> #customizeWidgetFieldsBtn'
    );
    expect(element).toBeFalsy();
  });

  it('disables left panel and displays message and button when role is trial, clicking on Explore plan button triggers fwExplorePlan event', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-form-builder role="trial" product-name="CONVERSATION_PROPERTIES"></fw-form-builder>'
    );
    const fwExplorePlan = await page.spyOnEvent('fwExplorePlan');
    const disabledPanel = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-list-disabled-div'
    );
    expect(disabledPanel).toBeTruthy();
    const lockIcon = await disabledPanel.find('fw-icon');
    expect(lockIcon.getAttribute('name')).toBe('lock');
    const disabledHeader = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-list-disabled-header'
    );
    expect(disabledHeader).toBeTruthy();
    expect(disabledHeader.innerHTML).toBe(
      'Did you know you can add custom fields?'
    );
    const disabledMessage = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-list-disabled-message'
    );
    expect(disabledMessage).toBeTruthy();
    expect(disabledMessage.innerHTML).toBe(
      'Custom fields are available from Growth plan and above.'
    );
    const disabledButton = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-list-disabled-button'
    );
    expect(disabledButton).toBeTruthy();
    expect(disabledButton.innerHTML).toBe('Explore plans');
    await disabledButton.triggerEvent('fwClick');
    await page.waitForChanges();
    await page.waitForChanges();
    expect(fwExplorePlan).toHaveReceivedEvent();
  });

  it('emits fwExpandField when clicked on a field in right panel', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-form-builder></fw-form-builder>');
    const fwExpandField = await page.spyOnEvent('fwExpandField');
    await page.waitForChanges();
    await page.$eval(
      'fw-form-builder',
      (elm: any, { formValues }: any) => {
        elm.formValues = formValues;
      },
      { formValues: formValues.CUSTOM_OBJECTS }
    );
    await page.waitForChanges();
    await page.waitForChanges();
    const rightPanel = await page.find(
      'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
    );
    const fieldEditors = await rightPanel.findAll(
      'fw-field-editor >>> .fw-field-editor-header-content'
    );
    await fieldEditors[1].click();
    expect(fwExpandField).toHaveReceivedEventDetail({
      expanded: true,
      index: 1,
      isNew: false,
      value: formValues.CUSTOM_OBJECTS.fields[1],
    });
  });

  it('emits fwExpandField when clicked on cancel button in an expanded field', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-form-builder></fw-form-builder>');
    const fwExpandField = await page.spyOnEvent('fwExpandField');
    await page.waitForChanges();
    await page.$eval(
      'fw-form-builder',
      (elm: any, { formValues, expandedFieldIndex }: any) => {
        elm.formValues = formValues;
        elm.expandedFieldIndex = expandedFieldIndex;
      },
      { formValues: formValues.CUSTOM_OBJECTS, expandedFieldIndex: 1 }
    );
    await page.waitForChanges();
    await page.waitForChanges();
    const rightPanel = await page.find(
      'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
    );
    const fieldEditors = await rightPanel.findAll(
      'fw-field-editor >>> .fw-field-editor'
    );
    const cancelBtn = await fieldEditors[1].find('#clearFieldBtn');
    await cancelBtn.click();
    expect(fwExpandField).toHaveReceivedEventDetail({
      expanded: false,
      index: 1,
      isNew: false,
    });
  });

  it('should display the correct headers and description for CUSTOM_OBJECTS', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-form-builder></fw-form-builder>');
    await page.waitForChanges();
    const headerLabel = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-header-label'
    );
    expect(headerLabel.innerText).toBe('Field types');
    const headerDescription = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-header-desc'
    );
    expect(headerDescription.innerText).toBe('Drag and drop from here');
    const menuDesciption = await page.find(
      'fw-form-builder >>> .field-type-menu-description'
    );
    expect(menuDesciption.innerText).toBe(
      'Create associations between two objects.Learn more'
    );
    const menuLink = await page.find(
      'fw-form-builder >>> .field-type-menu-description-link-anchor'
    );
    expect(menuLink.getAttribute('href')).toBe(
      'https://support.freshdesk.com/en/support/solutions/articles/50000004226-understanding-associations'
    );
    const rightHeaderLabel = await page.find(
      'fw-form-builder >>> .form-builder-right-panel-header-label'
    );
    expect(rightHeaderLabel.innerText).toBe('Fields');
  });

  it('should display the correct headers and description for CONVERSATION_PROPERTIES', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-form-builder product-name="CONVERSATION_PROPERTIES"></fw-form-builder>'
    );
    await page.waitForChanges();
    const headerLabel = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-product-header-label'
    );
    expect(headerLabel.innerText).toBe('Conversation properties');
    const headerDescription = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-sub-header-description-label'
    );
    expect(headerDescription.innerText).toBe(
      'Categorize and keep track of conversations.'
    );
    const headerLink = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-sub-header-description-link-anchor'
    );
    expect(headerLink.getAttribute('href')).toBe(
      'https://crmsupport.freshworks.com/en/support/solutions/articles/50000005665?cloud=freshchat'
    );
    const menuDesciption = await page.find(
      'fw-form-builder >>> .form-builder-left-panel-header-desc-wo-header'
    );
    expect(menuDesciption.innerText).toBe('Drag and drop to create properties');
    const rightHeaderLabel = await page.find(
      'fw-form-builder >>> .form-builder-right-panel-header-label'
    );
    expect(rightHeaderLabel.innerText).toBe('Fields');
  });

  let fieldIndex = 0;

  it.each(formValues.CONVERSATION_PROPERTIES.fields)(
    'displays all necessary fields in each field editor for CONVERSATION_PROPERTIES',
    async (field) => {
      const page = await newE2EPage();
      await page.setContent(
        '<fw-form-builder product-name="CONVERSATION_PROPERTIES"></fw-form-builder>'
      );
      await page.waitForChanges();
      await page.$eval(
        'fw-form-builder',
        (elm: any, { formValues, expandedFieldIndex }: any) => {
          elm.formValues = formValues;
          elm.expandedFieldIndex = expandedFieldIndex;
        },
        {
          formValues: formValues.CONVERSATION_PROPERTIES,
          expandedFieldIndex: fieldIndex,
        }
      );
      await page.waitForChanges();
      const rightPanel = await page.find(
        'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
      );
      const fieldEditors = await rightPanel.findAll(
        'fw-field-editor >>> .fw-field-editor'
      );
      const checkboxLabel = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-content-checkboxes-header-label'
      );
      expect(checkboxLabel).toBeTruthy();
      expect(checkboxLabel.innerText).toBe('Behavior for agents');
      const formattedType =
        formMapper.CONVERSATION_PROPERTIES.reverseMappedFieldTypes[field.type];
      const fieldProps =
        formMapper.CONVERSATION_PROPERTIES.fieldProps[formattedType];
      if (fieldProps.checkboxes.length) {
        const requiredProp = fieldProps.checkboxes.find(
          (checkbox) => checkbox.key === 'required'
        );
        if (requiredProp) {
          const requiredCheckbox = await fieldEditors[fieldIndex].find(
            'fw-checkbox'
          );
          expect(requiredCheckbox).toBeTruthy();
          const expectedText =
            requiredProp.display_label === 'fieldRequiredResolveConv'
              ? 'Required when resolving the conversation'
              : 'Required when submitting the form';
          expect(requiredCheckbox.innerHTML).toBe(expectedText);
        }
      }
      const labelInput = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-content-required-input'
      );
      const labelValue = await labelInput.getProperty('value');
      expect(labelValue).toBe(field.label);
      const labelHeader = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-content-required-input >>> label'
      );
      expect(labelHeader.innerHTML).toBe('Label for agents');
      const internalNameLabel = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-internal-name-header-label'
      );
      expect(internalNameLabel.innerHTML).toBe('Internal name');
      const internalNamePrefix = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-internal-name-prefix'
      );
      expect(internalNamePrefix.innerHTML).toBe('cf_');
      const internalNameInput = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-content-required-internal-name-input'
      );
      const internalNameValue = await internalNameInput.getProperty('value');
      expect(internalNameValue).toBe(field.name);
      if (['2', '18'].includes(field.type)) {
        const fieldDropdown = await fieldEditors[fieldIndex].find(
          'fw-fb-field-dropdown'
        );
        expect(fieldDropdown).toBeTruthy();
      }
      if (fieldIndex === fieldEditors.length - 1) {
        fieldIndex = 0;
      } else {
        fieldIndex++;
      }
    }
  );

  it.each(formValues.CUSTOM_OBJECTS.fields)(
    'displays all necessary fields in each field editor for CUSTOM_OBJECTS',
    async (field) => {
      const page = await newE2EPage();
      await page.setContent('<fw-form-builder></fw-form-builder>');
      await page.waitForChanges();
      await page.$eval(
        'fw-form-builder',
        (elm: any, { formValues, expandedFieldIndex }: any) => {
          elm.formValues = formValues;
          elm.expandedFieldIndex = expandedFieldIndex;
        },
        {
          formValues: formValues.CUSTOM_OBJECTS,
          expandedFieldIndex: fieldIndex,
        }
      );
      await page.waitForChanges();
      const rightPanel = await page.find(
        'fw-form-builder >>> .form-builder-right-panel-field-editor-list'
      );
      const fieldEditors = await rightPanel.findAll(
        'fw-field-editor >>> .fw-field-editor'
      );
      const checkboxLabel = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-content-checkboxes-header-label'
      );
      expect(checkboxLabel).toBeTruthy();
      expect(checkboxLabel.innerText).toBe('Behavior for agents');
      const checkboxes = await fieldEditors[fieldIndex].findAll(
        '.fw-field-editor-content-checkbox-container > fw-checkbox'
      );
      expect(checkboxes[0]).toBeTruthy();
      expect(checkboxes[0].innerText).toBe('Required when submitting the form');
      if (field.type === 'PRIMARY') {
        expect(checkboxes[1]).toBeTruthy();
        expect(checkboxes[1].innerText).toBe(
          'Accept unique value for every record'
        );
        expect(checkboxes[2]).toBeTruthy();
        expect(checkboxes[2].innerText).toBe(
          'Use this field to filter records'
        );
        const labelHint = await fieldEditors[fieldIndex].find(
          '.fw-field-editor-content-required-input >>> .field-control-hint-text'
        );
        expect(labelHint.innerText).toBe(
          "This is the object's primary field that uniquely represents each record and cannot be deleted."
        );
      }
      if (field.type === 'RELATIONSHIP') {
        const label = await fieldEditors[fieldIndex].find(
          'fw-fb-field-lookup >>> .fb-field-lookup-header-label'
        );
        expect(label.innerText).toBe('Association');
        const sourceInput = await fieldEditors[fieldIndex].find(
          'fw-fb-field-lookup >>> .fb-field-lookup-input'
        );
        const sourceValue = await sourceInput.getProperty('value');
        expect(sourceValue).toBe(formValues.CUSTOM_OBJECTS.name);
        const relationshipType = await fieldEditors[fieldIndex].find(
          'fw-fb-field-lookup >>> .fb-field-lookup-relationship-select'
        );
        const typeValue = await relationshipType.getProperty('value');
        expect(typeValue).toBe('many_to_one');
        const typeOptions = await relationshipType.getProperty('options');
        expect(typeOptions).toEqual([
          {
            subText:
              'Link many records of the source object with one record of the target object. e.g Many Orders can be placed by a Contact.',
            text: 'Many to one',
            value: 'many_to_one',
          },
          {
            subText:
              'Link one record of the source object with only one record of the target object. e.g A Person can have only one Passport.',
            text: 'One to one',
            value: 'one_to_one',
          },
        ]);
        const lookupTarget = await fieldEditors[fieldIndex].find(
          'fw-fb-field-lookup >>> .fb-field-lookup-target-select'
        );
        expect(lookupTarget).toBeTruthy();
      }
      if (
        [
          'RELATIONSHIP',
          'NUMBER',
          'DATE',
          'DROPDOWN',
          'CHECKBOX',
          'MULTI_SELECT',
        ].includes(field.type)
      ) {
        expect(checkboxes[1]).toBeTruthy();
        expect(checkboxes[1].innerText).toBe(
          'Use this field to filter records'
        );
      }
      const labelInput = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-content-required-input'
      );
      const labelValue = await labelInput.getProperty('value');
      expect(labelValue).toBe(field.label);
      const labelHeader = await fieldEditors[fieldIndex].find(
        '.fw-field-editor-content-required-input >>> label'
      );
      expect(labelHeader.innerHTML).toBe('Label for agents');
      if (['DROPDOWN', 'MULTI_SELECT'].includes(field.type)) {
        const fieldDropdown = await fieldEditors[fieldIndex].find(
          'fw-fb-field-dropdown'
        );
        expect(fieldDropdown).toBeTruthy();
      }
      if (fieldIndex === fieldEditors.length - 1) {
        fieldIndex = 0;
      } else {
        fieldIndex++;
      }
    }
  );
});
