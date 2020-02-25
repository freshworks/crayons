import { newE2EPage } from '@stencil/core/testing';

describe('fw-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio></fw-radio>');
    const element = await page.find('fw-radio');
    expect(element).toHaveClass('hydrated');
  });
});
