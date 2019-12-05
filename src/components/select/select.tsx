import { Component, Element, Event, EventEmitter, Host, Listen, Prop, State, Watch, h, Method } from '@stencil/core';

@Component({
  tag: 'fw-select',
  styleUrl: 'select.scss',
  shadow: true,
})
export class Select {
  @Element() host: HTMLElement;
  private selectInput?: HTMLInputElement;
  private selectList?: HTMLUListElement;
  /**
   * If the dropdown is shown or not
   */
  @State() isExpanded = false;
  @State() hasFocus = false;
  @State() dynItems = [];
  /**
   * Label for the control
   */
  @Prop() label = '';
  /**
   * The value of the input. Similar to an input value
   */
  @Prop({ mutable: true }) value?: string | null = '';
  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name = '';
  /**
   * Instructional text that shows before the selection is made
   */
  @Prop() placeholder?: string | null;
  /**
   * The state of the control. Color changes accordingly
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';
  /**
   * This text will be displayed below the input box indicating the state/hint
   */
  @Prop() stateText = '';
  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly = false;
  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false;
  /**
   * If `true`, the user must select some value. The default wont be shown
   */
  @Prop() forceSelect = true;
  /**
   * Indicates that this control is disabled
   */
  @Prop() disabled = false;
  /**
   * Set the selected Value
   */
  @Prop() selectedValue?: string = '';

  // Events
  @Event() fwChange: EventEmitter;
  @Event() fwFocus: EventEmitter;
  @Event() fwBlur: EventEmitter;

  private innerOnFocus = (e: Event) => {
    this.hasFocus = true;
    this.fwFocus.emit(e);
  }

  private innerOnClick = () => {
    this.selectList.style.display = 'block';
    this.selectList.style.width = String(this.selectInput.clientWidth) + 'px';
    this.isExpanded = true;
  }

  private innerOnBlur = (e: Event) => {
    this.selectList.style.display = 'none';
    this.isExpanded = false;
    this.fwBlur.emit(e);
  }

  private getValue(): string {
    return this.value || '';
  }

  private hasValue = (): boolean => {
    return this.getValue().length > 0;
  }

  @Watch('selectedValue')
  keyChanged(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      const selectedElement = this.host.querySelector('fw-select-option[value="' + newValue + '"]');
      // tslint:disable-next-line: no-null-keyword no-unused-expression
      selectedElement ? selectedElement.setAttribute('selected', 'true') : null;
      const previousElement = this.host.querySelector('fw-select-option[value="' + oldValue + '"]');
      // tslint:disable-next-line: no-null-keyword no-unused-expression
      previousElement ? previousElement.setAttribute('selected', 'false') : null;
      this.fwChange.emit({ value: selectedElement.getAttribute('value'), text: selectedElement.textContent });
    }
  }

  @Listen('fwSelectOptionChosen')
  fwSelectOptionChosenHandler(selectedItem) {
    const selectedElement = this.host.querySelector('fw-select-option[value="' + selectedItem.detail.value + '"');
    this.selectList.style.display = 'none';
    this.selectedValue = selectedItem.detail.value;
    this.value = selectedElement.textContent;
    selectedItem.stopPropagation();
  }

  componentDidLoad() {
    // tslint:disable-next-line: strict-boolean-conditions
    const selectOption = this.host.querySelector('fw-select-option');
    if(!selectOption) {
      this.disabled = true;
      return;
    }
    
    if (this.forceSelect && !this.selectedValue) {
      const selectOption = this.host.querySelector('fw-select-option');
      selectOption.selected = true;
      this.selectInput.value = selectOption.textContent;
      this.selectedValue = selectOption.value;
    }

    if (this.selectedValue) {
      const selectOption = this.host.querySelector('fw-select-option[value="' + this.selectedValue + '"');
      if (selectOption) {
        selectOption.setAttribute('selected', 'true');
        this.value = selectOption.textContent;
      }
    }
  }

  @Method()
  async getSelectedItem(): Promise<Object> {
    if (this.selectedValue) {
      const selectedElement = this.host.querySelector('fw-select-option[value="' + this.selectedValue + '"');
      if (selectedElement) {
        return Promise.resolve({ value: this.selectedValue, text: selectedElement.textContent });
      }
    }
  }

  @Method()
  async setSelectedItem(value: string): Promise<void> {
    if (value) {
      const selectedElement = this.host.querySelector('fw-select-option[value="' + value + '"');
      if (selectedElement) {
        this.selectList.style.display = 'none';
        this.selectedValue = value;
        this.value = selectedElement.textContent;
        return Promise.resolve();
      } else {
        return Promise.reject(new Error("No matching select option found"));
      }
    }
  }

  @Method()
  async getItems(): Promise<Array<Object>> {
    const selectOptions = this.host.querySelectorAll('fw-select-option');
    const items = Array.from(selectOptions).map(function (item) {
      return { value: item.getAttribute('value'), text: item.innerText };
    });
    if (items)
      return Promise.resolve(items);
  }

  @Method()
  async setItems(items: Array<any>): Promise<void> {
    this.host.innerHTML = "";
    this.selectInput.value = "";
    this.selectedValue = "";
    items.map((item) => {
      const el = document.createElement('fw-select-option');
      el.value = item.value;
      el.innerText = item.text;
      this.host.appendChild(el);
    });
  }

  render() {
    const { value } = this;
    return (
      <Host
        aria-disabled={this.disabled}
        class={{
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus,
        }}
      >
        {this.label !== '' ? <label class={{
          'required': this.required,
        }}>{this.label}</label> : ''}
        <div
          class="select-container"
        >
          <div class="input-container">
            <div class={{
              'input-container-inner': true,
              [this.state]: true,
            }}>
              <input
                ref={input => this.selectInput = input}
                autoComplete="off"
                disabled={this.disabled}
                name={this.name}
                placeholder={this.placeholder || ''}
                readOnly={this.readonly}
                required={this.required}
                type="text"
                value={value}
                onFocus={e => this.innerOnFocus(e)}
                onClick={() => this.innerOnClick()}
                onBlur={e => this.innerOnBlur(e)}
              />
              <span class={{ 'dropdown-status-icon': true, 'expanded': this.isExpanded }}></span>
            </div>
          </div>
          <ul
            tabindex="0"
            ref={ul => this.selectList = ul}
          >

            <slot />
          </ul>
          {this.stateText !== '' ?
            <span class="help-block">{this.stateText}</span> : ''}
        </div>
      </Host>
    );
  }
}
