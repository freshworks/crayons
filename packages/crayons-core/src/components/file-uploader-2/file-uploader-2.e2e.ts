import { newE2EPage } from '@stencil/core/testing';

describe('fw-file-uploader-2', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-file-uploader-2></fw-file-uploader-2>');
    const element = await page.find('fw-file-uploader-2');
    expect(element).toHaveClass('hydrated');
  });
});
