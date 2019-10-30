import { newE2EPage } from '@stencil/core/testing';

describe('fw-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox></fw-checkbox>');
    const element = await page.find('fw-checkbox');
    expect(element).not.toBeNull();
  });

  it('changes state when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-checkbox></fw-checkbox>');
    const element = await page.find('fw-checkbox');
    // First Click
    element.triggerEvent('click');
    await page.waitForChanges();
    let isChecked = await element.getProperty('checked');
    expect(isChecked).toEqual(true);

    // Second Click
    element.triggerEvent('click');
    await page.waitForChanges();
    isChecked = await element.getProperty('checked');
    expect(isChecked).toEqual(false);
  });
});
