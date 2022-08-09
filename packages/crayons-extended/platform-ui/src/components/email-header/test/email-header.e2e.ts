import { newE2EPage } from '@stencil/core/testing';

describe('email-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<email-header></email-header>');

    const element = await page.find('email-header');
    expect(element).toHaveClass('hydrated');
  });
});
