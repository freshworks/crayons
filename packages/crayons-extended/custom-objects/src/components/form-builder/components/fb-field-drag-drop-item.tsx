import { Component, Prop, h, Host, State } from '@stencil/core';
import { TranslationController } from '../../../global/Translation';
import formMapper from '../assets/form-mapper.json';
import {
  hasCustomProperty,
  isDropdownField,
} from '../utils/form-builder-utils';

@Component({
  tag: 'fb-field-drag-drop-item',
  styleUrl: 'fb-field-drag-drop-item.scss',
  shadow: true,
})
export class FormBuilderFieldDragDropItem {
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
   * flag to show dependentField resolve checkbox
   */
  @Prop({ mutable: true }) showDependentFieldResolveProp = false;
  /**
   * link to show dependent field document
   */
  @Prop() dependentFieldLink = '';
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
  /*
   * Beta flag to enable Dynamic sections
   */
  @Prop() dynamicSectionsBetaEnabled = false;
  /*
   * Handler function for on save field
   */
  @Prop() saveFieldHandler;
  /*
   * Handler function for on field delete
   */
  @Prop() deleteFieldHandler;
  /*
   * Handler function for on field expand
   */
  @Prop() expandFieldHandler;
  /*
   * Handler function for field drag and drop
   */
  @Prop() reorderFieldProgressHandler;
  /*
   * Unique key contains field id and index id
   */
  @Prop() keyProp;
  /*
   * Dynamic section expandable state
   */
  @State() sectionsExpanded = false;

  private setSectionsExpandState = (expanded) => {
    this.sectionsExpanded = expanded;
  };

  render() {
    const objProductPreset = formMapper[this.productName];
    const objProductConfig = objProductPreset.config;

    const isDefaultNonCustomField =
      objProductConfig?.showDefaultTag &&
      objProductConfig?.defaultTagKey &&
      objProductConfig.defaultTagKey !== '' &&
      hasCustomProperty(this.dataProvider, objProductConfig.defaultTagKey) &&
      !this.dataProvider[objProductConfig.defaultTagKey];

    const showSection =
      this.dynamicSectionsBetaEnabled &&
      !isDefaultNonCustomField &&
      isDropdownField(this.dataProvider);

    return (
      <Host tabIndex='-1'>
        <fw-field-editor
          index={this.index}
          key={this.keyProp}
          productName={this.productName}
          dataProvider={this.dataProvider}
          entityName={this.entityName}
          expanded={this.expanded}
          isPrimaryField={this.isPrimaryField}
          pinned={this.isPrimaryField ? 'top' : ''}
          disabled={this.disabled}
          disabledSort={this.disabledSort}
          permission={this.permission}
          role={this.role}
          enableUnique={this.enableUnique}
          enableFilterable={this.enableFilterable}
          defaultFieldTypeSchema={this.defaultFieldTypeSchema}
          lookupTargetObjects={this.lookupTargetObjects}
          formValues={this.formValues}
          isLoading={this.isLoading}
          sectionsExpanded={this.sectionsExpanded}
          showDependentFieldResolveProp={this.showDependentFieldResolveProp}
          dependentFieldLink={this.dependentFieldLink}
          dynamicSectionsBetaEnabled={this.dynamicSectionsBetaEnabled}
          setSectionsExpandStateHandler={this.setSectionsExpandState}
          showSection={showSection}
          isDefaultNonCustomField={isDefaultNonCustomField}
          onFwUpdate={this.saveFieldHandler}
          onFwDelete={this.deleteFieldHandler}
          onFwExpand={this.expandFieldHandler}
          onFwReorder={this.reorderFieldProgressHandler}
        ></fw-field-editor>
        {showSection && (
          <div class='fb-section-container'>
            <div class='fb-section-visibility'>
              {this.sectionsExpanded ? (
                <span class='fb-section-hide'>
                  {TranslationController.t('formBuilder.sections.hide')}
                </span>
              ) : (
                <span class='fb-section-show'>
                  {TranslationController.t('formBuilder.sections.show')}
                </span>
              )}
              <i class='fb-section-count'>1</i>
              <fw-icon
                class={{
                  'fb-section-arrow-down': !this.sectionsExpanded,
                }}
                size='10'
                name='chevron-up'
              ></fw-icon>
            </div>
            {this.sectionsExpanded && (
              <fb-section
                setSectionsExpandStateHandler={this.setSectionsExpandState}
                dataProvider={this.dataProvider}
              />
            )}
          </div>
        )}
      </Host>
    );
  }
}
