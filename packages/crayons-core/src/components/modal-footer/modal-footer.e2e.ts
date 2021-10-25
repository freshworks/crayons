import { newE2EPage } from '@stencil/core/testing';

describe('fw-modal-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal-footer></fw-modal-footer>');
    const element = await page.find('fw-modal-footer');
    expect(element).toHaveClass('hydrated');
  });
  it('should only render slot contents when custom attribute is passed', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-modal-footer custom>Hello world</fw-modal-footer>'
    );
    const element = await page.find('fw-modal-footer');
    const button = await page.find('fw-modal-footer >>> fw-button');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualText('Hello world');
    expect(button).toEqual(null);
  });
  it('should render default buttons when custom attribute is not passed', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-modal-footer></fw-modal-footer>');
    const element = await page.find('fw-modal-footer');
    const buttons = await page.findAll('fw-modal-footer >>> fw-button');
    expect(element).toHaveClass('hydrated');
    expect(buttons.length).toEqual(2);
  });
});
