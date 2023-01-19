import { newE2EPage } from '@stencil/core/testing';

describe('fw-kebab-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-kebab-menu></fw-kebab-menu>');
    const element = await page.find('fw-kebab-menu');
    expect(element).toHaveClass('hydrated');
  });
});
