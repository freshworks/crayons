import { newE2EPage } from '@stencil/core/testing';

describe('fw-format-number', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-format-number></fw-format-number>');
    const element = await page.find('fw-format-number');
    expect(element).toHaveClass('hydrated');
  });

  it('renders number based on locale', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-number value="2000" locale="de" minimum-fraction-digits="2"></fw-format-number>'
    );
    const element = await page.find('fw-format-number');
    expect(element.shadowRoot).toEqualText('2.000');
  });

  it('renders currency based on locale', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-format-number type="currency" currency="GBP" value="5000" locale="en-GB"></fw-format-number>'
    );
    const element = await page.find('fw-format-number');
    expect(element.shadowRoot).toEqualText('£5,000');
  });
});
