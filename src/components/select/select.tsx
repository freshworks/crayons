import { Component, Prop, Host, h, State, Listen, Watch, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'fw-select',
  styleUrl: 'select.scss',
  shadow: true
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
  @Prop() name: string = "";
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
  @Prop() forceSelect = false;
  /**
   * Indicates that this control is disabled
   */
  @Prop() disabled = false;
  /**
   * Set the selected key
   */
  @Prop() selectedKey?: string;

  //Events
  @Event() fwChange: EventEmitter;
  @Event() fwFocus: EventEmitter;
  @Event() fwBlur: EventEmitter;

  private innerOnFocus = (e: Event) => {
    this.hasFocus = true;
    this.fwFocus.emit(e);
  }

  private innerOnClick = (e: Event) => {
    this.selectList.style.display = "block";
    this.selectList.style.width = String(this.selectInput.clientWidth) + 'px';
    this.isExpanded = true;
  }

  private innerOnBlur = (e: Event) => {
    this.selectList.style.display = "none";
    this.isExpanded = false;
    this.fwBlur.emit(e);
  }

  private getValue(): string {
    return this.value || '';
  }

  private hasValue = (): boolean => {
    return this.getValue().length > 0;
  }

  @Watch("selectedKey")
  keyChanged(newValue: String, oldValue: String) {
    if (oldValue !== newValue) {
      let selectedElement = this.host.querySelector('fw-select-option[key="' + newValue + '"');
      selectedElement ? selectedElement.setAttribute('selected', 'true') : null;
      let previousElement = this.host.querySelector('fw-select-option[key="' + oldValue + '"');
      previousElement ? previousElement.setAttribute('selected', 'false') : null;
      this.fwChange.emit({ key: selectedElement.getAttribute("key"), value: selectedElement.getAttribute("value") });
    }
  }

  @Listen('fwSelectOptionChosen')
  fwSelectOptionChosenHandler(selectedItem) {
    this.selectList.style.display = "none";
    this.selectedKey = selectedItem.detail.key;
    this.value = selectedItem.detail.value;
    selectedItem.stopPropagation();
  }

  componentDidLoad() {
    if (this.selectedKey) {
      let selectOption = this.host.querySelector('fw-select-option[key="' + this.selectedKey + '"');
      if (selectOption) {
        selectOption.setAttribute('selected', 'true');
        this.value = selectOption.getAttribute('value');
      }
    }
  }

  render() {
    const { value } = this;
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={{
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus
        }}
      >
        {this.label ? <label class={{
          'required': this.required,
        }}>{this.label}</label> : ''}
        <div
          class="select-container"
        >
          <div class="input-container">
            <div class={{
              'input-container-inner': true,
              [this.state]: true
            }}>
              <input
                ref={input => this.selectInput = input}
                autoComplete='off'
                disabled={this.disabled}
                name={this.name}
                placeholder={this.placeholder || ''}
                readOnly={this.readonly}
                required={this.required}
                type="text"
                value={value}
                onFocus={e => this.innerOnFocus(e)}
                onClick={e => this.innerOnClick(e)}
                onBlur={e => this.innerOnBlur(e)}
              />
              <span class={{ 'dropdown-status-icon': true, 'expanded': this.isExpanded }}></span>
            </div>
          </div>
          <ul
            tabindex="0"
            ref={ul => this.selectList = ul}
          >
            {!this.forceSelect ? <fw-select-option key="--" value="--" /> : ''}
            <slot>
            </slot>
          </ul>
          {this.stateText ?
            <span class='help-block'>{this.stateText}</span> : ''}
        </div>
      </Host>
    );
  }
}
