import { newE2EPage } from '@stencil/core/testing';

describe('fw-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-radio-group></fw-radio-group>');
    const element = await page.find('fw-radio-group');
    expect(element).toHaveClass('hydrated');
  });
});
