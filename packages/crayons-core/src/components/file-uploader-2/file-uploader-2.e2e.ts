import { newE2EPage } from '@stencil/core/testing';

describe('fw-file-uploader-2', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-file-uploader-2></fw-file-uploader-2>');
    const element = await page.find('fw-file-uploader-2');
    expect(element).toHaveClass('hydrated');
  });

  it('should add a file to fileList and call fwChange event', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
      >
      </fw-file-uploader-2>
    `);
    const futureFileChooser = page.waitForFileChooser();
    const filesChangedEvent = await page.spyOnEvent('fwChange');
    // some button that triggers file selection
    const dropzone = await page.find(
      'fw-file-uploader-2 >>> .file-uploader__body__dropzone'
    );
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitForChanges();
    const files = await page.findAll('fw-file-uploader-2 >>> fw-file-2');
    await page.waitForChanges();
    expect(files.length).toEqual(1);
    expect(filesChangedEvent).toHaveReceivedEvent();
  });

  it('should be able to set files using initialFiles prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
      >
      </fw-file-uploader-2>
    `);
    await page.$eval('fw-file-uploader-2 ', (elm: any) => {
      elm.initialFiles = [
        {
          file: new File(
            [new Blob(new Uint8Array([137, 80, 78, 71, 13]))],
            'file1.png',
            { type: 'png', lastModified: Date.now() }
          ),
        },
      ];
    });
    await page.waitForChanges();
    const files = await page.findAll('fw-file-uploader-2 >>> fw-file-2');
    await page.waitForChanges();
    expect(files.length).toEqual(1);
  });

  it('should make request to action url on adding a file', async () => {
    let networkRequestCount = 0;
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
      >
      </fw-file-uploader-2>
    `);
    page.on('request', (request) => {
      if (request.url().includes('/echo') && request.method() !== 'OPTIONS') {
        networkRequestCount = networkRequestCount + 1;
      }
    });
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    const dropzone = await page.find(
      'fw-file-uploader-2 >>> .file-uploader__body__dropzone'
    );
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitFor(2500);
    const files = await page.findAll('fw-file-uploader-2 >>> fw-file-2');
    await page.waitForChanges();
    expect(files.length).toEqual(1);
    expect(networkRequestCount).toEqual(1);
  });

  it('should be able to get locally available files that are selected using getFiles', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
      >
      </fw-file-uploader-2>
    `);
    const fileUploader = await page.find('fw-file-uploader-2');
    await page.$eval('fw-file-uploader-2 ', (elm: any) => {
      elm.initialFiles = [
        {
          file: new File(
            [new Blob(new Uint8Array([137, 80, 78, 71, 13]))],
            'file1.png',
            { type: 'png', lastModified: Date.now() }
          ),
        },
      ];
    });
    await page.waitForChanges();
    const files = await fileUploader.callMethod('getFiles');
    await page.waitForChanges();
    expect(files.length).toEqual(1);
  });

  it('should be able to reset to default state when reset method is called', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
      >
      </fw-file-uploader-2>
    `);
    const fileUploader = await page.find('fw-file-uploader-2');
    await page.$eval('fw-file-uploader-2 ', (elm: any) => {
      elm.initialFiles = [
        {
          file: new File(
            [new Blob(new Uint8Array([137, 80, 78, 71, 13]))],
            'file1.png',
            { type: 'png', lastModified: Date.now() }
          ),
        },
      ];
    });
    await page.waitForChanges();
    await fileUploader.callMethod('reset');
    await page.waitForChanges();
    const files = await page.findAll('fw-file-uploader-2 >>> fw-file-2');
    expect(files.length).toEqual(0);
  });

  it('should remove a file if the remove button is pressed, must also emit fwFileRemoved event', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
      >
      </fw-file-uploader-2>
    `);
    const fileUploader = await page.find('fw-file-uploader-2');
    await page.$eval('fw-file-uploader-2 ', (elm: any) => {
      elm.initialFiles = [
        {
          file: new File(
            [new Blob(new Uint8Array([137, 80, 78, 71, 13]))],
            'file1.png',
            { type: 'png', lastModified: Date.now() }
          ),
        },
      ];
    });
    await page.waitForChanges();
    const fileRemoveEvent = await page.spyOnEvent('fwRemove');
    const fileUploaderShadow = await page.find(
      'fw-file-uploader-2 >>> :first-child'
    );
    const removeButton = await fileUploaderShadow.find(
      'fw-file-2 >>> .fw-attachment-content-delete-btn'
    );
    removeButton.click();
    await page.waitForChanges();
    const files = await page.findAll('fw-file-uploader-2 >>> fw-file-2');
    expect(files.length).toEqual(0);
    expect(fileRemoveEvent).toHaveReceivedEventTimes(1);
  });

  it('should be able to append files', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
      >
      </fw-file-uploader-2>
    `);
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    const dropzone = await page.find(
      'fw-file-uploader-2 >>> .file-uploader__body__dropzone'
    );
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitFor(2500);
    const futureFileChooser2 = page.waitForFileChooser();
    dropzone.click();
    const fileChooser2 = await futureFileChooser2;
    await fileChooser2.accept([`${__dirname}/test-2.csv`]);
    await page.waitFor(2500);
    const files = await page.findAll('fw-file-uploader-2 >>> fw-file-2');
    await page.waitForChanges();
    expect(files.length).toEqual(2);
  });

  it('should replace old file when new file is added when multiple is false', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="false"
      >
      </fw-file-uploader-2>
    `);
    const fileUploader = await page.find('fw-file-uploader-2');
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    const dropzone = await page.find(
      'fw-file-uploader-2 >>> .file-uploader__body__dropzone'
    );
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitFor(2500);
    const futureFileChooser2 = page.waitForFileChooser();
    dropzone.click();
    const fileChooser2 = await futureFileChooser2;
    await fileChooser2.accept([`${__dirname}/test-2.csv`]);
    await page.waitFor(2500);
    const files = await fileUploader.callMethod('getFiles');
    expect(files.length).toEqual(1);
    expect(files[0].name).toEqual('test-2.csv');
  });

  it('should not make request to action url if it is a batch upload', async () => {
    let networkRequestCount = 0;
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
        is-batch-upload="true"
      >
      </fw-file-uploader-2>
    `);
    page.on('request', (request) => {
      if (request.url().includes('/echo') && request.method() !== 'OPTIONS') {
        networkRequestCount = networkRequestCount + 1;
      }
    });
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    const dropzone = await page.find(
      'fw-file-uploader-2 >>> .file-uploader__body__dropzone'
    );
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await page.waitFor(2500);
    const files = await page.findAll('fw-file-uploader-2 >>> fw-file-2');
    await page.waitForChanges();
    expect(files.length).toEqual(1);
    expect(networkRequestCount).toEqual(0);
  });

  it('should send network requests only after calling uploadFiles when batch upload', async () => {
    let networkRequestCount = 0;
    const page = await newE2EPage();
    await page.setContent(`
      <fw-file-uploader-2 
        action-u-r-l="https://mocktarget.apigee.net/echo" 
        multiple="true"
        is-batch-upload="true"
      >
      </fw-file-uploader-2>
    `);
    const fileUploader = await page.find('fw-file-uploader-2');
    const filesUploadedEvent = await page.spyOnEvent('fwFilesUploaded');
    page.on('request', (request) => {
      if (request.url().includes('/echo') && request.method() !== 'OPTIONS') {
        networkRequestCount = networkRequestCount + 1;
      }
    });
    const futureFileChooser = page.waitForFileChooser();
    // some button that triggers file selection
    const dropzone = await page.find(
      'fw-file-uploader-2 >>> .file-uploader__body__dropzone'
    );
    dropzone.click();
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([`${__dirname}/test.csv`]);
    await fileUploader.callMethod('uploadFiles');
    await page.waitFor(2500);
    const files = await page.findAll('fw-file-uploader-2 >>> fw-file-2');
    await page.waitForChanges();
    expect(files.length).toEqual(0); // once file is sent. It will be cleared from queue.
    expect(networkRequestCount).toEqual(1);
    expect(filesUploadedEvent).toHaveReceivedEvent();
  });
});
