import { newE2EPage } from '@stencil/core/testing';

describe('fw-button1', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button1></fw-button1>');
    const element = await page.find('fw-button1');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit fwClick when it is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button1></fw-button1>');
    const fwClick = await page.spyOnEvent('fwClick');
    const element = await page.find('fw-button1');
    await element.click();
    expect(fwClick).toHaveReceivedEvent();
  });

  it('should set button as primary when color is not supplied', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button1></fw-button1>');
    const element = await page.find('fw-button1');
    expect(element.shadowRoot)
      .toEqualHtml(`<button class="fw-btn fw-btn--normal fw-btn--primary" type="button">
        <slot></slot>
      </button>
      <fw-label class="hydrated"></fw-label>
      btn button`);
  });

  it('should set button as secondary when color is secondary', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button1 color="secondary"</fw-button1>');
    const element = await page.find('fw-button1');
    expect(element.shadowRoot)
      .toEqualHtml(`<button class="fw-btn fw-btn--normal fw-btn--secondary" type="button">
        <slot></slot>
      </button>
      <fw-label class="hydrated"></fw-label>
      btn button`);
  });
});
