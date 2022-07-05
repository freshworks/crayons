import { newE2EPage } from '@stencil/core/testing';

async function getSelectOptions(page) {
  const list = await page.find('fw-timepicker >>> .timepicker');
  const popover = await list.find('fw-select >>> fw-popover');
  const selectOptions = await popover.findAll(
    'fw-list-options >>> fw-select-option'
  );
  return selectOptions;
}

describe('fw-timepicker', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-timepicker></fw-timepicker>');
    const element = await page.find('fw-timepicker');
    expect(element).toHaveClass('hydrated');
  });

  it('it emits fwBlur when the focus is changed away from the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-timepicker></fw-timepicker>`);
    const fwBlur = await page.spyOnEvent('fwBlur');
    const element = await page.find('fw-timepicker');

    await element.click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.waitForChanges();

    expect(fwBlur).toHaveReceivedEvent();
  });

  it('it emits fwFocus when the focus is on the component', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-timepicker></fw-timepicker>`);
    const fwFocus = await page.spyOnEvent('fwFocus');
    const element = await page.find('fw-timepicker');

    await element.click();
    await page.keyboard.press('Tab');

    await page.waitForChanges();

    expect(fwFocus).toHaveReceivedEvent();
  });

  it('it sets start value, end value and interval as per the properties provided', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<fw-timepicker min-time="09:00 AM" interval=15></fw-timepicker>`
    );
    const selectOptions = await getSelectOptions(page);
    expect(await selectOptions[0].getProperty('value')).toBe('09:00');
  });

  it('sets the value when the option is selected', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<fw-timepicker min-time="09:00 AM" interval=15></fw-timepicker>`
    );
    const fwChange = await page.spyOnEvent('fwChange');
    const el = await page.find('fw-timepicker');
    await el.click();
    await page.waitForChanges();

    // click on the first option
    const selectOptions = await getSelectOptions(page);
    await selectOptions[0].click();
    await page.waitForChanges();
    expect(fwChange).toHaveReceivedEvent();
  });

  it('sets the value from the attribute', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-timepicker value="00:30"></fw-timepicker>`);
    const el = await page.find('fw-timepicker');

    expect(await el.getProperty('value')).toBe('00:30');
  });
});
