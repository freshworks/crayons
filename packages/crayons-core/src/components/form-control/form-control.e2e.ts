import { newE2EPage } from '@stencil/core/testing';

describe('fw-form-control', () => {
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
});
