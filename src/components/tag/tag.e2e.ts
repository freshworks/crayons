import { newE2EPage } from '@stencil/core/testing';

describe('fw-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag></fw-tag>');
    const element = await page.find('fw-tag');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag></fw-tag>');
    const component = await page.find('fw-tag');
    const element = await page.find('fw-tag >>> div');
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
