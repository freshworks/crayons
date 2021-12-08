import { newE2EPage } from '@stencil/core/testing';

describe('fw-form-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-text></fw-form-text>');
    const element = await page.find('fw-form-text');
    expect(element).toHaveClass('hydrated');
  });
});
