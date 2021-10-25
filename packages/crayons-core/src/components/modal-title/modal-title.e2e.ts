import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal-title></fw-modal-title>');
    const element = await page.find('fw-modal-title');
    expect(element).toHaveClass('hydrated');
  });
  it('should only render slot contents when custom attribute is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-modal-title custom>Hello world</fw-modal-title>'
    );
    const element = await page.find('fw-modal-title');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualText('Hello world');
  });
  it('should render title when custom attribute is not passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-modal-title title-text="Hello world"></fw-modal-title>'
    );
    const element = await page.find('fw-modal-title >>> .modal-header');
    expect(element).toEqualText('Hello world');
  });
});
