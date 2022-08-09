import { newE2EPage } from '@stencil/core/testing';

describe('fw-email-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-email-select></fw-email-select>');
    const element = await page.find('fw-email-select');
    expect(element).toHaveClass('hydrated');
  });
});
