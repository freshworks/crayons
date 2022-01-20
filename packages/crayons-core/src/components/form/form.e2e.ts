import { newE2EPage } from '@stencil/core/testing';

describe('fw-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form></fw-form>');
    const element = await page.find('fw-form');
    expect(element).toHaveClass('hydrated');
  });
});
