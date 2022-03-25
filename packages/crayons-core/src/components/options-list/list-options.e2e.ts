import { newE2EPage } from '@stencil/core/testing';

const simpleData = [
  { value: 1, text: 'Football' },
  { value: 2, text: 'Vollyball' },
  { value: 3, text: 'Cricket' },
  { value: 4, text: 'Kabadi' },
];

describe('fw-list-options', () => {
  it('should render all the select options', async () => {
    const page = await newE2EPage();
    await page.setContent(`<fw-list-options></fw-list-options>`);

    await page.$eval(
      'fw-list-options',
      (elm: any, options) => {
        elm.first = options;
      },
      simpleData
    );
  });
});
