/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Component,
  Event,
  Element,
  EventEmitter,
  Prop,
  h,
  Host,
} from '@stencil/core';

@Component({
  tag: 'fw-fb-field-details',
  styleUrl: 'fb-field-details.scss',
  shadow: true,
})
export class FbFieldDetails {
  @Element() host!: HTMLElement;

  private fieldContainer: HTMLFwDragContainerElement;
  private memoFieldTypeSchema;
  private supportedFieldTypes;

  /**
   * Prop to store the expanded field index
   */
  @Prop({ mutable: true }) expandedFieldIndex = -1;
  /**
   * variable to store form values
   */
  @Prop({ mutable: true }) formValues = null;
  /**
   * json data input to render the form builder
   */
  @Prop() jsonPreset;
  /**
   * Triggered on Add field button click from the field list items
   */
  @Event() fwSaveField!: EventEmitter;
  /**
   * Triggered when a new field type is dropped / added inside the fields area
   */
  @Event() fwComposeNewField!: EventEmitter;
  /**
   * Triggered when the field is expanded or collapsed
   */
  @Event() fwExpandField!: EventEmitter;

  componentWillLoad(): void {
    if (!this.memoFieldTypeSchema) {
      this.memoFieldTypeSchema = {};
    }
    this.supportedFieldTypes = [
      'TEXT',
      'EMAIL',
      'CHECKBOX',
      'NUMBER',
      'RADIO',
      'DECIMAL',
      'DATE',
    ];
    this.saveFieldHandler = this.saveFieldHandler.bind(this);
    this.addNewFieldTypeHandler = this.addNewFieldTypeHandler.bind(this);
    this.expandFieldHandler = this.expandFieldHandler.bind(this);
    this.fieldTypeDropHandler = this.fieldTypeDropHandler.bind(this);
  }

  private getDefaultFieldTypeSchema(strType) {
    let objDefaultFieldSchema;
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
    return objDefaultFieldSchema;
  }

  private expandFieldHandler(event: CustomEvent): void {
    this.fwExpandField.emit({ ...event.detail });
  }

  private saveFieldHandler(event: CustomEvent): void {
    this.fwSaveField.emit({ ...event.detail });
  }

  private fieldTypeDropHandler(event: CustomEvent): void {
    const objDetail = event.detail;
    const elFieldType = objDetail.droppedElement;
    // TODO-Sangeet - Temp code - to be handled inside Draggable.ts
    try {
      const nodePlaceholder = event.detail.placeholder;
      if (nodePlaceholder) {
        this.fieldContainer.removeChild(nodePlaceholder);
      }
    } catch (error) {
      console.log('Error deleting placeholder - ' + error);
    }

    this.fwComposeNewField.emit({
      value: { ...elFieldType.dataProvider },
      index: objDetail.droppedIndex,
    });
  }

  private addNewFieldTypeHandler(event: CustomEvent): void {
    this.fwComposeNewField.emit({
      value: { ...event.detail.data },
      index: -1,
    });
  }

  private renderFieldTypeElement(dataItem, intIndex) {
    const strFieldType = dataItem.type;
    if (!this.supportedFieldTypes.includes(strFieldType)) {
      return null;
    }

    return (
      <fw-field-type-menu-item
        index={intIndex}
        dataProvider={dataItem}
        key={dataItem.type}
        value={dataItem.type}
        label={dataItem.label}
        iconName={dataItem.icon.name}
        iconBackgroundColor={dataItem.icon.bg_color}
        onFwAddClick={this.addNewFieldTypeHandler}
      ></fw-field-type-menu-item>
    );
  }

  private renderFieldEditorElement(dataItem, intIndex, boolFieldEditingState) {
    const strFieldType = dataItem.type;
    const isPrimaryField =
      Object.prototype.hasOwnProperty.call(dataItem, 'is_primary') &&
      dataItem['is_primary'] === true
        ? true
        : false;

    const boolItemExpanded =
      this.expandedFieldIndex === intIndex ? true : false;

    const objDefaultFiledTypeSchema =
      this.getDefaultFieldTypeSchema(strFieldType);

    return (
      <fw-field-editor
        index={intIndex}
        key={dataItem.id}
        dataProvider={dataItem}
        expanded={boolItemExpanded}
        isPrimaryField={isPrimaryField}
        disabled={boolFieldEditingState}
        defaultFieldTypeSchema={objDefaultFiledTypeSchema}
        onFwExpand={this.expandFieldHandler}
        onFwUpdateField={this.saveFieldHandler}
      ></fw-field-editor>
    );
  }

  render() {
    if (!this.jsonPreset) {
      return null;
    }
    const strBaseClassName = 'fb-field-details';
    const objPresetSchema = this.jsonPreset;
    const objFormValuesSchema = this.formValues;
    const arrFIeldTypes = objPresetSchema.fieldTypes;
    const isSomeFieldEditing = this.expandedFieldIndex > -1 ? true : false;

    const fieldTypeElements =
      arrFIeldTypes && arrFIeldTypes.length > 0
        ? arrFIeldTypes.map((dataItem, index) =>
            this.renderFieldTypeElement(dataItem, index)
          )
        : null;

    const arrFIeldElements =
      objFormValuesSchema && objFormValuesSchema.fields
        ? objFormValuesSchema.fields
        : [];
    const fieldElements =
      arrFIeldElements && arrFIeldElements.length > 0
        ? arrFIeldElements.map((dataItem, index) =>
            this.renderFieldEditorElement(dataItem, index, isSomeFieldEditing)
          )
        : null;

    const strRightPanelBaseClassName = `${strBaseClassName}-right-panel`;
    const strLeftPanelBaseClassName = `${strBaseClassName}-left-panel`;

    let strRightPanelHeaderClassName = `${strRightPanelBaseClassName}-header`;
    let strLeftPanelClassName = strLeftPanelBaseClassName;
    if (isSomeFieldEditing) {
      strLeftPanelClassName += ` ${strLeftPanelBaseClassName}--disabled`;
      strRightPanelHeaderClassName += ` ${strRightPanelBaseClassName}-header--disabled`;
    }

    return (
      <Host tabIndex='-1'>
        <div class={strBaseClassName}>
          <div class={strLeftPanelClassName}>
            <label class={`${strBaseClassName}-left-panel-header-label`}>
              Field types
            </label>
            <label class={`${strBaseClassName}-left-panel-header-desc`}>
              Drag and drop from here
            </label>
            <div class={`${strBaseClassName}-left-panel-list-container`}>
              <fw-drag-container
                class={`${strBaseClassName}-left-panel-field-types-list`}
                id='fieldTypesList'
                addOnDrop={false}
                sortable={false}
              >
                {fieldTypeElements}
              </fw-drag-container>
            </div>
          </div>
          <div class={strRightPanelBaseClassName}>
            <div class={strRightPanelHeaderClassName}>
              <label class={`${strBaseClassName}-right-panel-header-label`}>
                Fields
              </label>
            </div>
            <div class={`${strBaseClassName}-right-panel-list-container`}>
              <fw-drag-container
                ref={(el) => (this.fieldContainer = el)}
                class={`${strBaseClassName}-right-panel-field-editor-list`}
                id='fieldsContainer'
                acceptFrom='fieldTypesList'
                addOnDrop={false}
                sortable={true}
                onFwDrop={this.fieldTypeDropHandler}
              >
                {fieldElements}
              </fw-drag-container>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
