import { newE2EPage } from '@stencil/core/testing';

describe('fw-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-spinner></fw-spinner>');
    const element = await page.find('fw-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
