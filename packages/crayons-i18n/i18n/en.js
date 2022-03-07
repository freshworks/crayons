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
    fbFieldRequired: 'Required when submitting the form',
    fbFieldRequiredTag: 'Required',
    fbFieldUnique: 'Accept unique values',
    fbFieldUniqueHoverText:
      'If set, the system will not let two records have the same value for the field. Please note that this behaviour cannot be updated once the field is created.',
    fbFieldUniqueTag: 'Unique',
    fbFieldFilter: 'Display in filters',
    fbFieldFilterHoverText:
      'If set, you can filter your records list view using this field. Please note that this behaviour cannot be updated once the field is created.',
    fbFieldFilterTag: 'Filterable',
    fbFieldTypeRelationship: 'Lookup Relationship',
    fbFieldTypeRelationshipDesc:
      'Create relationships between objects using a lookup field',
    fbFieldTypeRelationshipDescHoverText:
      'This field will allow users to click on a lookup icon to select a value from a list. The target object is the source of the values in the list.',
    fbFieldTypeText: 'Text',
    fbFieldTypeParagraph: 'Paragraph',
    fbFieldTypeNumber: 'Number',
    fbFieldTypeDecimal: 'Decimal',
    fbFieldTypeDate: 'Date',
    fbFieldTypeDropdown: 'Dropdown',
    fbFieldTypeCheckbox: 'Checkbox',
    fbFieldTypeMultiselect: 'Multi select',
    fbLookupUniqueTag: 'Unique',
    fbPrimaryFieldTag: 'Primary Field',
    fbPrimaryFieldHeader: 'Primary Field',
    fbPrimaryFieldNameHint:
      "This is the object's primary field and cannot be deleted. It is meant to be a unique representation of each record and will appear in lookups and search results.",
    fbDeleteFieldTitle: 'Are you sure you want to delete the field',
    fbDeleteFieldMessage:
      'This field will be permanently deleted and all associated data will be lost. Do you still want to continue?',
    fbDeleteFieldSubmit: 'Delete',
    fbSearchFields: 'Search Fields',
    fbCustomizeWidget: 'Customize Widget',
    fbAddChoices: 'Add Choices',
    fbAddChoice: 'Add Choice',
    fbChoicePlaceholderSuffix: 'Choice',
    fbHeaderFieldTypes: 'Field types',
    fbHeaderFields: 'Fields',
    fbFieldTypesDragDrop: 'Drag and drop from here',
    fbBehaviour: 'Behaviour',
    fbFieldLabel: 'Field Label',
    fbFieldLabelPlaceholder: 'Enter the label name',
    fbAddFieldBtn: 'Add Field',
    fbSaveFieldBtn: 'Save',
    fbCancelFieldBtn: 'Cancel',
    fbDisabledFilterCheck:
      'Unique fields will always be available for filtering records in the list view',
    fbLookupSourceObject: 'Source object',
    fbLookupRelationshipPlaceholder: 'Select relationship',
    fbLookupRelationshipLabel: 'Relationship type',
    fbLookupTargetPlaceholder: 'Select target object',
    fbLookupTargetLabel: 'Target object',
    fbDropdownChoiceDeleteMessage:
      'Deleting a choice will impact related tickets, automation and reports.',
    fbRelationshipManyToOne: 'Many to one',
    fbRelationshipManyToOneDesc:
      'Link many records of the source object with one record of the target object. i.e Many tickets can be created by a customer.',
    fbRelationshipOneToOne: 'One to one',
    fbRelationshipOneToOneDesc:
      'Link one record of the source object with only one record of the target object. i.e An individual can have only one Passport.',
    customizeWidgetModalHeader: 'Customize Widget',
    customizeWidgetModalHint:
      'Select upto 5 fields to display on the widget and search results',
    customizeWidgetModalSaveBtn: 'Save',
    customizeWidgetModalCancelBtn: 'Cancel',
    fbErrors: {
      empty: 'This field name is mandatory!',
      duplicate: 'Dropdown choice already exists!',
      minimum: 'Enter a minimum of one choice!',
      formErrors: 'Form contains errors!',
      fieldNameExists: 'A field with the same label already exists!',
    },
    fbMaximumLimits: {
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
