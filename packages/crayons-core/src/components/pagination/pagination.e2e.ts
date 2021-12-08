import { newE2EPage } from '@stencil/core/testing';

describe('fw-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-pagination></fw-pagination>');
    const element = await page.find('fw-pagination');
    expect(element).toHaveClass('hydrated');
  });
});
