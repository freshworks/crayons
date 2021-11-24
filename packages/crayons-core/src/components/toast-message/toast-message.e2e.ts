import { newE2EPage } from '@stencil/core/testing';

describe('fw-toast-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toast-message></fw-toast-message>');
    const element = await page.find('fw-toast-message');
    expect(element).toHaveClass('hydrated');
  });

  it('Toast content and action link rendered', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toast-message content="Successfully created!" action-link-text="Undo"></fw-toast-message>'
    );
    const element = await page.find('fw-toast-message >>> .toast');
    element.classList.add('is-open');

    const content = await element.find('.content');
    expect(content.innerHTML).toEqual(
      '<slot></slot>Successfully created!<div class="action-link" role="button" tabindex="0">Undo</div>'
    );

    const container = await content.find('.action-link');

    expect(container.innerHTML).toEqual('Undo');
  });

  it('Toast type and position', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toast-message type="warning"></fw-toast-message>'
    );
    const element = await page.find('fw-toast-message >>> .toast');
    element.classList.add('is-open');
    await page.waitForChanges();

    const divElem = await page.find('fw-toast-message >>> .toast');
    expect(divElem).toHaveClass('warning');
  });

  it('Toast close icon and spinner', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toast-message type="inprogress"></fw-toast-message>'
    );
    const element = await page.find('fw-toast-message >>> .toast');
    element.classList.add('is-open');

    const closeIcon = await element.find('.remove');
    expect(closeIcon).toBeTruthy();

    const spinner = await element.find('fw-spinner');
    expect(spinner).toBeTruthy();
  });
});
