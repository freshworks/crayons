import { newE2EPage } from '@stencil/core/testing';

describe('fw-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-progress-bar></fw-progress-bar>');
    const element = await page.find('fw-progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});
