# File uploader 2 (fw-file-uploader-2)

### Default auto upload file uploader

```html live
  <fw-file-uploader-2 
    name="sample"
    id="file-uploader-00"
    description="We support .png, .jpeg and .jpg upto 25MB"
    max-file-size="5"
    accept=".png,.jpeg,.jpg"
    action-u-r-l="https://mocktarget.apigee.net/echo"
    multiple="true"

  >
  </fw-file-uploader-2>
```

### File uploader with initial values set

```html live
  <div class="fw-flex fw-flex-column fw-justify-center">
    <fw-file-uploader-2 
      name="sample"
      id="file-uploader-01"
      description="We support .png, .jpeg and .jpg upto 25MB"
      max-file-size="5"
      accept=".png,.jpeg,.jpg"
      action-u-r-l="https://mocktarget.apigee.net/echo"
      multiple="true"
      style="width: 400px;"
    >
    </fw-file-uploader-2>
  </div>

  <script type="application/javascript">
    const fileUploader1 = document.querySelector("#file-uploader-01");
    fileUploader1.initialFiles = [{
      file: new File([new Blob(new Uint8Array([
        137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,8,0,0,
        0,8,8,2,0,0,0,75,109,41,220,0,0,0,34,73,68,65,84,8,215,99,120,
        173,168,135,21,49])
      )], 'file1.png', {type: 'png', lastModified: Date.now()})
    }, {
      file: new File([new Blob(new Uint8Array([
        137,80,78,71,13])
      )], 'file2.png', {type: 'png', lastModified: Date.now()}),
      progress: 20,
      error: 'Failed to upload file'
    }, {
      file: new File([new Blob(new Uint8Array([
        137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,8,0,0,
        0,8,8,2,0,0,0,75,109,41,220,0,0,0,34,73,68,65,84,8,215,99,120,
        173,168,135,21,49,0,241,255,15,90,104,8,33,129,83,7,97,163,136,
        214,129,93,2,43,2,0,181,31,90,179,225,252,176,37,0,0,0,0,73,69,
        78,68,174,66,96,130])
      )], 'file3.png', {type: 'png', lastModified: Date.now()}),
      progress: -1,
      error: 'Failed to upload file'
    }];
  </script>
```

### File upload on a button trigger

```html live
  <div class="fw-flex fw-flex-column fw-justify-center">
    <div style="width: 400px;" class="fw-flex fw-flex-column">
      <fw-file-uploader-2 
        name="sample"
        id="file-uploader-02"
        description="We support .png, .jpeg and .jpg upto 25MB"
        max-file-size="5"
        action-u-r-l="https://run.mocky.io/v3/893d19d2-c988-4273-a907-9c18d78be753?mocky-delay=1000ms"
        multiple="true"
        is-batch-upload="true"
      >
      </fw-file-uploader-2>
      <br/>
      <fw-button file-uploader-two-id="file-uploader-02">Upload file</fw-button>
    </div>
  </div>
```

### File uploader as part of a form

```html live
  <div class="fw-flex fw-flex-column fw-justify-center">
    <form style="width: 400px;" class="fw-flex fw-flex-column fw-justify-center" id="sample-form" action="https://mocktarget.apigee.net/echo" method="post" onsubmit>
      <fw-file-uploader-2
        name="sample-2"
        id="file-uploader-03"
        description="We support .png, .jpeg and .jpg upto 25MB"
        max-file-size="5"
        accept=".png,.jpeg,.jpg"
        multiple="true"
        is-batch-upload="true"
      >
      </fw-file-uploader-2>
      <br/>
      <fw-button type="submit">Upload file</fw-button>
    </form>
  </div>

  <script type="application/javascript">
    const sampleForm = document.getElementById("sample-form");
    const fileUploader3 = document.getElementById("file-uploader-03");
    sampleForm.addEventListener("submit", async (e) => {
      e.preventDefault() // Cancel redirection
      const files = await fileUploader3.getFiles();
      console.log(files); // Perform action to send file to a server
      fileUploader3.reset(); // reset the form to initial state
    });
  </script>
```

### File upload - retry cases

```html live
  <div class="fw-flex fw-flex-column fw-justify-center">
    <div>
      <fw-toggle id="succeed-toggle" size="small" checked="false">Switch to succeed file upload</fw-toggle><br><br>
    </div>
    <div style="width: 400px;" class="fw-flex fw-flex-column">
      <fw-file-uploader-2 
        id="file-uploader-04"
        description="We support .png, .jpeg and .jpg upto 25MB"
        max-file-size="5"
        accept=".png,.jpeg,.jpg"
        action-u-r-l="/no-api"
        is-batch-upload="true"
      >
      </fw-file-uploader-2>
      <br/>
      <fw-button file-uploader-two-id="file-uploader-04">Upload file</fw-button>
    </div>
  </div>

  <script type="application/javascript">
    const fileUploader4 = document.querySelector('#file-uploader-04');
    const succeedToggle = document.querySelector('#succeed-toggle');
    fileUploader4.fileUploadError = 'Toggle the switch to successfully upload the file'; // Error message text
    succeedToggle.addEventListener('fwChange', (event) => {
      if (event.currentTarget.checked === true) {
        fileUploader4.actionURL = 'https://mocktarget.apigee.net/echo';
      } else {
        fileUploader4.actionURL = '/no-api';
      }
    });

    fileUploader4.addEventListener('fwFilesUploaded', (event) => {
      console.log(event); // Will be called when all file requests are sent.
    });
    fileUploader4.addEventListener('fwFileReuploaded', (event) => {
      console.log(event); // Will be called a retry attempt request is sent.
    });
  </script>
```

### File upload - modify header request

```html live
  <div class="fw-flex fw-flex-column fw-justify-center">
    <div style="width: 400px;" class="fw-flex fw-flex-column">
      <fw-file-uploader-2 
        name="sample"
        id="file-uploader-05"
        description="We support .png, .jpeg and .jpg upto 25MB"
        max-file-size="5"
        accept=".png,.jpeg,.jpg"
        action-u-r-l="https://mocktarget.apigee.net/echo"
        is-batch-upload="true"
      >
      </fw-file-uploader-2>
      <br/>
      <fw-button file-uploader-two-id="file-uploader-05">Upload file</fw-button>
    </div>
  </div>

  <script type="application/javascript">
    const fileUploader5 = document.querySelector('#file-uploader-05');
    fileUploader5.modifyRequest = (xhr) => {
      const token = 'sample';
      xhr.setRequestHeader('Authorization', token); // adding a header to the request
      return xhr;
    }
    fileUploader5.addEventListener('fwFilesUploaded', (event) => {
      console.log(JSON.parse(event.detail.response).headers.authorization); // Will be called the first time when all file requests are sent.
    });
  </script>
```

### File upload - custom upload and reset buttons

```html live
  <div class="fw-flex fw-flex-column fw-justify-center">
    <div style="width: 400px;" class="fw-flex fw-flex-column">
      <fw-file-uploader-2 
        name="sample"
        id="file-uploader-06"
        description="We support .png, .jpeg and .jpg upto 25MB"
        max-file-size="5"
        accept=".png,.jpeg,.jpg"
        action-u-r-l="https://mocktarget.apigee.net/echo"
        is-batch-upload="true"
      >
      </fw-file-uploader-2>
      <br/>
      <button id="custom-submit">Submit</button>
      <br/>
      <button id="custom-reset">Reset</button>
    </div>
  </div>

  <script type="application/javascript">
    const fileUploader6 = document.querySelector("#file-uploader-06");
    const customButton = document.querySelector("#custom-submit");
    const customReset = document.querySelector("#custom-reset");
    customButton.addEventListener('click', () => {
      fileUploader6.uploadFiles(); // Calling uploadFiles from the custom submit
    });
    customReset.addEventListener('click', () => {
      fileUploader6.reset(); // To return component to initial state
    });
    fileUploader6.addEventListener('fwFilesUploaded', (event) => {
      console.log(event);
    });
  </script>
```


## Migration guide: from fw-file-uploader (version 1)

- Removed fwStageChanged event from the component
- Added an fwChange event to the component. This gets triggered when locally adding files and on success/error cases on upload.



<!-- Auto Generated Below -->


## Properties

| Property                       | Attribute                          | Description                                                                                                                                   | Type                                      | Default                                                                      |
| ------------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------- |
| `accept`                       | `accept`                           | accept - comma separated string. tells us what file formats file uploader should accept.                                                      | `string`                                  | `''`                                                                         |
| `acceptError`                  | `accept-error`                     | acceptError - Error message to display when format is invalid.                                                                                | `any`                                     | `TranslationController.t('fileUploader2.acceptError')`                       |
| `actionParams`                 | --                                 | actionParams - additional information to send to server other than the file.                                                                  | `{ [prop: string]: any; }`                | `{}`                                                                         |
| `actionURL`                    | `action-u-r-l`                     | actionURL - URL to make server call.                                                                                                          | `string`                                  | `''`                                                                         |
| `description`                  | `description`                      | description - file uploader description.                                                                                                      | `any`                                     | `undefined`                                                                  |
| `errors`                       | `errors`                           | errors - errors collection.                                                                                                                   | `any`                                     | `[]`                                                                         |
| `fileUploadError`              | `file-upload-error`                | fileUploadError - Error message when a file upload fails.                                                                                     | `any`                                     | `undefined`                                                                  |
| `files`                        | --                                 | files - files collection.                                                                                                                     | `UploaderFile[]`                          | `[]`                                                                         |
| `filesLimit`                   | `files-limit`                      | Max files allowed to upload.                                                                                                                  | `number`                                  | `10`                                                                         |
| `hideLabel`                    | `hide-label`                       | Use this prop to show the label on the component.                                                                                             | `boolean`                                 | `true`                                                                       |
| `infoText`                     | `info-text`                        |                                                                                                                                               | `string`                                  | `''`                                                                         |
| `initialFiles`                 | --                                 | to load default values in file uploader component.                                                                                            | `InitialUploaderFile[]`                   | `[]`                                                                         |
| `isBatchUpload`                | `is-batch-upload`                  | Upload all files in one single shot                                                                                                           | `boolean`                                 | `false`                                                                      |
| `maxFileSize`                  | `max-file-size`                    | maxFileSize - maximum file size the file uploader must accept.                                                                                | `number`                                  | `0`                                                                          |
| `maxFileSizeError`             | `max-file-size-error`              | maxFileSizeError - Error message to display when file size exceeds limit                                                                      | `any`                                     | `TranslationController.t('fileUploader2.maxFileSizeError')`                  |
| `maxFilesLimitError`           | `max-files-limit-error`            | maxFilesLimitError - Error message when going beyond files limit.                                                                             | `any`                                     | `TranslationController.t(     'fileUploader2.maxFilesLimitError'   )`        |
| `modifyRequest`                | --                                 | modify request                                                                                                                                | `(xhr: XMLHttpRequest) => XMLHttpRequest` | `(xhr) => xhr`                                                               |
| `multiple`                     | `multiple`                         | multiple - upload multiple files.                                                                                                             | `boolean`                                 | `false`                                                                      |
| `name`                         | `name`                             | name - field name                                                                                                                             | `string`                                  | `''`                                                                         |
| `required`                     | `required`                         | field acts as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false. | `boolean`                                 | `false`                                                                      |
| `restrictAttachmentWidth`      | `restrict-attachment-width`        | restrict the width of the attachment in the file uploader                                                                                     | `boolean`                                 | `false`                                                                      |
| `simpleInterfaceForSingleMode` | `simple-interface-for-single-mode` | Use a simple interface for the single file mode.                                                                                              | `boolean`                                 | `false`                                                                      |
| `text`                         | `text`                             | text - file uploader text.                                                                                                                    | `any`                                     | `undefined`                                                                  |
| `totalFileSizeAllowed`         | `total-file-size-allowed`          | Max total size allowed for upload                                                                                                             | `number`                                  | `0`                                                                          |
| `totalFileSizeAllowedError`    | `total-file-size-allowed-error`    | totalFileSizeAllowedError - Total file size (combination of all files) allowed for upload.                                                    | `any`                                     | `TranslationController.t(     'fileUploader2.totalFileSizeAllowedError'   )` |


## Events

| Event              | Description                                                             | Type               |
| ------------------ | ----------------------------------------------------------------------- | ------------------ |
| `fwChange`         | Event that triggers when uploading is in progress, completed or failed. | `CustomEvent<any>` |
| `fwFileRemoved`    | Triggered during file remove.                                           | `CustomEvent<any>` |
| `fwFileReuploaded` | Triggered during a file reupload.                                       | `CustomEvent<any>` |
| `fwFilesUploaded`  | Triggered during batch upload, when all files are uploaded.             | `CustomEvent<any>` |
| `fwRemove`         | Event that triggers when removing a file from the file uploader.        | `CustomEvent<any>` |


## Methods

### `getFiles() => Promise<UploaderFile[]>`

get all locally available files in the component

#### Returns

Type: `Promise<UploaderFile[]>`

FileList of all locally available files in the component

### `getFilesList() => Promise<FileList>`



#### Returns

Type: `Promise<FileList>`



### `reset() => Promise<void>`

reset file uploader

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `uploadFiles() => Promise<void>`

uploadFile

#### Returns

Type: `Promise<void>`

fileUploadPromise


## CSS Custom Properties

| Name                        | Description                    |
| --------------------------- | ------------------------------ |
| `--fw-file-uploader-border` | border color for file uploader |


## Dependencies

### Depends on

- [fw-attachment](attachment)
- [fw-inline-message](../inline-message)

### Graph
```mermaid
graph TD;
  fw-file-uploader-2 --> fw-attachment
  fw-file-uploader-2 --> fw-inline-message
  fw-attachment --> fw-icon
  fw-attachment --> fw-tooltip
  fw-attachment --> fw-spinner
  fw-tooltip --> fw-popover
  fw-inline-message --> fw-icon
  style fw-file-uploader-2 fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
