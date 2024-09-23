// TYPES
[
      'PRIMARY', ==> same as 'TEXT'
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
]

// PRIMARY | TEXT | NUMBER | DECIMAL | PARAGRAPH | DATE | CHECKBOX

id, name, label, type, required, field_options (unique), filterable, display_label

// RELATIONSHIP

id, name, label, type, required, field_options (unique), filterable, related_entity_id, display_label

// PARAGRAPH

id, name, label, type, required, field_options (unique), filterable, display_label

// DROPDOWN | MULTI_SELECT

id, name, label, type, required, field_options (unique), filterable, display_label, choices

// --choices

id, value

// FORMSERV EQUIVALENT KEYS

type - NUMBER instead of STRING

/*

{
      'TEXT': 1,                 +
      'DROPDOWN': 2,             +
      'EMAIL': 3,                +
      'PHONE_NUMBER': 4,         
      'CHECKBOX': 5,             +
      'PARAGRAPH': 6,            +
      'DATE_TIME': 7,
      'NUMBER': 8,               +
      'URL': 10,
      'RADIO': 12,
      'DECIMAL': 13,             +
      'SECTION': 14,
      'AUTO_COMPLETE': 16,
      'DATE': 17,                +
      'MULTI_SELECT': 18,        +
      'BIG_NUMBER': 20,
}


// SUPPORTED TYPES EQUIVALENTS
{
      'TEXT': 1,                 +
      'DROPDOWN': 2,             +
      'EMAIL': 3,                +
      'CHECKBOX': 5,             +
      'PARAGRAPH': 6,            +
      'NUMBER': 8,               +
      'DECIMAL': 13,             +
      'DATE': 17,                +
      'MULTI_SELECT': 18,        +
}

*/


/*
{
      label: display_label,
}
*/
