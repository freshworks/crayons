import { newE2EPage } from '@stencil/core/testing';

describe('fw-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input></fw-input>');
    const element = await page.find('fw-input');
    expect(element).toHaveClass('hydrated');
  });

  it('it checks if the input value can be read', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input value="tyrion lannister" disabled="true"></fw-input>');
    const element = await page.find('fw-input');
    const value = await element.getProperty('value');
    expect(value).toBe('tyrion lannister');
  });

  it('It checks if the input value can be set', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input></fw-input>');
    const element = await page.find('fw-input');
    element.setProperty('value', 'tyrion lannister');

    await page.waitForChanges();

    const value = await element.getProperty('value');
    expect(value).toBe('tyrion lannister');
  });

  it('it checks if the input has label', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input label="Name"> </fw-input>');
    const element = await page.find('fw-input');
    const label = element.getAttribute('label');

    expect(label).toBe('Name');
  });

  it('it checks if the input has label', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input label="Name"> </fw-input>');
    const element = await page.find('fw-input');
    const label = element.getAttribute('label');

    expect(label).toBe('Name');
  });

  it('it emits fwBlur when the focus is changed away from the component', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input value="1">1</fw-input>');
    const fwBlur = await page.spyOnEvent('fwBlur');
    const element = await page.find('fw-input');

    await element.click();
    await page.keyboard.press('Tab');

    await page.waitForChanges();
    expect(fwBlur).toHaveReceivedEvent();
  });

  it('it emits fwChange when the value is changed in the component', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input value="1"> </fw-input>');
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-input');

    element.setProperty('value', '2');

    await page.waitForChanges();

    expect(fwChange).toHaveReceivedEventDetail({ value: '2' });
  });

  it('it emits fwFocus when the focus is on the component', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input value="1"> </fw-input>');
    const fwFocus = await page.spyOnEvent('fwFocus');
    const element = await page.find('fw-input');

    await element.click();

    await page.waitForChanges();
    expect(fwFocus).toHaveReceivedEvent();
  });

  it('it emits fwInput when input is entered into the component', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input value="1"> </fw-input>');
    const fwInput = await page.spyOnEvent('fwInput');
    const element = await page.find('fw-input');

    await element.click();
    await element.press('2');

    await page.waitForChanges();
    expect(fwInput).toHaveReceivedEvent();
  });

  it('auto focuses when set to true', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input autofocus></fw-input>');
    const inputElement = await page.find('fw-input >>> input');

    expect(inputElement.getAttribute('autofocus')).toBe('');
  });
});
