import { newE2EPage } from '@stencil/core/testing';

describe('fw-format-number', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-format-number></fw-format-number>');
    const element = await page.find('fw-format-number');
    expect(element).toHaveClass('hydrated');
  });
});
