import { newE2EPage } from '@stencil/core/testing';

describe('fw-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-popover></fw-popover>');
    const element = await page.find('fw-popover');
    expect(element).toHaveClass('hydrated');
  });

  it('should close the content on clicking on the document by default', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-popover hoist>
        <fw-button slot="popover-trigger">Currency List</fw-button>
        <fw-list-options id="currency" slot="popover-content"></fw-list-options>
    </fw-popover>`);
    const trigger = await page.find('fw-popover > fw-button');
    await trigger.click();
    await page.waitForChanges();
    let content = await page.find('fw-popover >>> .popper-content');
    expect(content).toHaveAttribute('data-show');
    await document.body.click();
    await page.waitForChanges();
    content = await page.find('fw-popover >>> .popper-content');
    expect(content).not.toHaveAttribute('data-show');
  });
});
