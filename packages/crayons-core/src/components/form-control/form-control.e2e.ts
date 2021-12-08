import { newE2EPage } from '@stencil/core/testing';

describe('fw-form-control', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-control></fw-form-control>');
    const element = await page.find('fw-form-control');
    expect(element).toHaveClass('hydrated');
  });
});
