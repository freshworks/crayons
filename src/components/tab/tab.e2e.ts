import { newE2EPage } from '@stencil/core/testing';

describe('fw-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tab></fw-tab>');
    const element = await page.find('fw-tab');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tab></fw-tab>');
    const component = await page.find('fw-tab');
    const element = await page.find('fw-tab >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
