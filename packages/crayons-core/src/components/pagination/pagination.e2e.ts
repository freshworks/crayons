import { newE2EPage } from '@stencil/core/testing';

describe('fw-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-pagination></fw-pagination>');
    const element = await page.find('fw-pagination');
    expect(element).toHaveClass('hydrated');
  });
  it('should set start to 1 if page is not passed in', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-pagination per-page="10" total="50"></fw-pagination>'
    );
    const element = await page.findAll('fw-pagination >>> .record');
    console.log(element);
    expect(element[0].textContent).toEqual('1');
  });
  it('should set start based on the passed in value for page', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-pagination page="2" per-page="10" total="50"></fw-pagination>'
    );
    const element = await page.findAll('fw-pagination >>> .record');
    console.log(element);
    expect(element[0].textContent).toEqual('11');
  });
  it('should set end to 10 when per-page is passed in and total records is greater', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-pagination per-page="10" total="50"></fw-pagination>'
    );
    const element = await page.findAll('fw-pagination >>> .record');
    expect(element[1].textContent).toEqual('10');
  });
  it('should set end to 10 when per-page is not passed in', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-pagination total="50"></fw-pagination>');
    const element = await page.findAll('fw-pagination >>> .record');
    expect(element[1].textContent).toEqual('10');
  });
  it('Clicking on previous button should set start and end to next set', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-pagination per-page="10" total="50"></fw-pagination>'
    );
    const nextButton = await page.find(
      'fw-pagination >>> fw-button[aria-label="Next"]'
    );
    const previousButton = await page.find(
      'fw-pagination >>> fw-button[aria-label="Previous"]'
    );
    const element = await page.findAll('fw-pagination >>> .record');
    await nextButton.click();
    await previousButton.click();
    expect(element[0].textContent).toEqual('1');
    expect(element[1].textContent).toEqual('10');
  });
  it('Clicking on next button should set start and end to next set', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-pagination per-page="10" total="50"></fw-pagination>'
    );
    const button = await page.find(
      'fw-pagination >>> fw-button[aria-label="Next"]'
    );
    await button.click();
    await page.waitForChanges();
    const element = await page.findAll('fw-pagination >>> .record');
    expect(element[0].textContent).toEqual('11');
    expect(element[1].textContent).toEqual('20');
  });
  it('next and previous buttons are disabled when limit is reached', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-pagination per-page="50" total="50"></fw-pagination>'
    );
    const nextButton = await page.find(
      'fw-pagination >>> fw-button[aria-label="Next"]'
    );
    const previousButton = await page.find(
      'fw-pagination >>> fw-button[aria-label="Previous"]'
    );

    expect(nextButton).toHaveAttribute('disabled');
    expect(previousButton).toHaveAttribute('disabled');
  });
});
