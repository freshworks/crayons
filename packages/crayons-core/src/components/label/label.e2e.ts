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

  it('renders label with variant as pill', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-label value="dummy text" variant="pill"><fw-icon name="search"></fw-icon></fw-label>'
    );
    const element = await page.find('fw-label >>> span');

    await page.waitForChanges();
    expect(element).toHaveClass('pill');
  });

  it('renders label with icon', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-label value="dummy text"><fw-icon name="search"></fw-icon></fw-label>'
    );
    const element = await page.find('fw-label fw-icon');

    await page.waitForChanges();
    expect(element.shadowRoot.querySelector('div')).toHaveClass('icon');
  });
});
