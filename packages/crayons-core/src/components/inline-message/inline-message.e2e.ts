import { newE2EPage } from '@stencil/core/testing';

describe('fw-inline-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-inline-message></fw-inline-message>');
    const element = await page.find('fw-inline-message');
    expect(element).toHaveClass('hydrated');
  });

  it('should set alert--info class when info is passed as type', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-inline-message type="info"></fw-inline-message>'
    );
    const element = await page.find('fw-inline-message >>> div');
    expect(element).toHaveClass('alert--info');
  });

  it('should set alert--error when error is passed as type', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-inline-message type="error"></fw-inline-message>'
    );
    const element = await page.find('fw-inline-message >>> div');
    expect(element).toHaveClass('alert--error');
  });

  it('should set alert--success class when success is passed as type', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-inline-message type="success"></fw-inline-message>'
    );
    const element = await page.find('fw-inline-message >>> div');
    expect(element).toHaveClass('alert--success');
  });

  it('should set alert--warning class when warning is passed as type', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-inline-message type="warning"></fw-inline-message>'
    );
    const element = await page.find('fw-inline-message >>> div');
    expect(element).toHaveClass('alert--warning');
  });

  it('should emit fwShow when alert is shown', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-inline-message open=false></fw-inline-message>');
    const fwShow = await page.spyOnEvent('fwShow');
    const element = await page.find('fw-inline-message');

    element.setAttribute('open', true);
    await page.waitForChanges();
    expect(fwShow).toHaveReceivedEvent();
  });

  it('should emit fwHide when alert is hidden', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-inline-message open closable></fw-inline-message>'
    );
    const fwHide = await page.spyOnEvent('fwHide');
    const element = await page.find('fw-inline-message >>> .alert__close');

    await element.click();
    expect(fwHide).toHaveReceivedEvent();
  });

  it('should not have alert__close span when closable is passed as false', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-inline-message closable=false></fw-inline-message>'
    );
    const element = await page.find('fw-inline-message');
    expect(element.shadowRoot).toEqualHtml(
      `<div class="alert alert--info">
        <span class="alert__icon">
          <fw-icon class="hydrated" name="info"></fw-icon>
        </span>
        <span class="alert__message">
          <slot></slot>
        </span>
       </div>`
    );
  });

  it('should have alert__close span when closable is passed in', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-inline-message closable></fw-inline-message>');
    const element = await page.find('fw-inline-message');
    expect(element.shadowRoot).toEqualHtml(
      `<div class="alert alert--info">
        <span class="alert__icon">
          <fw-icon class="hydrated" name="info"></fw-icon>
        </span>
        <span class="alert__message">
          <slot></slot>
        </span>
        <span class="alert__close" role="button" tabindex="0">
          <fw-icon class="hydrated" name="cross"></fw-icon>
        </span>
       </div>`
    );
  });
});
