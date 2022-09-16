import { newE2EPage } from '@stencil/core/testing';

describe('fw-country-phone hydrated', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-country-phone></fw-country-phone>');
    const element = await page.find('fw-country-phone');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with proper country code phone number', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-country-phone value="919999999999"></fw-country-phone>'
    );
    const element = await page.find('fw-country-phone');
    await page.waitForChanges();
    const value = await element.getProperty('value');
    expect(value).toBe('919999999999');

    const selectElement = await page.find('fw-country-phone >>> fw-select');
    const selectValue = await selectElement.getProperty('value');
    expect(selectValue).toBe('IN');

    const inputElement = await page.find('fw-country-phone >>> fw-input');
    const inputValue = await inputElement.getProperty('value');
    const inputDisabled = await inputElement.getProperty('disabled');
    expect(inputDisabled).toBe(false);
    expect(inputValue).toBe('9999999999');
  });

  it('should set country code selected', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-country-phone value="91"></fw-country-phone>');
    const element = await page.find('fw-country-phone >>> fw-select');

    element.setProperty('value', 'IN');
    await element.waitForEvent('fwChange');

    await page.waitForChanges();
    const selectElement = await page.find('fw-country-phone >>> fw-select');
    const selectValue = await selectElement.getProperty('value');
    expect(selectValue).toBe('IN');
  });

  it('should emit on fwInput with proper keys', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-country-phone value="91" name="num"></fw-country-phone>'
    );
    const fwInput = await page.spyOnEvent('fwInput');
    const element = await page.find('fw-country-phone >>> fw-select');

    element.setProperty('value', 'IN');
    await element.waitForEvent('fwChange');

    await page.waitForChanges();
    const selectElement = await page.find('fw-country-phone >>> fw-select');
    const selectValue = await selectElement.getProperty('value');
    expect(selectValue).toBe('IN');

    const inputElement = await page.find(' fw-country-phone >>> fw-input');

    await inputElement.click();
    await inputElement.press('2');

    await page.waitForChanges();

    const inputPhoneNumber = await inputElement.getProperty('value');
    expect(inputPhoneNumber).toBe('2');
    expect(fwInput).toHaveReceivedEventDetail({
      event: {
        isTrusted: false,
      },
      value: '+912',
      name: 'num',
      meta: {
        isValid: false,
        countryCode: 'IN',
        phoneCode: '91',
        countryName: 'India',
      },
    });
  });
  it('should emit on fwFocus with proper keys', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-country-phone value="91" name="num"></fw-country-phone>'
    );
    const fwFocus = await page.spyOnEvent('fwFocus');
    const element = await page.find('fw-country-phone >>> fw-select');

    element.setProperty('value', 'IN');
    await element.waitForEvent('fwChange');

    await page.waitForChanges();
    const selectElement = await page.find('fw-country-phone >>> fw-select');
    const selectValue = await selectElement.getProperty('value');
    expect(selectValue).toBe('IN');

    const inputElement = await page.find(' fw-country-phone >>> fw-input');

    await inputElement.click();

    await page.waitForChanges();

    expect(fwFocus).toHaveReceivedEventDetail({
      event: {
        isTrusted: false,
      },
      value: '+91',
      name: 'num',
      meta: {
        isValid: false,
        countryCode: 'IN',
        phoneCode: '91',
        countryName: 'India',
      },
    });
  });
  it('should emit on fwBlur with proper keys', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-country-phone value="91" name="num"></fw-country-phone>'
    );
    const fwBlur = await page.spyOnEvent('fwBlur');
    const element = await page.find('fw-country-phone >>> fw-select');

    element.setProperty('value', 'IN');
    await element.waitForEvent('fwChange');

    await page.waitForChanges();
    const selectElement = await page.find('fw-country-phone >>> fw-select');
    const selectValue = await selectElement.getProperty('value');
    expect(selectValue).toBe('IN');

    const inputElement = await page.find(' fw-country-phone >>> fw-input');

    await inputElement.click();
    await inputElement.press('2');

    await page.waitForChanges();

    const inputPhoneNumber = await inputElement.getProperty('value');
    expect(inputPhoneNumber).toBe('2');
    await page.keyboard.press('Tab');
    expect(fwBlur).toHaveReceivedEventDetail({
      event: {
        isTrusted: false,
      },
      value: '+912',
      name: 'num',
      meta: {
        isValid: false,
        countryCode: 'IN',
        phoneCode: '91',
        countryName: 'India',
      },
    });
  });
  it('reset to empty when selected values are deleted from select dropdown', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-country-phone value="919999999999"></fw-country-phone>'
    );
    const element = await page.find('fw-country-phone >>> fw-select');

    element.setProperty('value', '');
    await element.waitForEvent('fwChange');

    await page.waitForChanges();
    const selectElement = await page.find('fw-country-phone >>> fw-select');
    const selectValue = await selectElement.getProperty('value');
    expect(selectValue).toBe('');
  });
});
