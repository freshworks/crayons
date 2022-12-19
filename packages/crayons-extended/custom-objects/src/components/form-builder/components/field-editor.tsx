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
  getMaximumLimitsConfig,
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

  private modalConfirmDelete!: any;
  private divFieldBase: HTMLElement;
  private dictInteractiveElements;
  private isNewField = false;
  private oldFormValues;
  private errorType;

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
   * State to show name label input error message
   */
  @State() nameErrorMessage = '';
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
    this.oldFormValues = this.dataProvider
      ? deepCloneObject(this.dataProvider)
      : null;

    if (this.dataProvider) {
      const objDP = this.dataProvider;
      this.isNewField =
        hasCustomProperty(objDP, 'isNew') && objDP['isNew'] === true
          ? true
          : false;

      if (this.isNewField) {
        this.setCheckboxesAvailability(deepCloneObject(this.dataProvider));
      } else {
        const strFieldLabel = this.dataProvider.label;
        const objDefaultFieldTypeSchema = deepCloneObject(
          this.defaultFieldTypeSchema
        );
        objDefaultFieldTypeSchema.choices =
          hasCustomProperty(this.dataProvider, 'choices') &&
          this.dataProvider.choices.length > 0
            ? deepCloneObject(this.dataProvider.choices)
            : [];

        objDefaultFieldTypeSchema.label = strFieldLabel;
        this.setCheckboxesAvailability(objDefaultFieldTypeSchema);
      }
    } else {
      this.isNewField = false;
      this.fieldBuilderOptions = null;
    }
  }

  componentWillLoad(): void {
    this.watchDataproviderChangeHandler();
    this.dictInteractiveElements = {};
  }

  private getInterpolatedMaxLimitLabel = (strProperty) => {
    if (strProperty && strProperty !== '') {
      try {
        const objMaxLimits = getMaximumLimitsConfig(this.productName);
        const objMaxLimitField = objMaxLimits?.[strProperty];
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
      if (value) {
        this.divFieldBase.setAttribute('draggable', 'true');
      } else {
        this.divFieldBase.removeAttribute('draggable');
      }
    }
  };

  /**
   * function to validate the name input error values
   */
  private validateNameErrors = (strInputValue) => {
    if (!strInputValue) {
      this.nameErrorMessage = i18nText('errors.emptyFieldName');
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
          this.nameErrorMessage = i18nText('errors.fieldNameExists');
          return false;
        }
      } catch (error) {
        console.error(`Error occured in validateNameErrors: ${error}`);
      }
    }
    this.nameErrorMessage = '';
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
          if (key === 'name') {
            const strInputValue = elInteractive.value;
            boolValidForm = this.validateNameErrors(strInputValue);
            if (boolValidForm) {
              this.nameErrorMessage = '';
              objValues[key] = elInteractive.value || '';
            } else {
              this.showErrors = true;
              return;
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

    if (boolValidForm) {
      this.nameErrorMessage = '';
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
      this.nameErrorMessage = '';
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
    this.modalConfirmDelete?.open();
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

  private nameInputHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.isValuesChanged = true;
    const strInputValue = event?.detail?.value || '';
    this.fieldBuilderOptions = {
      ...this.fieldBuilderOptions,
      label: strInputValue,
    };

    if (this.showErrors) {
      this.validateNameErrors(strInputValue);
    }
  };

  private nameBlurHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const strInputValue = event?.target?.['value']?.trim() || '';
    this.fieldBuilderOptions = {
      ...this.fieldBuilderOptions,
      label: strInputValue,
    };

    if (this.showErrors) {
      this.validateNameErrors(strInputValue);
    }
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
          disabled={!dataCheckbox.enabled}
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

  private renderDropdown() {
    const objFormValue = this.fieldBuilderOptions;

    return (
      <fw-fb-field-dropdown
        ref={(el) => (this.dictInteractiveElements['choices'] = el)}
        dataProvider={objFormValue.choices}
        showErrors={this.showErrors}
        onFwChange={this.dropdownChangeHandler}
      ></fw-fb-field-dropdown>
    );
  }

  private renderLookup() {
    const objFormValue = this.dataProvider;

    return (
      <fw-fb-field-lookup
        ref={(el) => (this.dictInteractiveElements['relationship'] = el)}
        targetObjects={this.lookupTargetObjects}
        sourceObjectName={this.entityName}
        showErrors={this.showErrors}
        onFwChange={this.lookupChangeHandler}
        formValues={objFormValue}
      ></fw-fb-field-lookup>
    );
  }

  private renderContent() {
    if (!this.expanded) {
      return null;
    }
    const strBaseClassName = 'fw-field-editor';
    const objFieldBuilder = this.fieldBuilderOptions;
    const strInputValue = hasCustomProperty(objFieldBuilder, 'label')
      ? objFieldBuilder.label
      : '';

    const arrCheckboxes = hasCustomProperty(objFieldBuilder, 'checkboxes')
      ? objFieldBuilder.checkboxes
      : null;
    const checkboxItems =
      arrCheckboxes && arrCheckboxes.length > 0
        ? arrCheckboxes.map((dataItem) => this.renderCheckboxField(dataItem))
        : null;

    const strFieldType = hasCustomProperty(objFieldBuilder, 'type')
      ? objFieldBuilder.type
      : '';

    const isDropdownType =
      strFieldType === 'DROPDOWN' || strFieldType === 'MULTI_SELECT'
        ? true
        : false;
    const elementDropdown = isDropdownType ? this.renderDropdown() : null;

    const isLookupType = strFieldType === 'RELATIONSHIP';
    const elementRelationship = isLookupType ? this.renderLookup() : null;

    const boolShowNameError =
      this.showErrors && this.nameErrorMessage && this.nameErrorMessage !== ''
        ? true
        : false;
    const strInputHint = this.isPrimaryField
      ? i18nText('primaryFieldNameHint')
      : '';
    const strInputError = boolShowNameError ? this.nameErrorMessage : '';

    return (
      <div class={`${strBaseClassName}-content-required`}>
        <div class={`${strBaseClassName}-content-checkboxes`}>
          <label class={`${strBaseClassName}-content-checkboxes-header-label`}>
            {i18nText('behaviour')}
          </label>
          {checkboxItems}
        </div>
        {isLookupType && (
          <div class={`${strBaseClassName}-content-lookup`}>
            {elementRelationship}
          </div>
        )}
        <fw-input
          ref={(el) => (this.dictInteractiveElements['name'] = el)}
          class={`${strBaseClassName}-content-required-input`}
          placeholder={i18nText('fieldLabelPlaceholder')}
          label={i18nText('fieldLabel')}
          required={true}
          maxlength={255}
          value={strInputValue}
          hintText={strInputHint}
          errorText={strInputError}
          state={boolShowNameError ? 'error' : 'normal'}
          onFwBlur={this.nameBlurHandler}
          onFwInput={this.nameInputHandler}
        ></fw-input>
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
    const objProductConfig = objProductPreset.config;

    const objFieldBuilder = this.fieldBuilderOptions;
    const objFormValue = this.dataProvider;
    const boolNewField = this.isNewField;
    const strFieldType = hasCustomProperty(objFieldBuilder, 'type')
      ? objFieldBuilder.type
      : '';
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

    let strHeaderLabel = '';
    if (boolNewField) {
      strHeaderLabel = this.isPrimaryField
        ? i18nText('primaryFieldHeader')
        : hasCustomProperty(objFormValue, 'display_label')
        ? i18nText(objFormValue.display_label)
        : '';
    } else {
      strHeaderLabel = objFormValue.label;
    }
    const boolShowCancelBtn =
      !this.isPrimaryField || (this.isPrimaryField && !boolNewField)
        ? true
        : false;
    const strDeleteModalTitleText = i18nText('deleteFieldTitle', {
      label: objFormValue?.label,
    });
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
                style={{
                  backgroundColor: objFieldBuilder.icon.bg_color,
                }}
              >
                <fw-icon
                  size={14}
                  name={objFieldBuilder.icon.name}
                  color='#475867'
                />
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
                  size='icon'
                  color='secondary'
                  class={`${strBaseClassName}-delete-button`}
                  onFwClick={this.deleteFieldClickHandler}
                >
                  <fw-icon name='delete'></fw-icon>
                </fw-button>
              )}
            {!this.expanded && isDefaultNonCustomField && (
              <span class={`${strBaseClassName}-lock-container`}>
                <fw-icon name='lock'></fw-icon>
              </span>
            )}
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
                {this.renderContent()}
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
          {i18nText('deleteFieldMessage')}
        </fw-modal>
      </Host>
    );
  }
}
