import {
  Component,
  h,
  Prop,
  Host,
  Element,
  Event,
  EventEmitter,
} from '@stencil/core';
import { handleKeyDown } from '../../../utils';
import { TranslationController } from '../../../global/Translation';

@Component({
  tag: 'fw-attachment',
  styleUrl: 'attachment.scss',
  shadow: true,
})
export class Attachment {
  @Element() host!: HTMLElement;

  private spanExtension: HTMLElement;
  private spanName: HTMLElement;
  private spanSize: HTMLElement;
  private resizeObserver;

  private iconImageType = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.96 2.5H5.04002C3.63722 2.5 2.50002 3.6372 2.50002 5.04V14.96C2.49735 15.6345 2.7641 16.2821 3.24102 16.759C3.71794 17.2359 4.36556 17.5027 5.04002 17.5H14.96C15.6345 17.5027 16.2821 17.2359 16.759 16.759C17.2359 16.2821 17.5027 15.6345 17.5 14.96V5.04C17.5 3.6372 16.3628 2.5 14.96 2.5ZM5.04002 3.9H14.96C15.5896 3.9 16.1 4.41039 16.1 5.04V10.34L13.97 8.21C13.6932 7.93544 13.2468 7.93544 12.97 8.21L8.75002 12.44L6.75002 10.44C6.61977 10.303 6.43903 10.2255 6.25002 10.2255C6.06101 10.2255 5.88028 10.303 5.75002 10.44L3.90002 12.34V5.04C3.90002 4.41039 4.41042 3.9 5.04002 3.9ZM4.04002 15.4C4.20983 15.8072 4.59932 16.0798 5.04002 16.1H15.01C15.4507 16.0798 15.8402 15.8072 16.01 15.4C16.073 15.2621 16.1038 15.1116 16.1 14.96V12.32L13.5 9.7L9.28002 13.94C9.14977 14.077 8.96903 14.1545 8.78002 14.1545C8.59101 14.1545 8.41027 14.077 8.28002 13.94L6.28002 11.94L3.95002 14.32V14.96C3.94627 15.1116 3.97705 15.2621 4.04002 15.4Z" fill="currentColor"/>
    </svg>  
  `;
  private iconFileType = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.49 6.42C16.4995 6.47962 16.4995 6.54038 16.49 6.6C16.49 6.62 16.5 6.65 16.5 6.65V15.3C16.5 16.7912 15.2912 18 13.8 18H6.2C4.70883 18 3.5 16.7912 3.5 15.3V4.7C3.5 3.20883 4.70883 2 6.2 2H11.9C11.967 2.01181 12.0314 2.03551 12.09 2.07H12.16C12.2348 2.10382 12.3026 2.1513 12.36 2.21L16.36 6.15C16.4182 6.20966 16.4625 6.28134 16.49 6.36V6.42ZM14.11 6L12.56 4.39V6H14.11ZM6.2 16.6H13.8C14.4989 16.6005 15.0731 16.0484 15.1 15.35V7.35001H11.9C11.5134 7.35001 11.2 7.0366 11.2 6.65001V3.40001H6.2C5.48203 3.40001 4.9 3.98204 4.9 4.70001V15.3C4.9 15.6448 5.03696 15.9754 5.28076 16.2192C5.52456 16.463 5.85522 16.6 6.2 16.6ZM7 9.34H13.05H13.1C13.4866 9.34 13.8 9.6534 13.8 10.04C13.8 10.4266 13.4866 10.74 13.1 10.74H7C6.6134 10.74 6.3 10.4266 6.3 10.04C6.3 9.6534 6.6134 9.34 7 9.34ZM13.05 13H7C6.6134 13 6.3 13.3134 6.3 13.7C6.3 14.0866 6.6134 14.4 7 14.4H13.1C13.3501 14.4 13.5812 14.2666 13.7062 14.05C13.8313 13.8334 13.8313 13.5666 13.7062 13.35C13.5812 13.1334 13.3501 13 13.1 13H13.05ZM9.11 7.09H7C6.6134 7.09 6.3 6.7766 6.3 6.39001C6.3 6.00341 6.6134 5.69001 7 5.69001H9.11C9.4966 5.69001 9.81 6.00341 9.81 6.39001C9.81 6.7766 9.4966 7.09 9.11 7.09Z" fill="currentColor"/>
    </svg>
  `;
  private iconAddedLibrary =
    '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.1875 2.7334C1.1875 1.62883 2.08293 0.733398 3.1875 0.733398H10.8131C11.9177 0.733398 12.8131 1.62883 12.8131 2.7334V14.518C12.8131 14.8375 12.4571 15.0281 12.1913 14.8509L7.2222 11.5382C7.08784 11.4486 6.9128 11.4486 6.77844 11.5382L1.80938 14.8509C1.54356 15.0281 1.1875 14.8375 1.1875 14.518V2.7334Z" fill="currentColor" stroke="currentColor" stroke-width="1.4"/></svg>';
  private iconAddLibrary =
    '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.1875 2.7334C1.1875 1.62883 2.08293 0.733398 3.1875 0.733398H10.8131C11.9177 0.733398 12.8131 1.62883 12.8131 2.7334V14.518C12.8131 14.8375 12.4571 15.0281 12.1913 14.8509L7.2222 11.5382C7.08784 11.4486 6.9128 11.4486 6.77844 11.5382L1.80938 14.8509C1.54356 15.0281 1.1875 14.8375 1.1875 14.518V2.7334Z" stroke="currentColor" stroke-width="1.4"/></svg>';

  /**
   * Name of the attachment file to be displayed (including the file extension)
   */
  @Prop() label = '';
  /**
   * File type
   */
  @Prop() type: string | null = null;
  /**
   * Size of the attachment in bytes
   */
  @Prop() size = 0;
  /**
   * Boolean used to display size as passed or convert them to relatives like KB, MB etc...
   */
  @Prop() parseSize = true;
  /**
   * Set private mode for different styles
   */
  @Prop() isPrivateMode = false;
  /**
   * Error message text to display below the attachment
   */
  @Prop() errorMessage = '';
  /**
   * Boolean value to set if the attachment is added in library or not
   */
  @Prop({ mutable: true }) addedToLibrary = false;
  /**
   * State of the attachment for styling
   */
  @Prop({ mutable: true }) state: 'normal' | 'loading' | 'error' | 'failed' =
    'normal';
  /**
   * Index order of the attachment file starting from 0
   */
  @Prop() index = -1;
  /**
   * Value or id related to the attached file
   */
  @Prop() value;
  /**
   * To enable library adding related feature
   */
  @Prop() enableLibraryAdding = false;
  /**
   * Event triggered to delete the attachment file
   */
  @Event() fwDelete!: EventEmitter;
  /**
   * Event triggered to add / remove file from the library
   */
  @Event() fwModifyLibrary!: EventEmitter;
  /**
   * Event triggered to reupload
   */
  @Event() fwReupload!: EventEmitter;

  componentDidRender(): void {
    const elSize = this.spanSize;
    if (elSize && !this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        const sizeW = elSize.clientWidth;
        const extensionW = this.spanExtension.clientWidth;
        if (sizeW > 0 || extensionW > 0) {
          this.spanName.style.maxWidth = `calc(100% - ${sizeW}px - 4px - ${extensionW})`;
        }
      });
      this.resizeObserver.observe(elSize);
    }
  }

  disconnectedCallback(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private modifyLibraryHandler = async (event) => {
    if (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
    this.fwModifyLibrary.emit({
      index: this.index,
      value: this.value,
      state: this.state,
      type: this.addedToLibrary ? 'REMOVE_FROM_LIBRARY' : 'ADD_TO_LIBRARY',
    });
  };

  private deleteHandler = async (event) => {
    if (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
    this.fwDelete.emit({
      index: this.index,
      value: this.value,
      state: this.state,
    });
  };

  private reUploadHandler = async (event) => {
    if (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
    this.fwReupload.emit({
      index: this.index,
      value: this.value,
      state: this.state,
    });
  };

  private getFileSize() {
    const bytes = this.size;
    if (bytes === 0) {
      return ' (0 B)';
    }

    const k = 1024;
    const dm = 2;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return ` (${
      parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    })`;
  }

  private getFilenameAndExtension() {
    if (!this.label || this.label === '') {
      return ['', ''];
    }
    const numLastIndex = this.label.lastIndexOf('.');
    if (numLastIndex > -1) {
      const strFileExtension = this.label.substring(numLastIndex + 1);

      return [
        this.label.substring(0, numLastIndex),
        strFileExtension && strFileExtension !== ''
          ? `.${strFileExtension}`
          : '',
      ];
    } else {
      return [this.label, ''];
    }
  }

  render() {
    const strClassName = 'fw-attachment';
    const boolErrorState = this.state === 'error';
    const boolFailedState = this.state === 'failed';
    const boolLoadingState = this.state === 'loading';
    const boolNormalState = this.state === 'normal';

    let strBaseClassName = strClassName;
    if (!boolNormalState) {
      strBaseClassName += ` ${strClassName}--${this.state}-state`;
    } else if (this.isPrivateMode) {
      strBaseClassName += ` ${strClassName}--private-mode`;
    }

    const strSize = this.parseSize ? this.getFileSize() : this.size;

    const arrFilebreak = this.getFilenameAndExtension();
    const strFileName =
      arrFilebreak && arrFilebreak.length > 0 ? arrFilebreak[0] : '';
    const strFileExtension =
      arrFilebreak && arrFilebreak.length > 1 ? arrFilebreak[1] : '';
    return (
      <Host>
        <div class={strBaseClassName}>
          <div class={`${strClassName}-content`}>
            <div class={`${strClassName}-content-left-panel`}>
              <span class={`${strClassName}-content-icon`}>
                <fw-icon
                  dataSvg={
                    this.type?.startsWith('image/') === true
                      ? this.iconImageType
                      : this.iconFileType
                  }
                  color={
                    boolErrorState || boolFailedState ? '#d72d30' : '#264966'
                  }
                ></fw-icon>
              </span>
              <span
                class={`${strClassName}-content-name`}
                ref={(el) => (this.spanName = el)}
              >
                {strFileName}
              </span>
              <span
                class={`${strClassName}-content-file-extension`}
                ref={(el) => (this.spanExtension = el)}
              >
                {strFileExtension}
              </span>
              <span
                class={`${strClassName}-content-size`}
                ref={(el) => (this.spanSize = el)}
              >
                {strSize}
              </span>
            </div>
            <div class={`${strClassName}-content-right-panel`}>
              {this.enableLibraryAdding && boolNormalState && (
                <fw-tooltip
                  trigger='hover'
                  content={
                    this.addedToLibrary
                      ? TranslationController.t(
                          'fileUploader.removeFromLibrary'
                        )
                      : TranslationController.t('fileUploader.saveInLibrary')
                  }
                  hoist
                >
                  <div
                    id={
                      this.addedToLibrary
                        ? 'removeFromLibraryBtn'
                        : 'addToLibraryBtn'
                    }
                    class={`${strClassName}-content-add-library-btn`}
                    role='button'
                    tabindex='-1'
                    onClick={this.modifyLibraryHandler}
                    onKeyDown={handleKeyDown(this.modifyLibraryHandler)}
                  >
                    <fw-icon
                      id={
                        this.addedToLibrary
                          ? 'removeFromLibraryBtnIcon'
                          : 'addToLibraryBtnIcon'
                      }
                      class={`${strClassName}-content-add-library-btn-icon`}
                      dataSvg={
                        this.addedToLibrary
                          ? this.iconAddedLibrary
                          : this.iconAddLibrary
                      }
                      color={this.addedToLibrary ? '#2C5CC5' : '#475867'}
                    ></fw-icon>
                  </div>
                </fw-tooltip>
              )}
              {!boolLoadingState && (
                <div
                  class={`${strClassName}-content-delete-btn`}
                  role='button'
                  tabindex='0'
                  onClick={this.deleteHandler}
                  onKeyDown={handleKeyDown(this.deleteHandler)}
                >
                  <fw-icon
                    class={`${strClassName}-content-delete-btn-icon`}
                    name='cross'
                    size={6}
                    library='system'
                  ></fw-icon>
                </div>
              )}
              {boolLoadingState && (
                <fw-spinner
                  size='large'
                  class={`${strClassName}-content-spinner`}
                ></fw-spinner>
              )}
            </div>
          </div>
          {(boolErrorState || boolFailedState) && (
            <div class={`${strClassName}-content-error`}>
              <span class={`${strClassName}-content-error-icon`}>
                <fw-icon name='error' size={12} color='#d72d30'></fw-icon>
              </span>
              <span class={`${strClassName}-content-error-message`}>
                {this.errorMessage}
              </span>
              {(boolErrorState || boolFailedState) && (
                <button
                  class={`${strClassName}-content-reupload-btn`}
                  onClick={this.reUploadHandler}
                >
                  {TranslationController.t('fileUploader2.retry')}
                </button>
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
