import { newE2EPage } from '@stencil/core/testing';

describe('fw-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toast position="top-left"></fw-toast>');
    const element = await page.find('fw-toast');
    expect(element).toHaveClass('hydrated');
  });
});
