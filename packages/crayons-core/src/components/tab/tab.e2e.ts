import { newE2EPage } from '@stencil/core/testing';

describe('fw-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tab></fw-tab>');
    const element = await page.find('fw-tab');
    expect(element).toHaveClass('hydrated');
  });

  it('Shows Html', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-tab></fw-tab>`);
    const element = await page.find('fw-tab');

    expect(element.shadowRoot).toEqualHtml(`<div class="tab">
      <slot></slot>
      </div>`);
  });

  it('Sets active class', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-tab active></fw-tab>`);
    const element = await page.find('fw-tab');

    expect(element.classList.contains('active'));
    expect(element.getAttribute('tabindex')).toEqual('0');
  });

  it('Sets disabled class', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-tab disabled></fw-tab>`);
    const element = await page.find('fw-tab');

    expect(element.classList.contains('disabled'));
    expect(element.getAttribute('tabindex')).toEqual('-1');
  });
});
