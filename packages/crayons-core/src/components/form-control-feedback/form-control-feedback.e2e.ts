import { newE2EPage } from '@stencil/core/testing';

describe('fw-form-control-feedback', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-control-feedback></fw-form-control-feedback>');
    const element = await page.find('fw-form-control-feedback');
    expect(element).toHaveClass('hydrated');
  });
});
