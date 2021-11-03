import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal-title></fw-modal-title>');
    const element = await page.find('fw-modal-title');
    expect(element).toHaveClass('hydrated');
  });
  it('should only render slot contents when slot has value', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal-title>Hello world</fw-modal-title>');
    const element = await page.find('fw-modal-title');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualText('Hello world');
  });
  it('should render title when slot does not have value', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-modal-title title-text="Hello world"></fw-modal-title>'
    );
    const element = await page.find('fw-modal-title >>> .modal-header');
    expect(element).toEqualText('Hello world');
  });
});
