import { newE2EPage } from '@stencil/core/testing';

describe('fw-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-spinner></fw-spinner>');
    const element = await page.find('fw-spinner');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with size', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-spinner size="large"></fw-spinner>');
    const element = await page.find('fw-spinner >>> svg');
    const styles = await element.getComputedStyle();
    expect(styles.width).toEqual('32px');
  });
});
