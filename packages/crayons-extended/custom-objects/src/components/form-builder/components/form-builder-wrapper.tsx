/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component, Prop, h, State, Method } from '@stencil/core';
import { create_UUID } from '../utils/form-builder-utils';

@Component({
  tag: 'fw-form-builder-wrapper',
  shadow: true,
})
export class FormBuilder {
  /**
   * variable to store form values
   */
  @Prop({ mutable: true }) formValues = null;
  /**
   * object to store the lookup target entities
   */
  @Prop({ mutable: true }) lookupTargetObjects = null;
  /**
   * svg image to be shown for empty record
   */
  @Prop() emptySearchImage = null;
  /**
   * State to store the expanded field index
   */
  @State() expandedFieldIndex = -1;
  /**
   * variable to store customize widget fields
   */
  @State() customizeWidgetFields = null;
  /**
   * flag to notify if an api call is in progress
   */
  @State() isLoading = false;
  /**
   * flag to notify if an api call to save the widget is completed
   */
  @State() isSavingCustomizeWidget = false;

  /**
   * Method to get the updated form values
   */
  @Method()
  async getFormValues(): Promise<any> {
    return this.formValues;
  }

  private onComposeNewField = (event) => {
    const objDetail = event.detail;
    let intAddedIndex = -1;
    let arrFields = [...(this.formValues?.fields || [])];
    const intIndex = objDetail.index;
    const objDefaultField = objDetail.fieldSchema;
    objDefaultField.isNew = true;
    objDefaultField.id = 'new-field';

    if (arrFields.length === 0 || intIndex < 0 || intIndex > arrFields.length) {
      arrFields = [...arrFields, objDefaultField];
      intAddedIndex = arrFields.length - 1;
    } else {
      arrFields = [
        ...arrFields.slice(0, intIndex),
        objDefaultField,
        ...arrFields.slice(intIndex),
      ];
      intAddedIndex = intIndex;
    }
    if (intAddedIndex !== -1) {
      this.formValues = { ...(this.formValues || {}), fields: arrFields };
      this.expandedFieldIndex = intAddedIndex;
    }
  };

  private deleteNewLocalFieldAtIndex = (intIndex) => {
    let arrFields = [...(this.formValues?.fields || [])];
    if (
      arrFields &&
      arrFields.length > 0 &&
      intIndex < arrFields.length &&
      arrFields[intIndex]?.isNew === true
    ) {
      arrFields = [
        ...arrFields.slice(0, intIndex),
        ...arrFields.slice(intIndex + 1),
      ];
      this.formValues = { ...(this.formValues || {}), fields: arrFields };
    }
  };

  private onExpandField = (event) => {
    const objDetail = event.detail;
    const intIndex = objDetail.index;
    const boolExpanded = objDetail.expanded;
    this.expandedFieldIndex = boolExpanded ? intIndex : -1;
    if (!boolExpanded && objDetail.isNew && intIndex > -1) {
      this.deleteNewLocalFieldAtIndex(intIndex);
    }
  };

  private onDeleteField = (event) => {
    this.isLoading = true;
    const arrFields = [...(this.formValues?.fields || [])];
    arrFields.splice(event.detail.index, 1);
    this.formValues = { ...(this.formValues || {}), fields: arrFields };
    this.isLoading = false;
  };

  private onSaveField = (event) => {
    this.isLoading = true;
    let arrFields = [...(this.formValues?.fields || [])];
    const objDetail = event.detail;
    const objFormValues = objDetail.value;
    const boolNewField = objDetail.isNew;
    const intIndex = Object.prototype.hasOwnProperty.call(objDetail, 'index')
      ? objDetail.index
      : -1;
    let intAddedIndex = intIndex;
    const isPrimaryField = !!(
      Object.prototype.hasOwnProperty.call(objFormValues, 'isPrimaryField') &&
      objFormValues.isPrimaryField === true
    );
    const strFieldLabel = objFormValues.name;
    const strFieldType = !isPrimaryField ? objFormValues.type : 'PRIMARY';
    const boolFilterable = Object.prototype.hasOwnProperty.call(
      objFormValues,
      'filterable'
    )
      ? objFormValues.filterable
      : false;
    const boolUnique = Object.prototype.hasOwnProperty.call(
      objFormValues,
      'unique'
    )
      ? objFormValues.unique
      : false;
    const arrChoices =
      Object.prototype.hasOwnProperty.call(objFormValues, 'choices') &&
      objFormValues.choices &&
      objFormValues.choices.length > 0
        ? [...objFormValues.choices]
        : [];

    const strRemovedSpecialChars = strFieldLabel.replace(/[^a-zA-Z0-9 ]/g, '');
    const strGeneratedFieldName = strRemovedSpecialChars
      .split(' ')
      .join('_')
      .toLowerCase();

    // make the api call to save the new/edited field data in the DB
    // Temp - updating local field
    let objUpdatedField = null;
    this.deleteNewFieldFromPayload(arrFields);

    if (boolNewField) {
      objUpdatedField = {
        id: '',
        name: '',
        label: '',
        type: '',
        required: false,
        filterable: false,
        editable: true,
        visible: false,
        deleted: false,
        link: null,
        placeholder: null,
        hint: null,
        field_options: { unique: false },
        searchable: true,
        parent_id: null,
        choices: [],
      };
      if (strFieldType === 'DECIMAL') {
        objUpdatedField.searchable = false;
      }
      // Name and ID Needs to be generated at the backend
      objUpdatedField.name = strGeneratedFieldName;
      objUpdatedField.id = create_UUID();
    } else {
      if (arrFields && intAddedIndex >= 0 && intAddedIndex < arrFields.length) {
        objUpdatedField = arrFields[intAddedIndex];
      } else {
        console.error('Field not found in entity object..');
        return null;
      }
    }

    let boolUpdateUniqueValue = true;
    if (strFieldType === 'RELATIONSHIP') {
      // update lookup relationship data if its a new Field
      if (boolNewField) {
        const objRelationshipValues = objFormValues.relationship;
        objUpdatedField.related_entity_id = objRelationshipValues.target;
        objUpdatedField.relationship_name = strGeneratedFieldName; // needs to be unique within the entity
        objUpdatedField.child_relationship_name = `${strGeneratedFieldName}_${new Date().getTime()}`; // needs to be unique within the entity
        objUpdatedField.field_options.unique =
          objRelationshipValues.relationship === 'one_to_one';
      }
      boolUpdateUniqueValue = false;
    }

    objUpdatedField.type = strFieldType;
    objUpdatedField.label = strFieldLabel;
    objUpdatedField.required = objFormValues.required;
    objUpdatedField.filterable = boolFilterable;
    objUpdatedField.choices = arrChoices;
    if (boolUpdateUniqueValue) {
      objUpdatedField.field_options.unique = boolUnique;
    }

    if (boolNewField) {
      // validate if the array is empty or the passed index is invalid - if true -push the element at the end of the array
      if (
        arrFields.length === 0 ||
        intIndex < 0 ||
        intIndex > arrFields.length
      ) {
        arrFields = [...arrFields, objUpdatedField];
        intAddedIndex = arrFields.length - 1;
      } else {
        // store the element at the passed index
        arrFields = [
          ...arrFields.slice(0, intIndex),
          objUpdatedField,
          ...arrFields.slice(intIndex),
        ];
        intAddedIndex = intIndex;
      }
    }

    this.expandedFieldIndex = -1;
    this.formValues = { ...(this.formValues || {}), fields: arrFields };
    this.isLoading = false;
  };

  // delete local field which was added if there are no fields present
  private deleteNewFieldFromPayload = (arrFields) => {
    try {
      const intNewFieldIndex = arrFields.findIndex(
        (e) => e.id === 'new-field' && e.isNew === true
      );
      if (intNewFieldIndex > -1) {
        arrFields.splice(intNewFieldIndex, 1);
      }
    } catch (error) {
      console.error('Error in deleting new field from payload' + error);
    }
  };

  private onRepositionField = (event) => {
    const objDetail = event.detail;
    const intSourceIndex = objDetail.sourceIndex;
    const intTargetIndex = objDetail.targetIndex;
    if (intSourceIndex === intTargetIndex) {
      return;
    }

    try {
      const arrFields = [...(this.formValues?.fields || [])];
      const objField = arrFields.splice(intSourceIndex, 1)[0];
      arrFields.splice(intTargetIndex, 0, objField);
      this.formValues = { ...(this.formValues || {}), fields: arrFields };
    } catch (error) {
      console.error('Error in repositioning field ' + error);
    }
  };

  private onSaveWidgetFields = (event) => {
    this.customizeWidgetFields = event.detail;
    this.isSavingCustomizeWidget = false;
  };

  render() {
    return (
      <fw-form-builder
        formValues={this.formValues}
        lookupTargetObjects={this.lookupTargetObjects}
        emptySearchImage={this.emptySearchImage}
        expandedFieldIndex={this.expandedFieldIndex}
        customizeWidgetFields={this.customizeWidgetFields}
        isLoading={this.isLoading}
        isSavingCustomizeWidget={this.isSavingCustomizeWidget}
        onFwComposeNewField={this.onComposeNewField}
        onFwExpandField={this.onExpandField}
        onFwDeleteField={this.onDeleteField}
        onFwSaveField={this.onSaveField}
        onFwRepositionField={this.onRepositionField}
        onFwSaveWidgetFields={this.onSaveWidgetFields}
      ></fw-form-builder>
    );
  }
}
