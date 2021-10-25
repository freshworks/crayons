import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-modal-title></fw-modal-title>');
    const element = await page.find('fw-modal-title');
    expect(element).toHaveClass('hydrated');
  });
});
