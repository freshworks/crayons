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
  Method,
} from '@stencil/core';
import {
  deepCloneObject,
  getFieldTypeCheckboxes,
  getMappedCustomFieldType,
  getMaximumLimitsConfig,
  hasCustomProperty,
  hasPermission,
  i18nText,
  isPrimaryFieldType,
  isUniqueField,
  getDefaultDependentLevels,
} from './utils/form-builder-utils';
import presetSchema from './assets/form-builder-preset.json';
import formMapper from './assets/form-mapper.json';
import { debounce } from '../../utils/utils';

@Component({
  tag: 'fw-form-builder',
  styleUrl: 'form-builder.scss',
  shadow: true,
})
export class FormBuilder {
  @Element() host!: HTMLElement;

  private fieldEditorPanel!: any;
  private debouncedHandleInput: any;
  private modalCustomizeWidget!: any;
  private isWidgetValuesChanged = false;
  private filterByFieldTypeOptions = null;
  private supportedFieldTypes;
  private resizeObserver;
  private FILTER_ALL_FIELDS = 'ALL_FIELDS';

  /**
   * The db type used to determine the json to be used for CUSTOM_OBJECTS or CONVERSATION_PROPERTIES
   */
  @Prop() productName: 'CUSTOM_OBJECTS' | 'CONVERSATION_PROPERTIES' =
    'CUSTOM_OBJECTS';
  /**
   * Show explore plans button and disable features for free-plan users
   */
  @Prop() role: 'trial' | 'admin' = 'admin';
  /**
   * Permission object to restrict features based on permissions
   * "view" needs to be set to true for the rest of the permissions to be applicable
   * By default, all the permissions are set to true to give access to all the features
   * Example permission object : { view: true, create: true, edit: true, delete: true }
   */
  @Prop() permission: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  } = { view: true, create: true, edit: true, delete: true };
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
   * flag to show lookupField for CONVERSATION_PROPERTIES or not
   */
  @Prop({ mutable: true }) showLookupField = true;
  /**
   * flag to show dependentField for CONVERSATION_PROPERTIES or not
   */
  @Prop({ mutable: true }) showDependentField = true;
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
   * Show explore plans and disable features for user having free-plan
   */
  @Prop() userPlan: 'trial' | 'admin' = 'admin';
  /**
   * svg image to be shown for empty record
   */
  @Prop() emptySearchImage = null;
  /**
   * State to store the formValues as a state to transfer the field types
   */
  @State() localFormValues = null;
  /**
   * State to store the searched widget elements
   */
  @State() arrWidgetFields = null;
  /**
   * State to store the searched field elements
   */
  @State() arrSearchedFields = null;
  /**
   * State to store the filtered field elements
   */
  @State() arrFilteredByTypeFields = null;
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
   * selected filter option from the select component for filter by field type
   */
  @State() selectedFieldTypeFilterOption = this.FILTER_ALL_FIELDS;
  /**
   * State to re-render the drag container children after re render
   */
  @State() fieldRerenderCount = 0;
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
   * Triggered when the explore plans button is clicked for free plan users
   */
  @Event() fwExplorePlan!: EventEmitter;
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
  watchFormValuesChangeHandler(newValue: any): void {
    this.validateFormValues(newValue);
  }

  @Watch('productName')
  watchProductNameChangeHandler(): void {
    this.validateFormValues();
  }

  /**
   * Method to force render the drag container's children containing all the added fields
   */
  @Method()
  async forceRenderFields(): Promise<void> {
    this.fieldRerenderCount++;
  }

  componentWillLoad(): void {
    this.initializeSearchDebounce();
    this.validateFormValues();
    this.supportedFieldTypes = [
      'TEXT',
      'EMAIL',
      'CHECKBOX',
      'PARAGRAPH',
      'NUMBER',
      'DECIMAL',
      'DATE',
      'DROPDOWN',
      'DEPENDENT_FIELD',
      'RELATIONSHIP',
      'MULTI_SELECT',
    ];
  }

  disconnectedCallback(): void {
    this.debouncedHandleInput = null;
    this.removeResizeObserver();
  }

  private validateFormValues(objFormValue = null) {
    this.fieldTypesCount = null;
    const objMaxLimitCount = { filterable: 0, unique: 0 };
    this.localFormValues = objFormValue
      ? deepCloneObject(objFormValue)
      : this.formValues
      ? deepCloneObject(this.formValues)
      : null;

    if (this.localFormValues) {
      const arrFields = this.localFormValues?.fields;
      const objMapper = formMapper[this.productName];
      const mappedFieldTypes = objMapper['reverseMappedFieldTypes'];
      const objProductConfig = objMapper.config;
      const boolSupportsDefaultField =
        objProductConfig?.showDefaultTag &&
        objProductConfig?.defaultTagKey &&
        objProductConfig.defaultTagKey !== ''
          ? true
          : false;
      const strDefaultFieldKey = boolSupportsDefaultField
        ? objProductConfig.defaultTagKey
        : '';

      // Maximum limits validation
      if (arrFields && arrFields.length > 0) {
        let intValidActiveFieldCount = 0;
        const intFieldCount = arrFields.length;

        for (let i1 = 0; i1 < intFieldCount; i1++) {
          // check for dependent field and change fields format
          if (arrFields[i1]?.field_options?.dependent === 'true') {
            const internalNamePrefix = objProductConfig.internalNamePrefix;
            arrFields[i1] = getDefaultDependentLevels(
              {
                type: '22',
                label: arrFields[i1].label,
                name: arrFields[i1].name,
                fields: [arrFields[i1]],
              },
              internalNamePrefix
            );
          }

          const objField = arrFields[i1];
          if (!objField) {
            continue;
          }

          if (mappedFieldTypes) {
            if (hasCustomProperty(mappedFieldTypes, objField.type)) {
              objField.type = mappedFieldTypes[objField.type];
            } else {
              console.log(
                `${objField.type} is not added in the mapper - Unsupported field type`
              );
            }
          }

          const strFieldType = objField.type;
          if (!objField?.isNew) {
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

          if (!boolSupportsDefaultField) {
            intValidActiveFieldCount++;
          } else if (
            strDefaultFieldKey &&
            strDefaultFieldKey !== '' &&
            hasCustomProperty(objField, strDefaultFieldKey) &&
            objField[strDefaultFieldKey]
          ) {
            intValidActiveFieldCount++;
          }
        }

        const objMaxLimits = getMaximumLimitsConfig(this.productName);
        this.enableFieldType =
          intValidActiveFieldCount < objMaxLimits.fields.count;
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

  private getInterpolatedMaxLimitLabel = (strProperty) => {
    if (strProperty && strProperty !== '') {
      try {
        const objMaxLimit = getMaximumLimitsConfig(this.productName)?.[
          strProperty
        ];
        if (objMaxLimit) {
          return i18nText(objMaxLimit.message, { count: objMaxLimit.count });
        }
      } catch (error) {
        return '';
      }
    }
    return '';
  };

  // function to get the default field type schema based on the field type
  private getDefaultFieldTypeSchema = (fieldType) => {
    if (presetSchema) {
      try {
        const objDefaultField = presetSchema.fieldTypes[fieldType];

        if (objDefaultField) {
          const objNewField = deepCloneObject(objDefaultField);
          objNewField.checkboxes = getFieldTypeCheckboxes(
            this.productName,
            fieldType
          );
          return objNewField;
        } else {
          console.log(`${fieldType} - field type is not supported`);
        }
      } catch (error) {
        console.log(`${fieldType} - field type is not supported`);
      }
    }
    return null;
  };

  private removeFieldReorderClass = () => {
    try {
      if (this.fieldEditorPanel) {
        this.fieldEditorPanel.classList.remove(
          'form-builder-right-panel-list-container--reordering'
        );
      }
    } catch (error) {
      console.error('Could not remove dragged class');
    }
  };
  private reorderFieldProgressHandler = (event: CustomEvent) => {
    if (this.fieldEditorPanel) {
      const boolDragging = event.detail.value;
      if (boolDragging) {
        this.fieldEditorPanel.classList.add(
          'form-builder-right-panel-list-container--reordering'
        );
      } else {
        this.removeFieldReorderClass();
      }
    }
  };

  private expandFieldHandler = (event: CustomEvent) => {
    this.fwExpandField.emit({ ...event.detail });
  };

  private explorePlanHandler = (event: CustomEvent) => {
    this.fwExplorePlan.emit({ ...event.detail });
  };

  private saveFieldHandler = (event: CustomEvent) => {
    const objSaveField = { ...event.detail };
    const objSaveFieldDetails = objSaveField.value;
    objSaveFieldDetails.type = getMappedCustomFieldType(
      this.productName,
      objSaveFieldDetails.type
    );

    this.fwSaveField.emit(objSaveField);
  };

  private deleteFieldHandler = (event: CustomEvent) => {
    this.fwDeleteField.emit({ ...event.detail });
  };

  private composeNewField = (strNewFieldType, objFieldData, intIndex = -1) => {
    const fieldType = strNewFieldType;
    const objNewField = deepCloneObject(presetSchema.fieldTypes[fieldType]);
    const objMaxLimits = getMaximumLimitsConfig(this.productName);

    try {
      const arrFields = this.localFormValues?.fields;
      objNewField.checkboxes = getFieldTypeCheckboxes(
        this.productName,
        objNewField.type
      );
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

    objNewField.type = getMappedCustomFieldType(
      this.productName,
      objNewField.type
    );
    this.fwComposeNewField.emit({
      maximumLimits: getMaximumLimitsConfig(this.productName),
      fieldSchema: objNewField,
      value: { ...objFieldData },
      index: intIndex,
    });
  };

  private fieldTypeDropHandler = (event: CustomEvent) => {
    this.removeFieldReorderClass();
    const objDetail = event.detail;
    const elFieldType = objDetail.droppedElement;
    const intDroppedIndex = objDetail.droppedIndex;

    // New field type element dropped inside the container
    if (objDetail.dragFromId !== objDetail.dropToId) {
      const boolCreationAllowed = hasPermission(
        this.role,
        this.permission,
        'CREATE'
      );
      if (!boolCreationAllowed) {
        return;
      }

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
    event.stopImmediatePropagation();
    event.stopPropagation();
    const boolCreationAllowed = hasPermission(
      this.role,
      this.permission,
      'CREATE'
    );
    if (!boolCreationAllowed) {
      return;
    }

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

  private initializeSearchDebounce = () => {
    if (!this.debouncedHandleInput) {
      this.debouncedHandleInput = debounce(this.searchChangeHandler, this);
    }
  };

  private searchChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const strInputText = event?.detail?.value?.trim() || '';

    if (strInputText) {
      const arrFieldElements =
        this.localFormValues && this.localFormValues.fields
          ? this.localFormValues.fields
          : [];

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

  private fieldTypeFilterChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const filteredFieldType = event.detail.value;

    if (
      filteredFieldType &&
      filteredFieldType !== '' &&
      filteredFieldType !== this.FILTER_ALL_FIELDS
    ) {
      this.arrSearchedFields = null;
      this.searching = false;

      const arrFieldElements =
        this.localFormValues && this.localFormValues.fields
          ? this.localFormValues.fields
          : [];

      if (arrFieldElements && arrFieldElements.length > 0) {
        const arrResults = arrFieldElements.filter(function (dataItem) {
          return dataItem.type.indexOf(filteredFieldType) !== -1;
        });
        this.arrFilteredByTypeFields = deepCloneObject(arrResults);
        this.selectedFieldTypeFilterOption = filteredFieldType;
        return;
      }
    }
    this.arrFilteredByTypeFields = null;
    this.selectedFieldTypeFilterOption = this.FILTER_ALL_FIELDS;
  };

  private openCustomizeWidgetModalHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (
      !this.localFormValues ||
      !this.localFormValues.fields ||
      this.localFormValues.fields.length <= 0
    ) {
      return;
    }

    const arrFields = this.localFormValues.fields;
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
        isPrimaryFieldType(arrPrecedenceObjects[0], this.productName)
      ) {
        arrWidgetIds = [...arrWidgetIds, arrPrecedenceObjects[0]];
      }

      const objMaxLimits = getMaximumLimitsConfig(this.productName);
      const intMaxWidgetFields = objMaxLimits?.widgets?.count || 0;
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
      const objMaxLimits = getMaximumLimitsConfig(this.productName);
      const intMaxWidgetsCount = objMaxLimits?.widgets?.count || 0;

      if (boolChecked && this.arrWidgetFields.length < intMaxWidgetsCount) {
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

  private renderFieldTypesHeader(objProductPreset) {
    const strBaseClassName = 'form-builder';
    const objLabelsDb = objProductPreset.labels;

    const strProductHeader = hasCustomProperty(objLabelsDb, 'headerProduct')
      ? objLabelsDb.headerProduct
      : '';
    const strProductSubHeader = hasCustomProperty(
      objLabelsDb,
      'subHeaderProduct'
    )
      ? objLabelsDb.subHeaderProduct
      : '';

    const objSubHeaderLink = hasCustomProperty(
      objLabelsDb,
      'subHeaderProductLink'
    )
      ? objLabelsDb.subHeaderProductLink
      : null;
    const strSubHeaderLinkLabel = objSubHeaderLink
      ? i18nText(objSubHeaderLink.label)
      : '';
    const strSubHeaderLinkHref = objSubHeaderLink ? objSubHeaderLink.href : '';
    const boolShowSubHeaderLink =
      strSubHeaderLinkLabel && strSubHeaderLinkLabel !== '' ? true : false;

    const strFieldTypesHeader = hasCustomProperty(
      objLabelsDb,
      'fieldTypesHeader'
    )
      ? objLabelsDb.fieldTypesHeader
      : '';
    const strDragDrop = hasCustomProperty(objLabelsDb, 'dragDropFieldTypes')
      ? objLabelsDb.dragDropFieldTypes
      : '';

    const boolFieldsHeaderPresent =
      strFieldTypesHeader && strFieldTypesHeader !== '' ? true : false;
    const strDragClassName = boolFieldsHeaderPresent
      ? `${strBaseClassName}-left-panel-header-desc`
      : `${strBaseClassName}-left-panel-header-desc-wo-header`;

    return (
      <div class={`${strBaseClassName}-left-panel-header`}>
        {strProductHeader && strProductHeader !== '' && (
          <label class={`${strBaseClassName}-left-panel-product-header-label`}>
            {i18nText(strProductHeader)}
          </label>
        )}
        {strProductSubHeader && strProductSubHeader !== '' && (
          <span class={'form-builder-left-panel-sub-header-description'}>
            <label
              class={'form-builder-left-panel-sub-header-description-label'}
            >
              {i18nText(strProductSubHeader)}
            </label>
            {boolShowSubHeaderLink && (
              <a
                class={
                  'form-builder-left-panel-sub-header-description-link-anchor'
                }
                href={strSubHeaderLinkHref}
                target='_blank'
              >
                {strSubHeaderLinkLabel}
              </a>
            )}
          </span>
        )}
        {boolFieldsHeaderPresent && (
          <label class={`${strBaseClassName}-left-panel-header-label`}>
            {i18nText(strFieldTypesHeader)}
          </label>
        )}
        {strDragDrop && strDragDrop !== '' && (
          <label class={strDragClassName}>{i18nText(strDragDrop)}</label>
        )}
      </div>
    );
  }

  private renderDisableFieldCreateByRole(
    objProductPresetConfig,
    strBaseClassName
  ) {
    if (this.role === 'trial') {
      return (
        <div class={`${strBaseClassName}-left-panel-list-disabled-div`}>
          <fw-icon name='lock' size='30'></fw-icon>
          <label class={`${strBaseClassName}-left-panel-list-disabled-header`}>
            {i18nText(objProductPresetConfig?.freePlanFieldAddDisabledHeader)}
          </label>
          <label class={`${strBaseClassName}-left-panel-list-disabled-message`}>
            {i18nText(objProductPresetConfig?.freePlanFieldAddDisabledMessage)}
          </label>
          <fw-button
            color='primary'
            onFwClick={this.explorePlanHandler}
            class={`${strBaseClassName}-left-panel-list-disabled-button`}
          >
            {i18nText(objProductPresetConfig?.freePlanFieldAddDisabledButton)}
          </fw-button>
        </div>
      );
    }
  }

  private renderDisableFieldCreateByPermission(
    objProductPresetConfig,
    strBaseClassName
  ) {
    const boolCreationAllowed = hasPermission(
      this.role,
      this.permission,
      'CREATE'
    );
    if (!boolCreationAllowed && this.role !== 'trial') {
      return (
        <div class={`${strBaseClassName}-left-panel-list-disabled-div`}>
          <fw-icon name='lock' size='30'></fw-icon>
          <label class={`${strBaseClassName}-left-panel-list-disabled-header`}>
            {i18nText(
              objProductPresetConfig?.noCreatePermissionFieldAddDisabledHeader
            )}
          </label>
          <label class={`${strBaseClassName}-left-panel-list-disabled-message`}>
            {i18nText(
              objProductPresetConfig?.noCreatePermissionFieldAddDisabledMessage
            )}
          </label>
        </div>
      );
    }
  }

  private renderFieldTypeElement(
    key,
    presetFieldTypes,
    dbFieldConfig,
    intIndex
  ) {
    if (key === 'PRIMARY') {
      return null;
    }

    const dbFieldTypeData = dbFieldConfig?.fieldProps[key];
    const dataItem = presetFieldTypes[key];
    const strFieldType = dataItem.type;

    if (!this.supportedFieldTypes.includes(strFieldType)) {
      return null;
    }

    let boolDisableFieldType = !this.enableFieldType;
    let strTooltipMessage = boolDisableFieldType
      ? this.getInterpolatedMaxLimitLabel('fields')
      : '';

    const objMaxLimits = getMaximumLimitsConfig(this.productName);
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

    const strDisplayLabel = hasCustomProperty(dbFieldTypeData, 'display_label')
      ? dbFieldTypeData.display_label
      : '';

    const strDescription = hasCustomProperty(dbFieldTypeData, 'description')
      ? i18nText(dbFieldTypeData.description)
      : '';
    const boolShowDescription =
      strDescription && strDescription !== '' ? true : false;

    const strHelpTooltip = hasCustomProperty(dbFieldTypeData, 'help')
      ? i18nText(dbFieldTypeData.help)
      : '';
    const boolShowHelpTooltip =
      strHelpTooltip && strHelpTooltip !== '' ? true : false;

    const objLink = hasCustomProperty(dbFieldTypeData, 'link')
      ? dbFieldTypeData.link
      : null;
    const strLinkLabel = objLink ? i18nText(objLink.label) : '';
    const strLinkHref = objLink ? objLink.href : '';
    const boolShowLink = strLinkLabel && strLinkLabel !== '' ? true : false;

    const boolShowBottomBorder = hasCustomProperty(
      dbFieldTypeData,
      'has_bottom_border'
    )
      ? dbFieldTypeData.has_bottom_border
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
          label={strDisplayLabel}
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
      this.productName,
      intIndex,
      !this.searching
    );
    const boolItemExpanded =
      this.expandedFieldIndex === intIndex ? true : false;
    const strKey = `${dataItem.id}_${intIndex.toString()}`;

    return (
      <fw-field-editor
        index={intIndex}
        key={strKey}
        productName={this.productName}
        dataProvider={dataItem}
        entityName={strEntityName}
        expanded={boolItemExpanded}
        isPrimaryField={isPrimaryField}
        pinned={isPrimaryField ? 'top' : ''}
        disabled={boolFieldEditingState}
        disabledSort={this.searching}
        permission={this.permission}
        role={this.role}
        enableUnique={this.enableUnique}
        enableFilterable={this.enableFilterable}
        defaultFieldTypeSchema={objDefaultFieldTypeSchema}
        lookupTargetObjects={this.lookupTargetObjects}
        formValues={this.localFormValues}
        isLoading={this.isLoading}
        onFwUpdate={this.saveFieldHandler}
        onFwDelete={this.deleteFieldHandler}
        onFwExpand={this.expandFieldHandler}
        onFwReorder={this.reorderFieldProgressHandler}
      ></fw-field-editor>
    );
  }

  private renderWidgetElement(dataItem, intIndex) {
    const objMaxLimits = getMaximumLimitsConfig(this.productName);
    const intMaxWidgetsCount = objMaxLimits?.widgets?.count || 0;

    const isPrimaryField = isPrimaryFieldType(
      dataItem,
      this.productName,
      intIndex
    );
    const boolItemSelected = !isPrimaryField
      ? this.arrWidgetFields?.includes(dataItem.id)
        ? true
        : false
      : true;
    const boolItemDisabled = isPrimaryField
      ? true
      : !boolItemSelected
      ? this.arrWidgetFields.length >= intMaxWidgetsCount
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
    const objFormValuesSchema = this.localFormValues;
    const objFieldTypes = presetSchema.fieldTypes;
    const objProductPreset = formMapper[this.productName];
    const objProductPresetConfig = objProductPreset?.config;
    const objLabelsDb = objProductPreset?.labels;
    const arrFieldOrder = objProductPreset?.fieldOrder;
    if (!this.showLookupField) {
      const relationshipIndex = arrFieldOrder.indexOf('RELATIONSHIP');
      if (relationshipIndex > -1) {
        arrFieldOrder.splice(relationshipIndex, 1);
      }
    }
    if (!this.showDependentField) {
      const dependentIndex = arrFieldOrder.indexOf('DEPENDENT_FIELD');
      if (dependentIndex > -1) {
        arrFieldOrder.splice(dependentIndex, 1);
      }
    }
    const boolFieldEditingState = this.expandedFieldIndex > -1 ? true : false;
    const strEntityName = objFormValuesSchema ? objFormValuesSchema.name : '';
    const strFieldEditHeader = hasCustomProperty(objLabelsDb, 'fieldsHeader')
      ? objLabelsDb.fieldsHeader
      : '';

    const fieldTypeElements =
      arrFieldOrder && arrFieldOrder.length > 0
        ? arrFieldOrder.map((key, index) =>
            this.renderFieldTypeElement(
              key,
              objFieldTypes,
              objProductPreset,
              index
            )
          )
        : null;

    const boolFilterApplied =
      this.selectedFieldTypeFilterOption &&
      this.selectedFieldTypeFilterOption !== '' &&
      this.selectedFieldTypeFilterOption !== this.FILTER_ALL_FIELDS
        ? true
        : false;

    const arrFieldElements = boolFilterApplied
      ? this.arrFilteredByTypeFields
      : this.searching
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

    const boolShowEmptySearchResults =
      (this.searching && (!fieldElements || fieldElements.length === 0)) ||
      (boolFilterApplied && (!fieldElements || fieldElements.length === 0));
    const boolHasCustomizeWidgetOption =
      objProductPresetConfig?.customizeWidget || false;
    const fieldWidgetElements =
      this.showCustomizeWidget &&
      arrFieldElements &&
      arrFieldElements.length > 0
        ? arrFieldElements.map((dataItem, index) =>
            this.renderWidgetElement(dataItem, index)
          )
        : null;

    const boolHasFilterByFieldTypes =
      objProductPresetConfig?.filterByType || false;
    if (
      !this.filterByFieldTypeOptions &&
      arrFieldOrder &&
      arrFieldOrder.length > 0
    ) {
      const dbFieldProps = objProductPreset?.fieldProps;
      const intFieldTypesLength = arrFieldOrder.length;

      this.filterByFieldTypeOptions = [
        {
          text: i18nText('filterOptionAllFields'),
          value: this.FILTER_ALL_FIELDS,
        },
      ];

      for (let f1 = 0; f1 < intFieldTypesLength; f1++) {
        this.filterByFieldTypeOptions.push({
          text: i18nText(dbFieldProps[arrFieldOrder[f1]].display_label),
          value: arrFieldOrder[f1],
        });
      }
    }

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
            {this.renderFieldTypesHeader(objProductPreset)}
            <div class={`${strBaseClassName}-left-panel-list-container`}>
              <fw-drag-container
                class={`${strBaseClassName}-left-panel-field-types-list`}
                id='fieldTypesList'
                addOnDrop={false}
                sortable={false}
              >
                {fieldTypeElements}
              </fw-drag-container>
              {this.renderDisableFieldCreateByRole(
                objProductPresetConfig,
                strBaseClassName
              )}
              {this.renderDisableFieldCreateByPermission(
                objProductPresetConfig,
                strBaseClassName
              )}
            </div>
          </div>
          <div class={strRightPanelBaseClassName}>
            <div class={strRightPanelHeaderClassName}>
              <div class={`${strBaseClassName}-right-panel-header-content`}>
                {!boolHasFilterByFieldTypes && (
                  <label class={`${strBaseClassName}-right-panel-header-label`}>
                    {i18nText(strFieldEditHeader)}
                  </label>
                )}
                {boolHasFilterByFieldTypes && (
                  <div
                    class={`${strBaseClassName}-right-panel-header-right-filter-by-div`}
                  >
                    <label
                      class={`${strBaseClassName}-right-panel-header-filter-label`}
                    >
                      {i18nText('filterFields')}
                    </label>
                    <fw-select
                      class={`${strBaseClassName}-filter-by-field-type-select`}
                      options={this.filterByFieldTypeOptions}
                      value={this.selectedFieldTypeFilterOption}
                      onFwChange={this.fieldTypeFilterChangeHandler}
                    ></fw-select>
                  </div>
                )}
                <div class={`${strBaseClassName}-right-panel-header-right-div`}>
                  {boolHasCustomizeWidgetOption && (
                    <fw-button
                      id='customizeWidgetFieldsBtn'
                      color='link'
                      disabled={this.searching}
                      onFwClick={this.openCustomizeWidgetModalHandler}
                    >
                      <fw-icon name='modify' slot='before-label'></fw-icon>
                      {i18nText('customizeWidget')}
                    </fw-button>
                  )}
                  <fw-input
                    clear-input
                    icon-left='search'
                    placeholder={i18nText('searchFields')}
                    onFwInput={this.debouncedHandleInput}
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
              {!boolShowEmptySearchResults && (
                <fw-drag-container
                  key={`field-drag-container-${this.fieldRerenderCount.toString()}`}
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
              {boolShowEmptySearchResults && (
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
