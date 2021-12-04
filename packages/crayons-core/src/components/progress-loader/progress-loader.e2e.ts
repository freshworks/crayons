import { newE2EPage } from '@stencil/core/testing';

describe('fw-progress-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-progress-loader></fw-progress-loader>');
    const element = await page.find('fw-progress-loader');
    expect(element).toHaveClass('hydrated');
  });
});
