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
@Component({
  tag: 'fw-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination {
  private end;
  private start;

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
  @Prop() perPage = 10;
  /**
   * Aria Label to be used for the button group.
   */
  @Prop() buttonGroupLabel = 'Pagination controls';
  /**
   * Aria Label to be used for previous button.
   */
  @Prop() previousButtonLabel = 'Previous';
  /**
   * Aria Label to be used for next button.
   */
  @Prop() nextButtonLabel = 'Next';
  /**
   * Indicates if the records in current page are being fetched.
   */
  @Prop() isLoading = false;
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

  componentWillLoad() {
    this.page = Math.min(this.page, this.getLastPage());
    this.start = this.getStartRecord();
    this.end = this.getEndRecord();
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

  render() {
    return (
      <Host>
        <div class='current-record'>
          <span class='record'>{this.start}</span> to{' '}
          <span class='record'>{this.end}</span> of {this.total}
        </div>
        <fw-button-group label={this.buttonGroupLabel}>
          <fw-button
            disabled={this.start === 1 || this.isLoading}
            color='secondary'
            size='icon'
            aria-label={this.previousButtonLabel}
            onFwClick={() => this.goToPrevious()}
          >
            <fw-icon name='chevron-left'></fw-icon>
          </fw-button>
          <fw-button
            disabled={this.end === this.total || this.isLoading}
            color='secondary'
            size='icon'
            aria-label={this.nextButtonLabel}
            onFwClick={() => this.goToNext()}
          >
            <fw-icon name='chevron-right'></fw-icon>
          </fw-button>
        </fw-button-group>
      </Host>
    );
  }
}
