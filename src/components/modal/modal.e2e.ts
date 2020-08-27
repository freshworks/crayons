import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-modal></fw-modal>');
    const element = await page.find('fw-modal');
    expect(element).toHaveClass('hydrated');
  });
});
