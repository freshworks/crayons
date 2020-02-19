import { newE2EPage } from '@stencil/core/testing';

describe('fw-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tabs></fw-tabs>');
    const element = await page.find('fw-tabs');
    expect(element).toHaveClass('hydrated');
  });
});
