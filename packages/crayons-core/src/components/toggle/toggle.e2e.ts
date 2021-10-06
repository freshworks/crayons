import { newE2EPage } from '@stencil/core/testing';

describe('fw-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle></fw-toggle>');
    const element = await page.find('fw-toggle');
    expect(element).toHaveClass('hydrated');
  });

  it('it renders with toggle active', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle active></fw-toggle>');
    const element = await page.find('fw-toggle');
    const isActive = await element.getProperty('active');
    expect(isActive).toBe(true);
  });

  it('it emits fwChange when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle></fw-toggle>');
    const element = await page.find('fw-toggle');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.click();
    expect(fwChange).toHaveReceivedEventDetail({ active: true });
  });

  it('it emits fwChange when enter/space key is pressed', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle></fw-toggle>');
    const element = await page.find('fw-toggle');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.press('Space');
    expect(fwChange).toHaveReceivedEventDetail({ active: true });
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
