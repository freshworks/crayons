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

  it('it emits fwChange when the value is changed in the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-select label="Select the house" required="true" value="1">
                              <fw-select-option value="starks">Starks</fw-select-option>
                              <fw-select-option value="lannisters">Lannisters</fw-select-option>
                            </fw-select>`);
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-select');

    element.setProperty('value', 'lannisters');

    await page.waitForChanges();

    expect(fwChange).toHaveReceivedEventDetail({ 'value': 'lannisters' });
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
});
