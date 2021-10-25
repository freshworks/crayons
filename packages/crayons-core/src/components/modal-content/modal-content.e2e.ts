import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-modal-content></fw-modal-content>');
    const element = await page.find('fw-modal-content');
    expect(element).toHaveClass('hydrated');
  });
});
