import { newE2EPage } from '@stencil/core/testing';

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

  // TODO: Better test case to check for the first value.

  // it('it sets start value, end value and interval as per the properties provided', async () => {
  //   const page = await newE2EPage();

  //   await page.setContent(
  //     `<fw-timepicker min-time="09:00 AM" interval=15></fw-timepicker>`
  //   );
  //   const el = await page.find('fw-timepicker >>> fw-select');
  //   expect(el.shadowRoot).toEqualHtml(
  //     `<div class="select-container">   <fw-popover class="hydrated" same-width>    <div class="input-container normal" slot="popover-trigger">         <div class="input-container-inner">           <input autocomplete="off" placeholder="" type="text">           <span class="dropdown-status-icon"></span>         </div>       </div>        <fw-list-options class="hydrated" slot="popover-content" value=""></fw-list-options> </fw-popover>     </div>     </fw-popover></div>`
  //   );
  // });

  it('sets the value when the option is selected', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<fw-timepicker min-time="09:00 AM" interval=15></fw-timepicker>`
    );
    const el = await page.find('fw-timepicker');
    const selectEl = await page.find('fw-timepicker >>> fw-select');
    selectEl.setProperty('value', '09:00');
    await page.waitForChanges();

    expect(await el.getProperty('value')).toBe('09:00');
  });

  it('sets the value from the attribute', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-timepicker value="00:30"></fw-timepicker>`);
    const el = await page.find('fw-timepicker');

    expect(await el.getProperty('value')).toBe('00:30');
  });
});
