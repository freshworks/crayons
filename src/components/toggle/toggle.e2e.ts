import { newE2EPage } from '@stencil/core/testing';

describe('fw-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle></fw-toggle>');
    const element = await page.find('fw-toggle');
    expect(element).toHaveClass('hydrated');
  });
});
