import { newE2EPage } from '@stencil/core/testing';

describe('fw-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tab></fw-tab>');
    const element = await page.find('fw-tab');
    expect(element).toHaveClass('hydrated');
  });
});
