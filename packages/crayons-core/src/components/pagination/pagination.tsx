import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Method,
  Watch,
  State,
} from '@stencil/core';
import { TranslationController } from '../../global/Translation';
import memoize from 'lodash/memoize';
@Component({
  tag: 'fw-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination {
  private end;
  private start;
  private lastPage;
  private popoverRef;

  /**
   * The current page number.
   */
  @Prop({ mutable: true }) page = 1;
  /**
   * The total number of records. This is a mandatory parameter.
   */
  @Prop() total: number;
  /**
   *The number of records to be shown per page. Defaults to 10.
   */
  @Prop({ mutable: true }) perPage = 10;
  /**
   * Specify the perPage options to be shown. Works only with `standard` variant.
   */
  @Prop() perPageOptions = [10, 20, 30, 40, 50];

  /**
   * Aria Label to be used for the button group.
   */
  // @i18n({ keyName: 'pagination.buttonGroupLabel' })
  @Prop({ mutable: true })
  buttonGroupLabel = '';

  /**
   * Aria Label to be used for previous button.
   */
  // @i18n({ keyName: 'pagination.previousButtonLabel' })
  @Prop({ mutable: true })
  previousButtonLabel = '';

  /**
   * Aria Label to be used for next button.
   */
  // @i18n({ keyName: 'pagination.nextButtonLabel' })
  @Prop({ mutable: true })
  nextButtonLabel = '';

  /**
   * Indicates if the records in current page are being fetched.
   */
  @Prop() isLoading = false;

  /**
   * The variant of pagination to be displayed.
   * Mini variant displays only previous and next buttons along with pagination information.
   * Standard variant displays list of page numbers which can be selected along with previous and next buttons
   * Defaults to 'mini'.
   */
  @Prop() variant: 'mini' | 'standard' = 'mini';

  /**
   * hides page numbers in standard pagination variant. Defaults to false. Works only with `standard` variant.
   */
  @Prop() hidePageNumbers = false;

  /**
   * represents the range of pages to be shown. Defaults to 4. Works only with `standard` variant.
   */
  @Prop({ mutable: true }) pageRangeDisplayed = 4;

  /**
   * represents the number of pages to be shown on both the margins. Defaults to 1. Works only with `standard` variant.
   */
  @Prop({ mutable: true }) marginPagesDisplayed = 1;

  /**
   * Formatted per page options
   */
  @State() formattedPerPageOptions = [];

  /**
   * Triggered when previous, next or page button is clicked.
   */
  @Event()
  fwChange: EventEmitter;

  /**
   * Triggered when per page is changed from the dropdown. Works only with `standard` variant.
   */
  @Event()
  fwPerPageChange: EventEmitter;

  /**
   * Navigates to previous set of records if available.
   */
  @Method()
  async previousPage() {
    this.goToPrevious();
  }

  /**
   * Navigates to next set of records if available.
   */
  @Method()
  async nextPage() {
    this.goToNext();
  }

  private getLastPage() {
    return Math.ceil(this.total / this.perPage);
  }

  private getStartRecord() {
    return Math.max((this.page - 1) * this.perPage + 1, 1);
  }

  private getEndRecord() {
    return Math.min(this.start + this.perPage - 1, this.total);
  }

  @Watch('page')
  handlePage(page) {
    if (page > this.lastPage) return;
    this.start = this.getStartRecord();
    this.end = this.getEndRecord();
  }

  @Watch('perPage')
  handlePerPage() {
    this.lastPage = this.getLastPage();
    // if the current page is greater than the last page, set current page as the last page
    if (this.page > this.lastPage) {
      this.goToPage(this.lastPage);
    }
  }

  @Watch('total')
  handleTotal() {
    this.end = this.getEndRecord();
    this.lastPage = this.getLastPage();
  }

  @Watch('perPageOptions')
  handlePerPageOptions() {
    this.formatPerPageOptions();
    if (
      this.perPageOptions.length &&
      !this.perPageOptions.includes(this.perPage)
    ) {
      this.perPage = this.perPageOptions[0];
    }
  }

  range = (start, end) => {
    const length = end - start + 1;
    /*
      Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
  };

  getPaginationRange = memoize(
    (total = 0, perPage, pageRangeDisplayed, marginPagesDisplayed, page) => {
      const currentPageIndex = page - 1;
      const totalPageCount = Math.ceil(total / perPage);
      const items = [];

      if (totalPageCount <= pageRangeDisplayed) {
        for (let index = 0; index < totalPageCount; index++) {
          items.push(index + 1);
        }
      } else {
        let leftSide = pageRangeDisplayed / 2;
        let rightSide = pageRangeDisplayed - leftSide;

        // If the selected page index is on the default right side of the pagination,
        // we consider that the new right side is made up of it (= only one break element).
        // If the selected page index is on the default left side of the pagination,
        // we consider that the new left side is made up of it (= only one break element).
        if (currentPageIndex > totalPageCount - pageRangeDisplayed / 2) {
          rightSide = totalPageCount - currentPageIndex;
          leftSide = pageRangeDisplayed - rightSide;
        } else if (currentPageIndex < pageRangeDisplayed / 2) {
          leftSide = currentPageIndex;
          rightSide = pageRangeDisplayed - leftSide;
        }

        let index;

        // First pass: process the pages or breaks to display (or not).
        const pagesBreaking = [];
        for (index = 0; index < totalPageCount; index++) {
          const page = index + 1;

          // If the page index is lower than the margin defined,
          // the page has to be displayed on the left side of
          // the pagination.
          if (page <= marginPagesDisplayed) {
            pagesBreaking.push(index + 1);
            continue;
          }

          // If the page index is greater than the page count
          // minus the margin defined, the page has to be
          // displayed on the right side of the pagination.
          if (page > totalPageCount - marginPagesDisplayed) {
            pagesBreaking.push(index + 1);
            continue;
          }

          // If it is the first element of the array the rightSide need to be adjusted,
          //  otherwise an extra element will be rendered
          const adjustedRightSide =
            currentPageIndex === 0 && pageRangeDisplayed > 1
              ? rightSide - 1
              : rightSide;

          // If the page index is near the selected page index
          // and inside the defined range (pageRangeDisplayed)
          // we have to display it (it will create the center
          // part of the pagination).
          if (
            index >= currentPageIndex - leftSide &&
            index <= currentPageIndex + adjustedRightSide
          ) {
            pagesBreaking.push(index + 1);
            continue;
          }

          // If the page index doesn't meet any of the conditions above,
          // we check if the last item of the current "items" array
          // is a break element. If not, we add a break element, else,
          // we do nothing (because we don't want to display the page).
          if (
            pagesBreaking.length > 0 &&
            pagesBreaking[pagesBreaking.length - 1] !== 'ellipsis' &&
            // We do not show break if only one active page is displayed.
            (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
          ) {
            pagesBreaking.push('ellipsis');
          }
        }
        // Second pass: we remove breaks containing one page to the actual page.
        pagesBreaking.forEach((pageElement, i) => {
          let actualPageElement = pageElement;
          // 1 2 3 4 5 6 7 ... 9 10
          //         |
          // 1 2 ... 4 5 6 7 8 9 10
          //             |
          // The break should be replaced by the page.
          if (
            pageElement === 'ellipsis' &&
            pagesBreaking[i - 1] &&
            pagesBreaking[i - 1] !== 'ellipsis' &&
            pagesBreaking[i + 1] &&
            pagesBreaking[i + 1] !== 'ellipsis' &&
            pagesBreaking[i + 1] - 1 - pagesBreaking[i - 1] - 1 <= 2
          ) {
            actualPageElement = pageElement;
          }
          // We add the displayed elements in the same pass, to avoid another iteration.
          items.push(actualPageElement);
        });
      }

      return items;
    },
    (total, perPage, pageRangeDisplayed, marginPagesDisplayed, page) =>
      JSON.stringify([
        total,
        perPage,
        pageRangeDisplayed,
        marginPagesDisplayed,
        page,
      ])
  );

  renderPrevious = () => {
    return (
      <li>
        <fw-button
          class='nav-btn'
          tabIndex={0}
          aria-label={
            this.previousButtonLabel ||
            TranslationController.t('pagination.previousButtonLabel')
          }
          color='text'
          size='small'
          disabled={this.start === 1 || this.isLoading}
          onFwClick={() => this.goToPrevious()}
        >
          <fw-icon slot='before-label' size={12} name='chevron-left'></fw-icon>
          <span class='nav-label'>
            {TranslationController.t('pagination.previousButtonLabel')}
          </span>
        </fw-button>
      </li>
    );
  };

  renderNext = () => {
    return (
      <li>
        <fw-button
          class='nav-btn'
          tabIndex={0}
          aria-label={
            this.nextButtonLabel ||
            TranslationController.t('pagination.nextButtonLabel')
          }
          color='text'
          size='small'
          disabled={this.end === this.total || this.isLoading}
          onFwClick={() => this.goToNext()}
        >
          <span class='nav-label'>
            {TranslationController.t('pagination.nextButtonLabel')}
          </span>
          <fw-icon slot='after-label' size={12} name='chevron-right'></fw-icon>
        </fw-button>
      </li>
    );
  };

  renderPill = (page) => {
    return (
      <li>
        <button
          class={{
            'page-pill': true,
            'active': page === this.page,
            'disabled': this.isLoading,
          }}
          tabIndex={0}
          aria-label={TranslationController.t('pagination.pagePillLabel', {
            page,
          })}
          aria-current={page === this.page}
          onClick={() => this.goToPage(page)}
          disabled={this.isLoading}
        >
          {page}
        </button>
      </li>
    );
  };

  renderEllipsis = () => <li class='ellipsis'>...</li>;

  renderDivider = () => {
    return <div class='divider'></div>;
  };

  renderSizeChanger = () => {
    return (
      <fw-popover
        class='per-page-dropdown'
        distance='8'
        ref={(ref) => (this.popoverRef = ref)}
        trigger='manual'
        hoist
        autoFocusOnContent
      >
        <fw-button
          class={{
            disabled: this.isLoading,
          }}
          size='small'
          color='text'
          showCaretIcon
          slot='popover-trigger'
          disabled={this.isLoading}
          onClick={this.handlePerPageDropdownClick}
        >
          <span
            class='per-page-verbiage'
            innerHTML={TranslationController.t('pagination.perPageLabel', {
              perPage: this.perPage,
            })}
          ></span>
        </fw-button>
        <fw-list-options
          class='per-page-list'
          slot='popover-content'
          options={this.formattedPerPageOptions}
          value={this.perPage}
          onFwChange={this.onPerPageChange}
          allowDeselect={false}
        ></fw-list-options>
      </fw-popover>
    );
  };

  onPerPageChange = (ev) => {
    ev.stopPropagation();
    if (ev?.detail?.value) {
      this.perPage = ev.detail.value;
      this.fwPerPageChange.emit({
        perPage: this.perPage,
      });
      this.popoverRef.hide();
    }
  };

  handlePerPageDropdownClick = () => {
    if (!this.isLoading) {
      this.popoverRef.show();
    }
  };

  formatPerPageOptions = () => {
    if (this.variant === 'standard') {
      this.formattedPerPageOptions = this.perPageOptions.map((value) => ({
        text: TranslationController.t('pagination.perPageOptionLabel', {
          perPage: value,
        }),
        value,
      }));
    }
  };

  componentWillLoad() {
    this.lastPage = this.getLastPage();
    this.page = Math.min(this.page, this.lastPage);
    this.start = this.getStartRecord();
    this.end = this.getEndRecord();
  }

  componentDidLoad() {
    this.formatPerPageOptions();
  }

  private goToPrevious() {
    this.page = Math.max(1, this.page - 1);
    this.fwChange.emit({
      page: this.page,
    });
  }

  private goToNext() {
    this.page = Math.min(this.lastPage, this.page + 1);
    this.fwChange.emit({
      page: this.page,
    });
  }

  private goToPage(page) {
    if (this.page !== page && page >= 1 && page <= this.lastPage) {
      this.page = page;
      this.fwChange.emit({
        page: this.page,
      });
    }
  }

  render() {
    return (
      <Host>
        {this.variant === 'standard' ? (
          <div class='standard-pagination'>
            <ul class='pagination-list'>
              {this.renderPrevious()}
              {this.renderDivider()}
              {!this.hidePageNumbers &&
                this.getPaginationRange(
                  this.total,
                  this.perPage,
                  this.pageRangeDisplayed,
                  this.marginPagesDisplayed,
                  this.page
                ).map((item) => {
                  if (item === 'ellipsis') {
                    return this.renderEllipsis();
                  } else {
                    return this.renderPill(item);
                  }
                })}
              {!this.hidePageNumbers && this.total
                ? this.renderDivider()
                : null}
              {this.renderNext()}
            </ul>
            {this.renderSizeChanger()}
          </div>
        ) : (
          <div class='mini-pagination'>
            <div
              class='current-record'
              innerHTML={TranslationController.t('pagination.content', {
                start: this.start,
                end: this.end,
                total: this.total,
              })}
            >
              {/*  <span class='record'>{this.start}</span> to{' '}
          <span class='record'>{this.end}</span> of {this.total} */}
            </div>
            <fw-button-group
              label={
                this.buttonGroupLabel ||
                TranslationController.t('pagination.buttonGroupLabel')
              }
            >
              <fw-button
                disabled={this.start === 1 || this.isLoading}
                color='secondary'
                size='icon'
                aria-label={
                  this.previousButtonLabel ||
                  TranslationController.t('pagination.previousButtonLabel')
                }
                onFwClick={() => this.goToPrevious()}
              >
                <fw-icon name='chevron-left'></fw-icon>
              </fw-button>
              <fw-button
                disabled={this.end === this.total || this.isLoading}
                color='secondary'
                size='icon'
                aria-label={
                  this.nextButtonLabel ||
                  TranslationController.t('pagination.nextButtonLabel')
                }
                onFwClick={() => this.goToNext()}
              >
                <fw-icon name='chevron-right'></fw-icon>
              </fw-button>
            </fw-button-group>
          </div>
        )}
      </Host>
    );
  }
}
