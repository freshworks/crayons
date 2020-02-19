import { newE2EPage } from '@stencil/core/testing';

describe('fw-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-textarea></fw-textarea>');
    const element = await page.find('fw-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
