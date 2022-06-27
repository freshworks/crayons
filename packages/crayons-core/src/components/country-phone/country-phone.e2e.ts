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

  it('should disable phone input element initially and display hint message to get clarity when value=half surved', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-country-phone value="91" required-inner-hint></fw-country-phone>'
    );

    const inputElement = await page.find(' fw-country-phone >>> fw-input');
    const inputDisabled = await inputElement.getProperty('disabled');
    const inputHintText = await inputElement.getProperty('hintText');
    expect(inputHintText).toBe('Entered number is too short');
    expect(inputDisabled).toBe(true);
  });
  it('should disable phone input element initially and dont display inner hintText without required-inner-hint prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-country-phone value="91"></fw-country-phone>');

    const inputElement = await page.find(' fw-country-phone >>> fw-input');
    const inputDisabled = await inputElement.getProperty('disabled');
    const inputHintText = await inputElement.getProperty('hintText');
    expect(inputHintText).toBe('');
    expect(inputDisabled).toBe(true);
  });
  it('should disable phone input element initially and display hint message as Empty to get clarity when value=Empty', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-country-phone value=""></fw-country-phone>');

    const inputElement = await page.find(' fw-country-phone >>> fw-input');
    const inputDisabled = await inputElement.getProperty('disabled');
    const inputHintText = await inputElement.getProperty('hintText');
    expect(inputDisabled).toBe(true);
    expect(inputHintText).toBe('');
  });

  it('should set country code selected', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-country-phone value="91"></fw-country-phone>');
    const element = await page.find('fw-country-phone >>> fw-select');

    element.setProperty('value', 'IN');
    element.waitForEvent('fwChange');

    await page.waitForChanges();
    const selectElement = await page.find('fw-country-phone >>> fw-select');
    const selectValue = await selectElement.getProperty('value');
    expect(selectValue).toBe('IN');
  });

  it('should emit on fwTelInput with proper keys', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-country-phone value="91" name="num"></fw-country-phone>'
    );
    const fwTelInput = await page.spyOnEvent('fwTelInput');
    const element = await page.find('fw-country-phone >>> fw-select');

    element.setProperty('value', 'IN');
    element.waitForEvent('fwChange');

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
    expect(fwTelInput).toHaveReceivedEventDetail({
      event: {
        isTrusted: false,
      },
      value: '+912',
      name: 'num',
      isValid: false,
      countryCode: 'IN',
      phoneCode: '91',
      countryName: 'India',
    });
  });
  it('should emit on fwTelBlur with proper keys', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-country-phone value="91" name="num"></fw-country-phone>'
    );
    const fwTelBlur = await page.spyOnEvent('fwTelBlur');
    const element = await page.find('fw-country-phone >>> fw-select');

    element.setProperty('value', 'IN');
    element.waitForEvent('fwChange');

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
    expect(fwTelBlur).toHaveReceivedEventDetail({
      event: {
        isTrusted: false,
      },
      value: '+912',
      name: 'num',
      isValid: false,
      countryCode: 'IN',
      phoneCode: '91',
      countryName: 'India',
    });
  });
});
