import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal></fw-modal>');
    const element = await page.find('fw-modal');
    expect(element).toHaveClass('hydrated');
  });

  it('triggers fwclose when is-open property is changed to false', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal is-open></fw-modal>');
    const element = await page.find('fw-modal');
    const fwClose = await page.spyOnEvent('fwClose');
    element.setAttribute('is-open', false);
    await page.waitForChanges();
    expect(fwClose).toHaveReceivedEvent();
  });

  it('triggers fwopen when is-open property is set to true', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal is-open="false"></fw-modal>');
    const element = await page.find('fw-modal');
    const fwOpen = await page.spyOnEvent('fwOpen');
    element.setAttribute('is-open', true);
    await page.waitForChanges();
    expect(fwOpen).toHaveReceivedEvent();
  });

  it('triggers fwsubmit when submit button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal is-open></fw-modal>');
    await page.waitForChanges();
    const footer = await page.find('fw-modal >>> :first-child');
    const element = await footer.findAll('fw-modal-footer >>> fw-button');
    const fwSubmit = await page.spyOnEvent('fwSubmit');
    await element[1].click();
    await page.waitForChanges();
    expect(fwSubmit).toHaveReceivedEvent();
  });

  it('should hide footer in modal when hideFooter is set to true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-modal is-open hide-footer="true">Hello world</fw-modal>'
    );
    await page.waitForChanges();
    await page.waitForChanges();
    const displayFooter = await page.evaluate(
      (component, selector) => {
        const cmpEl = document.querySelector(component);
        const footer = cmpEl.shadowRoot.querySelector(selector);
        return footer.style.display;
      },
      'fw-modal',
      'fw-modal-footer'
    );
    expect(displayFooter).toEqual('none');
  });

  it('should open slider variant of modal when prop slider is passed to the component', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal is-open slider>Hello world</fw-modal>');
    await page.waitForChanges();
    const slider = await page.find('fw-modal >>> .modal-overlay.slider');
    expect(slider).not.toBeNull();
  });
});
