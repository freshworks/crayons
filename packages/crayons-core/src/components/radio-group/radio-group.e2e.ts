import { newE2EPage } from '@stencil/core/testing';

describe('fw-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio-group></fw-radio-group>');
    const element = await page.find('fw-radio-group');
    expect(element).toHaveClass('hydrated');
  });

  it('it emits when input radiogroup', async () => {
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

  it('it should emit fwChange event down/right arrow key is pressed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-radio-group>
    <fw-radio ch value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`);

    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-radio-group');

    element.setAttribute('value', 'yes');

    await element.click();
    await page.keyboard.press('ArrowDown');

    await page.waitForChanges();
    expect(fwChange).toHaveReceivedEvent();
  });

  it('it should emit fwChange event left/up arrow key is pressed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-radio-group>
    <fw-radio ch value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`);

    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-radio-group');

    element.setAttribute('value', 'yes');

    await element.click();
    await page.keyboard.press('ArrowUp');

    await page.waitForChanges();
    expect(fwChange).toHaveReceivedEvent();
  });

  it('it should emit fwChange event space key is pressed with no option selected', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-radio-group>
    <fw-radio ch value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`);

    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-radio-group');

    element.setAttribute('value', 'yes');

    await element.click();
    await page.keyboard.press('Space');

    await page.waitForChanges();
    expect(fwChange).toHaveReceivedEvent();
  });

  it('it should set aria-label when label is passed as param', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-radio-group label="Attending">
    <fw-radio ch value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`);

    const element = await page.find('fw-radio-group');
    const label = element.getAttribute('aria-label');
    expect(label).toBe('Attending');
  });
});
