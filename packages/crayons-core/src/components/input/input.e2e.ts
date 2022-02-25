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

    await page.setContent(
      '<fw-input value="tyrion lannister" disabled="true"></fw-input>'
    );
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

  it('it should not emit fwChange when the value is changed in the component', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input value="1"> </fw-input>');
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-input');

    element.setProperty('value', '2');

    await page.waitForChanges();

    expect(fwChange).not.toHaveReceivedEvent();
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

  it('allow decimal values for Input element', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-input value="0.01" step="1" type="decimal"> </fw-input>'
    );
    const element = await page.find('fw-input');

    await element.click();
    element.setProperty('value', '1.01');

    await page.waitForChanges();

    const value = await element.getProperty('value');
    expect(value).toBe('1.01');
  });

  it('allow number/integer values for Input element', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input name="num" type="number"> </fw-input>');
    const fwInput = await page.spyOnEvent('fwInput');
    const element = await page.find('fw-input');

    await element.click();
    await element.press('2');

    await page.waitForChanges();

    expect(fwInput).toHaveReceivedEventDetail({
      event: {
        isTrusted: true,
      },
      value: '2',
      name: 'num',
    });
  });

  it('set max value of number/integer values for Input element', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-input value="1" name="max" type="number" max="5"> </fw-input>'
    );
    const fwInput = await page.spyOnEvent('fwInput');
    const element = await page.find('fw-input >>> input');

    await element.press('ArrowUp');
    await element.press('ArrowUp');
    await element.press('ArrowUp');
    await element.press('ArrowUp');
    await element.press('ArrowUp');

    await page.waitForChanges();

    expect(fwInput).toHaveReceivedEventDetail({
      event: {
        isTrusted: true,
      },
      value: '5',
      name: 'max',
    });
  });
});
