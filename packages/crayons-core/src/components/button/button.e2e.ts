import { newE2EPage } from '@stencil/core/testing';

describe('fw-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button></fw-button>');
    const element = await page.find('fw-button');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit fwClick when it is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button></fw-button>');
    const fwClick = await page.spyOnEvent('fwClick');
    const element = await page.find('fw-button');
    await element.click();
    expect(fwClick).toHaveReceivedEvent();
  });

  it('should set button as primary when appearance is not supplied', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button></fw-button>');
    const element = await page.find('fw-button');
    expect(element.shadowRoot)
      .toEqualHtml(`<button class="fw-btn fw-btn--normal fw-btn--primary" type="button">
        <slot></slot>
      </button>`);
  });

  it('should set button as secondary when appearance is secondary', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button appearance="secondary"</fw-button>');
    const element = await page.find('fw-button');
    expect(element.shadowRoot)
      .toEqualHtml(`<button class="fw-btn fw-btn--normal fw-btn--secondary" type="button">
        <slot></slot>
      </button>`);
  });
});
