/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Component, Element, Prop, State, h } from '@stencil/core';

import { i18n } from '../../global/Translation';
@Component({
  tag: 'fw-canned-response',
  styleUrl: 'canned-response.scss',
  shadow: true,
})
export class ListOptions {
  @Element() host: HTMLElement;
  private searchInput?: HTMLFwInputElement;
  private responsesDiv: HTMLElement;
  private container: HTMLElement;

  @State() filteredResponses = [];
  @State() filteredResponseName = '';
  @State() selectOptions = [];
  @State() selectedOptionsState = [];
  @State() isSearching = false;
  @State() responses = [];
  @State() hasResponses = false;
  @State() selectedResponse = {};

  /**
   * Value corresponding to the option, that is saved  when the form data is saved.
   */
  @Prop() options = [];
  /**
   * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ mutable: true }) value: any = '';
  /**
   * Text displayed in the text box before a user enters a value.
   */
  @Prop() placeholder?: string | null;
  /**
   * label of the component.
   */
  @Prop() label?: string | null;
  /**
   * icon name of the component.
   */
  @Prop() icon?: string | null;
  /**
   * Placeholder to placed on the search text box.
   */
  @i18n({ keyName: 'search.search' })
  @Prop({ mutable: true })
  searchText = '';

  /**
   * Text to be displayed when there is no data available in the select.
   */
  @i18n({ keyName: 'search.noDataAvailable' })
  @Prop({ mutable: true })
  noDataText = '';
  /**
   * Debounce timer for the search promise function.
   */
  @Prop() debounceTimer = 300;
  /**
   * The option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop() selectedOptions = [];

  loadResponses(options: Array<any>) {
    return options.map((option) => (
      <div
        class={`query-category-list ${
          option.cannedResponseCount > 0 ? 'pointer' : ''
        } `}
        onClick={() => this.handleClick(option)}
      >
        <div class='query-category-list-inner'>
          {this.icon === 'folder' && (
            <fw-icon name='folder' size={18}></fw-icon>
          )}
          {this.icon === 'inbox' && <fw-icon name='inbox' size={18}></fw-icon>}
          <div class='query-category-label'>
            {option.categoryName} ({option.cannedResponseCount})
          </div>
        </div>
        {option.cannedResponseCount > 0 && (
          <fw-icon name='chevron-right' size={8}></fw-icon>
        )}
      </div>
    ));
  }

  handleClick(opt) {
    this.selectedResponse = opt;
    this.filteredResponseName = opt.categoryName;
    this.filteredResponses = opt.cannedResponses;
    this.hasResponses = !this.hasResponses;
  }

  handleSearch(val) {
    const a = [];
    const flag = this.options.filter((item) => {
      return item.cannedResponseCount > 0;
    });
    flag.forEach((item) => {
      item.cannedResponses.forEach((item) => {
        console.log(
          'item.message.messageFragments[0].content--->',
          item.message.messageFragments[0].content
        );
        item.message.messageFragments[0].content.toLowerCase().includes(val) &&
          a.push(item);
      });
    });
    if (a.length > 0 && val !== '') {
      if (!this.hasResponses) this.hasResponses = true;
      this.filteredResponses = a;
      this.isSearching = true;
    } else {
      this.hasResponses = !this.hasResponses;
      this.isSearching = !this.isSearching;
    }
  }

  componentWillLoad() {
    this.responses = this.options;
    this.selectedResponse = this.options.find((item) => {
      return item.cannedResponseCount > 0;
    });
    this.filteredResponseName = this.selectedResponse['categoryName'];
    this.filteredResponses = this.selectedResponse['cannedResponses'];
  }

  render() {
    return (
      <div
        class='query-container'
        ref={(container) => {
          this.container = container;
        }}
      >
        <div class='query-label'>
          <div>{this.label || ''}</div>
          <div class='query-close pointer'>
            <fw-icon name='cross' size={8}></fw-icon>
            <span role='button'>Esc</span>
          </div>
        </div>
        <div class='query-search-box'>
          <fw-input
            ref={(searchInput) => (this.searchInput = searchInput)}
            placeholder={this.placeholder || ''}
            onInput={() =>
              this.handleSearch(this.searchInput.value.toLowerCase())
            }
          ></fw-input>
        </div>
        <div class='query-categories'>
          {this.loadResponses(this.options)}
          <div
            class={`query-category-results ${
              this.hasResponses ? 'opened' : ''
            }`}
            ref={(responsesDiv) => (this.responsesDiv = responsesDiv)}
          >
            <div
              class={`query-category-result-header pointer ${this.isSearching ? 'd-none' : ''}`}
              onClick={() => this.handleClick(this.selectedResponse)}
            >
              <fw-icon name='chevron-left' size={12}></fw-icon>
              {this.filteredResponseName}
            </div>
            {this.filteredResponses.map((resp) => (
              <div class='query-category-result-body'>
                {resp.title}
                <fw-button size='small'> View </fw-button>
                <fw-button size='small'> Add </fw-button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
