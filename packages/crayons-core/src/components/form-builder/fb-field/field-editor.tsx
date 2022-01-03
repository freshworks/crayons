import {
  Component,
  Element,
  Prop,
  h,
  Host,
  EventEmitter,
  Event,
} from '@stencil/core';

@Component({
  tag: 'fw-field-editor',
  styleUrl: 'field-editor.scss',
  shadow: true,
})
export class FieldEditor {
  @Element() host!: HTMLElement;

  private divFieldBase: HTMLElement;
  private fieldNameInput?: HTMLFwInputElement;

  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) disabled = false;
  /**
   * Property to determine expanded state or collapsed
   */
  @Prop({ mutable: true }) expanded = false;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;
  /**
   * data source used to set and edit the field values
   */
  @Prop() dataProvider = null;
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Triggered when the field is expanded or collapsed
   */
  @Event() fwExpand!: EventEmitter;
  /**
   * Triggered when the field details need to be submitted
   */
  @Event() fwSubmit!: EventEmitter;

  /**
   * Key bindings done for the event to keep them accessible in 'this' scope
   */
  componentWillLoad(): void {
    this.onSubmitFieldHandler = this.onSubmitFieldHandler.bind(this);
    this.onCancelHandler = this.onCancelHandler.bind(this);
    this.onExpandHandler = this.onExpandHandler.bind(this);
    this.onExpandKeyPressHandler = this.onExpandKeyPressHandler.bind(this);
    this.startParentDragging = this.startParentDragging.bind(this);
    this.stopParentDragging = this.stopParentDragging.bind(this);
    this.enableParentDrag = this.enableParentDrag.bind(this);
  }

  disconnectedCallback(): void {
    window.removeEventListener('mouseup', this.stopParentDragging);
  }

  /**
   * function called on reorder button mousedown to enable the parent as draggable
   */
  private startParentDragging() {
    // event added to remove the draggable for the parent
    window.addEventListener('mouseup', this.stopParentDragging);
    this.enableParentDrag(true);
  }

  /**
   * function to disable the parent as draggable
   */
  private stopParentDragging() {
    window.removeEventListener('mouseup', this.stopParentDragging);
    this.enableParentDrag(false);
  }

  /**
   * function to enable/disable the draggable property for the base div
   */
  private enableParentDrag(value: boolean): void {
    if (this.divFieldBase) {
      if (value) {
        this.divFieldBase.setAttribute('draggable', 'true');
      } else {
        this.divFieldBase.removeAttribute('dragable');
      }
    }
  }

  /**
   * submit handler - submit the changes made to the field and emit the changes
   */
  private onSubmitFieldHandler() {
    this.fwSubmit.emit({
      expanded: false,
      index: this.index,
    });
  }

  /**
   * cancel handler - will remove all the changes made to the field and close the expanded view
   */
  private onCancelHandler() {
    if (this.expanded) {
      this.expanded = false;
      this.fwExpand.emit({
        expanded: false,
        index: this.index,
      });
    }
  }

  /**
   * expand handler - will expand the field for editing
   */
  private onExpandHandler(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.detail && event.detail > 1) {
      return;
    }

    if (!this.expanded) {
      this.expanded = true;
      this.fwExpand.emit({
        expanded: true,
        index: this.index,
      });
    }
  }

  /**
   * key press handler - will remove all the changes made to the field and close the expanded view
   */
  private onExpandKeyPressHandler(event: KeyboardEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!this.expanded) {
      this.expanded = true;
      this.fwExpand.emit({
        expanded: true,
        index: this.index,
      });
    }
  }

  /**
   * on Blur field name handler
   */
  private onFieldNameChangeHandler() {
    const strUpdateFieldName = this.fieldNameInput.value;
    console.log('----' + strUpdateFieldName);
  }

  // private renderOptional() {
  //   if (!this.dataProvider) {
  //     return null;
  //   }
  //   // const strFieldType = this.dataProvider.type;
  //   // switch (strFieldType) {
  //   //   case "DROPDOWN":
  //   //     return ();
  //   // }
  // }

  /**
   * function to render basic field checkboxes
   * @returns {JSX.Element}
   */
  private renderCheckboxField(dataCheckbox) {
    const strBaseClassName = 'fw-field-editor';

    return (
      <fw-checkbox
        key={dataCheckbox.key}
        value={dataCheckbox.key}
        checked={dataCheckbox.selected}
        disabled={!dataCheckbox.enabled}
        class={`${strBaseClassName}-content-checkbox-input`}
      >
        {dataCheckbox.label}
      </fw-checkbox>
    );
  }

  /**
   * function to render basic field details
   * @returns {JSX.Element}
   */
  private renderContent() {
    const objField = this.dataProvider;
    const strBaseClassName = 'fw-field-editor';
    const strInputValue = objField.label;
    const arrCheckboxes = objField.field_options.checkboxes;
    const checkboxItems =
      arrCheckboxes && arrCheckboxes.length > 0
        ? arrCheckboxes.map((dataItem) => this.renderCheckboxField(dataItem))
        : null;

    return (
      <div class={`${strBaseClassName}-content-required`}>
        <label class={`${strBaseClassName}-content-required-label`}>
          {'Field Name'}
        </label>
        <fw-input
          class={`${strBaseClassName}-content-required-input`}
          ref={(fieldNameInput) => (this.fieldNameInput = fieldNameInput)}
          placeholder='Enter the name of your lookup field here'
          value={strInputValue}
          onBlur={this.onFieldNameChangeHandler}
        ></fw-input>
        <div class={`${strBaseClassName}-content-checkboxes`}>
          {checkboxItems}
        </div>
      </div>
    );
  }

  render() {
    if (!this.dataProvider) {
      return null;
    }
    const objField = this.dataProvider;
    const strBaseClassName = 'fw-field-editor';
    let strComponentClassName = strBaseClassName;
    if (this.expanded) {
      strComponentClassName += ' ' + strBaseClassName + '--expanded';
    }

    return (
      <Host tabIndex='-1'>
        <div
          class={strComponentClassName}
          ref={(divFieldBase) => (this.divFieldBase = divFieldBase)}
        >
          <div
            role='button'
            class={`${strBaseClassName}-header`}
            onClick={this.onExpandHandler}
            onKeyPress={this.onExpandKeyPressHandler}
            tabIndex={0}
          >
            <div
              role='none'
              class={`${strBaseClassName}-drag-container`}
              onMouseDown={this.startParentDragging}
            >
              <fw-icon size={14} name='drag' color='#CFD7DF' />
            </div>
            <span
              class={`${strBaseClassName}-icon-container`}
              style={{
                backgroundColor: objField.field_options.icon.bg_color,
              }}
            >
              <fw-icon
                size={14}
                name={objField.field_options.icon.name}
                color='#475867'
              />
            </span>
            <label class={`${strBaseClassName}-label`}>{objField.label}</label>
          </div>
          <div class={`${strBaseClassName}-body`}>
            <div class={`${strBaseClassName}-content`}>
              {this.renderContent()}
            </div>
            <div class={`${strBaseClassName}-footer`}>
              <fw-button
                id='clearFieldBtn'
                color='secondary'
                onClick={this.onCancelHandler}
              >
                Cancel
              </fw-button>
              <fw-button
                id='submitFieldBtn'
                color='primary'
                onClick={this.onSubmitFieldHandler}
              >
                Submit
              </fw-button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
