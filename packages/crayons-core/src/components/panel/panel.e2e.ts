import { newE2EPage } from '@stencil/core/testing';

describe('fw-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-panel></fw-panel>');
    const element = await page.find('fw-panel');
    expect(element).toHaveClass('hydrated');
  });

  it('renders child content', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-panel> This is panel content</fw-panel>');
    const element = await page.find('fw-panel');
    expect(element.shadowRoot).toEqualHtml(`<slot></slot>`);
  });
});
