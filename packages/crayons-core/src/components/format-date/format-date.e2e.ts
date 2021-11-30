import { newE2EPage } from '@stencil/core/testing';

describe('fw-format-date', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-format-date></fw-format-date>');
    const element = await page.find('fw-format-date');
    expect(element).toHaveClass('hydrated');
  });
});
