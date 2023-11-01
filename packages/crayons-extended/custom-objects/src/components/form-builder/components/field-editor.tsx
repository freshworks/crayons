/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import {
  deepCloneObject,
  hasCustomProperty,
  getNestedKeyValueFromObject,
  i18nText,
  removeFirstOccurrence,
  getMaxLimitProperty,
  getMaximumLimitsConfig,
  deriveInternalNameFromLabel,
  hasPermission,
  checkIfCustomToggleField,
  updateNameLabelDependentField,
} from '../utils/form-builder-utils';
import formMapper from '../assets/form-mapper.json';
import presetSchema from '../assets/form-builder-preset.json';

@Component({
  tag: 'fw-field-editor',
  styleUrl: 'field-editor.scss',
  shadow: true,
})
export class FieldEditor {
  @Element() host!: HTMLElement;

  private KEY_INTERNAL_NAME = 'internalName';
  private modalConfirmDelete!: any;
  private divFieldBase: HTMLElement;
  private dictInteractiveElements;
  private isInternalNameEdited = false;
  private internalNamePrefix = '';
  private isNewField = false;
  private oldFormValues;
  private errorType;
  private isDependentField = false;

  /**
   * The db type used to determine the json to be used for CUSTOM_OBJECTS or CONVERSATION_PROPERTIES
   */
  @Prop() productName = 'CUSTOM_OBJECTS';
  /**
   * Pinned position of the drag item, other drag item cannot be placed above or below it.
   */
  @Prop() pinned: 'top' | 'bottom' | '';
  /**
   * flag to notify if an api call is in progress
   */
  @Prop({ mutable: true }) isLoading = false;
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
   * variable to store form values
   */
  @Prop({ mutable: true }) formValues = null;
  /**
   * object to store the lookup target entities
   */
  @Prop({ mutable: true }) lookupTargetObjects = false;
  /**
   * Disable the repositioning option
   */
  @Prop() disabledSort = false;
  /**
   * defines the name of the entity to be used in Lookup field
   */
  @Prop() entityName = '';
  /**
   * stores the default field type schema for this editor type
   */
  @Prop() defaultFieldTypeSchema;
  /**
   * defines if the field is primary
   */
  @Prop() isPrimaryField = false;
  /**
   * Flag to enable / disable the the filterable option
   */
  @Prop() enableFilterable = true;
  /**
   * Flag to enable / disable the the unique option
   */
  @Prop() enableUnique = true;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Disable features for the users with free trial plan
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
   * State to check if the values have been changed and enable the save button
   */
  @State() isValuesChanged = false;
  /**
   * State to serialize the field builder options
   */
  @State() fieldBuilderOptions = null;
  /**
   * State to show the error messages
   */
  @State() showErrors = false;
  /**
   * State to show form error text for the field validations
   */
  @State() formErrorMessage = '';
  /**
   * State to show label input error message
   */
  @State() labelErrorMessage = '';
  /**
   * State to show label input warning message
   */
  @State() labelWarningMessage = '';
  /**
   * State to show internal name input error message
   */
  @State() internalNameErrorMessage = '';
  /**
   * State to show internal name input warning message
   */
  @State() internalNameWarningMessage = '';
  /**
   * flag to show spinner on delete button
   */
  @State() isDeleting = false;
  /**
   * Triggered when the field is expanded or collapsed
   */
  @Event() fwExpand!: EventEmitter;
  /**
   * Triggered when the field details need to be saved on the server
   */
  @Event() fwUpdate!: EventEmitter;
  /**
   * Triggered when the field has to be deleted on the server
   */
  @Event() fwDelete!: EventEmitter;
  /**
   * Triggered when the field is reordered for drag start and drag stop
   */
  @Event() fwReorder!: EventEmitter;

  @Watch('enableUnique')
  watchEnableUniqueChangeHandler(): void {
    this.setCheckboxesAvailability(this.fieldBuilderOptions);
  }

  @Watch('enableFilterable')
  watchEnableFilterableChangeHandler(): void {
    this.setCheckboxesAvailability(this.fieldBuilderOptions);
  }

  @Watch('dataProvider')
  watchDataproviderChangeHandler(): void {
    this.isDeleting = false;
    this.isValuesChanged = false;
    this.isInternalNameEdited = false;
    this.oldFormValues = this.dataProvider
      ? deepCloneObject(this.dataProvider)
      : null;

    if (this.dataProvider) {
      const objDP = this.dataProvider;
      this.isNewField =
        hasCustomProperty(objDP, 'isNew') && objDP['isNew'] === true
          ? true
          : false;

      this.isDependentField =
        hasCustomProperty(objDP.field_options, 'dependent') &&
        objDP?.field_options?.dependent === true
          ? true
          : false;

      if (this.isNewField) {
        this.isInternalNameEdited = false;
        this.setCheckboxesAvailability(deepCloneObject(this.dataProvider));
      } else {
        this.isInternalNameEdited = true;
        const objDefaultFieldTypeSchema = deepCloneObject(
          this.defaultFieldTypeSchema
        );
        objDefaultFieldTypeSchema.choices =
          hasCustomProperty(this.dataProvider, 'choices') &&
          this.dataProvider.choices.length > 0
            ? deepCloneObject(this.dataProvider.choices)
            : [];

        objDefaultFieldTypeSchema.label = this.dataProvider.label || '';
        objDefaultFieldTypeSchema.name =
          removeFirstOccurrence(
            this.dataProvider.name,
            this.internalNamePrefix
          ) || '';
        this.setCheckboxesAvailability(objDefaultFieldTypeSchema);
      }
    } else {
      this.isNewField = false;
      this.fieldBuilderOptions = null;
    }
  }

  componentWillLoad(): void {
    const objProductPreset = formMapper[this.productName];
    const objProductConfig = objProductPreset.config;
    this.internalNamePrefix = objProductConfig.internalNamePrefix;

    this.watchDataproviderChangeHandler();
    this.dictInteractiveElements = {};
  }

  private getInterpolatedMaxLimitLabel = (strProperty) => {
    if (strProperty && strProperty !== '') {
      try {
        const objMaxLimitField = getMaxLimitProperty(
          this.productName,
          strProperty
        );
        if (objMaxLimitField) {
          return i18nText(objMaxLimitField.message, {
            count: objMaxLimitField.count,
          });
        }
      } catch (error) {
        return '';
      }
    }
    return '';
  };

  /**
   * validate limitations and enable/disable the checkbox controls
   */
  private setCheckboxesAvailability = (objFieldData) => {
    if (presetSchema && objFieldData && this.defaultFieldTypeSchema) {
      const boolNewField = this.isNewField;
      const objPayload = this.dataProvider;
      const objCheckboxValidation =
        presetSchema.fieldEditorValidations.checkboxDetails;

      let boolRequiredSelected = false;
      let boolUniqueSelected = false;

      const objKeyMappers = objCheckboxValidation.keyMapper;
      const objEnableKeyChecker = this.isPrimaryField
        ? objCheckboxValidation.existingPrimaryFieldEnabledCheckboxes
        : objCheckboxValidation.existingFieldEnabledCheckboxes;

      const objFieldTypeSchema = deepCloneObject(this.defaultFieldTypeSchema);
      const arrCheckBoxes = boolNewField
        ? objFieldData.checkboxes
        : objFieldTypeSchema.checkboxes;
      const intCheckboxesLength = arrCheckBoxes?.length;
      let intFilterableIndex = -1;

      for (let i1 = 0; i1 < intCheckboxesLength; i1++) {
        const objCheckItem = arrCheckBoxes[i1];
        const strCheckKey = objCheckItem.key;

        let boolKeySelected = false;
        if (boolNewField) {
          boolKeySelected = objCheckItem.selected;
        } else {
          // get payload key references from presets and retreive the values from the payload
          const strMappedPayloadKey = objKeyMappers[strCheckKey];
          if (hasCustomProperty(objPayload, strMappedPayloadKey)) {
            const keyFormValue = objPayload[strMappedPayloadKey];
            boolKeySelected =
              keyFormValue === 'true' || keyFormValue === true ? true : false;
          } else {
            const nestedValue = getNestedKeyValueFromObject(
              objPayload,
              strMappedPayloadKey
            );
            if (nestedValue) {
              boolKeySelected =
                nestedValue === 'true' || nestedValue === true ? true : false;
            }
          }
          objCheckItem.selected = boolKeySelected;
          objCheckItem.enabled = objEnableKeyChecker?.[strCheckKey];
        }

        if (strCheckKey === 'unique') {
          boolUniqueSelected = boolKeySelected;
        } else if (strCheckKey === 'required') {
          boolRequiredSelected = boolKeySelected;
        }

        if (objCheckItem.enabled) {
          // Check for the maximum limits
          if (strCheckKey === 'filterable' && !this.enableFilterable) {
            objCheckItem.enabled = false;
            objCheckItem.disabledMessage =
              this.getInterpolatedMaxLimitLabel('filterable');
          } else if (strCheckKey === 'unique' && !this.enableUnique) {
            objCheckItem.enabled = false;
            objCheckItem.disabledMessage =
              this.getInterpolatedMaxLimitLabel('unique');
          }
        } else if (strCheckKey === 'filterable') {
          intFilterableIndex = i1;
        }
      }

      // condition to disable the filterable field if unique is checked
      if (
        intFilterableIndex > -1 &&
        boolUniqueSelected &&
        arrCheckBoxes[intFilterableIndex].enabled
      ) {
        arrCheckBoxes[intFilterableIndex].enabled = false;
        arrCheckBoxes[intFilterableIndex].selected = true;
        arrCheckBoxes[intFilterableIndex].disabledMessage = '';
      }

      this.fieldBuilderOptions = {
        ...objFieldData,
        checkboxes: deepCloneObject(arrCheckBoxes),
        unique: boolUniqueSelected,
        required: boolRequiredSelected,
      };
    }
  };

  /**
   * function called on reorder button mousedown to enable the parent as draggable
   */
  private startParentDragging = () => {
    if (this.expanded) {
      return;
    }
    this.enableParentDrag(true);
  };

  /**
   * function to disable the parent as draggable
   */
  private stopParentDragging = () => {
    this.enableParentDrag(false);
  };

  /**
   * function to enable/disable the draggable property for the base div
   */
  private enableParentDrag = (value: boolean) => {
    if (this.divFieldBase) {
      this.fwReorder.emit({ value: value });
      if (value) {
        this.divFieldBase.setAttribute('draggable', 'true');
      } else {
        this.divFieldBase.removeAttribute('draggable');
      }
    }
  };

  /**
   * function to validate the label input error values
   */
  private validateLabelErrors = (strInputValue) => {
    if (!strInputValue) {
      this.labelErrorMessage = i18nText('errors.emptyFieldName');
      return false;
    } else {
      try {
        const strNewFieldLabel = strInputValue.toLowerCase();
        const arrFields = this.formValues.fields;

        if (
          arrFields &&
          arrFields.length > 0 &&
          arrFields.some(
            (e, fieldIndex) =>
              this.index !== fieldIndex &&
              !e?.isNew &&
              e.label.toLowerCase() === strNewFieldLabel
          )
        ) {
          this.labelErrorMessage = i18nText('errors.fieldNameExists');
          return false;
        }
      } catch (error) {
        console.error(`Error occured in validateLabelErrors: ${error}`);
      }
    }
    this.labelErrorMessage = '';
    return true;
  };

  /**
   * function to validate the internal name input error values
   */
  private validateInternalNameErrors = (strInputValue) => {
    if (!strInputValue) {
      this.internalNameErrorMessage = i18nText('errors.emptyFieldName');
      return false;
    } else {
      try {
        const strNewFieldName =
          this.internalNamePrefix + strInputValue.toLowerCase();
        const arrFields = this.formValues.fields;

        if (
          arrFields &&
          arrFields.length > 0 &&
          arrFields.some(
            (e, fieldIndex) =>
              this.index !== fieldIndex &&
              !e?.isNew &&
              e.name.toLowerCase() === strNewFieldName
          )
        ) {
          this.internalNameErrorMessage = i18nText('errors.fieldNameExists');
          return false;
        } else {
          const regexAlphaNumChars = /^[A-Z0-9_]*$/i;
          if (!regexAlphaNumChars.test(strInputValue)) {
            this.internalNameErrorMessage = i18nText(
              'errors.useOnlyEnglishChars'
            );
            return false;
          }
        }
      } catch (error) {
        console.error(`Error occured in validateInternalNameErrors: ${error}`);
      }
    }
    this.internalNameErrorMessage = '';
    return true;
  };

  /**
   * function to check the dropdown error values
   */
  private validateDropdownErrors = (arrDropdownValues) => {
    if (!arrDropdownValues || arrDropdownValues.length < 1) {
      this.formErrorMessage = i18nText('errors.minimum');
      return false;
    }
    if (this.errorType && this.errorType !== '') {
      if (this.errorType === i18nText('errors.deleteDropDownChoice')) {
        this.formErrorMessage = this.errorType;
        return true;
      }
      this.formErrorMessage = '';
      return false;
    }
    this.formErrorMessage = '';
    return true;
  };

  /**
   * function to check the dropdown error values
   */
  private validateLookupErrors = (objLookupValues) => {
    if (
      objLookupValues &&
      hasCustomProperty(objLookupValues, 'relationship') &&
      hasCustomProperty(objLookupValues, 'target') &&
      objLookupValues.relationship !== '' &&
      objLookupValues.target > 0
    ) {
      return true;
    }
    this.formErrorMessage = '';
    return false;
  };

  private addFieldHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    let boolValidForm = true;
    const objValues = {
      type: this.dataProvider.type,
      isPrimaryField: this.isPrimaryField,
    };

    for (const key in this.dictInteractiveElements) {
      const elInteractive = this.dictInteractiveElements[key];
      const strTagName = elInteractive.tagName.toLowerCase();

      switch (strTagName) {
        case 'fw-input':
          // eslint-disable-next-line no-case-declarations
          const strInputValue = elInteractive.value;
          if (key === 'name') {
            boolValidForm = this.validateLabelErrors(strInputValue);
            if (boolValidForm) {
              this.labelErrorMessage = '';
              objValues[key] = strInputValue || '';
            } else {
              this.showErrors = true;
              return;
            }
          } else if (key === this.KEY_INTERNAL_NAME) {
            if (this.isNewField) {
              boolValidForm = this.validateInternalNameErrors(strInputValue);
              if (boolValidForm) {
                this.internalNameErrorMessage = '';
                objValues[key] =
                  `${this.internalNamePrefix}${strInputValue}` || '';
              } else {
                this.showErrors = true;
                return;
              }
            }
          }
          break;
        case 'fw-checkbox':
          objValues[key] = elInteractive.checked || false;
          break;
        case 'fw-fb-field-dropdown': {
          const arrDropdownValues =
            deepCloneObject(elInteractive.dataProvider) || [];
          boolValidForm = this.validateDropdownErrors(arrDropdownValues);
          if (boolValidForm) {
            objValues[key] = arrDropdownValues || [];
          } else {
            elInteractive.validateErrors();
            this.showErrors = true;
            return;
          }
          break;
        }
        case 'fw-fb-field-lookup': {
          const objLookupValues =
            deepCloneObject(elInteractive.dataResponse) || null;
          boolValidForm = this.validateLookupErrors(objLookupValues);
          if (boolValidForm) {
            objValues[key] = objLookupValues;
          } else {
            this.showErrors = true;
            return;
          }
          break;
        }
        default:
          break;
      }
    }

    if (checkIfCustomToggleField(this.productName, this.dataProvider.name)) {
      objValues['choices'] = [...this.dataProvider.choices];
    }

    if (boolValidForm) {
      if (!this.isNewField) {
        objValues[this.KEY_INTERNAL_NAME] = this.dataProvider.name;
      }
      this.internalNameWarningMessage = '';
      this.internalNameErrorMessage = '';
      this.labelWarningMessage = '';
      this.labelErrorMessage = '';
      this.formErrorMessage = '';
      this.showErrors = false;

      this.fwUpdate.emit({
        index: this.index,
        isNew: this.isNewField,
        value: { ...objValues },
      });
    }
  };

  private cancelFieldHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    if (this.expanded) {
      this.dictInteractiveElements = {};
      this.expanded = false;
      this.internalNameErrorMessage = '';
      this.labelWarningMessage = '';
      this.labelErrorMessage = '';
      this.formErrorMessage = '';
      this.showErrors = false;

      if (this.isValuesChanged) {
        this.dataProvider = this.oldFormValues
          ? deepCloneObject(this.oldFormValues)
          : null;
      }

      this.fwExpand.emit({
        expanded: false,
        index: this.index,
        isNew: this.isNewField,
      });
    }
  };

  private expandHandler = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.detail && event.detail > 1) {
      return;
    }

    if (!this.expanded) {
      this.dictInteractiveElements = {};
      this.expanded = true;

      this.fwExpand.emit({
        expanded: true,
        index: this.index,
        isNew: this.isNewField,
        value: { ...this.dataProvider },
      });
    }
  };

  private deleteFieldClickHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const boolDeleteAllowed = hasPermission(
      this.role,
      this.permission,
      'DELETE'
    );
    if (boolDeleteAllowed) {
      this.modalConfirmDelete?.open();
    }
  };

  private confirmDeleteFieldHandler = () => {
    this.isDeleting = true;
    this.fwDelete.emit({ index: this.index });
    this.modalConfirmDelete?.close();
  };

  private dropdownChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.isValuesChanged = true;

    const strType = event.detail.type;
    switch (strType) {
      case 'DELETE':
      case 'VALUE_CHANGE':
        this.errorType = event.detail.errorType;
        this.validateDropdownErrors(event.detail.value);
        break;
      case 'ADD':
      case 'REPOSITION':
        this.errorType = event.detail.errorType;
        break;
      default:
        break;
    }
  };

  private statusToggleHandler = (event: CustomEvent) => {
    this.isValuesChanged = true;
    const objPayload = this.dataProvider;
    const id = (event.target as HTMLInputElement).id;
    const choice = objPayload.choices.find((item) => item.id === id);
    choice.choice_options.resolution_timer = event.detail.checked;
  };

  private lookupChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.isValuesChanged = true;
    this.validateLookupErrors(event.detail.value);
  };

  private checkboxSelectionChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.isValuesChanged = true;

    // condition to disable the filterable field if unique is checked
    if (
      !this.isPrimaryField &&
      event.detail.value === 'unique' &&
      this.enableFilterable
    ) {
      const boolUniqueChecked = event.detail.meta.checked;
      try {
        const arrCheckBoxes = this.fieldBuilderOptions.checkboxes;
        const intCheckboxesLength = arrCheckBoxes.length;
        for (let i1 = 0; i1 < intCheckboxesLength; i1++) {
          const objFilterable = arrCheckBoxes[i1];
          if (objFilterable.key === 'filterable') {
            objFilterable.selected = boolUniqueChecked;
            objFilterable.enabled = !boolUniqueChecked;
            objFilterable.disabledMessage = ''; //!objFilterable.enabled ? '' : '';

            this.fieldBuilderOptions = {
              ...this.fieldBuilderOptions,
              checkboxes: arrCheckBoxes,
            };
            break;
          }
        }
      } catch (error) {
        console.error(
          `Error occured in checkboxSelectionChangeHandler: ${error}`
        );
      }
    }
  };

  private performLabelChange = (event: CustomEvent, isBlur = false, level) => {
    if (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }

    if (!isBlur) {
      this.isValuesChanged = true;
    }

    const strInputValue = !isBlur
      ? event?.detail?.value || ''
      : event?.target?.['value']?.trim() || '';
    const isValidValue = strInputValue && strInputValue !== '';

    let strInternalName = '';
    let boolInternalNameUpdated = false;
    if (!this.isInternalNameEdited && this.isNewField) {
      strInternalName = deriveInternalNameFromLabel(strInputValue);
      boolInternalNameUpdated = true;
    }

    if (isValidValue) {
      const objMaxLimitField = getMaxLimitProperty(
        this.productName,
        'maxLabelChars'
      );
      if (objMaxLimitField && strInputValue.length >= objMaxLimitField.count) {
        this.labelWarningMessage = i18nText(objMaxLimitField.message, {
          count: objMaxLimitField.count,
        });
      } else {
        this.labelWarningMessage = '';
      }
    } else {
      this.labelWarningMessage = '';
    }

    if (boolInternalNameUpdated) {
      const objMaxLimitFieldName = getMaxLimitProperty(
        this.productName,
        'maxInternalNameChars'
      );
      if (
        !this.internalNameWarningMessage &&
        this.internalNameWarningMessage !== '' &&
        objMaxLimitFieldName &&
        strInternalName.length >= objMaxLimitFieldName.count
      ) {
        this.internalNameWarningMessage = i18nText(
          objMaxLimitFieldName.message,
          {
            count: objMaxLimitFieldName.count,
          }
        );
      }
      if (this.isDependentField) {
        this.fieldBuilderOptions = updateNameLabelDependentField(
          this.fieldBuilderOptions,
          level,
          boolInternalNameUpdated,
          strInputValue,
          strInternalName
        );
      } else {
        this.fieldBuilderOptions = {
          ...this.fieldBuilderOptions,
          label: strInputValue,
          name: strInternalName,
        };
      }
    } else {
      if (this.isDependentField) {
        this.fieldBuilderOptions = updateNameLabelDependentField(
          this.fieldBuilderOptions,
          level,
          boolInternalNameUpdated,
          strInputValue,
          strInternalName
        );
      } else {
        this.fieldBuilderOptions = {
          ...this.fieldBuilderOptions,
          label: strInputValue,
        };
      }
    }

    if (this.showErrors) {
      this.validateLabelErrors(strInputValue);
    }
  };

  private labelInputHandler = (event: CustomEvent, level) => {
    this.performLabelChange(event, false, level);
  };

  private labelBlurHandler = (event: CustomEvent, level) => {
    this.performLabelChange(event, true, level);
  };

  private performInternalNameChange = (event: CustomEvent, isBlur = false) => {
    if (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }

    let strInputValue = !isBlur
      ? event?.detail?.value || ''
      : event?.target?.['value']?.trim() || '';
    const isValidValue = strInputValue && strInputValue !== '';

    if (!isBlur) {
      this.isValuesChanged = true;
      if (isValidValue) {
        strInputValue = strInputValue.trim();
      }
    }
    if (!this.isInternalNameEdited && isValidValue) {
      this.isInternalNameEdited = true;
    }

    if (isValidValue) {
      const objMaxLimitField = getMaxLimitProperty(
        this.productName,
        'maxInternalNameChars'
      );
      if (objMaxLimitField && strInputValue.length >= objMaxLimitField.count) {
        this.internalNameWarningMessage = i18nText(objMaxLimitField.message, {
          count: objMaxLimitField.count,
        });
      } else {
        this.internalNameWarningMessage = '';
      }

      this.fieldBuilderOptions = {
        ...this.fieldBuilderOptions,
        name: strInputValue,
      };
    } else {
      this.internalNameWarningMessage = '';
    }

    if (this.showErrors) {
      this.validateInternalNameErrors(strInputValue);
    }
  };

  private internalNameInputHandler = (event: CustomEvent) => {
    this.performInternalNameChange(event);
  };

  private internalNameBlurHandler = (event: CustomEvent) => {
    this.performInternalNameChange(event, true);
  };

  private renderFwLabel(dataItem) {
    if (!dataItem.selected || dataItem.key === 'required') {
      return null;
    }
    const strBaseClassName = 'fw-field-editor';
    const strKey = dataItem.key;
    const strLabel = hasCustomProperty(dataItem, 'tag')
      ? i18nText(dataItem.tag)
      : strKey;
    return (
      <fw-label
        key={strKey}
        value={strLabel}
        color='grey'
        class={`${strBaseClassName}-content-fw-label`}
      />
    );
  }

  private renderCheckboxField(dataCheckbox) {
    const boolEditCheckboxAllowed =
      this.isNewField ||
      hasPermission(this.role, this.permission, 'EDIT', true);
    const boolDisableCheckbox =
      !boolEditCheckboxAllowed || !dataCheckbox.enabled;
    const strBaseClassName = 'fw-field-editor';
    const strKey = dataCheckbox.key;

    let strLimitMessage = '';
    let boolShowInfo = false;

    if (
      hasCustomProperty(dataCheckbox, 'disabledMessage') &&
      dataCheckbox.disabledMessage !== ''
    ) {
      boolShowInfo = true;
      strLimitMessage = dataCheckbox.disabledMessage;
    } else if (
      hasCustomProperty(dataCheckbox, 'info') &&
      dataCheckbox.info !== ''
    ) {
      boolShowInfo = true;
      strLimitMessage = i18nText(dataCheckbox.info);
    }

    return (
      <div class={`${strBaseClassName}-content-checkbox-container`}>
        <fw-checkbox
          class={`${strBaseClassName}-content-fw-checkbox`}
          ref={(el) => (this.dictInteractiveElements[strKey] = el)}
          key={strKey}
          value={strKey}
          disabled={boolDisableCheckbox}
          checked={dataCheckbox.selected}
          onFwChange={this.checkboxSelectionChangeHandler}
        >
          {i18nText(dataCheckbox.display_label)}
        </fw-checkbox>
        {boolShowInfo && (
          <fw-tooltip
            placement='right'
            trigger='hover'
            content={strLimitMessage}
          >
            <fw-icon
              class={`${strBaseClassName}-content-fw-icon`}
              size={14}
              name='info'
              color='#264966'
            />
          </fw-tooltip>
        )}
      </div>
    );
  }

  private renderDropdown(boolDisableDropdowns, fieldBuilderOptions) {
    const objFormValue = fieldBuilderOptions;

    return (
      <fw-fb-field-dropdown
        ref={(el) => (this.dictInteractiveElements['choices'] = el)}
        dataProvider={objFormValue.choices}
        productName={this.productName}
        showErrors={this.showErrors}
        disabled={boolDisableDropdowns}
        onFwChange={this.dropdownChangeHandler}
      ></fw-fb-field-dropdown>
    );
  }

  private renderStatusToggle(objFormValue) {
    const strBaseClassName = 'fw-field-editor';
    const choices = objFormValue.choices;
    return (
      <div class={`${strBaseClassName}-status-toggle`}>
        <div class={`${strBaseClassName}-status-toggle-item header`}>
          <span>{i18nText('fieldLabel')}</span>
          <span>{i18nText('ertText')}</span>
        </div>
        {choices.map((dataItem) => {
          let toggle = null;
          if (
            dataItem?.choice_options &&
            Object.keys(dataItem?.choice_options).length
          ) {
            toggle = (
              <span>
                <fw-toggle
                  id={dataItem.id}
                  size='medium'
                  checked={dataItem?.choice_options.resolution_timer}
                  onFwChange={this.statusToggleHandler}
                ></fw-toggle>
              </span>
            );
          }
          return (
            <div class={`${strBaseClassName}-status-toggle-item`}>
              <span>
                <div class={`${strBaseClassName}-input-container`}>
                  <fw-input
                    class={`${strBaseClassName}-content-required-input`}
                    value={dataItem.value}
                    disabled='true'
                  ></fw-input>
                </div>
              </span>
              {toggle}
            </div>
          );
        })}
      </div>
    );
  }

  private renderLookup(boolDisableLookup) {
    const objFormValue = this.dataProvider;

    return (
      <fw-fb-field-lookup
        ref={(el) => (this.dictInteractiveElements['relationship'] = el)}
        targetObjects={this.lookupTargetObjects}
        sourceObjectName={this.entityName}
        showErrors={this.showErrors}
        disabled={boolDisableLookup}
        onFwChange={this.lookupChangeHandler}
        formValues={objFormValue}
        productName={this.productName}
      ></fw-fb-field-lookup>
    );
  }

  private renderInternalName(
    objProductConfig,
    objMaxLimits,
    isDefaultNonCustomField,
    boolEditAllowed,
    fieldBuilderOptions
  ) {
    const boolSupportInternalName = objProductConfig.editInternalName;
    if (!boolSupportInternalName || !this.expanded) {
      return null;
    }
    const strBaseClassName = 'fw-field-editor';
    const objFieldBuilder = fieldBuilderOptions;
    const strInputInternalName = hasCustomProperty(objFieldBuilder, 'name')
      ? objFieldBuilder.name
      : '';

    const boolShowNameError =
      this.showErrors &&
      this.internalNameErrorMessage &&
      this.internalNameErrorMessage !== ''
        ? true
        : false;
    const strInputError = boolShowNameError
      ? this.internalNameErrorMessage
      : '';

    const boolShowNameWarning =
      !boolShowNameError &&
      this.internalNameWarningMessage &&
      this.internalNameWarningMessage !== ''
        ? true
        : false;
    const strInputWarning = boolShowNameWarning
      ? this.internalNameWarningMessage
      : '';
    const numNameMaxChars = objMaxLimits?.['maxInternalNameChars']?.count || 50;
    const level = fieldBuilderOptions?.field_options?.level;
    const dictElName = this.isDependentField
      ? `${this.KEY_INTERNAL_NAME}_${level}`
      : this.KEY_INTERNAL_NAME;

    return (
      <div class={`${strBaseClassName}-internal-name-base`}>
        <label
          class={`${strBaseClassName}-internal-name-header-label required`}
        >
          {i18nText('internalName')}
        </label>
        <div class={`${strBaseClassName}-internal-name-container`}>
          {!isDefaultNonCustomField && (
            <label class={`${strBaseClassName}-internal-name-prefix`}>
              {this.internalNamePrefix}
            </label>
          )}
          <fw-input
            ref={(el) => (this.dictInteractiveElements[dictElName] = el)}
            class={`${strBaseClassName}-content-required-internal-name-input`}
            placeholder={i18nText('fieldNamePlaceholder')}
            required={true}
            maxlength={numNameMaxChars}
            value={strInputInternalName}
            errorText={strInputError}
            warningText={strInputWarning}
            disabled={!this.isNewField || !boolEditAllowed}
            state={
              boolShowNameError
                ? 'error'
                : boolShowNameWarning
                ? 'warning'
                : 'normal'
            }
            onFwBlur={this.internalNameBlurHandler}
            onFwInput={this.internalNameInputHandler}
          ></fw-input>
        </div>
      </div>
    );
  }

  private renderFieldContent(
    objProductConfig,
    isDefaultNonCustomField,
    boolEditAllowed
  ) {
    const renderFields = [];
    renderFields.push(
      this.renderContent(
        objProductConfig,
        isDefaultNonCustomField,
        boolEditAllowed,
        this.fieldBuilderOptions
      )
    );

    if (
      this.isDependentField &&
      this.fieldBuilderOptions.fields &&
      this.fieldBuilderOptions.fields.length > 0
    ) {
      const recurseFieldContent = (builderOption) => {
        renderFields.push(
          this.renderContent(
            objProductConfig,
            isDefaultNonCustomField,
            boolEditAllowed,
            builderOption
          )
        );

        if (builderOption?.fields?.length > 0) {
          recurseFieldContent(builderOption.fields[0]);
        }
      };

      recurseFieldContent(this.fieldBuilderOptions.fields[0]);
    }

    return renderFields.map((field) => field);
  }

  private renderContent(
    objProductConfig,
    isDefaultNonCustomField,
    boolEditAllowed,
    fieldBuilderOptions
  ) {
    if (!this.expanded) {
      return null;
    }
    const objFormValue = this.dataProvider;
    const objMaxLimits = getMaximumLimitsConfig(this.productName);
    const boolSupportInternalName = objProductConfig.editInternalName;
    const strBaseClassName = 'fw-field-editor';
    const objFieldBuilder = fieldBuilderOptions;

    /** Adding extra check for status type */
    const isStatusType = checkIfCustomToggleField(
      this.productName,
      objFormValue.name
    );
    const strInputLabel = hasCustomProperty(objFieldBuilder, 'label')
      ? objFieldBuilder.label
      : '';
    const boolDIsableInputLabel = isDefaultNonCustomField || !boolEditAllowed;
    const boolDisableDropdowns = isDefaultNonCustomField || !boolEditAllowed;

    const strFieldType = hasCustomProperty(objFieldBuilder, 'type')
      ? objFieldBuilder.type
      : '';

    const isDropdownType =
      strFieldType === 'DROPDOWN' || strFieldType === 'MULTI_SELECT'
        ? true
        : false;

    let boolIgnoreDropdownChoices = false;
    if (
      hasCustomProperty(objProductConfig, 'dropdownFieldWithoutChoicesKey') &&
      objProductConfig.dropdownFieldWithoutChoicesKey !== ''
    ) {
      const ignoreChoicesValue = getNestedKeyValueFromObject(
        objFormValue,
        objProductConfig.dropdownFieldWithoutChoicesKey
      );
      if (ignoreChoicesValue || ignoreChoicesValue === 'true') {
        boolIgnoreDropdownChoices = true;
      }
    }

    // Dependent Level checks
    const level = fieldBuilderOptions?.field_options?.level;
    const dictElName = this.isDependentField ? `name_level_${level}` : 'name';

    const elementStatusToggle = isStatusType
      ? this.renderStatusToggle(objFormValue)
      : null;

    const elementDropdown =
      isDropdownType && !boolIgnoreDropdownChoices
        ? this.renderDropdown(boolDisableDropdowns, fieldBuilderOptions)
        : null;

    const boolShowLabelError =
      this.showErrors && this.labelErrorMessage && this.labelErrorMessage !== ''
        ? true
        : false;
    const strInputHint = this.isPrimaryField
      ? i18nText('primaryFieldNameHint')
      : '';
    const strInputError = boolShowLabelError ? this.labelErrorMessage : '';
    const boolShowLabelWarning =
      !boolShowLabelError &&
      this.labelWarningMessage &&
      this.labelWarningMessage !== ''
        ? true
        : false;
    const strInputWarning = boolShowLabelWarning
      ? this.labelWarningMessage
      : '';
    const numLabelMaxChars = objMaxLimits?.['maxLabelChars']?.count || 255;

    return (
      <div>
        <fw-input
          ref={(el) => (this.dictInteractiveElements[dictElName] = el)}
          class={`${strBaseClassName}-content-required-input`}
          placeholder={i18nText('fieldLabelPlaceholder')}
          label={i18nText('fieldLabel')}
          required={true}
          maxlength={numLabelMaxChars}
          value={strInputLabel}
          hintText={strInputHint}
          errorText={strInputError}
          warningText={strInputWarning}
          state={
            boolShowLabelError
              ? 'error'
              : boolShowLabelWarning
              ? 'warning'
              : 'normal'
          }
          disabled={boolDIsableInputLabel}
          onFwBlur={(el) => this.labelBlurHandler(el, level)}
          onFwInput={(el) => this.labelInputHandler(el, level)}
        ></fw-input>
        {boolSupportInternalName &&
          this.renderInternalName(
            objProductConfig,
            objMaxLimits,
            isDefaultNonCustomField,
            boolEditAllowed,
            fieldBuilderOptions
          )}
        {/* NEED TO CLEAN THIS UP ASAP */}
        {elementStatusToggle}
        {isDropdownType && (
          <div class={`${strBaseClassName}-content-dropdown`}>
            {elementDropdown}
          </div>
        )}
      </div>
    );
  }

  render() {
    if (!this.dataProvider || !this.fieldBuilderOptions) {
      return null;
    }

    const objProductPreset = formMapper[this.productName];
    const objProductLabels = objProductPreset.labels;
    const objProductConfig = objProductPreset.config;

    const objFieldBuilder = this.fieldBuilderOptions;
    const objFormValue = this.dataProvider;
    const boolNewField = this.isNewField;
    const strFieldType =
      objFieldBuilder?.field_options?.dependent &&
      hasCustomProperty(objFieldBuilder, 'type')
        ? 'DEPENDENT_FIELD'
        : objFieldBuilder.type;
    const boolEnableSaveBtn =
      boolNewField || this.isValuesChanged ? true : false;
    const boolShowFieldValidationError =
      this.formErrorMessage && this.formErrorMessage !== '' ? true : false;
    const boolRequiredField =
      !boolNewField && hasCustomProperty(objFieldBuilder, 'required')
        ? objFieldBuilder.required
        : false;

    const isDefaultNonCustomField =
      objProductConfig?.showDefaultTag &&
      objProductConfig?.defaultTagKey &&
      objProductConfig.defaultTagKey !== '' &&
      hasCustomProperty(objFormValue, objProductConfig.defaultTagKey) &&
      !objFormValue[objProductConfig.defaultTagKey];

    const boolEditAllowed =
      this.isNewField || hasPermission(this.role, this.permission, 'EDIT');
    const boolDeleteAllowed = hasPermission(
      this.role,
      this.permission,
      'DELETE'
    );
    const boolDisableDelete = !boolDeleteAllowed;

    const boolShowDeleteModalInlineMsg =
      objProductConfig?.showDeleteModalInlineMessage;
    const strDeleteModalTitleText =
      objProductConfig?.showFieldLabelInDeleteModalTitle
        ? i18nText(objProductLabels.deleteFieldModalHeader, {
            label: objFormValue?.label,
          })
        : i18nText(objProductLabels.deleteFieldModalHeader);
    const strDeleteModalMessage = i18nText(
      objProductLabels.deleteFieldModalMessage
    );
    const strDeleteModalInlineMessage = boolShowDeleteModalInlineMsg
      ? i18nText('deleteFieldInlineMessage')
      : '';

    let strHeaderLabel = '';
    if (boolNewField) {
      const dbFieldTypeData = objProductPreset?.fieldProps[strFieldType];
      const strFieldTypeHeaderLabel = hasCustomProperty(
        dbFieldTypeData,
        'display_label'
      )
        ? dbFieldTypeData.display_label
        : '';

      strHeaderLabel = this.isPrimaryField
        ? i18nText('primaryFieldHeader')
        : strFieldTypeHeaderLabel && strFieldTypeHeaderLabel !== ''
        ? i18nText(strFieldTypeHeaderLabel)
        : '';
    } else {
      strHeaderLabel = objFormValue.label;
    }
    const boolShowCancelBtn =
      !this.isPrimaryField || (this.isPrimaryField && !boolNewField)
        ? true
        : false;
    const strSaveBtnLabel = boolNewField
      ? i18nText('addFieldBtn')
      : i18nText('saveFieldBtn');

    const arrCheckboxes = hasCustomProperty(objFieldBuilder, 'checkboxes')
      ? objFieldBuilder.checkboxes
      : null;
    let fwLabelItems =
      !this.expanded && arrCheckboxes && arrCheckboxes.length > 0
        ? arrCheckboxes.map((dataItem) => this.renderFwLabel(dataItem))
        : null;
    if (!this.expanded) {
      if (this.isPrimaryField) {
        const elPrimaryTag = this.renderFwLabel({
          key: 'primary',
          selected: true,
          tag: 'primaryFieldTag',
        });
        if (!fwLabelItems) {
          fwLabelItems = [elPrimaryTag];
        } else {
          fwLabelItems.unshift(elPrimaryTag);
        }
      } else if (strFieldType === 'RELATIONSHIP') {
        const boolUniqueField = hasCustomProperty(objFieldBuilder, 'unique')
          ? objFieldBuilder.unique
          : false;
        if (boolUniqueField) {
          const elLookupUniqueTag = this.renderFwLabel({
            key: 'unique',
            selected: true,
            tag: 'lookupUniqueTag',
          });
          if (!fwLabelItems) {
            fwLabelItems = [elLookupUniqueTag];
          } else {
            fwLabelItems.push(elLookupUniqueTag);
          }
        }
      } else if (isDefaultNonCustomField) {
        const elDefaultCustomTag = this.renderFwLabel({
          key: 'customDefault',
          selected: true,
          tag: objProductConfig.defaultTagLabel,
        });
        if (!fwLabelItems) {
          fwLabelItems = [elDefaultCustomTag];
        } else {
          fwLabelItems.push(elDefaultCustomTag);
        }
      }
    }

    const strBaseClassName = 'fw-field-editor';
    let strComponentClassName = strBaseClassName;
    if (boolRequiredField) {
      strComponentClassName += ` ${strBaseClassName}--required`;
    }
    if (this.isPrimaryField) {
      strComponentClassName += ` ${strBaseClassName}--primary`;
    }
    if (this.expanded) {
      strComponentClassName += ` ${strBaseClassName}--expanded`;
    } else if (this.disabled) {
      strComponentClassName += ` ${strBaseClassName}--disabled`;
    } else if (this.isDeleting) {
      strComponentClassName += ` ${strBaseClassName}--deleting`;
    } else if (this.disabledSort) {
      strComponentClassName += ` ${strBaseClassName}--disabled-sort`;
    }

    let strFooterClassName = `${strBaseClassName}-footer`;
    if (boolShowFieldValidationError) {
      strFooterClassName += ` ${strBaseClassName}-footer-with-error`;
    }

    const boolDisableDropdowns = isDefaultNonCustomField || !boolEditAllowed;
    const checkboxItems =
      arrCheckboxes && arrCheckboxes.length > 0
        ? arrCheckboxes.map((dataItem) => this.renderCheckboxField(dataItem))
        : null;

    const isLookupType = strFieldType === 'RELATIONSHIP';
    const elementRelationship = isLookupType
      ? this.renderLookup(boolDisableDropdowns)
      : null;

    const fieldIcon = this.isDependentField
      ? presetSchema.fieldTypes.DEPENDENT_FIELD.icon
      : objFieldBuilder.icon;

    const dependentFieldClass = this.isDependentField
      ? 'flex flex-space-between'
      : '';

    return (
      <Host tabIndex='-1'>
        <div
          class={strComponentClassName}
          ref={(el) => (this.divFieldBase = el)}
          onDragEnd={this.stopParentDragging}
          onDrop={this.stopParentDragging}
        >
          <div class={`${strBaseClassName}-header`}>
            <div
              role='none'
              class={`${strBaseClassName}-drag-container`}
              onMouseDown={this.startParentDragging}
            >
              <fw-icon size={14} name='drag' color='#CFD7DF' />
            </div>
            <div
              class={`${strBaseClassName}-header-content`}
              onClick={this.expandHandler}
            >
              <span
                class={`${strBaseClassName}-icon-container`}
                style={{ backgroundColor: fieldIcon.bg_color }}
              >
                <fw-icon size={14} name={fieldIcon.name} color='#475867' />
              </span>
              <label class={`${strBaseClassName}-label`}>
                {strHeaderLabel}
              </label>
              {!this.expanded && (
                <div class={`${strBaseClassName}-key-fw-labels`}>
                  {fwLabelItems}
                </div>
              )}
            </div>
            {!this.expanded &&
              !this.isPrimaryField &&
              !this.isDeleting &&
              !isDefaultNonCustomField && (
                <fw-button
                  part='delete-field-btn'
                  size='icon'
                  color='secondary'
                  disabled={boolDisableDelete}
                  class={`${strBaseClassName}-delete-button`}
                  onFwClick={this.deleteFieldClickHandler}
                >
                  <fw-icon name='delete'></fw-icon>
                </fw-button>
              )}
            {/* {!this.expanded && isDefaultNonCustomField && (
              <span class={`${strBaseClassName}-lock-container`}>
                <fw-icon name='lock'></fw-icon>
              </span>
            )} */}
            {!this.expanded && !this.isPrimaryField && this.isDeleting && (
              <fw-spinner
                class={`${strBaseClassName}-deleting-state`}
                size='medium'
                color='#d72d30'
              ></fw-spinner>
            )}
          </div>
          {this.expanded && (
            <div class={`${strBaseClassName}-body`}>
              <div class={`${strBaseClassName}-content`}>
                <div class={`${strBaseClassName}-content-required`}>
                  <div class={`${strBaseClassName}-content-checkboxes`}>
                    <label
                      class={`${strBaseClassName}-content-checkboxes-header-label`}
                    >
                      {i18nText('behaviour')}
                    </label>
                    {checkboxItems}
                  </div>
                  {isLookupType && (
                    <div class={`${strBaseClassName}-content-lookup`}>
                      {elementRelationship}
                    </div>
                  )}
                  <div class={dependentFieldClass}>
                    {this.renderFieldContent(
                      objProductConfig,
                      isDefaultNonCustomField,
                      boolEditAllowed
                    )}
                  </div>
                </div>
              </div>
              <div class={strFooterClassName}>
                {boolShowFieldValidationError && (
                  <span
                    class={`${strBaseClassName}-footer-field-error-container`}
                  >
                    <fw-icon size={12} name='warning' color='#d72d30' />
                    <label class={`${strBaseClassName}-footer-field-error-msg`}>
                      {this.formErrorMessage}
                    </label>
                  </span>
                )}
                <span class={`${strBaseClassName}-footer-buttons-container`}>
                  {boolShowCancelBtn && (
                    <fw-button
                      id='clearFieldBtn'
                      color='secondary'
                      onFwClick={this.cancelFieldHandler}
                    >
                      {i18nText('cancelFieldBtn')}
                    </fw-button>
                  )}
                  <fw-button
                    id='submitFieldBtn'
                    color='primary'
                    loading={this.isLoading}
                    disabled={!boolEnableSaveBtn}
                    onFwClick={this.addFieldHandler}
                  >
                    {strSaveBtnLabel}
                  </fw-button>
                </span>
              </div>
            </div>
          )}
        </div>
        <fw-modal
          ref={(el) => (this.modalConfirmDelete = el)}
          icon='delete'
          submitColor='danger'
          hasCloseIconButton={false}
          titleText={strDeleteModalTitleText}
          submitText={i18nText('deleteFieldSubmit')}
          onFwSubmit={this.confirmDeleteFieldHandler}
        >
          <span class={'fw-field-editor-delete-modal-content'}>
            {boolShowDeleteModalInlineMsg && (
              <fw-inline-message open type='warning'>
                {strDeleteModalInlineMessage}
              </fw-inline-message>
            )}
            {strDeleteModalMessage}
          </span>
        </fw-modal>
      </Host>
    );
  }
}
