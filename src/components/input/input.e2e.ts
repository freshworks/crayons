import { newE2EPage } from '@stencil/core/testing';

describe('fw-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input></fw-input>');
    const element = await page.find('fw-input');
    expect(element).toHaveClass('hydrated');
  });
});
