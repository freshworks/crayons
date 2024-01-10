import { newE2EPage } from '@stencil/core/testing';

describe('fw-nested-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-nested-select></fw-nested-select>');
    const element = await page.find('fw-nested-select');
    expect(element).toHaveClass('hydrated');
  });
});
