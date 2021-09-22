import { newE2EPage } from '@stencil/core/testing';

describe('fw-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-label></fw-label>');
    const element = await page.find('fw-label');
    expect(element).toHaveClass('hydrated');
  });

  it('renders value string', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-label value="Label"></fw-label>');
    const element = await page.find('fw-label >>> span');

    expect(element.textContent).toEqual(`Label`);
  });

  it('renders changes to the value data', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-label></fw-label>');
    const component = await page.find('fw-label');
    const element = await page.find('fw-label >>> span');
    expect(element.textContent).toEqual(``);

    component.setProperty('value', 'Label');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Label`);
  });
});
