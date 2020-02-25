import { newE2EPage } from '@stencil/core/testing';

describe('fw-timepicker', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-timepicker></fw-timepicker>');
    const element = await page.find('fw-timepicker');
    expect(element).toHaveClass('hydrated');
  });
});
