import { Component, Element, Prop, h, Host, State } from '@stencil/core';

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
   * variable to store form values
   */
  @Prop({ mutable: true }) formValues = null;
  /**
   * json data input to render the form builder
   */
  @Prop() jsonPreset;
  /**
   * callback function to send data to to the server
   */
  @Prop() callbackFormUpdate;
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';

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
    this.createEntityHandler = this.createEntityHandler.bind(this);
    this.getDefaultFieldSchema = this.getDefaultFieldSchema.bind(this);
    this.deleteNewLocalFieldAtIndex =
      this.deleteNewLocalFieldAtIndex.bind(this);
    this.composeNewFieldTypeHandler =
      this.composeNewFieldTypeHandler.bind(this);
    this.cancelEntityCreationHandler =
      this.cancelEntityCreationHandler.bind(this);
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

  private async createEntityHandler(event: CustomEvent) {
    const objResponse = await this.callbackFormUpdate({
      type: 'CREATE_ENTITY',
      detail: event.detail,
    });
    console.log('Create entity response --- ' + objResponse);

    if (objResponse && objResponse.success) {
      this.isFormCreated = true;
      const boolPrimaryFieldAdded = this.validateAndCreatePrimaryField();
      this.basicDetails.setFormCreated(true);
      this.selectedTabIndex = 1;
      this.tabBar.activateTab(1);
      if (boolPrimaryFieldAdded) {
        this.expandedFieldIndex = 0;
      }
    } else {
      this.isFormCreated = false;
    }
  }

  private async cancelEntityCreationHandler() {
    const objResponse = await this.callbackFormUpdate({
      type: 'CANCEL_ENTITY_CREATION',
    });
    console.log('Cancel entity creation response --- ' + objResponse);
  }

  private async saveFieldHandler(event: CustomEvent) {
    const objResponse = await this.callbackFormUpdate({
      type: 'SAVE_FIELD',
      detail: event.detail,
    });
    console.log('Update field response --- ' + objResponse);

    if (objResponse && objResponse.success) {
      this.expandedFieldIndex = -1;
    }
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
                    isFormCreated={this.isFormCreated}
                    onFwCreate={this.createEntityHandler}
                    onFwCancel={this.cancelEntityCreationHandler}
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
