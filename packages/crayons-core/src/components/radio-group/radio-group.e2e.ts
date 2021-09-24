import { newE2EPage } from '@stencil/core/testing';

describe('fw-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio-group></fw-radio-group>');
    const element = await page.find('fw-radio-group');
    expect(element).toHaveClass('hydrated');
  });

  it('it emits when input radigroup', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-radio-group>
    <fw-radio value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`);

    const fwChange = await page.spyOnEvent('fwChange');
    const fwSelect = await page.spyOnEvent('fwSelect');
    const fwFocus = await page.spyOnEvent('fwFocus');
    const fwBlur = await page.spyOnEvent('fwBlur');

    const element = await page.find('fw-radio-group');

    await element.click();
    element.setProperty('value', 'maybe');
    await page.keyboard.press('Tab');

    await page.waitForChanges();

    expect(fwFocus).toHaveReceivedEvent();
    expect(fwChange).toHaveReceivedEvent();
    expect(fwSelect).toHaveReceivedEvent();
    expect(fwBlur).toHaveReceivedEvent();
  });

  it('it checks the radio group value', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-radio-group>
    <fw-radio value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`);

    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-radio-group');

    await element.click();
    element.setProperty('value', 'maybe');
    await page.keyboard.press('Tab');

    await page.waitForChanges();

    expect(fwChange).toHaveReceivedEventDetail({ value: 'maybe' });
  });

  it('it checks if value can be set', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-radio-group>
    <fw-radio ch value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`);

    const element = await page.find('fw-radio-group');

    element.setAttribute('value', 'maybe');

    await page.waitForChanges();
    const valueAfterSetting = element.getAttribute('value');
    expect(valueAfterSetting).toBe('maybe');
  });
});
