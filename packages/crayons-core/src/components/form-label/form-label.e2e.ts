import { newE2EPage } from '@stencil/core/testing';

describe('fw-form-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-label></fw-form-label>');
    const element = await page.find('fw-form-label');
    expect(element).toHaveClass('hydrated');
  });
});
