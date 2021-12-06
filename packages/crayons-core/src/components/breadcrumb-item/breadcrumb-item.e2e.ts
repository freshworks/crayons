import { newE2EPage } from '@stencil/core/testing';

describe('fw-breadcrumb-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-breadcrumb-item></fw-breadcrumb-item>');
    const element = await page.find('fw-breadcrumb-item');
    expect(element).toHaveClass('hydrated');
  });

  it('renders separator', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-breadcrumb-item>About
                              <fw-icon name="alert" slot="separator"></fw-icon>
                          </fw-breadcrumb-item>`);
    const element = await page.find('fw-breadcrumb-item');
    expect(element).toHaveClass('hydrated');
    const icon = await element.find('fw-icon');
    expect(icon).toHaveClass('hydrated');
  });
});
