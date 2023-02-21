import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Method,
  Watch,
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
  private formattedPerPageOptions;
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
   * Specify the perPage options to be shown.
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
   * represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.
   */
  @Prop() siblingCount = 1;

  /**
   * hides page numbers in standard pagination variant. Defaults to false.
   */
  @Prop() hidePageNumbers = false;

  /**
   * Triggered when either previous or next button is clicked.
   */
  @Event()
  fwChange: EventEmitter;

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
    if (page > this.getLastPage()) return;
    this.start = this.getStartRecord();
    this.end = this.getEndRecord();
  }

  @Watch('total')
  handleTotal() {
    this.end = this.getEndRecord();
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
    (total, perPage, siblingCount, page) => {
      const totalPageCount = Math.ceil(total / perPage);

      // boundary pages that are always visible at the beginning and end
      const startPages = [1];
      const endPages = [totalPageCount];

      const siblingsStart = Math.max(
        Math.min(
          // Natural start
          page - siblingCount,
          // Lower boundary when page is high
          totalPageCount - 1 - siblingCount * 2 - 1
        ),
        // Greater than startPages (minimum start value)
        3
      );

      const siblingsEnd = Math.min(
        Math.max(
          // Natural end
          page + siblingCount,
          // Upper boundary when page is low
          1 + siblingCount * 2 + 2
        ),
        // Less than endPages
        endPages.length > 0 ? endPages[0] - 2 : totalPageCount - 1
      );

      // Basic list of items to render
      // [startPages, start-ellipsis, current page along with siblings, end-ellipsis, endPages]
      // e.g. itemList = [1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10]
      const itemList = [
        ...startPages,

        // Start ellipsis
        ...(siblingsStart > 3
          ? ['start-ellipsis']
          : totalPageCount - 1 > 2
          ? [2]
          : []),

        // Sibling pages
        ...this.range(siblingsStart, siblingsEnd),

        // End ellipsis
        ...(siblingsEnd < totalPageCount - 2
          ? ['end-ellipsis']
          : totalPageCount - 1 > 1
          ? [totalPageCount - 1]
          : []),

        ...endPages,
      ];

      return itemList;
    },
    (total, perPage, siblingCount, page) =>
      JSON.stringify([total, perPage, siblingCount, page])
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

  renderEllipsis = (type) => (
    <li class='ellipsis'>
      <button
        class='page-pill'
        tabIndex={0}
        aria-label={type}
        onClick={() => this.handleEllipsisClick(type)}
        disabled={this.isLoading}
      >
        ...
      </button>
    </li>
  );

  renderDivider = () => {
    return <div class='divider'></div>;
  };

  renderSizeChanger = () => {
    return (
      <fw-popover
        ref={(ref) => (this.popoverRef = ref)}
        hoist
        autoFocusOnContent
      >
        <fw-button
          size='small'
          color='text'
          showCaretIcon
          slot='popover-trigger'
        >
          <span
            class='per-page-verbiage'
            innerHTML={TranslationController.t('pagination.perPageLabel', {
              perPage: this.perPage,
            })}
          ></span>
        </fw-button>
        <fw-list-options
          slot='popover-content'
          options={this.formattedPerPageOptions}
          value={this.perPage}
          onFwChange={this.onPerPageChange}
        ></fw-list-options>
      </fw-popover>
    );
  };

  onPerPageChange = (ev) => {
    if (ev?.detail?.value) {
      const lastPage = this.getLastPage();
      if (this.page > lastPage) {
        this.goToPage(lastPage);
      }
      this.perPage = ev.detail.value;
      this.popoverRef.hide();
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

  handleEllipsisClick = (type) => {
    if (type === 'start-ellipsis') {
      const newPage = Math.max(1, this.page - this.siblingCount * 2 + 1);
      this.goToPage(newPage);
    } else {
      const newPage = Math.min(
        this.getLastPage(),
        this.page + this.siblingCount * 2 + 1
      );
      this.goToPage(newPage);
    }
  };

  componentWillLoad() {
    this.page = Math.min(this.page, this.getLastPage());
    this.start = this.getStartRecord();
    this.end = this.getEndRecord();
    this.formatPerPageOptions();
  }

  private goToPrevious() {
    this.page = Math.max(1, this.page - 1);
    this.fwChange.emit({
      page: this.page,
    });
  }

  private goToNext() {
    this.page = Math.min(this.getLastPage(), this.page + 1);
    this.fwChange.emit({
      page: this.page,
    });
  }

  private goToPage(page) {
    if (this.page !== page && page >= 1 && page <= this.getLastPage()) {
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
                  this.siblingCount,
                  this.page
                ).map((item) => {
                  if (['start-ellipsis', 'end-ellipsis'].includes(item)) {
                    return this.renderEllipsis(item);
                  } else {
                    return this.renderPill(item);
                  }
                })}
              {!this.hidePageNumbers && this.renderDivider()}
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
