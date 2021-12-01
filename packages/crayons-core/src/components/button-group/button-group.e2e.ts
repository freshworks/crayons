import { newE2EPage } from '@stencil/core/testing';

describe('fw-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button-group></fw-button-group>');
    const element = await page.find('fw-button-group');
    expect(element).toHaveClass('hydrated');
  });
  it('renders multiple buttons', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-button-group><fw-button>Replace</fw-button><fw-button>Modify</fw-button><fw-button>Cancel</fw-button></fw-button-group>'
    );
    const element = await page.find('fw-button-group');
    const children = await element.findAll('fw-button ');
    expect(children.length === 3);
  });
});
