import { newE2EPage } from '@stencil/core/testing';

describe('fw-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button-group></fw-button-group>');
    const element = await page.find('fw-button-group');
    expect(element).toHaveClass('hydrated');
  });
});
