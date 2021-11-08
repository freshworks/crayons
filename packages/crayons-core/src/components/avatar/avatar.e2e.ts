import { newE2EPage } from '@stencil/core/testing';

describe('fw-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-avatar></fw-avatar>');
    const element = await page.find('fw-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
