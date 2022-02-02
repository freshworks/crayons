import { newE2EPage } from '@stencil/core/testing';

describe('fw-pill', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <fw-pill color="blue">
        <fw-icon name="internet" slot="icon"></fw-icon>
        Pill
      </fw-pill>`);
    const element = await page.find('fw-pill');
    expect(element).toHaveClass('hydrated');
  });
});
