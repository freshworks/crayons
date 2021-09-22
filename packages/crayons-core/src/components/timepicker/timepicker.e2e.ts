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

  it('it sets start value, end value and interval as per the properties provided', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-timepicker min-time="09:00 AM" interval=15></fw-timepicker>`);
    const el = await page.find('fw-timepicker >>> fw-select');
    expect(el.shadowRoot).toEqualHtml(`<div class="select-container">       <div class="input-container normal">         <div class="input-container-inner">           <input autocomplete="off" placeholder="" type="text">           <span class="dropdown-status-icon"></span>         </div>       </div>       <ul class="dropdown" tabindex="0">         <fw-select-option class="hydrated" value="09:00">           09:00 AM         </fw-select-option>         <fw-select-option class="hydrated" value="09:15">           09:15 AM         </fw-select-option>         <fw-select-option class="hydrated" value="09:30">           09:30 AM         </fw-select-option>         <fw-select-option class="hydrated" value="09:45">           09:45 AM         </fw-select-option>         <fw-select-option class="hydrated" value="10:00">           10:00 AM         </fw-select-option>         <fw-select-option class="hydrated" value="10:15">           10:15 AM         </fw-select-option>         <fw-select-option class="hydrated" value="10:30">           10:30 AM         </fw-select-option>         <fw-select-option class="hydrated" value="10:45">           10:45 AM         </fw-select-option>         <fw-select-option class="hydrated" value="11:00">           11:00 AM         </fw-select-option>         <fw-select-option class="hydrated" value="11:15">           11:15 AM         </fw-select-option>         <fw-select-option class="hydrated" value="11:30">           11:30 AM         </fw-select-option>         <fw-select-option class="hydrated" value="11:45">           11:45 AM         </fw-select-option>         <fw-select-option class="hydrated" value="12:00">           12:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="12:15">           12:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="12:30">           12:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="12:45">           12:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="13:00">           01:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="13:15">           01:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="13:30">           01:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="13:45">           01:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="14:00">           02:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="14:15">           02:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="14:30">           02:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="14:45">           02:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="15:00">           03:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="15:15">           03:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="15:30">           03:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="15:45">           03:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="16:00">           04:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="16:15">           04:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="16:30">           04:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="16:45">           04:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="17:00">           05:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="17:15">           05:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="17:30">           05:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="17:45">           05:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="18:00">           06:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="18:15">           06:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="18:30">           06:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="18:45">           06:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="19:00">           07:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="19:15">           07:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="19:30">           07:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="19:45">           07:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="20:00">           08:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="20:15">           08:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="20:30">           08:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="20:45">           08:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="21:00">           09:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="21:15">           09:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="21:30">           09:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="21:45">           09:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="22:00">           10:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="22:15">           10:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="22:30">           10:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="22:45">           10:45 PM         </fw-select-option>         <fw-select-option class="hydrated" value="23:00">           11:00 PM         </fw-select-option>         <fw-select-option class="hydrated" value="23:15">           11:15 PM         </fw-select-option>         <fw-select-option class="hydrated" value="23:30">           11:30 PM         </fw-select-option>         <fw-select-option class="hydrated" value="23:45">           11:45 PM         </fw-select-option>       </ul>     </div>     <div class="overlay"></div>`);
  });

  it('sets the value when the option is selected', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-timepicker min-time="09:00 AM" interval=15></fw-timepicker>`);
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
