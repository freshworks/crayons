import { newE2EPage } from '@stencil/core/testing';

describe('fw-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox></fw-checkbox>');
    const element = await page.find('fw-checkbox');
    expect(element).not.toBeNull();
  });

  it('it renders with check', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox checked></fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const isChecked = await element.getProperty('checked');
    expect(isChecked).toBe(true);
  });

  it('it emits fwchange when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox value="1">1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwchange');
    await element.click();
    expect(fwChange).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it emits fwchange when space is pressed', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-checkbox value="1">1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwchange');
    await element.press('Space');
    expect(fwChange).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it emits fwchange when property is set', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox value="1">1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwchange');
    element.setProperty('checked', true);
    await page.waitForChanges();
    expect(fwChange).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it should not emit fwchange when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox value="1" disabled>1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwchange');
    await element.click();
    expect(fwChange.events).toEqual([]);
  });

  it('it should set label when passed as a prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox label="Yes"></fw-checkbox>');
    const element = await page.find('fw-checkbox >>> label');
    expect(element).toEqualText('Yes');
  });

  it('it should return html structure with slot when content is passed between opening and closing tag', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-checkbox label="Yes">Select to Agree</fw-checkbox>'
    );
    const element = await page.find('fw-checkbox >>> div');
    console.log(element);
    expect(element).toEqualHtml(`<div id="description">
    <slot/>
    </div>`);
  });
});
