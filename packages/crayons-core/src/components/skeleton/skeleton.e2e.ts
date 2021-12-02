import { newE2EPage } from '@stencil/core/testing';

describe('fw-skeleton', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-skeleton></fw-skeleton>');
    const element = await page.find('fw-skeleton');
    expect(element).toHaveClass('hydrated');
  });
});
