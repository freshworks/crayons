/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Component,
  Element,
  Prop,
  h,
  Host,
  EventEmitter,
  Event,
  State,
  Watch,
} from '@stencil/core';

@Component({
  tag: 'fw-field-editor',
  styleUrl: 'field-editor.scss',
  shadow: true,
})
export class FieldEditor {
  @Element() host!: HTMLElement;
  private divFieldBase: HTMLElement;
  private dictInteractiveElements;
  private strFieldName = '';

  /**
   * State to check the form creating status
   */
  @State() isFieldCreationInProgress = false;
  /**
   * State to show the field name error message
   */
  @State() showFieldNameError = false;
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) disabled = false;
  /**
   * Property to determine expanded state or collapsed
   */
  @Prop({ mutable: true }) expanded = false;
  /**
   * data source used to set and edit the field values
   */
  @Prop({ mutable: true }) dataProvider = null;
  /**
   * stores the default field type schema for this editor type
   */
  @Prop() defaultFieldTypeSchema;
  /**
   * defines if the field is primary
   */
  @Prop() isPrimaryField = false;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Triggered when the field is expanded or collapsed
   */
  @Event() fwExpand!: EventEmitter;
  /**
   * Triggered when the field details need to be saved on the server
   */
  @Event() fwUpdateField!: EventEmitter;

  @Watch('expanded')
  watchExpandChangeHandler(): void {
    if (!this.expanded) {
      this.isFieldCreationInProgress = false;
    }
  }

  @Watch('dataProvider')
  watchDataproviderChangeHandler(): void {
    this.strFieldName = this.dataProvider ? this.dataProvider.name : '';
  }

  /**
   * Key bindings done for the event to keep them accessible in 'this' scope
   */
  componentWillLoad(): void {
    this.watchDataproviderChangeHandler();
    this.dictInteractiveElements = {};
    this.addFieldHandler = this.addFieldHandler.bind(this);
    this.cancelFieldHandler = this.cancelFieldHandler.bind(this);
    this.expandHandler = this.expandHandler.bind(this);
    this.expandKeyPressHandler = this.expandKeyPressHandler.bind(this);
    this.startParentDragging = this.startParentDragging.bind(this);
    this.stopParentDragging = this.stopParentDragging.bind(this);
    this.enableParentDrag = this.enableParentDrag.bind(this);
    this.nameBlurHandler = this.nameBlurHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
  }

  disconnectedCallback(): void {
    this.dictInteractiveElements = null;
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

  private addFieldHandler() {
    if (!this.strFieldName || this.strFieldName === '') {
      this.showFieldNameError = true;
      return;
    }

    this.isFieldCreationInProgress = true;
    const objValues = {
      type: this.dataProvider.type,
      isPrimaryField: this.isPrimaryField,
    };

    for (const key in this.dictInteractiveElements) {
      const elInteractive = this.dictInteractiveElements[key];
      const strTagName = elInteractive.tagName.toLowerCase();

      switch (strTagName) {
        case 'fw-input':
          objValues[key] = elInteractive.value || '';
          break;
        case 'fw-checkbox':
          objValues[key] = elInteractive.checked || false;
          break;
        default:
          break;
      }
    }

    this.showFieldNameError = false;
    this.fwUpdateField.emit({
      index: this.index,
      value: { ...objValues },
      isNew: this.isNewField(),
    });
  }

  private cancelFieldHandler() {
    if (this.expanded) {
      this.expanded = false;
      this.fwExpand.emit({
        expanded: false,
        index: this.index,
        isNew: this.isNewField(),
      });
    }
  }

  private expandHandler(event: MouseEvent): void {
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
        isNew: this.isNewField(),
      });
    }
  }

  private expandKeyPressHandler(event: KeyboardEvent): void {
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

  private nameChangeHandler(event: CustomEvent): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.strFieldName = event.detail.value.trim();
    if (this.strFieldName !== '') {
      this.showFieldNameError = false;
    }
  }

  private nameBlurHandler(event: CustomEvent): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.strFieldName = event.detail.value.trim();
  }

  private isNewField() {
    if (
      this.dataProvider &&
      Object.prototype.hasOwnProperty.call(this.dataProvider, 'isNew') &&
      this.dataProvider['isNew'] === true
    ) {
      return true;
    }
    return false;
  }

  private getFieldOptions() {
    if (this.dataProvider) {
      const objFieldData = { ...this.dataProvider };

      if (this.isNewField()) {
        return objFieldData;
      } else {
        const objDefaultFieldTypeSchema = { ...this.defaultFieldTypeSchema };
        const arrCheckBoxes = objDefaultFieldTypeSchema.checkboxes;
        const intCheckboxesLength = arrCheckBoxes.length;
        for (let i1 = 0; i1 < intCheckboxesLength; i1++) {
          const strKey = arrCheckBoxes[i1].key;
          if (Object.prototype.hasOwnProperty.call(objFieldData, strKey)) {
            arrCheckBoxes[i1].selected = objFieldData[strKey];
          }
        }
        objDefaultFieldTypeSchema.name = objFieldData.name;
        return objDefaultFieldTypeSchema;
      }
    }
    return null;
  }

  private renderFwLabel(dataItem) {
    if (!dataItem.selected) {
      return null;
    }
    const strBaseClassName = 'fw-field-editor';
    const strKey = dataItem.key;
    return (
      <fw-label
        key={strKey}
        value={strKey}
        color='grey'
        class={`${strBaseClassName}-content-fw-label`}
      />
    );
  }

  private renderCheckboxField(dataCheckbox) {
    const strKey = dataCheckbox.key;

    return (
      <fw-checkbox
        ref={(el) => (this.dictInteractiveElements[strKey] = el)}
        key={strKey}
        value={strKey}
        checked={dataCheckbox.selected}
        disabled={!dataCheckbox.enabled}
      >
        {dataCheckbox.label}
      </fw-checkbox>
    );
  }

  private renderContent(objFieldOptions) {
    const objField = this.dataProvider;
    const strBaseClassName = 'fw-field-editor';
    const strInputValue = objField.name || '';

    const arrCheckboxes = objFieldOptions ? objFieldOptions.checkboxes : null;
    const checkboxItems =
      arrCheckboxes && arrCheckboxes.length > 0
        ? arrCheckboxes.map((dataItem) => this.renderCheckboxField(dataItem))
        : null;

    return (
      <div class={`${strBaseClassName}-content-required`}>
        <fw-input
          ref={(el) => (this.dictInteractiveElements['name'] = el)}
          class={`${strBaseClassName}-content-required-input`}
          placeholder='Enter the name of your field here'
          required={true}
          label='Field Name'
          value={strInputValue}
          onFwBlur={this.nameBlurHandler}
          onFwChange={this.nameChangeHandler}
        ></fw-input>
        {this.showFieldNameError && (
          <label class={`${strBaseClassName}-content-name-error-msg`}>
            Name field cannot be empty
          </label>
        )}
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
    const objFieldOptions = this.getFieldOptions();
    const boolNewField = this.isNewField();

    const boolShowCancelBtn =
      !this.isPrimaryField || (this.isPrimaryField && !boolNewField)
        ? true
        : false;
    const strHeaderLabel =
      boolNewField && this.isPrimaryField ? 'Primary Field' : objField.label;

    const arrCheckboxes = objFieldOptions ? objFieldOptions.checkboxes : null;
    const fwLabelItems =
      !this.expanded && arrCheckboxes && arrCheckboxes.length > 0
        ? arrCheckboxes.map((dataItem) => this.renderFwLabel(dataItem))
        : null;

    const strBaseClassName = 'fw-field-editor';
    let strComponentClassName = strBaseClassName;
    if (this.isPrimaryField) {
      strComponentClassName += ` ${strBaseClassName}--primary`;
    }
    if (this.expanded) {
      strComponentClassName += ` ${strBaseClassName}--expanded`;
    } else if (this.disabled) {
      strComponentClassName += ` ${strBaseClassName}--disabled`;
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
            onClick={this.expandHandler}
            onKeyPress={this.expandKeyPressHandler}
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
                backgroundColor: objFieldOptions.icon.bg_color,
              }}
            >
              <fw-icon
                size={14}
                name={objFieldOptions.icon.name}
                color='#475867'
              />
            </span>
            <label class={`${strBaseClassName}-label`}>{strHeaderLabel}</label>
            {!this.expanded && (
              <div class={`${strBaseClassName}-key-fw-labels`}>
                {fwLabelItems}
              </div>
            )}

            {/* Add fw-labels on collapsed - map */}
          </div>
          <div class={`${strBaseClassName}-body`}>
            <div class={`${strBaseClassName}-content`}>
              {this.renderContent(objFieldOptions)}
            </div>
            <div class={`${strBaseClassName}-footer`}>
              {boolShowCancelBtn && (
                <fw-button
                  id='clearFieldBtn'
                  color='secondary'
                  onClick={this.cancelFieldHandler}
                >
                  Cancel
                </fw-button>
              )}
              <fw-button
                id='submitFieldBtn'
                color='primary'
                onClick={this.addFieldHandler}
                loading={this.isFieldCreationInProgress}
              >
                {boolNewField ? 'Add Field' : 'Update Field'}
              </fw-button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
