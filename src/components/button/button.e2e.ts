import { newE2EPage } from '@stencil/core/testing';

describe('fw-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button></fw-button>');
    const element = await page.find('fw-button');
    expect(element).toHaveClass('hydrated');
  });
});
