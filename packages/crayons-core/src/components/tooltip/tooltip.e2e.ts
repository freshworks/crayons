import { newE2EPage } from '@stencil/core/testing';

describe('fw-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tooltip></fw-tooltip>');
    const element = await page.find('fw-tooltip');
    expect(element).toHaveClass('hydrated');
  });

  it('should show tooltip when tooltip show function is called', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-tooltip content="This is the first tooltip example"><fw-button> Show tooltip </fw-button></fw-tooltip>'
    );
    const tooltip: any = await page.find('fw-tooltip');
    tooltip.callMethod('show');
    await page.waitForChanges();
    const popover: any = await page.find('fw-tooltip >>> :first-child');
    const popoverContent = popover.shadowRoot.querySelector('.popper-content');
    expect(popoverContent.hasAttribute('data-show')).toBeTruthy();
  });

  it('should hide tooltip when tooltip hide function is called', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-tooltip content="This is the first tooltip example"><fw-button> Show tooltip </fw-button></fw-tooltip>'
    );
    const tooltip: any = await page.find('fw-tooltip');
    tooltip.callMethod('show');
    await page.waitForChanges();
    tooltip.callMethod('hide');
    await page.waitForChanges();
    const popover: any = await page.find('fw-tooltip >>> :first-child');
    const popoverContent = popover.shadowRoot.querySelector('.popper-content');
    expect(popoverContent.hasAttribute('data-show')).toBeFalsy();
  });

  it('should display popover content prop value as tooltip innerText', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-tooltip content="Normal tooltip"><fw-button> Show tooltip </fw-button></fw-tooltip>'
    );
    const tooltip: any = await page.find('fw-tooltip');
    tooltip.callMethod('show');
    await page.waitForChanges();
    const popover: any = await page.find('fw-tooltip >>> :first-child');
    const popoverContent: any = await popover.find('*[slot="popover-content"]');
    expect(popoverContent.innerText).toEqual('Normal tooltip');
  });

  it('should show tooltip with html if content is passed in a named slot', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-tooltip><fw-button> Show tooltip </fw-button><div slot="tooltip-content">This tooltip has <b>HTML</b> content.</div></fw-tooltip>'
    );
    const tooltip: any = await page.find('fw-tooltip');
    tooltip.callMethod('show');
    await page.waitForChanges();
    const popoverContent: any = await page.find(
      'fw-tooltip *[slot="tooltip-content"]'
    );
    expect(popoverContent.innerHTML).toEqual(
      'This tooltip has <b>HTML</b> content.'
    );
  });
});
