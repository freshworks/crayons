import { newE2EPage } from '@stencil/core/testing';

describe('fw-select-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-select-option></fw-select-option>');
    const element = await page.find('fw-select-option');
    expect(element).toHaveClass('hydrated');
  });
});
