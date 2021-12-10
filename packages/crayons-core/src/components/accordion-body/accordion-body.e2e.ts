import { newE2EPage } from '@stencil/core/testing';

describe('fw-accordion-body', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-accordion-body></fw-accordion-body>');
    const element = await page.find('fw-accordion-body');
    expect(element).toHaveClass('hydrated');
  });
});
