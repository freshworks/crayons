import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-modal-footer></fw-modal-footer>');
    const element = await page.find('fw-modal-footer');
    expect(element).toHaveClass('hydrated');
  });
});
