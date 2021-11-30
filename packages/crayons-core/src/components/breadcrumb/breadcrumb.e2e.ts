import { newE2EPage } from '@stencil/core/testing';

describe('fw-breadcrumb', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-breadcrumb></fw-breadcrumb>');
    const element = await page.find('fw-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });
});
