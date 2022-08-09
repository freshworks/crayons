import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
  State,
  Listen,
  Method,
} from '@stencil/core';

@Component({
  tag: 'fw-email-header',
  styleUrl: 'email-header.scss',
  shadow: true
})
export class EmailHeader {
  @Element() host: HTMLElement;

  private fromSelect;

  private toSelect;
  /**
   * Value of the option that is displayed as the default selection of From section, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ mutable: true }) fromValue: any;

  /**
     * The data for the select component in From section, the options will be of type array of fw-select-options.
     */
  @Prop() fromOptions: any;

  /**
    * Array of the options that is displayed as the default selection for To section, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
    */
  @Prop({ reflect: true, mutable: true }) selectedToOptions = [];

  /**
   * Array of the options that is displayed as the default selection for CC section, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
   */
  @Prop({ reflect: true, mutable: true }) selectedCcOptions = [];

  /**
   * Array of the options that is displayed as the default selection for BCC section, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
   */
  @Prop({ reflect: true, mutable: true }) selectedBccOptions = [];

  /**
   * Filter function which takes in filterText and dataSource and return a Promise.
   * Where filter text is the text to filter the value in dataSource array.
   * The returned promise should contain the array of options to be displayed.
   */
  @Prop() emailLookup;

  /**
   * Max number of emails to be displayed on hover of truncated text for 'To' field
   */
  @Prop() maxEmailsOnHover = 8;

  /**
   * Debounce timer for the emailLookup promise function.
   */
  @Prop() debounceTimer = 300;

  // Events
  /**
   * Triggered when a value is selected or deselected from the list box options fo to/cc/bcc fields.
   */
  @Event() fwChange: EventEmitter;

  @State() toOptionsState = this.selectedToOptions;
  @State() ccOptionsState = this.selectedCcOptions;
  @State() bccOptionsState = this.selectedBccOptions;
  @State() toExpanded = false;
  @State() ccExpanded = false;
  @State() bccExpanded = false;

  renderErrorIcon() {
    return <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" fill="#D72D30" />
      <path
        d="M9.35 10.31V6.7a.7.7 0 1 1 1.4 0v3.61a.7.7 0 1 1-1.4 0ZM10.05 12.06a1.05 1.05 0 1 0 1.05 1.05 1 1 0 0 0-1.05-1.05Z"
        fill="#fff"
      />
    </svg>
  }

  renderEmail(value) {
    return <span class='email-row'>
      <fw-avatar
        size="xsmall"
        mode={value?.error ? 'error' : 'dark'}
        image={value?.graphicsProps?.image}
      ></fw-avatar>
      <span class='single-select-value'>
        <span class='primary-text'>{value?.text}</span>
        {value?.subText && <span class='secondary-text'>{` <${value?.subText}>`}</span>}
      </span>
      {value?.error &&
        <span class='error-icon'>
          {this.renderErrorIcon()}
        </span>
      }
    </span>
  }

  getOptions(id) {
    switch (id) {
      case 'to':
        return {
          label: 'To',
          options: this.toOptionsState.length > this.maxEmailsOnHover
            ? this.toOptionsState.slice(0, this.maxEmailsOnHover)
            : this.toOptionsState,
        }
      case 'cc':
        return {
          label: 'Cc',
          options: this.ccOptionsState.length > this.maxEmailsOnHover - this.toOptionsState.length
            ? this.ccOptionsState.slice(0, this.maxEmailsOnHover - this.toOptionsState.length)
            : this.ccOptionsState,
        };
      case 'bcc':
        return {
          label: 'Bcc',
          options: this.bccOptionsState.length > this.maxEmailsOnHover - (this.toOptionsState.length + this.ccOptionsState.length)
            ? this.bccOptionsState.slice(0, this.maxEmailsOnHover - (this.toOptionsState.length + this.ccOptionsState.length))
            : this.bccOptionsState,
        };
      default:
        break;
    }
  }

  renderRow(id) {
    const { label, options } = this.getOptions(id);
    if (options.length) {
      return <div class={`section-container ${id !== 'to' ? 'block-padding' : ''}`}>
        <div class='label-section'>
          {label}
        </div>
        <div class='value-section'>
          {options.map((option) => this.renderEmail(option))}
        </div>
      </div>
    }
  }

  renderHoverContent() {
    const recipientEmails = this.toOptionsState.length + this.ccOptionsState.length + this.bccOptionsState.length;
    return (
      <div class='hover-container'>
        {this.toOptionsState.length !== 0 && this.renderRow('to')}
        {this.ccOptionsState.length !== 0 && this.renderRow('cc')}
        {this.bccOptionsState.length !== 0 && this.renderRow('bcc')}
        {recipientEmails > this.maxEmailsOnHover && <span class='truncate-popover'>{`+${recipientEmails - this.maxEmailsOnHover} more`}</span>}
      </div>
    );
  };

  @Listen('fwChange')
  fwSelectedHandler(selectedItem) {
    const id = selectedItem.composedPath()[0].id;
    switch (id) {
      case 'to-field':
        this.toOptionsState = selectedItem.detail?.meta?.selectedOptions;
        break;
      case 'cc-field':
        this.ccOptionsState = selectedItem.detail?.meta?.selectedOptions;
        break;
      case 'bcc-field':
        this.bccOptionsState = selectedItem.detail?.meta?.selectedOptions;
        break;
      default:
        return;
    }
    this.fwChange.emit({
      name: id,
      meta: {
        selectedOptions: selectedItem.detail?.meta?.selectedOptions,
      },
    });
  }

  setExpanded(value) {
    if (this.toExpanded !== value) {
      this.toExpanded = value;
      if (value) {
        setTimeout(() => this.toSelect.setFocus(), 300);
        if (this.ccOptionsState.length && !this.ccExpanded) {
          this.ccExpanded = true;
        }
        if (this.bccOptionsState.length && !this.bccExpanded) {
          this.bccExpanded = true;
        }
      } else {
        this.ccExpanded = value;
        this.bccExpanded = value;
      }
    }
  }

  @Listen('fwBlur')
  onDropdownClose(e) {
    if (e.composedPath()[0].id === 'to-field') {
      // this.setExpanded(false);
    }
  }

  @Method()
  async getSelectedFromValue(): Promise<any> {
    return this.fromSelect.getSelectedItem();
  }

  @Method()
  async getSelectedToItems(): Promise<any> {
    return this.toOptionsState;
  }

  @Method()
  async getSelectedCcItems(): Promise<any> {
    return this.ccOptionsState;
  }

  @Method()
  async getSelectedBccItems(): Promise<any> {
    return this.bccOptionsState;
  }

  @Method()
  async collapse(): Promise<any> {
    this.setExpanded(false);
  }

  @Method()
  async expand(): Promise<any> {
    this.setExpanded(true);
  }

  toggleCcExpanded() {
    this.ccExpanded = !this.ccExpanded;
  }

  toggleBccExpanded() {
    this.bccExpanded = !this.bccExpanded;
  }

  render() {
    const recipientEmails = this.toOptionsState.length + this.ccOptionsState.length + this.bccOptionsState.length;
    return (<div>
      <div class='field-container'>
        <div class='main-label'>
          <span>From</span><span>:</span>
        </div>
        <fw-email-select
          ref={(fromSelect) => (this.fromSelect = fromSelect)}
          class='from-field select-section'
          options={this.fromOptions}
          value={this.fromValue?.value}
          allowDeselect={false}
          readonly={this.fromOptions.length <= 1}
        />
      </div>
      <div class='field-container'>
        <div class='main-label'>
          <span>To</span><span>:</span>
        </div>
        <div class={`to-row select-section ${!this.toExpanded ? 'collapsed-field' : ''}`}>
          <div 
            class='to-container'
            onClick={() => this.setExpanded(true)}
            onFocus={() => this.setExpanded(true)}
          >
            <fw-email-select
              ref={(toSelect) => (this.toSelect = toSelect)}
              id='to-field'
              class='to-field'
              search={this.emailLookup}
              selectedOptions={this.selectedToOptions}
              multiple
              readonly={!this.toExpanded}
              debounceTimer={this.debounceTimer}
            />
            {!this.toExpanded && recipientEmails > 1
              && <fw-popover
              hoist
                trigger='hover'
                placement="bottom"
                sameWidth={false}
              >
                <span slot="popover-trigger" class='truncation-text'>
                  +{recipientEmails - 1} more
                </span>
                <div slot="popover-content" class='hover-content'>
                  {this.renderHoverContent()}
                </div>
              </fw-popover>}
          </div>
          <div class='expansion-link-container'>
            <fw-tooltip placement="top" content={`${this.ccExpanded ? 'Hide' : 'Show'} Cc`}>
              <span role='button' class={`expansion-link ${this.ccExpanded ? 'hover-link' : ''}`} onClick={() => this.toggleCcExpanded()}>Cc</span>
            </fw-tooltip>
            <fw-tooltip placement="top" content={`${this.bccExpanded ? 'Hide' : 'Show'} Bcc`}>
              <span role='button' class={`expansion-link link-separation ${this.bccExpanded ? 'hover-link' : ''}`} onClick={() => this.toggleBccExpanded()}>Bcc</span>
            </fw-tooltip>
          </div>
        </div>
      </div>
      <div class={`field-container ${!this.ccExpanded ? 'hidden' : ''}`}>
        <div class='main-label'>
          <span>Cc</span><span>:</span>
        </div>
        <fw-email-select
          id='cc-field'
          class='select-section'
          search={this.emailLookup}
          selectedOptions={this.selectedCcOptions}
          multiple
          debounceTimer={this.debounceTimer}
        />
      </div>
      <div class={`field-container ${!this.bccExpanded ? 'hidden' : ''}`}>
        <div class='main-label'>
          <span>Bcc</span><span>:</span>
        </div>
        <fw-email-select
          id='bcc-field'
          class='select-section'
          search={this.emailLookup}
          selectedOptions={this.selectedBccOptions}
          multiple
          debounceTimer={this.debounceTimer}
        />
      </div>
    </div >);
  }
}
