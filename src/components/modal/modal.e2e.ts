import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-modal></fw-modal>');
    const element = await page.find('fw-modal');
    expect(element).toHaveClass('hydrated');
  });

  it('triggers fwClose when visible property is changed to false', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-modal visible></fw-modal>');
    const element = await page.find('fw-modal');
    const fwClosed = await page.spyOnEvent('fwClosed');
    element.setAttribute('visible', false);
    await page.waitForChanges();
    expect(fwClosed).toHaveReceivedEvent();
  });

  it('triggers fwAction when Action Button is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-modal visible></fw-modal>');
    await page.waitForChanges();
    const element = await page.findAll('fw-modal >>> fw-button');
    const fwAction = await page.spyOnEvent('fwAction');
    await element[1].click();
    await page.waitForChanges();
    expect(fwAction).toHaveReceivedEvent();
  });
});
