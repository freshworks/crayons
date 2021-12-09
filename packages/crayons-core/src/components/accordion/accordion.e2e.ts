import { newE2EPage } from '@stencil/core/testing';

describe('fw-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-accordion></fw-accordion>');
    const element = await page.find('fw-accordion');
    expect(element).toHaveClass('hydrated');
  });
});
