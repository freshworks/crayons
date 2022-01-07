import {
  Component,
  Element,
  Prop,
  h,
  Host,
  EventEmitter,
  Event,
  State,
  Method,
} from '@stencil/core';

@Component({
  tag: 'fw-form-builder',
  styleUrl: 'form-builder.scss',
  shadow: true,
})
export class FormBuilder {
  @Element() host!: HTMLElement;

  private tabBar!: HTMLFwTabsElement;
  private basicDetails!: HTMLFwFbBasicDetailsElement;
  private memoFieldTypeSchema;

  /**
   * State to store the selected tab
   */
  @State() selectedTabIndex = 0;
  /**
   * State to store the expanded field index
   */
  @State() expandedFieldIndex = -1;
  /**
   * State to determine if the basic form is created
   */
  @State() isFormCreated = false;
  /**
   * State flag to determine if the field is created
   */
  @State() isFieldCreated = false;
  /**
   * variable to store form values
   */
  @Prop({ mutable: true }) formValues = null;
  /**
   * json data input to render the form builder
   */
  @Prop() jsonPreset;
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Triggered when any change in the form is updated
   */
  @Event() fwFormBuilderUpdate!: EventEmitter;

  // public method to set if the form is created
  @Method()
  async setFormCreated(value: boolean): Promise<void> {
    this.isFormCreated = value;
    if (value) {
      const boolPrimaryFieldAdded = this.validateAndCreatePrimaryField();
      this.basicDetails.setFormCreated(value);
      this.selectedTabIndex = 1;
      this.tabBar.activateTab(1);
      if (boolPrimaryFieldAdded) {
        this.expandedFieldIndex = 0;
      }
    }
  }

  // public method to set if the field is created
  @Method()
  async setFieldCreated(value: boolean): Promise<void> {
    this.isFieldCreated = value;
    if (value) {
      this.expandedFieldIndex = -1;
    }
  }

  componentWillLoad(): void {
    if (!this.formValues) {
      this.formValues = {};
    }
    if (!this.memoFieldTypeSchema) {
      this.memoFieldTypeSchema = {};
    }

    this.saveFieldHandler = this.saveFieldHandler.bind(this);
    this.tabChangeHandler = this.tabChangeHandler.bind(this);
    this.expandFieldHandler = this.expandFieldHandler.bind(this);
    this.dispatchUpdateEvent = this.dispatchUpdateEvent.bind(this);
    this.createObjectHandler = this.createObjectHandler.bind(this);
    this.getDefaultFieldSchema = this.getDefaultFieldSchema.bind(this);
    this.deleteNewLocalFieldAtIndex =
      this.deleteNewLocalFieldAtIndex.bind(this);
    this.composeNewFieldTypeHandler =
      this.composeNewFieldTypeHandler.bind(this);
    this.cancelObjectCreationHandler =
      this.cancelObjectCreationHandler.bind(this);
  }

  private dispatchUpdateEvent(strEventType, objData = null) {
    this.fwFormBuilderUpdate.emit({
      type: strEventType,
      data: objData,
    });
  }

  private isNewForm() {
    if (
      this.formValues &&
      Object.prototype.hasOwnProperty.call(this.formValues, 'name') &&
      this.formValues.name !== ''
    ) {
      return false;
    }
    return true;
  }

  private createUniqueID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  private getDefaultFieldSchema(strType, isPrimary = false) {
    let objDefaultFieldSchema;
    if (isPrimary) {
      objDefaultFieldSchema = { ...this.jsonPreset.defaultPrimaryFieldSchema };
      objDefaultFieldSchema.name = this.formValues.name;
    } else {
      if (this.memoFieldTypeSchema && this.memoFieldTypeSchema[strType]) {
        objDefaultFieldSchema = {
          ...this.memoFieldTypeSchema[strType],
        };
      } else {
        const arrFieldTypes = this.jsonPreset.fieldTypes;
        const intLength = arrFieldTypes.length;
        for (let i1 = 0; i1 < intLength; i1++) {
          if (strType === arrFieldTypes[i1].type) {
            objDefaultFieldSchema = { ...arrFieldTypes[i1] };
            this.memoFieldTypeSchema[strType] = { ...arrFieldTypes[i1] };
            break;
          }
        }
      }
    }
    objDefaultFieldSchema.isNew = true;
    objDefaultFieldSchema.id = this.createUniqueID();
    return objDefaultFieldSchema;
  }

  private validateAndCreatePrimaryField() {
    if (this.formValues) {
      if (!this.formValues.fields || this.formValues.fields.length === 0) {
        const objDefaultField = this.getDefaultFieldSchema('TEXT', true);
        this.formValues.fields = [...this.formValues.fields, objDefaultField];
        return true;
      }
    }
    return false;
  }

  private createObjectHandler(event: CustomEvent) {
    this.dispatchUpdateEvent('CREATE_OBJECT', event.detail);
  }

  private cancelObjectCreationHandler() {
    this.dispatchUpdateEvent('CANCEL_CREATE_OBJECT');
  }

  private saveFieldHandler(event: CustomEvent) {
    this.dispatchUpdateEvent('SAVE_FIELD', event.detail);
  }

  // delete the new field which was stored locally
  private deleteNewLocalFieldAtIndex(intIndex) {
    let arrFields = [];
    if (
      this.formValues &&
      Object.prototype.hasOwnProperty.call(this.formValues, 'fields') &&
      this.formValues['fields']
    ) {
      arrFields = this.formValues.fields;
    }

    if (
      arrFields &&
      arrFields.length > 0 &&
      intIndex < arrFields.length &&
      Object.prototype.hasOwnProperty.call(arrFields[intIndex], 'isNew') &&
      arrFields[intIndex]['isNew'] === true
    ) {
      arrFields = [
        ...arrFields.slice(0, intIndex),
        ...arrFields.slice(intIndex + 1),
      ];
      this.formValues.fields = arrFields;
    }
  }

  private expandFieldHandler(event: CustomEvent) {
    const objDetail = event.detail;
    const intIndex = objDetail.index;
    const boolExpanded = objDetail.expanded;
    this.expandedFieldIndex = boolExpanded ? intIndex : -1;

    if (!boolExpanded && objDetail.isNew && intIndex > -1) {
      this.deleteNewLocalFieldAtIndex(intIndex);
    }
  }

  private tabChangeHandler(event: CustomEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    const intTabIndex = event.detail.tabIndex;
    if (intTabIndex !== this.selectedTabIndex) {
      this.selectedTabIndex = intTabIndex;
      if (intTabIndex === 0 && this.expandedFieldIndex > -1) {
        this.deleteNewLocalFieldAtIndex(this.expandedFieldIndex);
        this.expandedFieldIndex = -1;
      } else if (intTabIndex === 1) {
        const boolPrimaryFieldAdded = this.validateAndCreatePrimaryField();
        if (boolPrimaryFieldAdded) {
          this.expandedFieldIndex = 0;
        }
      }
    }
  }

  private composeNewFieldTypeHandler(event: CustomEvent) {
    const objDetails = event.detail;
    const objFieldTypeData = objDetails.value;
    const objDefaultField = this.getDefaultFieldSchema(objFieldTypeData.type);
    this.addNewComposableFieldAtIndex(objDefaultField, objDetails.index);
  }

  private addNewComposableFieldAtIndex(
    objDefaultFieldData,
    intIndex = -1,
    boolExpand = true
  ) {
    let arrFields = [];
    if (
      this.formValues &&
      Object.prototype.hasOwnProperty.call(this.formValues, 'fields') &&
      this.formValues['fields']
    ) {
      arrFields = this.formValues.fields;
    }

    let intAddedIndex = -1;
    // validate if the array is empty or the passed index is valid, else, push the element at the end of the array
    if (arrFields.length === 0 || intIndex < 0 || intIndex > arrFields.length) {
      arrFields = [...arrFields, objDefaultFieldData];
      intAddedIndex = arrFields.length - 1;
    } else {
      arrFields = [
        ...arrFields.slice(0, intIndex),
        objDefaultFieldData,
        ...arrFields.slice(intIndex),
      ];
      intAddedIndex = intIndex;
    }
    this.formValues.fields = arrFields;

    if (boolExpand && intAddedIndex !== -1) {
      this.expandedFieldIndex = intAddedIndex;
    }
  }

  render() {
    if (!this.jsonPreset) {
      return null;
    }
    const objSchema = this.jsonPreset;
    const strBaseClassName = 'fw-form-builder';
    const strHeaderLabel = this.isNewForm()
      ? objSchema.header.label
      : this.formValues.name;

    return (
      <Host tabIndex='-1'>
        <div class={strBaseClassName}>
          <div class={`${strBaseClassName}-content`}>
            <label class={`${strBaseClassName}-header-label`}>
              {strHeaderLabel}
            </label>
            <div class={`${strBaseClassName}-tab-container`}>
              <fw-tabs
                ref={(el) => (this.tabBar = el)}
                class={`${strBaseClassName}-tabs`}
                activeTabIndex={this.selectedTabIndex}
                onFwChange={this.tabChangeHandler}
              >
                <fw-tab slot='tab' panel={objSchema.header.tabs[0].name}>
                  {objSchema.header.tabs[0].label}
                </fw-tab>
                <fw-tab
                  slot='tab'
                  panel={objSchema.header.tabs[1].name}
                  disabled={!this.isFormCreated}
                >
                  {objSchema.header.tabs[1].label}
                </fw-tab>
                <fw-tab-panel name={objSchema.header.tabs[0].name}>
                  <fw-fb-basic-details
                    ref={(el) => (this.basicDetails = el)}
                    jsonPreset={this.jsonPreset}
                    formValues={this.formValues}
                    onFwCreate={this.createObjectHandler}
                    onFwCancel={this.cancelObjectCreationHandler}
                  ></fw-fb-basic-details>
                </fw-tab-panel>
                <fw-tab-panel name={objSchema.header.tabs[1].name}>
                  <fw-fb-field-details
                    jsonPreset={this.jsonPreset}
                    formValues={this.formValues}
                    expandedFieldIndex={this.expandedFieldIndex}
                    onFwExpandField={this.expandFieldHandler}
                    onFwSaveField={this.saveFieldHandler}
                    onFwComposeNewField={this.composeNewFieldTypeHandler}
                  ></fw-fb-field-details>
                </fw-tab-panel>
              </fw-tabs>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
