import { newE2EPage } from '@stencil/core/testing';

describe('fw-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio></fw-radio>');
    const element = await page.find('fw-radio');
    expect(element).toHaveClass('hydrated');
  });

  it('it renders with check', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio checked></fw-radio>');
    const element = await page.find('fw-radio');
    const isChecked = await element.getProperty('checked');
    expect(isChecked).toBe(true);
  });

  it('it emits fwSelect when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio value="1">1</fw-radio>');
    const element = await page.find('fw-radio');
    const fwSelect = await page.spyOnEvent('fwSelect');
    await element.click();
    expect(fwSelect).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it emits fwSelect when property is set', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio value="1">1</fw-radio>');
    const element = await page.find('fw-radio');
    const fwSelect = await page.spyOnEvent('fwSelect');
    element.setProperty('checked', true);
    await page.waitForChanges();
    expect(fwSelect).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it emits fwDeselect when property is unset', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio value="1" checked>1</fw-radio>');
    const element = await page.find('fw-radio');
    const fwDeselect = await page.spyOnEvent('fwDeselect');
    element.setProperty('checked', false);
    await page.waitForChanges();
    expect(fwDeselect).toHaveReceivedEvent();
  });

  it('it should not emit fwSelect when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio value="1" disabled>1</fw-radio>');
    const element = await page.find('fw-radio');
    const fwSelect = await page.spyOnEvent('fwSelect');
    await element.click();
    expect(fwSelect.events).toEqual([]);
  });

  it('it should return html structure with slot when content is passed between opening and closing tag', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio description="Yes">Agree</fw-radio>');
    const element = await page.find('fw-radio >>> div');
    expect(element).toEqualHtml(`<div class="radio-container">
    <input type="radio">
    <label>
      <span id="label">
      <slot></slot>
      </span>
      <div id="description">
        Yes
      </div>
    </label>
    </div>`);
  });
});
