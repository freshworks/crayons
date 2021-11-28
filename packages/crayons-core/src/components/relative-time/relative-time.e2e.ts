import { newE2EPage } from '@stencil/core/testing';

describe('fw-relative-time', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-relative-time></fw-relative-time>');
    const element = await page.find('fw-relative-time');
    expect(element).toHaveClass('hydrated');
  });
});
