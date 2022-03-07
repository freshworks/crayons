export default {
  datepicker: {
    cancel: 'Cancel',
    update: 'Update',
    to: 'to',
  },
  dropdown: {
    add: 'Add',
    cancel: 'Cancel',
  },
  modal: {
    cancel: 'Cancel',
    ok: 'OK',
  },
  search: {
    search: 'Search',
    noItemsFound: 'No items found',
    noDataAvailable: 'No data available',
  },
  form: {
    required: '{{field}} is required',
    invalidUrl: 'Enter a valid URL',
    invalidEmail: 'Enter a valid email',
    invalidNumber: 'Enter a valid number',
  },
  pagination: {
    buttonGroupLabel: 'Pagination controls',
    previousButtonLabel: 'Previous',
    nextButtonLabel: 'Next',
    content: `<span class='record'>{{start}}</span> to <span class='record'>{{end}}</span> of {{total}}`,
  },
  datatable: {
    chooseColumns: 'Choose columns',
    actions: 'Actions',
  },
  platformTable: {
    delete: 'Delete',
    sortby: 'Sort By',
    orderby: 'Order by',
  },
  formBuilder: {
    fieldRequired: 'Required when submitting the form',
    fieldRequiredTag: 'Required',
    fieldUnique: 'Accept unique values',
    fieldUniqueHoverText:
      'If set, the system will not let two records have the same value for the field. Please note that this behaviour cannot be updated once the field is created.',
    fieldUniqueTag: 'Unique',
    fieldFilter: 'Display in filters',
    fieldFilterHoverText:
      'If set, you can filter your records list view using this field. Please note that this behaviour cannot be updated once the field is created.',
    fieldFilterTag: 'Filterable',
    fieldTypeRelationship: 'Lookup Relationship',
    fieldTypeRelationshipDesc:
      'Create relationships between objects using a lookup field',
    fieldTypeRelationshipDescHoverText:
      'This field will allow users to click on a lookup icon to select a value from a list. The target object is the source of the values in the list.',
    fieldTypeText: 'Text',
    fieldTypeParagraph: 'Paragraph',
    fieldTypeNumber: 'Number',
    fieldTypeDecimal: 'Decimal',
    fieldTypeDate: 'Date',
    fieldTypeDropdown: 'Dropdown',
    fieldTypeCheckbox: 'Checkbox',
    fieldTypeMultiselect: 'Multi select',
    lookupUniqueTag: 'Unique',
    primaryFieldTag: 'Primary Field',
    primaryFieldHeader: 'Primary Field',
    primaryFieldNameHint:
      "This is the object's primary field and cannot be deleted. It is meant to be a unique representation of each record and will appear in lookups and search results.",
    deleteFieldTitle: 'Are you sure you want to delete the field',
    deleteFieldMessage:
      'This field will be permanently deleted and all associated data will be lost. Do you still want to continue?',
    deleteFieldSubmit: 'Delete',
    searchFields: 'Search Fields',
    customizeWidget: 'Customize Widget',
    addChoices: 'Add Choices',
    addChoice: 'Add Choice',
    choicePlaceholderSuffix: 'Choice',
    headerFieldTypes: 'Field types',
    headerFields: 'Fields',
    fieldTypesDragDrop: 'Drag and drop from here',
    behaviour: 'Behaviour',
    fieldLabel: 'Field Label',
    fieldLabelPlaceholder: 'Enter the label name',
    addFieldBtn: 'Add Field',
    saveFieldBtn: 'Save',
    cancelFieldBtn: 'Cancel',
    disabledFilterCheck:
      'Unique fields will always be available for filtering records in the list view',
    lookupSourceObject: 'Source object',
    lookupRelationshipPlaceholder: 'Select relationship',
    lookupRelationshipLabel: 'Relationship type',
    lookupTargetPlaceholder: 'Select target object',
    lookupTargetLabel: 'Target object',
    dropdownChoiceDeleteMessage:
      'Deleting a choice will impact related tickets, automation and reports.',
    relationshipManyToOne: 'Many to one',
    relationshipManyToOneDesc:
      'Link many records of the source object with one record of the target object. i.e Many tickets can be created by a customer.',
    relationshipOneToOne: 'One to one',
    relationshipOneToOneDesc:
      'Link one record of the source object with only one record of the target object. i.e An individual can have only one Passport.',
    customizeWidgetModalHeader: 'Customize Widget',
    customizeWidgetModalHint:
      'Select upto 5 fields to display on the widget and search results',
    customizeWidgetModalSaveBtn: 'Save',
    customizeWidgetModalCancelBtn: 'Cancel',
    errors: {
      empty: 'This field name is mandatory!',
      duplicate: 'Dropdown choice already exists!',
      minimum: 'Enter a minimum of one choice!',
      formErrors: 'Form contains errors!',
      fieldNameExists: 'A field with the same label already exists!',
    },
    maximumLimits: {
      filterable:
        'Maximum of 25 fields can be used to filter records in the list view.',
      unique: 'Maximum of 5 fields can be marked as unique.',
      fields:
        'Reached maximum limit of 100 fields. Delete an existing field to create a new one.',
      lookups:
        'Reached maximum limit of 5 lookup fields. Delete an existing lookup field to create a new one.',
    },
  },
};
