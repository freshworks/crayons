import { newE2EPage } from '@stencil/core/testing';

describe('fw-select', () => {
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

  it('Renders all the select options', async () => {
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
});
