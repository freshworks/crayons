import { newE2EPage } from '@stencil/core/testing';

describe('fw-email-select', () => {
  const props = {
    options: [
      {
        text: 'Angela Smith',
        subText: 'angela.smith@gmail.com',
        value: 'angela.smith@gmail.com',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
      {
        text: 'Freshdesk support from India and Berlin',
        subText: 'support.india@freshdesk.com',
        value: 'support.india@freshdesk.com',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
      {
        text: 'Angela from Freshdesk',
        subText: 'angela@freshdesk.in',
        value: 'angela@freshdesk.in',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
    ],
  };
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-email-select></fw-email-select>');
    const element = await page.find('fw-email-select');
    expect(element).toHaveClass('hydrated');
  });

  it('it checks if value can be set and get', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select>
                                <fw-select-option value="starks">Starks</fw-select-option>
                                <fw-select-option value="lannisters">Lannisters</fw-select-option>
                            </fw-email-select>`);

    const element = await page.find('fw-email-select');

    element.setAttribute('value', 'starks');

    await page.waitForChanges();
    const value = element.getAttribute('value');
    expect(value).toBe('starks');
  });

  it('Renders all the select options when passed as slot', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select>
                                <fw-select-option value="starks">Starks</fw-select-option>
                                <fw-select-option value="lannisters">Lannisters</fw-select-option>
                            </fw-email-select>`);

    const popover = await page.find('fw-email-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );

    expect(options.length).toBe(2);
  });

  it('Renders all the select options when passed as prop', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select>
                            </fw-email-select>`);
    await page.$eval(
      'fw-email-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    await page.waitForChanges();
    const popover = await page.find('fw-email-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    expect(options.length).toBe(3);
  });

  it('checks if multiple values can be set and get', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select multiple>
                                <fw-select-option value="starks">Starks</fw-select-option>
                                <fw-select-option value="lannisters">Lannisters</fw-select-option>
                                <fw-select-option value="sands">Sands</fw-select-option>
                            </fw-email-select>`);

    const element = await page.find('fw-email-select');

    element.setAttribute('value', ['starks', 'sands']);

    await page.waitForChanges();
    const value = element.getAttribute('value');
    expect(value).toBe('starks,sands');
  });

  it('checks if multiple values set using setSelectedValues method and get using getSelectedItem', async () => {
    const page = await newE2EPage();
    await page.setContent(`<fw-email-select multiple>
                            </fw-email-select>`);
    await page.$eval(
      'fw-email-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    await page.waitForChanges();
    const element = await page.find('fw-email-select');
    await element.callMethod('setSelectedValues', [
      'angela.smith@gmail.com',
      'angela@freshdesk.in',
    ]);
    await page.waitForChanges();
    const selectedTags = await page.findAll('fw-email-select >>> fw-tag');
    expect(selectedTags.length).toBe(2);
    const selectedValues = await element.callMethod('getSelectedItem');
    const values = [];
    selectedValues.forEach((value) => {
      values.push(value.value);
    });
    expect(values).toStrictEqual([
      'angela.smith@gmail.com',
      'angela@freshdesk.in',
    ]);
  });

  it('checks if multiple options set using setSelectedOptions method and get using getSelectedItem', async () => {
    const page = await newE2EPage();
    await page.setContent(`<fw-email-select multiple>
                            </fw-email-select>`);
    await page.$eval(
      'fw-email-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    const element = await page.find('fw-email-select');
    await element.callMethod('setSelectedOptions', [
      props.options[0],
      props.options[1],
    ]);
    await page.waitForChanges();
    const selectedTags = await page.findAll('fw-email-select >>> fw-tag');
    expect(selectedTags.length).toBe(2);
    const selectedValues = await element.callMethod('getSelectedItem');
    const values = [];
    selectedValues.forEach((value) => {
      values.push(value.value);
    });
    expect(values).toStrictEqual([
      'angela.smith@gmail.com',
      'support.india@freshdesk.com',
    ]);
  });

  it('Sets html content as the select option', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <fw-email-select>
          <fw-select-option value="1" html option-text="LLL">
                <div style="color: red; padding: 10px;">Lannister </div class="cls">
                <div style="color: green; padding: 5px;">Lannisters are gods</div>
          </fw-select-option>
          <fw-select-option value="2">
            Shenigans
          </fw-select-option>
      </fw-email-select>
      `);

    const element = await page.find('fw-email-select');
    element.setAttribute('value', '1');

    await page.waitForChanges();
    const selectedValues = await element.callMethod('getSelectedItem');
    expect(selectedValues[0].value).toStrictEqual('1');
  });

  it('it emits fwChange when the value is changed in the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select name='to-field'>
                            </fw-email-select>`);

    await page.$eval(
      'fw-email-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-email-select');

    element.setProperty('value', 'angela.smith@gmail.com');
    element.waitForEvent('fwChange');

    await page.waitForChanges();

    expect(fwChange).toHaveReceivedEventDetail({
      value: 'angela.smith@gmail.com',
      name: 'to-field',
      meta: {
        selectedOptions: [props.options[0]],
      },
    });
  });

  it('show passed default value and get selected in dropdown', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select>
                          </fw-email-select>`);
    await page.$eval(
      'fw-email-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    const element = await page.find('fw-email-select');
    element.setProperty('value', 'support.india@freshdesk.com');
    await element.click();
    const popover = await page.find('fw-email-select >>> fw-popover');
    const selectOptions = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    const selectedOption = await selectOptions[1].getProperty('selected');
    expect(selectedOption).toBeTruthy();
  });

  it('sets disabled for multiple email select component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select multiple disabled
                          </fw-email-select>`);

    const selectInput = await page.find('fw-email-select >>> input');

    expect(selectInput.getProperty('disabled')).toBeTruthy();
  });

  it('sets disabled for single email select component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select disabled
                          </fw-email-select>`);

    const selectButton = await page.find('fw-email-select >>> fw-button');

    expect(selectButton.getProperty('disabled')).toBeTruthy();
  });

  it('shows readonly value when readonly is set', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select readonly>
                          </fw-email-select>`);

    await page.$eval(
      'fw-email-select',
      (elm: any, { options, value }) => {
        elm.options = options;
        elm.value = value;
      },
      { ...props, value: 'support.india@freshdesk.com' }
    );
    const element = await page.find('fw-email-select');
    element.setProperty('value', 'support.india@freshdesk.com');
    await page.waitForChanges();
    const popover = await page.find('fw-email-select >>> fw-popover');
    const tag = await popover.find('.single-value-tag');
    expect(tag).toHaveClass('readonly');
  });

  it('it emits fwFocus when the focus is on the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select multiple>
                          </fw-email-select>`);
    const fwFocus = await page.spyOnEvent('fwFocus');
    const element = await page.find('fw-email-select');

    await element.click();
    await page.keyboard.press('Tab');

    await page.waitForChanges();

    expect(fwFocus).toHaveReceivedEvent();
  });

  it('it emits fwBlur when the focus is changed away from the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select multiple>
                              </fw-select>`);
    await page.$eval(
      'fw-email-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    const fwBlur = await page.spyOnEvent('fwBlur');
    const element = await page.find('fw-email-select');

    await element.click();
    await page.keyboard.press('Tab');
    await page.waitForChanges();

    expect(fwBlur).toHaveReceivedEvent();
  });

  it('shows error style for emails exceeding maxEmailsAllowed restriction', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-email-select multiple>
                              </fw-select>`);
    await page.$eval(
      'fw-email-select',
      (elm: any, { options }) => {
        elm.options = options;
        elm.maxEmailsAllowed = 2;
      },
      props
    );
    await page.waitForChanges();
    const element = await page.find('fw-email-select');
    await element.callMethod('setSelectedValues', [
      'angela.smith@gmail.com',
      'angela@freshdesk.in',
      'support.india@freshdesk.com',
    ]);
    await page.waitForChanges();
    const selectedTags = await page.findAll('fw-email-select >>> fw-tag');
    expect(selectedTags.length).toBe(3);
    const errorTag = await selectedTags[2].shadowRoot.querySelector('.tag');
    expect(errorTag).toHaveClass('error');
  });
});
