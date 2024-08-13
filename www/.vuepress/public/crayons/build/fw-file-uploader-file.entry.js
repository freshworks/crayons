import { r as registerInstance, h as createEvent, i as h } from './index-44c267ce.js';
import { T as TranslationController } from './Translation-ce9b2559.js';

const fileUploaderFileCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:inline-block}.files-content{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;width:300px;-webkit-margin-before:7px;margin-block-start:7px}.files-content-icon{width:14px;height:14px;margin-inline:0px;margin-block:3px}.files-content-file{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-box-sizing:border-box;box-sizing:border-box}.files-content-file-name{font-weight:600;font-size:14px;line-height:20px;color:#12344d}.files-content-file-remove{text-decoration:none;font-weight:600;color:#2c5cc5;-webkit-margin-before:5px;margin-block-start:5px;font-size:12px;line-height:20px;background:transparent;border:none;display:inline-block;padding:0px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.files-content-file-remove:hover,.files-content-file-remove:focus{cursor:pointer}";

let FileUploaderFile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwRemoveFile = createEvent(this, "fwRemoveFile", 7);
    /**
     * file Id
     */
    this.fileId = null;
    /**
     * file name
     */
    this.name = '';
  }
  /**
   * private
   * remove
   */
  remove() {
    this.fwRemoveFile.emit({
      fileId: this.fileId,
    });
  }
  /**
   * render
   * @returns {JSX.Element}
   */
  render() {
    /* eslint-disable-next-line */
    return (h("div", { class: 'files-content' }, h("div", { class: 'files-content-icon' }, h("fw-icon", { name: 'checkbox', size: 14, color: '#00a886' })), h("div", { class: 'files-content-file' }, h("span", { class: 'files-content-file-name' }, this.name), h("button", { class: 'files-content-file-remove', onClick: () => this.remove() }, TranslationController.t('fileUploader.remove')))));
  }
};
FileUploaderFile.style = fileUploaderFileCss;

export { FileUploaderFile as fw_file_uploader_file };
