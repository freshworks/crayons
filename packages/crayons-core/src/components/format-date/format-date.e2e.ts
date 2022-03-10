import { newE2EPage } from '@stencil/core/testing';

describe('fw-format-date', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-format-date></fw-format-date>');
    const element = await page.find('fw-format-date');
    expect(element).toHaveClass('hydrated');
  });
  it('should render date based on locale', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-date date="2022-01-27" locale="en-US"></fw-format-date>'
    );
    const element = await page.find('fw-format-date');
    expect(element.shadowRoot).toEqualText('1/27/2022');
  });
  it('should render long month and day and year numeric', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-date date="2022-01-27" month="long" day="numeric" year="numeric"></fw-format-date>'
    );
    const element = await page.find('fw-format-date');
    expect(element.shadowRoot).toEqualText('January 27, 2022');
  });
  it('should render month only', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-date date="2022-01-27" month="long"></fw-format-date>'
    );
    const element = await page.find('fw-format-date');
    expect(element.shadowRoot).toEqualText('January');
  });
  it('should render year only', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-date date="2022-01-27" year="numeric"></fw-format-date>'
    );
    const element = await page.find('fw-format-date');
    expect(element.shadowRoot).toEqualText('2022');
  });
  it('should render weekday only', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-date date="2022-01-27" weekday="long"></fw-format-date>'
    );
    const element = await page.find('fw-format-date');
    expect(element.shadowRoot).toEqualText('Thursday');
  });
  it('should render 12 hour format ', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-date date="2020-07-15T17:30:00" hour="numeric" minute="numeric" hour-format="12"></fw-format-date>'
    );
    const element = await page.find('fw-format-date');
    expect(element.shadowRoot).toEqualText('5:30 PM');
  });
  it('should render 24 hour format ', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-date date="2020-07-15T17:30:00" hour="numeric" minute="numeric" hour-format="24"></fw-format-date>'
    );
    const element = await page.find('fw-format-date');
    expect(element.shadowRoot).toEqualText('17:30');
  });
});
