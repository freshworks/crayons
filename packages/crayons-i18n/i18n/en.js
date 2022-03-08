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
  fileUploader: {
    text: 'Upload file',
    description: 'or drag and drop here',
    acceptError: 'File format not accepted',
    maxFileSizeError: 'Exceeded maximum file size',
    maxFilesLimitError: 'Exceeding maximum files limit',
    fileUploadError: 'file upload failed',
    uploading: 'Uploading',
    selectedFiles: 'Selected files',
    remove: 'remove',
  },
  modal: {
    cancel: 'Cancel',
    ok: 'OK',
  },
  search: {
    search: 'Search',
    no_items_found: 'No items found',
    no_data_available: 'No data available',
  },
  form: {
    REQUIRED: '{{field}} is required',
    INVALID_URL: 'Enter a valid URL',
    INVALID_EMAIL: 'Enter a valid email',
    INVALID_NUMBER: 'Enter a valid number',
  },
  pagination: {
    buttonGroupLabel: 'Pagination controls',
    previousButtonLabel: 'Previous',
    nextButtonLabel: 'Next',
    content: `<span class='record'>{{start}}</span> to <span class='record'>{{end}}</span> of {{total}}`,
  },
  data_table: {
    choose_columns: 'Choose columns',
    actions: 'Actions',
  },
  platform_table: {
    delete: 'Delete',
    sortby: 'Sort By',
    orderby: 'Order by',
  },
  form_builder: {
    fb_field_required: 'Required when submitting the form',
    fb_field_required_tag: 'Required',
    fb_field_unique: 'Accept unique values',
    fb_field_unique_hover_text:
      'If set, the system will not let two records have the same value for the field. Please note that this behaviour cannot be updated once the field is created.',
    fb_field_unique_tag: 'Unique',
    fb_field_filter: 'Display in filters',
    fb_field_filter_hover_text:
      'If set, you can filter your records list view using this field. Please note that this behaviour cannot be updated once the field is created.',
    fb_field_filter_tag: 'Filterable',
    fb_field_type_relationship: 'Lookup Relationship',
    fb_field_type_relationship_desc:
      'Create relationships between objects using a lookup field',
    fb_field_type_relationship_desc_hover_text:
      'This field will allow users to click on a lookup icon to select a value from a list. The target object is the source of the values in the list.',
    fb_field_type_text: 'Text',
    fb_field_type_paragraph: 'Paragraph',
    fb_field_type_number: 'Number',
    fb_field_type_decimal: 'Decimal',
    fb_field_type_date: 'Date',
    fb_field_type_dropdown: 'Dropdown',
    fb_field_type_checkbox: 'Checkbox',
    fb_field_type_multiselect: 'Multi select',
    fb_lookup_unique_tag: 'Unique',
    fb_primary_field_tag: 'Primary Field',
    fb_primary_field_header: 'Primary Field',
    fb_primary_field_name_hint:
      "This is the object's primary field and cannot be deleted. It is meant to be a unique representation of each record and will appear in lookups and search results.",
    fb_delete_field_title: 'Are you sure you want to delete the field',
    fb_delete_field_message:
      'This field will be permanently deleted and all associated data will be lost. Do you still want to continue?',
    fb_delete_field_submit: 'Delete',
    fb_search_fields: 'Search Fields',
    fb_customize_widget: 'Customize Widget',
    fb_add_choices: 'Add Choices',
    fb_add_choice: 'Add Choice',
    fb_choice_placeholder_suffix: 'Choice',
    fb_header_field_types: 'Field types',
    fb_header_fields: 'Fields',
    fb_field_types_drag_drop: 'Drag and drop from here',
    fb_behaviour: 'Behaviour',
    fb_field_label: 'Field Label',
    fb_field_label_placeholder: 'Enter the label name',
    fb_add_field_btn: 'Add Field',
    fb_save_field_btn: 'Save',
    fb_cancel_field_btn: 'Cancel',
    fb_disabled_filter_check:
      'Unique fields will always be available for filtering records in the list view',
    fb_lookup_source_object: 'Source object',
    fb_lookup_relationship_placeholder: 'Select relationship',
    fb_lookup_relationship_label: 'Relationship type',
    fb_lookup_target_placeholder: 'Select target object',
    fb_lookup_target_label: 'Target object',
    fb_dropdown_choice_delete_message:
      'Deleting a choice will impact related tickets, automation and reports.',
    fb_relationship_many_to_one: 'Many to one',
    fb_relationship_many_to_one_desc:
      'Link many records of the source object with one record of the target object. i.e Many tickets can be created by a customer.',
    fb_relationship_one_to_one: 'One to one',
    fb_relationship_one_to_one_desc:
      'Link one record of the source object with only one record of the target object. i.e An individual can have only one Passport.',
    customize_widget_modal_header: 'Customize Widget',
    customize_widget_modal_hint:
      'Select upto 5 fields to display on the widget and search results',
    customize_widget_modal_save_btn: 'Save',
    customize_widget_modal_cancel_btn: 'Cancel',
    fb_errors: {
      empty: 'This field name is mandatory!',
      duplicate: 'Dropdown choice already exists!',
      minimum: 'Enter a minimum of one choice!',
      form_errors: 'Form contains errors!',
      field_name_exists: 'A field with the same label already exists!',
    },
    fb_maximum_limits: {
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
