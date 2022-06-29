/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Component,
  Event,
  Element,
  EventEmitter,
  Prop,
  h,
  Host,
  Fragment,
  State,
  Watch,
} from '@stencil/core';
import {
  deepCloneObject,
  hasCustomProperty,
  i18nText,
  isPrimaryFieldType,
  isUniqueField,
} from './utils/form-builder-utils';
import presetSchema from './assets/form-builder-preset.json';

@Component({
  tag: 'fw-form-builder',
  styleUrl: 'form-builder.scss',
  shadow: true,
})
export class FormBuilder {
  @Element() host!: HTMLElement;

  private fieldEditorPanel!: any;
  private modalCustomizeWidget!: any;
  private isWidgetValuesChanged = false;
  private supportedFieldTypes;
  private resizeObserver;

  /**
   * Prop to store the expanded field index
   */
  @Prop({ mutable: true }) expandedFieldIndex = -1;
  /**
   * variable to store form values
   */
  @Prop({ mutable: true }) formValues = null;
  /**
   * object to store the lookup target entities
   */
  @Prop({ mutable: true }) lookupTargetObjects = null;
  /**
   * variable to store customize widget fields
   */
  @Prop({ mutable: true }) customizeWidgetFields = null;
  /**
   * flag to notify if an api call is in progress
   */
  @Prop({ mutable: true }) isLoading = false;
  /**
   * flag to notify if an api call to save the widget is completed
   */
  @Prop({ mutable: true }) isSavingCustomizeWidget = false;
  /**
   * svg image to be shown for empty record
   */
  @Prop() emptySearchImage = null;
  /**
   * State to store the searched widget elements
   */
  @State() arrWidgetFields = null;
  /**
   * State to store the searched field elements
   */
  @State() arrSearchedFields = null;
  /**
   * State to check if the form is in searching mode
   */
  @State() searching = false;
  /**
   * State to show/hide the customize widget modal contents
   */
  @State() showCustomizeWidget = false;
  /**
   * variable to store the count of all the field types
   */
  @State() fieldTypesCount = null;
  /**
   * Flag to enable / disable the all the field type based on the limits
   */
  @State() enableFieldType = true;
  /**
   * Flag to enable / disable the the filterable option
   */
  @State() enableFilterable = true;
  /**
   * Flag to enable / disable the the unique option
   */
  @State() enableUnique = true;
  /**
   * Triggered on Add/Save field button click from the field list items
   */
  @Event() fwSaveField!: EventEmitter;
  /**
   * Triggered on Delete field button click from the field list items
   */
  @Event() fwDeleteField!: EventEmitter;
  /**
   * Triggered when a new field type is dropped / added inside the fields area
   */
  @Event() fwComposeNewField!: EventEmitter;
  /**
   * Triggered when the position of a field is changed using drag and drop
   */
  @Event() fwRepositionField!: EventEmitter;
  /**
   * Triggered when the field is expanded or collapsed
   */
  @Event() fwExpandField!: EventEmitter;
  /**
   * Triggered on search
   */
  @Event() fwSearchField!: EventEmitter;
  /**
   * Triggered on saving the widget fields
   */
  @Event() fwSaveWidgetFields!: EventEmitter;

  @Watch('searching')
  watchSearchHandler(): void {
    this.fwSearchField.emit({ searching: this.searching });
  }

  @Watch('isSavingCustomizeWidget')
  watchSaveCustomizeWidgetChangeHandler(): void {
    if (!this.isSavingCustomizeWidget) {
      this.closeWidgetDetailsHandler();
    }
  }

  @Watch('formValues')
  watchFormValuesChangeHandler(): void {
    this.fieldTypesCount = null;
    const objMaxLimitCount = { filterable: 0, unique: 0 };

    if (this.formValues) {
      const arrFields = this.formValues?.fields;
      // Maximum limits validation
      if (arrFields && arrFields.length > 0) {
        const intFieldCount = arrFields.length;
        for (let i1 = 0; i1 < intFieldCount; i1++) {
          const objField = arrFields[i1];
          if (!objField) {
            continue;
          }
          if (!objField?.isNew) {
            const strFieldType = objField.type;

            if (
              strFieldType !== 'RELATIONSHIP' &&
              (objField?.filterable === true || objField?.filterable === 'true')
            ) {
              objMaxLimitCount.filterable++;
            }

            if (isUniqueField(objField)) {
              objMaxLimitCount.unique++;
            }

            if (!this.fieldTypesCount) {
              this.fieldTypesCount = {};
            }

            const strParsedFieldType =
              strFieldType === 'PRIMARY' ? 'TEXT' : strFieldType;
            if (!hasCustomProperty(this.fieldTypesCount, strParsedFieldType)) {
              this.fieldTypesCount[strParsedFieldType] = 0;
            }
            this.fieldTypesCount[strParsedFieldType]++;
          }
        }

        const objMaxLimits = presetSchema.maximumLimits;
        this.enableFieldType = intFieldCount < objMaxLimits.fields.count;
        this.enableFilterable =
          objMaxLimitCount.filterable < objMaxLimits.filterable.count;
        this.enableUnique = objMaxLimitCount.unique < objMaxLimits.unique.count;
      } else {
        this.enableUnique = true;
        this.enableFilterable = true;
        this.enableFieldType = true;
        this.fieldTypesCount = null;
      }
    }
  }

  componentWillLoad(): void {
    this.watchFormValuesChangeHandler();
    this.supportedFieldTypes = [
      'TEXT',
      'EMAIL',
      'CHECKBOX',
      'PARAGRAPH',
      'NUMBER',
      'DECIMAL',
      'DATE',
      'DROPDOWN',
      'RELATIONSHIP',
      'MULTI_SELECT',
    ];
  }

  disconnectedCallback(): void {
    this.removeResizeObserver();
  }

  private getInterpolatedMaxLimitLabel = (strProperty) => {
    if (strProperty && strProperty !== '') {
      const objMaxLimit = presetSchema?.maximumLimits?.[strProperty];
      if (objMaxLimit) {
        return i18nText(objMaxLimit.message, { count: objMaxLimit.count });
      }
    }
    return '';
  };

  // function to get the default field type schema based on the field type
  private getDefaultFieldTypeSchema = (strFieldType) => {
    if (presetSchema) {
      try {
        const objDefaultField = presetSchema.fieldTypes[strFieldType];
        if (objDefaultField) {
          return deepCloneObject(objDefaultField);
        } else {
          console.log(`${strFieldType} - field type is not supported`);
        }
      } catch (error) {
        console.log(`${strFieldType} - field type is not supported`);
      }
    }
    return null;
  };

  private expandFieldHandler = (event: CustomEvent) => {
    this.fwExpandField.emit({ ...event.detail });
  };

  private saveFieldHandler = (event: CustomEvent) => {
    this.fwSaveField.emit({ ...event.detail });
  };

  private deleteFieldHandler = (event: CustomEvent) => {
    this.fwDeleteField.emit({ ...event.detail });
  };

  private composeNewField = (strNewFieldType, objFieldData, intIndex = -1) => {
    const objNewField = deepCloneObject(
      presetSchema.fieldTypes[strNewFieldType]
    );
    const objMaxLimits = presetSchema?.maximumLimits;

    try {
      const arrFields = this.formValues?.fields;

      // Condition to deselect the filter checkbox (selected by default), if maximum filters have been applied in the object
      if (
        objNewField.type !== 'RELATIONSHIP' &&
        objNewField.checkboxes &&
        objNewField.checkboxes.length > 0 &&
        objMaxLimits
      ) {
        const arrFilterableFields = arrFields.filter(
          (objField) =>
            objField?.filterable === true || objField?.filterable === 'true'
        );
        const numMaxFilterables = objMaxLimits.filterable.count;
        if (arrFilterableFields.length >= numMaxFilterables) {
          const arrCheckBoxes = objNewField.checkboxes;
          const intCheckboxesLength = arrCheckBoxes.length;
          for (let c1 = 0; c1 < intCheckboxesLength; c1++) {
            if (arrCheckBoxes[c1].key === 'filterable') {
              arrCheckBoxes[c1].selected = false;
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error occurred in composeNewField: ${error}`);
    }

    this.fwComposeNewField.emit({
      maximumLimits: presetSchema?.maximumLimits,
      fieldSchema: objNewField,
      value: { ...objFieldData },
      index: intIndex,
    });
  };

  private fieldTypeDropHandler = (event: CustomEvent) => {
    const objDetail = event.detail;
    const elFieldType = objDetail.droppedElement;
    const intDroppedIndex = objDetail.droppedIndex;

    // New field type element dropped inside the container
    if (objDetail.dragFromId !== objDetail.dropToId) {
      this.composeNewField(
        elFieldType.dataProvider.type,
        { ...elFieldType.dataProvider },
        intDroppedIndex
      );
    } else {
      // Reposition inside the fields list
      if (elFieldType.index !== intDroppedIndex) {
        this.fwRepositionField.emit({
          sourceIndex: elFieldType.index,
          targetIndex: intDroppedIndex,
        });
      }
    }
  };

  private removeResizeObserver = () => {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  };

  private addNewFieldTypeHandler = (event: CustomEvent) => {
    // Observer added to scroll to the bottom on new field addition by click of the + button
    this.resizeObserver = new ResizeObserver(() => {
      this.removeResizeObserver();
      setTimeout(() => {
        this.fieldEditorPanel.scrollTop = this.fieldEditorPanel.scrollHeight;
      }, 100);
    });
    this.resizeObserver.observe(this.fieldEditorPanel);
    this.composeNewField(event.detail.value, { ...event.detail.data });
  };

  private searchChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const strInputText = event?.detail?.value?.trim() || '';

    if (strInputText) {
      const arrFieldElements =
        this.formValues && this.formValues.fields ? this.formValues.fields : [];

      if (arrFieldElements && arrFieldElements.length > 0) {
        const strSearchableText = strInputText.toLowerCase();
        const arrResults = arrFieldElements.filter(function (dataItem) {
          return dataItem.label.toLowerCase().indexOf(strSearchableText) !== -1;
        });
        this.searching = true;
        this.arrSearchedFields = deepCloneObject(arrResults);
        return;
      }
    }
    this.searching = false;
    this.arrSearchedFields = null;
  };

  private clearSearchHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.arrSearchedFields = null;
    this.searching = false;
  };

  private openCustomizeWidgetModalHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (
      !this.formValues ||
      !this.formValues.fields ||
      this.formValues.fields.length <= 0
    ) {
      return;
    }

    const arrFields = this.formValues.fields;
    // const arrPrecedenceObjects = arrFields.filter((dataItem) => dataItem?.field_options?.precedence === '1');
    const arrPrecedenceObjects = this.customizeWidgetFields
      ? [...this.customizeWidgetFields]
      : [];

    let arrWidgetIds = [];
    if (arrPrecedenceObjects?.length > 1) {
      this.isWidgetValuesChanged = false;
      const intLength = arrPrecedenceObjects.length;
      for (let i1 = 0; i1 < intLength; i1++) {
        arrWidgetIds = [...arrWidgetIds, arrPrecedenceObjects[i1]];
      }
    } else {
      if (
        arrPrecedenceObjects &&
        arrPrecedenceObjects.length === 1 &&
        isPrimaryFieldType(arrPrecedenceObjects[0])
      ) {
        arrWidgetIds = [...arrWidgetIds, arrPrecedenceObjects[0]];
      }

      const intMaxWidgetFields = presetSchema.maximumLimits.widgets.count;
      const intFieldsLength = arrFields.length;
      for (let f1 = 0; f1 < intFieldsLength; f1++) {
        if (!arrWidgetIds.includes(arrFields[f1].id)) {
          arrWidgetIds = [...arrWidgetIds, arrFields[f1].id];
        }
        if (arrWidgetIds.length === intMaxWidgetFields) {
          break;
        }
      }
      this.isWidgetValuesChanged = true;
    }

    this.arrWidgetFields = [...arrWidgetIds];
    this.showCustomizeWidget = true;
    this.modalCustomizeWidget?.open();
  };

  private saveWidgetDetailsHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (this.isWidgetValuesChanged) {
      this.isSavingCustomizeWidget = true;
      this.fwSaveWidgetFields.emit([...this.arrWidgetFields]);
    }
  };

  private closeWidgetDetailsHandler = (event: CustomEvent = null) => {
    if (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }
    this.modalCustomizeWidget?.close();
    this.isWidgetValuesChanged = false;
    this.showCustomizeWidget = false;
    this.arrWidgetFields = null;
  };

  private widgetCheckHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const boolChecked = event.detail.checked;

    if (this.arrWidgetFields) {
      // const strFieldName = event.detail.data.name;
      const strFieldID = event.detail.data.id;

      if (
        boolChecked &&
        this.arrWidgetFields.length < presetSchema.maximumLimits.widgets.count
      ) {
        this.isWidgetValuesChanged = true;
        this.arrWidgetFields = [...this.arrWidgetFields, strFieldID];
      } else if (this.arrWidgetFields.includes(strFieldID)) {
        this.isWidgetValuesChanged = true;
        const intIndex = this.arrWidgetFields.indexOf(strFieldID);
        this.arrWidgetFields = [
          ...this.arrWidgetFields.slice(0, intIndex),
          ...this.arrWidgetFields.slice(intIndex + 1),
        ];
      }
    }
  };

  private renderFieldTypeElement(dataItem, key, intIndex) {
    if (key === 'PRIMARY') {
      return null;
    }
    const strFieldType = dataItem.type;
    if (!this.supportedFieldTypes.includes(strFieldType)) {
      return null;
    }

    let boolDisableFieldType = !this.enableFieldType;
    let strTooltipMessage = boolDisableFieldType
      ? this.getInterpolatedMaxLimitLabel('fields')
      : '';

    const objMaxLimits = presetSchema.maximumLimits;
    if (
      !boolDisableFieldType &&
      hasCustomProperty(this.fieldTypesCount, strFieldType) &&
      this.fieldTypesCount[strFieldType] > 0 &&
      hasCustomProperty(objMaxLimits, strFieldType) &&
      this.fieldTypesCount[strFieldType] >= objMaxLimits[strFieldType].count
    ) {
      boolDisableFieldType = true;
      strTooltipMessage = boolDisableFieldType
        ? this.getInterpolatedMaxLimitLabel(strFieldType)
        : '';
    }

    const strDescription = hasCustomProperty(dataItem, 'description')
      ? i18nText(dataItem.description)
      : '';

    const boolShowDescription =
      strDescription && strDescription !== '' ? true : false;

    const strHelpTooltip = hasCustomProperty(dataItem, 'help')
      ? i18nText(dataItem.help)
      : '';
    const boolShowHelpTooltip =
      strHelpTooltip && strHelpTooltip !== '' ? true : false;

    const objLink = hasCustomProperty(dataItem, 'link') ? dataItem.link : null;
    const strLinkLabel = objLink ? i18nText(objLink.label) : '';
    const strLinkHref = objLink ? objLink.href : '';
    const boolShowLink = strLinkLabel && strLinkLabel !== '' ? true : false;

    const boolShowBottomBorder = hasCustomProperty(
      dataItem,
      'has_bottom_border'
    )
      ? dataItem.has_bottom_border
      : false;

    return (
      <Fragment>
        <fw-field-type-menu-item
          index={intIndex}
          key={strFieldType}
          value={strFieldType}
          dataProvider={dataItem}
          tooltip={strTooltipMessage}
          disabled={boolDisableFieldType}
          label={dataItem.display_label}
          iconName={dataItem.icon.name}
          iconBackgroundColor={dataItem.icon.bg_color}
          onFwAddClick={this.addNewFieldTypeHandler}
        ></fw-field-type-menu-item>
        {boolShowDescription && (
          <span class={'field-type-menu-description'}>
            <label class={'field-type-menu-description-label'}>
              {strDescription}
            </label>
            {boolShowLink && (
              <a
                class={'field-type-menu-description-link-anchor'}
                href={strLinkHref}
                target='_blank'
              >
                {strLinkLabel}
              </a>
            )}
            {boolShowHelpTooltip && (
              <fw-tooltip
                placement='right'
                trigger='hover'
                content={strHelpTooltip}
              >
                <fw-icon
                  class={'field-type-menu-help-fw-icon'}
                  size={14}
                  name='help'
                  color='#12344d'
                />
              </fw-tooltip>
            )}
          </span>
        )}
        {boolShowBottomBorder && (
          <hr class={'field-type-menu-item-bottom-border'} />
        )}
      </Fragment>
    );
  }

  private renderFieldEditorElement(
    dataItem,
    intIndex,
    boolFieldEditingState,
    strEntityName
  ) {
    if (!dataItem) {
      return null;
    }
    const strFieldType = dataItem.type;
    const objDefaultFieldTypeSchema =
      this.getDefaultFieldTypeSchema(strFieldType);
    if (!objDefaultFieldTypeSchema) {
      return null;
    }
    const isPrimaryField = isPrimaryFieldType(
      dataItem,
      intIndex,
      !this.searching
    );
    const boolItemExpanded =
      this.expandedFieldIndex === intIndex ? true : false;

    return (
      <fw-field-editor
        index={intIndex}
        key={dataItem.id}
        dataProvider={dataItem}
        entityName={strEntityName}
        expanded={boolItemExpanded}
        isPrimaryField={isPrimaryField}
        pinned={isPrimaryField ? 'top' : ''}
        disabled={boolFieldEditingState}
        disabledSort={this.searching}
        enableUnique={this.enableUnique}
        enableFilterable={this.enableFilterable}
        defaultFieldTypeSchema={objDefaultFieldTypeSchema}
        lookupTargetObjects={this.lookupTargetObjects}
        formValues={this.formValues}
        isLoading={this.isLoading}
        onFwExpand={this.expandFieldHandler}
        onFwDelete={this.deleteFieldHandler}
        onFwUpdate={this.saveFieldHandler}
      ></fw-field-editor>
    );
  }

  private renderWidgetElement(dataItem, intIndex) {
    const isPrimaryField = isPrimaryFieldType(dataItem, intIndex);
    const boolItemSelected = !isPrimaryField
      ? this.arrWidgetFields?.includes(dataItem.id)
        ? true
        : false
      : true;
    const boolItemDisabled = isPrimaryField
      ? true
      : !boolItemSelected
      ? this.arrWidgetFields.length >= presetSchema.maximumLimits.widgets.count
      : false;

    return (
      <fw-widget-customize-field-item
        index={intIndex}
        key={dataItem.id}
        label={dataItem.label}
        dataProvider={dataItem}
        isPrimaryField={isPrimaryField}
        pinned={isPrimaryField ? 'top' : ''}
        selected={boolItemSelected}
        disabled={boolItemDisabled}
        onFwCheck={this.widgetCheckHandler}
      ></fw-widget-customize-field-item>
    );
  }

  render() {
    const strBaseClassName = 'form-builder';
    const objFormValuesSchema = this.formValues;
    const objFieldTypes = presetSchema.fieldTypes;

    const boolFieldEditingState = this.expandedFieldIndex > -1 ? true : false;
    const strEntityName = objFormValuesSchema ? objFormValuesSchema.name : '';

    const arrFIeldTypes = Object.keys(objFieldTypes);
    const fieldTypeElements =
      arrFIeldTypes && arrFIeldTypes.length > 0
        ? arrFIeldTypes.map((key, index) =>
            this.renderFieldTypeElement(objFieldTypes[key], key, index)
          )
        : null;

    const arrFieldElements = this.searching
      ? this.arrSearchedFields
      : objFormValuesSchema && objFormValuesSchema.fields
      ? objFormValuesSchema.fields
      : [];
    const fieldElements =
      arrFieldElements && arrFieldElements.length > 0
        ? arrFieldElements.map((dataItem, index) =>
            this.renderFieldEditorElement(
              dataItem,
              index,
              boolFieldEditingState,
              strEntityName
            )
          )
        : null;
    const boolValidFieldElements = fieldElements && fieldElements.length > 0;

    const fieldWidgetElements =
      this.showCustomizeWidget &&
      arrFieldElements &&
      arrFieldElements.length > 0
        ? arrFieldElements.map((dataItem, index) =>
            this.renderWidgetElement(dataItem, index)
          )
        : null;

    const strRightPanelBaseClassName = `${strBaseClassName}-right-panel`;
    const strLeftPanelBaseClassName = `${strBaseClassName}-left-panel`;

    let strRightPanelHeaderClassName = `${strRightPanelBaseClassName}-header`;
    let strLeftPanelClassName = strLeftPanelBaseClassName;
    if (boolFieldEditingState || this.searching) {
      strLeftPanelClassName += ` ${strLeftPanelBaseClassName}--disabled`;
    }
    if (boolFieldEditingState) {
      strRightPanelHeaderClassName += ` ${strRightPanelBaseClassName}-header--disabled`;
    }

    return (
      <Host tabIndex='-1'>
        <div class={strBaseClassName}>
          <div class={strLeftPanelClassName}>
            <label class={`${strBaseClassName}-left-panel-header-label`}>
              {i18nText('headerFieldTypes')}
            </label>
            <label class={`${strBaseClassName}-left-panel-header-desc`}>
              {i18nText('fieldTypesDragDrop')}
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
              <div class={`${strBaseClassName}-right-panel-header-content`}>
                <label class={`${strBaseClassName}-right-panel-header-label`}>
                  {i18nText('headerFields')}
                </label>
                <div class={`${strBaseClassName}-right-panel-header-right-div`}>
                  <fw-button
                    id='customizeWidgetFieldsBtn'
                    color='link'
                    disabled={this.searching}
                    onFwClick={this.openCustomizeWidgetModalHandler}
                  >
                    <fw-icon name='modify' slot='before-label'></fw-icon>
                    {i18nText('customizeWidget')}
                  </fw-button>
                  <fw-input
                    clear-input
                    icon-left='search'
                    placeholder={i18nText('searchFields')}
                    onFwInput={this.searchChangeHandler}
                    onFwInputClear={this.clearSearchHandler}
                    class={`${strBaseClassName}-right-panel-header-search-input`}
                  ></fw-input>
                </div>
              </div>
            </div>
            <div
              ref={(el) => (this.fieldEditorPanel = el)}
              class={`${strBaseClassName}-right-panel-list-container`}
            >
              {boolValidFieldElements && (
                <fw-drag-container
                  class={`${strBaseClassName}-right-panel-field-editor-list`}
                  id='fieldsContainer'
                  acceptFrom='fieldTypesList'
                  addOnDrop={false}
                  sortable={true}
                  onFwDrop={this.fieldTypeDropHandler}
                >
                  {fieldElements}
                </fw-drag-container>
              )}
              {!boolValidFieldElements && (
                <div class={`${strBaseClassName}-right-panel-empty-list-div`}>
                  <div
                    class={`${strBaseClassName}-right-panel-empty-list-content`}
                  >
                    <span
                      class={`${strBaseClassName}-right-panel-empty-list-image-span`}
                    >
                      <img
                        alt=''
                        src={this.emptySearchImage}
                        class={`${strBaseClassName}-right-panel-empty-list-image`}
                      />
                    </span>
                    <label
                      class={`${strBaseClassName}-right-panel-empty-search-message`}
                    >
                      {i18nText('noSearchItemsFound')}
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <fw-modal
          ref={(el) => (this.modalCustomizeWidget = el)}
          size='small'
          hasCloseIconButton={false}
        >
          <fw-modal-title>
            <span class='cusomize-widget-header'>
              <span class='cusomize-widget-title'>
                {i18nText('customizeWidgetModalHeader')}
              </span>
              <span class='cusomize-widget-description'>
                {i18nText('customizeWidgetModalHint')}
              </span>
            </span>
          </fw-modal-title>
          <fw-modal-content>
            {this.showCustomizeWidget && (
              <fw-drag-container
                class='cusomize-widget-list'
                id='customizeWidgetList'
                addOnDrop={false}
                sortable={false}
              >
                {fieldWidgetElements}
              </fw-drag-container>
            )}
          </fw-modal-content>
          <fw-modal-footer>
            <span class='cusomize-widget-modal-footer'>
              <fw-button
                color='secondary'
                onFwClick={this.closeWidgetDetailsHandler}
              >
                {i18nText('customizeWidgetModalCancelBtn')}
              </fw-button>
              <fw-button
                loading={this.isSavingCustomizeWidget}
                onFwClick={this.saveWidgetDetailsHandler}
              >
                {i18nText('customizeWidgetModalSaveBtn')}
              </fw-button>
            </span>
          </fw-modal-footer>
        </fw-modal>
      </Host>
    );
  }
}
