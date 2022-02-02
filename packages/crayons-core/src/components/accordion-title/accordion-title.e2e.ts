import { newE2EPage } from '@stencil/core/testing';

describe('fw-accordion-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-accordion-title></fw-accordion-title>');
    const element = await page.find('fw-accordion-title');
    expect(element).toHaveClass('hydrated');
  });
});
