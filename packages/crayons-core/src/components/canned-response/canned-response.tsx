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

  @State() filteredOptions = [];
  @State() selectOptions = [];
  @State() selectedOptionsState = [];
  @State() isLoading = false;
  @State() responses = [];
  @State() hasResponses = false;

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
        onClick={() => this.handleClick()}
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

  handleClick() {
    console.log('this.options', this.options);
    this.hasResponses = !this.hasResponses;
  }

  handleSearch(val) {
    // let flag;
    // this.options.forEach((item) => {
    //   if (item.cannedResponseCount > 0) {
    //     flag = item.cannedResponses.filter((resp) => {
    //       return resp.message.messageFragments[0].content.includes(val);
    //     });
    //     console.log('flag-->', flag);
    //   }
    // });
    // console.log('filtered data-->', flag);
    // const a = this.options.map((item) => {
    //   return {
    //     ...item,
    //     cannedResponses:
    //       item.cannedResponseCount > 0 &&
    //       item.cannedResponses.filter((resp) => {
    //         return resp.message.messageFragments[0].content;
    //       }),
    //   };
    // });
    // console.log('filtered data-->', a);
    const filteredArray = this.options
      .filter(
        (item) =>
          item.cannedResponseCount > 0 &&
          item.cannedResponses.some((resp) =>
            resp.message.messageFragments[0].content.includes(val)
          )
      )
      .map((element) => {
        return Object.assign({}, element, {
          cannedResponses: element.cannedResponses.filter((res) =>
            res.message.messageFragments[0].content.includes(val)
          ),
        });
      });
    console.log('filteredArray-->', filteredArray);
  }

  componentWillLoad() {
    this.responses = this.options;
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
            onInput={() => this.handleSearch(this.searchInput.value)}
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
              class='query-category-result-header pointer'
              onClick={() => this.handleClick()}
            >
              <fw-icon name='chevron-left' size={12}></fw-icon>
              General
            </div>
            <div class='query-category-result-body'>
              How to signup
              <fw-button size='small'> View </fw-button>
              <fw-button size='small'> Add </fw-button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
