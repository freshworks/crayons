import { newE2EPage } from '@stencil/core/testing';

describe('fw-form-control', () => {
  let page;
  const props: any = {
    type: 'MULTI_SELECT',
    fieldProps: {
      field_options: {
        option_value_path: 'id',
        option_label_path: 'value',
      },
    },
    choices: [
      {
        id: 1,
        value: 'Tamil',
        selected: true,
        position: 1,
      },
      {
        id: 2,
        value: 'English',
        position: 2,
      },
    ],
  };

  const loadComponent = async () => {
    await page.$eval(
      'fw-form-control',
      (ele: any, { choices, fieldProps, type }) => {
        ele.type = type;
        ele.fieldProps = fieldProps;
        ele.choices = choices;
      },
      props
    );
  };

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-control></fw-form-control>');
    const element = await page.find('fw-form-control');
    expect(element).toHaveClass('hydrated');
  });

  it('should render appropriate crayons component based on the type', async () => {
    const props = {
      type: 'CHECKBOX',
      name: 'checkbox',
    };
    const page = await newE2EPage();

    await page.setContent('<fw-form-control></fw-form-control>');

    await page.$eval(
      'fw-form-control',
      (elm: any, { type, name }) => {
        elm.type = type;
        elm.name = name;
      },
      props
    );
    await page.waitForChanges();

    const element = await page.find('fw-form-control >>> fw-checkbox');

    expect(element).not.toBeNull();
    expect(element.tagName.toLowerCase()).toEqual('fw-checkbox');
  });

  it('should render appropriate html if type is passed', async () => {
    const props = {
      type: 'TEXT',
      name: 'name',
    };
    const page = await newE2EPage();

    await page.setContent('<fw-form-control></fw-form-control>');
    await page.$eval(
      'fw-form-control',
      (elm: any, { type, name }) => {
        elm.type = type;
        elm.name = name;
      },
      props
    );
    await page.waitForChanges();
    const element = await page.find('fw-form-control');

    expect(element.shadowRoot).toEqualHtml(`<div class="form-control-container">
    <fw-input class="hydrated" error-text="" hint-text="">
    <input class="hidden-input" name="name" type="hidden" value="">
    </fw-input>
    <slot></slot>
  </div>`);
  });

  it('should render appropriate html if slotted content is passed', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-form-control name="name"><input type="text"/></fw-form-control>'
    );
    const element = await page.find('fw-form-control');
    expect(element.shadowRoot).toEqualHtml(`<div class="form-control-container">
    <label class="label" for="name"></label>
    <slot></slot>
    <div class="hint" id="hint-name"></div>
  </div>`);
  });

  it('should display all the options for select when they are passed via field_options object', async () => {
    page = await newE2EPage();
    await page.setContent(
      '<fw-form-control name="dropdown"></fw-form-control>'
    );
    await page.waitForChanges();
    await loadComponent();
    await page.waitForChanges();
    const select = await page.find('fw-form-control >>> :first-child');
    const popover = await select.find('fw-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    expect(options.length).toBe(props.choices.length);
    await options.forEach(async (option, i) => {
      expect(
        await option.shadowRoot.querySelector('.description').innerText
      ).toBe(props.choices[i]['value']);
    });
  });
});
