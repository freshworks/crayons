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

  it('it emits fwChange when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox value="1">1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.click();
    expect(fwChange).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it emits fwChange when space is pressed', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-checkbox value="1">1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.press('Space');
    expect(fwChange).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it emits fwChange when Enter is pressed', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-checkbox value="1">1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.press('Enter');
    expect(fwChange).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it emits fwChange when property is set', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox value="1">1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwChange');
    element.setProperty('checked', true);
    await page.waitForChanges();
    expect(fwChange).toHaveReceivedEventDetail({ checked: true, value: '1' });
  });

  it('it should not emit fwChange when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox value="1" disabled>1</fw-checkbox>');
    const element = await page.find('fw-checkbox');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.click();
    expect(fwChange.events).toEqual([]);
  });

  it('it should set label when passed as a prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox label="Yes"></fw-checkbox>');
    const element = await page.find('fw-checkbox >>> span');
    expect(element).toEqualText('Yes');
  });

  it('it should set subtitle/description when passed as a prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox label="Yes" description="Select to Agree"></fw-checkbox>');
    const element = await page.find('fw-checkbox >>> div');
    expect(element).toEqualText('Select to Agree');
  });
});
