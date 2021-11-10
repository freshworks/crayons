import { newE2EPage } from '@stencil/core/testing';

describe('fw-toast-child', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toast-child></fw-toast-child>');
    const element = await page.find('fw-toast-child');
    expect(element).toHaveClass('hydrated');
  });

  it('Toast content and action link rendered', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toast-child content="Successfully created!" action-link-text="Undo"></fw-toast-child>'
    );
    const element = await page.find('fw-toast-child');
    element.classList.add('is-open');

    const content = await page.find('fw-toast-child >>> .content');
    expect(content.innerHTML).toEqual('Successfully created!');

    const actionLink = await page.find('fw-toast-child >>> .action-link');
    expect(actionLink.innerHTML).toEqual('Undo');
  });

  it('Toast type and position', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toast-child type="warning"></fw-toast-child>');
    const element = await page.find('fw-toast-child');
    element.classList.add('is-open');
    await page.waitForChanges();

    const divElem = await page.find('fw-toast-child >>> div');
    expect(divElem).toHaveClass('warning');
  });

  it('Toast close icon and spinner', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toast-child type="inprogress"></fw-toast-child>'
    );
    const element = await page.find('fw-toast-child');
    element.classList.add('is-open');

    const closeIcon = await page.find('fw-toast-child >>> .cross');
    expect(closeIcon).toBeTruthy();

    const spinner = await page.find('fw-toast-child >>> fw-spinner');
    expect(spinner).toBeTruthy();
  });
});
