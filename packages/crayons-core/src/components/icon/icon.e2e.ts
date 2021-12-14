import { newE2EPage } from '@stencil/core/testing';

describe('fw-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-icon name="agent" ></fw-icon>');
    const element = await page.find('fw-icon');
    expect(element).toHaveClass('hydrated');
  });
});
