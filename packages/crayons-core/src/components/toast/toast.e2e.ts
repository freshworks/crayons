import { newE2EPage } from '@stencil/core/testing';

describe('fw-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toast></fw-toast>');
    const element = await page.find('fw-toast');
    expect(element).toHaveClass('hydrated');
  });

  it('Toast content and action link rendered', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toast content="Successfully created!" action-link-text="Undo"></fw-toast>'
    );
    const element = await page.find('fw-toast');
    element.classList.add('is-open');

    const content = await page.find('fw-toast >>> .content');
    expect(content.innerHTML).toEqual('Successfully created!');

    const actionLink = await page.find('fw-toast >>> .action-link');
    expect(actionLink.innerHTML).toEqual('Undo');
  });

  it('Toast type and position', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toast type="warning" position="top-left"></fw-toast>');
    const element = await page.find('fw-toast');
    element.classList.add('is-open');
    await page.waitForChanges();

    expect(element).toHaveClass('top-left');
    expect(element).toHaveClass('warning');
  });

  it('Toast close icon and spinner', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toast type="inprogress"></fw-toast>');
    const element = await page.find('fw-toast');
    element.classList.add('is-open');

    const closeIcon = await page.find('fw-toast >>> .cross');
    expect(closeIcon).toBeTruthy();

    const spinner = await page.find('fw-toast >>> fw-spinner');
    expect(spinner).toBeTruthy();
  });
});
