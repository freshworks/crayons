import { newE2EPage } from '@stencil/core/testing';

describe('fw-breadcrumb', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-breadcrumb></fw-breadcrumb>');
    const element = await page.find('fw-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });

  it('renders breadcrumb item', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-breadcrumb>
    <fw-breadcrumb-item href="https://example.com/home">
      Homepage
    </fw-breadcrumb-item>
  
    <fw-breadcrumb-item href="https://example.com/home/services">
      Our Services
    </fw-breadcrumb-item>
  
    <fw-breadcrumb-item href="https://example.com/home/services/digital">
      Digital Media
    </fw-breadcrumb-item>
  
    <fw-breadcrumb-item href="https://example.com/home/services/digital/web-design">
      Web Design
    </fw-breadcrumb-item>
  </fw-breadcrumb>`);
    const element = await page.find('fw-breadcrumb');
    expect(element).toHaveClass('hydrated');
    const items = await element.find('fw-breadcrumb-item');
    expect(items).toHaveClass('hydrated');
  });
});
