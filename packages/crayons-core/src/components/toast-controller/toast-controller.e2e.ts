import { newE2EPage } from '@stencil/core/testing';

describe('fw-toast-controller', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toast-controller position="top-left"></fw-toast-controller>'
    );
    const element = await page.find('fw-toast-controller');
    expect(element).toHaveClass('top-left');
    expect(element).toHaveClass('hydrated');
  });
});
