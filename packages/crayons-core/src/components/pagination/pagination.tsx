import { Component, Prop, h, Host } from '@stencil/core';
@Component({
  tag: 'fw-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination {
  private end;
  /**
   * The starting record number for the current page.
   */
  @Prop({ mutable: true }) start: number;
  /**
   * The total number of records.
   */
  @Prop() total: number;
  /**
   *The number of records to be shown per page.
   */
  @Prop() perPage: number;

  componentWillLoad() {
    this.end = this.start + this.perPage - 1;
  }

  private previous() {
    this.start -= this.perPage;
    this.end -= this.perPage;
  }

  private next() {
    this.start += this.perPage;
    this.end =
      this.end + this.perPage > this.total
        ? this.total
        : this.end + this.perPage;
  }

  render() {
    return (
      <Host>
        <div>
          {this.start} to {this.end} of {this.total}
        </div>
        <fw-button-group>
          <fw-button
            disabled={this.start === 1}
            color='secondary'
            size='icon'
            onFwClick={() => this.previous()}
          >
            <fw-icon name='chevron-left'></fw-icon>
          </fw-button>
          <fw-button
            disabled={this.end === this.total}
            color='secondary'
            size='icon'
            onFwClick={() => this.next()}
          >
            <fw-icon name='chevron-right'></fw-icon>
          </fw-button>
        </fw-button-group>
      </Host>
    );
  }
}
