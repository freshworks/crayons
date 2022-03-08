import { newE2EPage } from '@stencil/core/testing';

describe('fw-file-uploader', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-file-uploader></fw-file-uploader>');
    const element = await page.find('fw-file-uploader');
    expect(element).toHaveClass('hydrated');
  });

  it('should open file uploader on dropzone click and move to files stage', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-file-uploader></fw-file-uploader>');
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    const dropzone = await page.find('fw-file-uploader >>> .dropzone');
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitForChanges();
    const filesStage = await page.find('fw-file-uploader >>> .files');
    expect(filesStage).toBeTruthy();
  });

  it('should list files when successfully uploading file', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-file-uploader></fw-file-uploader>');
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    const dropzone = await page.find('fw-file-uploader >>> .dropzone');
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitForChanges();
    const filesContent = await page.find(
      'fw-file-uploader >>> fw-file-uploader-file'
    );
    expect(filesContent).toBeTruthy();
  });

  it('should move back to dropzone when last file is removed from files stage', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-file-uploader></fw-file-uploader>');
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    let dropzone = await page.find('fw-file-uploader >>> .dropzone');
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitForChanges();
    const fileUploaderShadow = await page.find(
      'fw-file-uploader >>> :first-child'
    );
    const remove = await fileUploaderShadow.find(
      'fw-file-uploader-file >>> .files-content-file-remove'
    );
    remove.click();
    await page.waitForChanges();
    dropzone = await page.find('fw-file-uploader >>> .dropzone');
    expect(dropzone).toBeTruthy();
  });

  it('should call filesuploaded event once the uploadFile method is called on the file uploader', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-file-uploader></fw-file-uploader>');
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    const fileUploader = await page.find('fw-file-uploader');
    const dropzone = await page.find('fw-file-uploader >>> .dropzone');
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitForChanges();
    const filesUploadedEvent = await page.spyOnEvent('fwFilesUploaded');
    await fileUploader.callMethod('uploadFiles');
    await page.waitForChanges();
    expect(filesUploadedEvent).toHaveReceivedEventTimes(1);
  });
});
