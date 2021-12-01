import { newE2EPage } from '@stencil/core/testing';

describe('fw-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag></fw-tag>');
    const element = await page.find('fw-tag');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the value data', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag text="tag"></fw-tag>');
    const element = await page.find('fw-tag >>> .tag');
    await page.waitForChanges();
    expect(element.innerText).toEqual(`tag`);
  });
});
