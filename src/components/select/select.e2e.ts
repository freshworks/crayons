import { newE2EPage } from '@stencil/core/testing';

describe('fw-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-select></fw-select>');
    const element = await page.find('fw-select');
    expect(element).toHaveClass('hydrated');
  });
});
