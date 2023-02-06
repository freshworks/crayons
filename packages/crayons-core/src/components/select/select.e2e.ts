import { newE2EPage } from '@stencil/core/testing';

describe('fw-select', () => {
  const getOptions = (labelPath, valuePath) => {
    return [
      {
        [labelPath]: 'Angela Smith',
        subText: 'angela.smith@gmail.com',
        [valuePath]: 'angela.smith@gmail.com',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
      {
        [labelPath]: 'Freshdesk support from India and Berlin',
        subText: 'support.india@freshdesk.com',
        [valuePath]: 'support.india@freshdesk.com',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
      {
        [labelPath]: 'Angela from Freshdesk',
        subText: 'angela@freshdesk.in',
        [valuePath]: 'angela@freshdesk.in',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
    ];
  };

  const props = {
    options: getOptions('text', 'value'),
    optionLabelPath: 'name',
    optionValuePath: 'email',
    customOptions: getOptions('name', 'email'),
  };

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-select></fw-select>');
    const element = await page.find('fw-select');
    expect(element).toHaveClass('hydrated');
  });

  it('it checks if value can be set and get', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" required="true">
                                <fw-select-option value="starks">Starks</fw-select-option>
                                <fw-select-option value="lannisters">Lannisters</fw-select-option>
                            </fw-select>`);

    const element = await page.find('fw-select');

    element.setAttribute('value', 'starks');

    await page.waitForChanges();
    const value = element.getAttribute('value');
    expect(value).toBe('starks');
  });

  it('Renders all the select options when passed as slot', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" required="true">
                                <fw-select-option value="starks">Starks</fw-select-option>
                                <fw-select-option value="lannisters">Lannisters</fw-select-option>
                            </fw-select>`);

    const popover = await page.find('fw-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );

    expect(options.length).toBe(2);
  });

  it('Renders all the select options when passed as prop', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select>
                            </fw-select>`);
    await page.$eval(
      'fw-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    await page.waitForChanges();
    const popover = await page.find('fw-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    expect(options.length).toBe(3);
  });

  it('it checks if multiple values can be set and get', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select multiple label="Select the house" required="true">
                                <fw-select-option value="starks">Starks</fw-select-option>
                                <fw-select-option value="lannisters">Lannisters</fw-select-option>
                                <fw-select-option value="sands">Sands</fw-select-option>
                            </fw-select>`);

    const element = await page.find('fw-select');

    element.setAttribute('value', ['starks', 'sands']);

    await page.waitForChanges();
    const value = element.getAttribute('value');
    expect(value).toBe('starks,sands');
  });

  it('checks if multiple values set using setSelectedValues method and get using getSelectedItem', async () => {
    const page = await newE2EPage();
    await page.setContent(`<fw-select multiple>
                            </fw-select>`);
    await page.$eval(
      'fw-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    await page.waitForChanges();
    const element = await page.find('fw-select');
    await element.callMethod('setSelectedValues', [
      'angela.smith@gmail.com',
      'angela@freshdesk.in',
    ]);
    await page.waitForChanges();
    const selectedTags = await page.findAll('fw-select >>> fw-tag');
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
    await page.setContent(`<fw-select multiple>
                            </fw-select>`);
    await page.$eval(
      'fw-select',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    const element = await page.find('fw-select');
    await element.callMethod('setSelectedOptions', [
      props.options[0],
      props.options[1],
    ]);
    await page.waitForChanges();
    const selectedTags = await page.findAll('fw-select >>> fw-tag');
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

  it('it checks if multiple values set using setSelectedValues method', async () => {
    const page = await newE2EPage();
    await page.setContent(`<fw-select multiple label="Select the house" required="true">
                                <fw-select-option value="starks">Starks</fw-select-option>
                                <fw-select-option value="lannisters">Lannisters</fw-select-option>
                                <fw-select-option value="sands">Sands</fw-select-option>
                            </fw-select>`);
    const element = await page.find('fw-select');
    await element.callMethod('setSelectedValues', ['starks', 'sands']);
    await page.waitForChanges();
    const selectedValues = await element.callMethod('getSelectedItem');
    const values = [];
    selectedValues.forEach((value) => {
      values.push(value.value);
    });
    expect(values).toStrictEqual(['starks', 'sands']);
  });

  it('it emits fwBlur when the focus is changed away from the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" required="true" value="1">
                                  <fw-select-option value="starks">Starks</fw-select-option>
                                  <fw-select-option value="2">Lannisters</fw-select-option>
                              </fw-select>`);
    const fwBlur = await page.spyOnEvent('fwBlur');
    const element = await page.find('fw-select');

    await element.click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.waitForChanges();

    expect(fwBlur).toHaveReceivedEvent();
  });

  it('Sets html content as the select option', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <fw-select
          label="Select App type"
          placeholder="Choose app type">
          <fw-select-option value="1" html option-text="LLL">
                <div style="color: red; padding: 10px;">Lannister </div class="cls">
                <div style="color: green; padding: 5px;">Lannisters are gods</div>
          </fw-select-option>
          <fw-select-option value="2">
            Shenigans
          </fw-select-option>
      </fw-select>
      `);

    const element = await page.find('fw-select');
    element.setAttribute('value', '1');

    await page.waitForChanges();
    const selectInput = await page.find('fw-select >>> input');
    const inputValue = await selectInput.getProperty('value');
    expect(inputValue).toBe('LLL');
  });

  it('it emits fwChange when the value is changed in the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select name="sel" label="Select the house" required="true" value="1">
                              <fw-select-option value="starks">Starks</fw-select-option>
                              <fw-select-option value="lannisters">Lannisters</fw-select-option>
                            </fw-select>`);

    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-select');

    element.setProperty('value', 'lannisters');
    element.waitForEvent('fwChange');

    await page.waitForChanges();

    expect(fwChange).toHaveReceivedEventDetail({
      value: 'lannisters',
      name: 'sel',
      meta: {
        selectedOptions: [
          {
            disabled: false,
            html: false,
            htmlContent: '',
            selected: false,
            text: 'Lannisters',
            value: 'lannisters',
          },
        ],
      },
    });
  });

  it('it emits fwFocus when the focus is on the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" required="true" value="1">
                              <fw-select-option value="starks">Starks</fw-select-option>
                              <fw-select-option value="lannisters">Lannisters</fw-select-option>
                          </fw-select>`);
    const fwFocus = await page.spyOnEvent('fwFocus');
    page.waitForEvent('fwFocus');
    const element = await page.find('fw-select');

    await element.click();
    await page.keyboard.press('Tab');

    await page.waitForChanges();

    expect(fwFocus).toHaveReceivedEvent();
  });

  it('show passed default value and get selected in dropdown', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" value="lannisters">
                              <fw-select-option value="starks">Starks</fw-select-option>
                              <fw-select-option value="lannisters">Lannisters</fw-select-option>
                          </fw-select>`);

    const selectInput = await page.find('fw-select >>> input');
    const inputValue = await selectInput.getProperty('value');
    expect(inputValue).toBe('Lannisters');

    const element = await page.find('fw-select');
    await element.click();
    const popover = await page.find('fw-select >>> fw-popover');
    const selectOptions = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    const selectedOption = await selectOptions[1].getProperty('selected');
    expect(selectedOption).toBeTruthy();
  });

  it('sets disabled select component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" value="lannisters" disabled>
                              <fw-select-option value="starks">Starks</fw-select-option>
                              <fw-select-option value="lannisters">Lannisters</fw-select-option>
                          </fw-select>`);

    const selectInput = await page.find('fw-select >>> input');

    expect(selectInput.getProperty('disabled')).toBeTruthy();
  });

  it('sets readonly select component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" value="lannisters" readonly>
                              <fw-select-option value="starks">Starks</fw-select-option>
                              <fw-select-option value="lannisters">Lannisters</fw-select-option>
                          </fw-select>`);

    const selectInput = await page.find('fw-select >>> input');

    expect(selectInput.getProperty('readOnly')).toBeTruthy();
  });

  it('sets readonly select component for button variant', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" value="lannisters" readonly>
                              <fw-select-option value="starks">Starks</fw-select-option>
                              <fw-select-option value="lannisters">Lannisters</fw-select-option>
                          </fw-select>`);

    const readonlyField = await page.find(
      'fw-select >>> fw-popover >>> .readonly-field'
    );

    expect(readonlyField).toBeTruthy();
  });

  it('shows error style for tags exceeding max limit for mail variant', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select multiple variant="mail">
                              </fw-select>`);
    await page.$eval(
      'fw-select',
      (elm: any, { options }) => {
        elm.options = options;
        elm.max = 2;
      },
      props
    );
    await page.waitForChanges();
    const element = await page.find('fw-select');
    await element.callMethod('setSelectedValues', [
      'angela.smith@gmail.com',
      'angela@freshdesk.in',
      'support.india@freshdesk.com',
    ]);
    await page.waitForChanges();
    const selectedTags = await page.findAll('fw-select >>> fw-tag');
    expect(selectedTags.length).toBe(3);
    const errorTag = await selectedTags[2].shadowRoot.querySelector('.tag');
    expect(errorTag).toHaveClass('error');
  });

  it('Renders all the select options when optionLabelPath and optionValuePath is passed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select>
                            </fw-select>`);
    await page.$eval(
      'fw-select',
      (elm: any, { customOptions, optionLabelPath, optionValuePath }) => {
        elm.options = customOptions;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
      },
      props
    );
    await page.waitForChanges();
    const popover = await page.find('fw-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    expect(options.length).toBe(3);
    await options.map(async (option, index) => {
      expect(
        option.shadowRoot.querySelector('.description-text')['innerText']
      ).toBe(props.customOptions[index]['name']);
      expect(
        option.shadowRoot.querySelector('.description-subText')['innerText']
      ).toBe(props.customOptions[index]['email']);
    });
  });

  it('renders select option with the option provided with search when optionLabelPath and optionValuePath are passed as props', async () => {
    await jest.useFakeTimers();
    const page = await newE2EPage();
    await page.setContent('<fw-select></fw-select>');
    await page.$eval(
      'fw-select',
      (elm: any, { optionLabelPath, optionValuePath }) => {
        elm.search = () => {
          return new Promise((resolve) => {
            return resolve([
              {
                name: 'Angela Smith',
                email: 'angela.smith@gmail.com',
              },
            ]);
          });
        };
        elm.debounceTimer = 0;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
      },
      props
    );
    await page.waitForChanges();
    await page.waitForChanges();

    const input = await page.find('fw-select >>> input');
    await input.click();
    await page.waitForChanges();
    await input.press('a');
    await page.waitForChanges();
    jest.runAllTimers();
    await page.waitForChanges();
    await page.waitForChanges();
    const popover = await page.find('fw-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    expect(options.length).toBe(1);
    const selectOption = await options[0].shadowRoot.querySelector(
      '.select-option'
    );
    expect(selectOption['innerText']).toBe('Angela Smith');
    jest.useRealTimers();
  });

  it('emits fwChange with selected option when optionLabelPath and optionValuePath is passed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select>
                            </fw-select>`);
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-select');
    await page.$eval(
      'fw-select',
      (elm: any, { customOptions, optionLabelPath, optionValuePath }) => {
        elm.options = customOptions;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
      },
      props
    );
    await page.waitForChanges();
    await element.click();
    await page.waitForChanges();
    const popover = await page.find('fw-select >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    expect(options.length).toBe(3);
    options[1].click();
    await page.waitForChanges();
    expect(fwChange).toHaveReceivedEventDetail({
      value: props.customOptions[1]['email'],
      name: '',
      meta: {
        selectedOptions: [
          {
            allowDeselect: true,
            checkbox: false,
            disabled: false,
            hideTick: false,
            selected: true,
            variant: 'standard',
            ...props.customOptions[1],
          },
        ],
      },
    });
  });
});
