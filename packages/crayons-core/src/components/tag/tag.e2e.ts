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

  it('renders tag in transparent mode', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag text="tag" state="transparent"></fw-tag>');
    const element = await page.find('fw-tag >>> .tag');
    await page.waitForChanges();
    expect(element).toHaveClass('transparent');
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

  it('renders text and subText for standard variant in tag', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag text="tag" sub-text="<sub>"></fw-tag>');
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

  it('renders ellipsis when showEllipsisOnOverflow is true', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-tag show-ellipsis-on-overflow="true" text="tag" is-focused="true"></fw-tag>'
    );
    const element = await page.find('fw-tag >>> .tag');
    await page.waitForChanges();
    const ellipsisContent = await element.find('.ellipsis');
    expect(ellipsisContent).toBeTruthy();
  });

  it('should not render ellipsis when showEllipsisOnOverflow is false', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-tag text="tag" is-focused="true"></fw-tag>');
    const element = await page.find('fw-tag >>> .tag');
    await page.waitForChanges();
    const ellipsisContent = await element.find('.ellipsis');
    expect(ellipsisContent).toBeFalsy();
  });
});
