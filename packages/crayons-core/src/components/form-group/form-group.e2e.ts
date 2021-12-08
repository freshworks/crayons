import { newE2EPage } from '@stencil/core/testing';

describe('fw-form-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-group></fw-form-group>');
    const element = await page.find('fw-form-group');
    expect(element).toHaveClass('hydrated');
  });
});
