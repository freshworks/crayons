import { newE2EPage } from '@stencil/core/testing';

describe('fw-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle></fw-toggle>');
    const element = await page.find('fw-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('it renders with toggle checked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle checked></fw-toggle>');
    const element = await page.find('fw-toggle');
    const isChecked = await element.getProperty('checked');
    expect(isChecked).toBe(true);
  });

  it('it emits fwChange when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle></fw-toggle>');
    const element = await page.find('fw-toggle');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.click();
    expect(fwChange).toHaveReceivedEventDetail({ checked: true });
  });

  it('it emits fwChange when space key is pressed', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle></fw-toggle>');
    const element = await page.find('fw-toggle');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.press('Space');
    expect(fwChange).toHaveReceivedEventDetail({ checked: true });
  });

  it('it emits fwChange when enter key is pressed', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle></fw-toggle>');
    const element = await page.find('fw-toggle');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.press('Enter');
    expect(fwChange).toHaveReceivedEventDetail({ checked: true });
  });

  it('it should not emit fwChange when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle disabled>1</fw-toggle>');
    const element = await page.find('fw-toggle');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.click();
    expect(fwChange.events).toEqual([]);
  });
});
