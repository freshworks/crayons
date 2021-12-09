import {
  Component,
  Prop,
  h,
  Host,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
@Component({
  tag: 'fw-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination {
  @State() start;
  @State() end;

  /**
   * The total number of records.
   */
  @Prop({ mutable: true }) totalRecords: number;
  /**
   *The number of records to be shown per page. Defaults to 1.
   */
  @Prop() recordsPerPage = 1;
  /**
   * Triggered when either previous or next button is clicked.
   */
  @Event() fwChange: EventEmitter;

  componentWillLoad() {
    const pageQueryParam = parseInt(
      new URLSearchParams(window.location.search).get('page')
    );
    this.start = pageQueryParam
      ? (pageQueryParam - 1) * this.recordsPerPage + 1
      : 1;
    this.end = this.start + this.recordsPerPage - 1;
    this.totalRecords = this.totalRecords || this.end;
  }

  private previous() {
    this.start -= this.recordsPerPage;
    this.end =
      this.start - this.end !== this.recordsPerPage
        ? this.start + this.recordsPerPage - 1
        : this.end - this.recordsPerPage;

    this.fwChange.emit({ startRecord: this.start, endRecord: this.end });
  }

  private next() {
    this.start += this.recordsPerPage;
    this.end = Math.min(this.end + this.recordsPerPage, this.totalRecords);

    this.fwChange.emit({ startRecord: this.start, endRecord: this.end });
  }

  render() {
    return (
      <Host>
        <div class='current-record'>
          <span class='record'>{this.start}</span> to{' '}
          <span class='record'>{this.end}</span> of {this.totalRecords}
        </div>
        <fw-button-group label='Pagination controls'>
          <fw-button
            disabled={this.start === 1}
            color='secondary'
            size='icon'
            aria-label='Previous'
            onFwClick={() => this.previous()}
          >
            <fw-icon name='chevron-left'></fw-icon>
          </fw-button>
          <fw-button
            disabled={this.end === this.totalRecords}
            color='secondary'
            size='icon'
            aria-label='Next'
            onFwClick={() => this.next()}
          >
            <fw-icon name='chevron-right'></fw-icon>
          </fw-button>
        </fw-button-group>
      </Host>
    );
  }
}
