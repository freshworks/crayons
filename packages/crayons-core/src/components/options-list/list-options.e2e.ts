import { newE2EPage } from '@stencil/core/testing';
describe('fw-list-options', () => {
  const props = {
    options: [
      {
        name: 'Angela Smith',
        subText: 'angela.smith@gmail.com',
        email: 'angela.smith@gmail.com',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
      {
        name: 'Freshdesk support from India and Berlin',
        subText: 'support.india@freshdesk.com',
        email: 'support.india@freshdesk.com',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
      {
        name: 'Angela from Freshdesk',
        subText: 'angela@freshdesk.in',
        email: 'angela@freshdesk.in',
        graphicsProps: {
          image:
            'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
      },
    ],
    optionLabelPath: 'name',
    optionValuePath: 'email',
    max: 1,
  };

  const getInnerNode = (element, query) => {
    return element.shadowRoot.querySelector(query);
  };

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-list-options></fw-list-options>');
    const element = await page.find('fw-list-options');
    expect(element).toHaveClass('hydrated');
  });

  it('renders first list option as creatable option when isCreatable is true', async () => {
    jest.useFakeTimers();
    const page = await newE2EPage();
    await page.setContent('<fw-list-options></fw-list-options>');
    await page.waitForChanges();
    await page.$eval('fw-list-options', (elm: any) => {
      elm.isCreatable = true;
      elm.search = () => {
        return new Promise((resolve) => {
          resolve([]);
        });
      };
      elm.filterText = 'text';
      elm.debounceTimer = 0;
    });
    await page.waitForChanges();
    await page.waitForChanges();
    jest.runAllTimers();
    await page.waitForChanges();
    const selectOptions = await page.findAll(
      'fw-list-options >>> fw-select-option'
    );
    const creatableOption = await selectOptions[0].shadowRoot.querySelector(
      '.select-option'
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Property does not exist on type Element
    expect(creatableOption.innerText).toBe('text');
    jest.useRealTimers();
  });

  it('renders first list option as creatable option and formats the text based on formatCreateLabel prop when isCreatable is true', async () => {
    jest.useFakeTimers();
    const page = await newE2EPage();
    await page.setContent('<fw-list-options></fw-list-options>');
    await page.waitForChanges();
    await page.$eval('fw-list-options', (elm: any) => {
      elm.isCreatable = true;
      elm.search = () => {
        return new Promise((resolve) => {
          resolve([]);
        });
      };
      elm.filterText = 'text';
      elm.debounceTimer = 0;
      elm.formatCreateLabel = (label) => `Add "${label}" as a recipient`;
    });
    await page.waitForChanges();
    await page.waitForChanges();
    jest.runAllTimers();
    await page.waitForChanges();
    const selectOptions = await page.findAll(
      'fw-list-options >>> fw-select-option'
    );
    const creatableOption = await selectOptions[0].shadowRoot.querySelector(
      '.select-option'
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Property does not exist on type Element
    expect(creatableOption.innerText).toBe('Add "text" as a recipient');
    jest.useRealTimers();
  });

  it('Renders all the select options when optionLabelPath and optionValuePath is passed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-list-options>
                            </fw-list-options>`);
    await page.$eval(
      'fw-list-options',
      (elm: any, { options, optionLabelPath, optionValuePath }) => {
        elm.options = options;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
      },
      props
    );
    await page.waitForChanges();
    const options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(3);
    await options.map(async (option, index) => {
      expect(
        option.shadowRoot.querySelector('.description-text')['innerText']
      ).toBe(props.options[index]['name']);
      expect(
        option.shadowRoot.querySelector('.description-subText')['innerText']
      ).toBe(props.options[index]['email']);
    });
  });

  it('renders select option with the option provided with search when optionLabelPath and optionValuePath are passed as props', async () => {
    await jest.useFakeTimers();
    const page = await newE2EPage();
    await page.setContent('<fw-list-options></fw-list-options>');
    await page.$eval(
      'fw-list-options',
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
        elm.filterText = 'text';
      },
      props
    );
    await page.waitForChanges();
    await page.waitForChanges();
    jest.runAllTimers();
    await page.waitForChanges();
    await page.waitForChanges();
    const options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(1);
    const selectOption = await options[0].shadowRoot.querySelector(
      '.select-option'
    );
    expect(selectOption['innerText']).toBe('Angela Smith');
    jest.useRealTimers();
  });

  it('emits fwChange with selected option when optionLabelPath and optionValuePath is passed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-list-options>
                            </fw-list-options>`);
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-list-options');
    await page.$eval(
      'fw-list-options',
      (elm: any, { options, optionLabelPath, optionValuePath }) => {
        elm.options = options;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
      },
      props
    );
    await page.waitForChanges();
    const options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(3);
    options[1].click();
    await page.waitForChanges();
    expect(fwChange).toHaveReceivedEventDetail({
      value: props.options[1]['email'],
      meta: {
        selectedOptions: [
          {
            allowDeselect: true,
            checkbox: false,
            disabled: false,
            hideTick: false,
            selected: true,
            variant: 'standard',
            ...props.options[1],
          },
        ],
      },
    });
  });

  it('disable the non selected options when number of selected options exceeds max value when selected options are not passed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-list-options multiple>
                            </fw-list-options>`);
    await page.$eval(
      'fw-list-options',
      (elm: any, { options, optionLabelPath, optionValuePath, max }) => {
        elm.options = options;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
        elm.max = max;
      },
      props
    );
    await page.waitForChanges();
    const options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(3);
    options[0].click();
    await page.waitForChanges();
    expect(getInnerNode(options[0], '.select-option')).toHaveClass('selected');
    expect(getInnerNode(options[0], '.select-option')).not.toHaveClass(
      'disabled'
    );

    expect(getInnerNode(options[1], '.select-option')).not.toHaveClass(
      'selected'
    );
    expect(getInnerNode(options[1], '.select-option')).toHaveClass('disabled');

    expect(getInnerNode(options[2], '.select-option')).not.toHaveClass(
      'selected'
    );
    expect(getInnerNode(options[2], '.select-option')).toHaveClass('disabled');
  });

  it('disable the non selected options when number of selected options exceeds max value when selected options are passed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-list-options multiple>
                            </fw-list-options>`);
    await page.$eval(
      'fw-list-options',
      (elm: any, { options, optionLabelPath, optionValuePath, max }) => {
        elm.options = options;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
        elm.value = [options[0].email];
        elm.max = max;
      },
      props
    );
    await page.waitForChanges();
    await page.waitForChanges();
    const options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(3);
    await page.waitForChanges();
    expect(getInnerNode(options[0], '.select-option')).toHaveClass('selected');
    expect(getInnerNode(options[0], '.select-option')).not.toHaveClass(
      'disabled'
    );

    expect(getInnerNode(options[1], '.select-option')).not.toHaveClass(
      'selected'
    );
    expect(getInnerNode(options[1], '.select-option')).toHaveClass('disabled');

    expect(getInnerNode(options[2], '.select-option')).not.toHaveClass(
      'selected'
    );
    expect(getInnerNode(options[2], '.select-option')).toHaveClass('disabled');
  });

  it('should change the value when setSelectedValues is called', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-list-options>
                            </fw-list-options>`);
    const element = await page.find('fw-list-options');
    await page.$eval(
      'fw-list-options',
      (elm: any, { options, optionLabelPath, optionValuePath }) => {
        elm.options = options;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
        elm.value = 'angela.smith@gmail.com';
      },
      props
    );
    await page.waitForChanges();
    await page.waitForChanges();
    const options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(3);
    await page.waitForChanges();
    let selectedOptions = await element.callMethod('getSelectedOptions');
    expect(selectedOptions.length).toBe(1);
    expect(selectedOptions[0].email).toBe('angela.smith@gmail.com');
    await element.callMethod('setSelectedValues', 'angela@freshdesk.in');
    await page.waitForChanges();
    selectedOptions = await element.callMethod('getSelectedOptions');
    expect(selectedOptions.length).toBe(1);
    expect(selectedOptions[0].email).toBe('angela@freshdesk.in');
  });

  it('should change the value when setSelectedOptions is called', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-list-options>
                            </fw-list-options>`);
    const element = await page.find('fw-list-options');
    await page.$eval(
      'fw-list-options',
      (elm: any, { options, optionLabelPath, optionValuePath }) => {
        elm.options = options;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
        elm.value = 'angela.smith@gmail.com';
      },
      props
    );
    await page.waitForChanges();
    await page.waitForChanges();
    const options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(3);
    await page.waitForChanges();
    let selectedOptions = await element.callMethod('getSelectedOptions');
    expect(selectedOptions.length).toBe(1);
    expect(selectedOptions[0].email).toBe('angela.smith@gmail.com');
    await element.callMethod('setSelectedOptions', [props.options[2]]);
    await page.waitForChanges();
    selectedOptions = await element.callMethod('getSelectedOptions');
    expect(selectedOptions.length).toBe(1);
    expect(selectedOptions[0].email).toBe('angela@freshdesk.in');
  });

  it('should dynamically render options with checkbox', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-list-options>
                            </fw-list-options>`);
    await page.$eval(
      'fw-list-options',
      (elm: any, { options, optionLabelPath, optionValuePath }) => {
        elm.options = options;
        elm.optionLabelPath = optionLabelPath;
        elm.optionValuePath = optionValuePath;
      },
      props
    );
    await page.waitForChanges();
    let options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(3);
    await options.forEach(async (option) => {
      const hasCheckbox = await option.getProperty('checkbox');
      expect(hasCheckbox).toBeFalsy();
    });
    await page.$eval('fw-list-options', (elm: any) => {
      elm.checkbox = true;
      elm.hideTick = true;
    });
    await page.waitForChanges();
    options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(3);
    await options.forEach(async (option) => {
      const hasCheckbox = await option.getProperty('checkbox');
      expect(hasCheckbox).toBeTruthy();
    });
  });

  it('should not render default options with checkbox', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-list-options searchable hideTick not-found-text="Cannot find item" no-data-text="No options available">
                            </fw-list-options>`);
    await page.$eval('fw-list-options', (elm: any) => {
      elm.checkbox = true;
    });
    await page.waitForChanges();
    let options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(1);
    expect(await options[0].getProperty('text')).toBe('No options available');
    expect(await options[0].getProperty('checkbox')).toBeFalsy();
    const searchInput = await page.find('fw-list-options >>> .input-search');
    searchInput.setProperty('value', 'some');
    await searchInput.triggerEvent('input');
    await page.waitForChanges();
    await page.waitForTimeout(1000);
    options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBe(1);
    expect(await options[0].getProperty('checkbox')).toBeFalsy();
    expect(await options[0].getProperty('text')).toBe('Cannot find item');
  });

  it('should have virtual scroll (display only limited nodes based on space available in parent) when popup opens up', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-popover>
    <fw-button slot="popover-trigger">Click Me!</fw-button>
      <fw-list-options slot="popover-content" enable-virtual-scroll="true" estimated-size="35"></fw-list-options>
    </fw-popover`);
    await page.$eval('fw-list-options', (elm: any) => {
      elm.options = Array.from(Array(7000), (_, i) => ({
        text: `Item No: ${i + 1}`,
        value: i,
      }));
    });
    await page.waitForChanges();
    const trigger = await page.find('fw-button');
    await trigger.click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(() => resolve(null), 2000));
    const options = await page.findAll('fw-list-options >>> fw-select-option');
    expect(options.length).toBeGreaterThan(5);
    expect(options.length).toBeLessThan(20);
  });
});
