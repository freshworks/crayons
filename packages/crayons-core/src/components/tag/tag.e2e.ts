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

  it('renders tag in error state', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag text="tag" state="error"></fw-tag>');
    const element = await page.find('fw-tag >>> .tag');
    await page.waitForChanges();
    expect(element).toHaveClass('error');
  });

  it('renders text and subText for avatar variant in tag', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-tag variant="avatar" text="tag" sub-text="<sub>"></fw-tag>'
    );
    const element = await page.find('fw-tag >>> .tag');
    await page.waitForChanges();
    expect(element.innerText).toEqual(`tag<sub>`);
  });

  it('renders tag in focused state', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag text="tag" is-focused="true"></fw-tag>');
    const element = await page.find('fw-tag >>> .tag');
    await page.waitForChanges();
    expect(element).toHaveClass('focused');
  });
});
