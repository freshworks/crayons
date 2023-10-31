/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationController } from '../../../global/Translation';
import formMapper from '../assets/form-mapper.json';

// function to translate and return the language text
export function i18nText(strKey, context = {}) {
  try {
    if (strKey && context) {
      return TranslationController.t(`formBuilder.${strKey}`, context);
    } else if (strKey) {
      return TranslationController.t(`formBuilder.${strKey}`);
    }
  } catch (error) {
    console.warn(`unable to translate ${strKey} : `, error);
  }
  return '';
}

// function to check if the key is present in the object
export function hasCustomProperty(objSource, strProperty): boolean {
  if (
    strProperty &&
    strProperty !== '' &&
    objSource &&
    Object.prototype.hasOwnProperty.call(objSource, strProperty)
  ) {
    return true;
  }
  return false;
}

// function to check if the passed custom object is new
export function isNewEntity(objEntity): boolean {
  if (
    hasCustomProperty(objEntity, 'id') &&
    !isNaN(objEntity.id) &&
    objEntity.id > 0
  ) {
    return false;
  }
  return true;
}

// function to get the value from an object which has a "." separated key name as a string
export function getNestedKeyValueFromObject(objSource, strKey) {
  try {
    if (!strKey) {
      return '';
    }
    return strKey?.split('.').reduce((r, val) => {
      return r ? r[val] : undefined;
    }, objSource);
  } catch (error) {
    console.error(`Error occurred in getNestedKeyValueFromObject: ${error}`);
  }
  return '';
}

// function to deep clone an array or object
export function deepCloneObject(objSource) {
  try {
    return JSON.parse(JSON.stringify(objSource));
  } catch (error) {
    console.log('error deep cloning object - ' + error);
    return {};
  }
}

// function to check if the field is primary field type
export function isPrimaryFieldType(
  objField,
  productName = 'CUSTOM_OBJECTS',
  intIndex = -1,
  boolCheckIndex = true
) {
  try {
    if (productName && productName !== 'CUSTOM_OBJECTS') {
      const dbConfig = formMapper[productName];
      if (
        hasCustomProperty(dbConfig, 'config') &&
        hasCustomProperty(dbConfig.config, 'hasPrimary') &&
        !dbConfig.config.hasPrimary
      ) {
        return false;
      }
    }

    if (hasCustomProperty(objField, 'type') && objField.type === 'PRIMARY') {
      return true;
    }
    if (boolCheckIndex && intIndex === 0) {
      return true;
    }
  } catch (error) {
    console.error(`Error occurred in isPrimaryFieldType: ${error}`);
  }
  return false;
}

// function to check if the field is unique
export function isUniqueField(objField) {
  try {
    let uniqueValue = null;
    if (
      hasCustomProperty(objField, 'field_options') &&
      hasCustomProperty(objField.field_options, 'unique')
    ) {
      uniqueValue = objField.field_options.unique;
      if (uniqueValue && (uniqueValue === true || uniqueValue === 'true')) {
        return true;
      }
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return false;
}

// function to retreive maximum Limits object based on the db type
export function getMaximumLimitsConfig(productName = 'CUSTOM_OBJECTS') {
  try {
    const objMaxLimits = formMapper[productName]['maximumLimits'];
    return objMaxLimits;
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return null;
}

// function to get the max limit config from mapper
export function getMaxLimitProperty(
  productName = 'CUSTOM_OBJECTS',
  strProperty
) {
  if (strProperty && strProperty !== '') {
    try {
      const objMaxLimits = getMaximumLimitsConfig(productName);
      const objMaxLimitField = objMaxLimits?.[strProperty];
      return objMaxLimitField;
    } catch (error) {
      return null;
    }
  }
  return null;
}

// function to map the CONVERSATION_PROPERTIES field types to CUSTOM_OBJECTS values
export function getMappedCustomFieldType(
  productName = 'CUSTOM_OBJECTS',
  fieldName
): any {
  if (productName === 'CUSTOM_OBJECTS') {
    return fieldName;
  }
  try {
    const objProd = formMapper[productName];
    if (hasCustomProperty(objProd, 'mappedFieldTypes')) {
      const fieldValue = objProd['mappedFieldTypes'][fieldName.toString()];
      return fieldValue;
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return fieldName;
}

// function to retreive the checkboxes options based on the product name and the field type
export function getFieldTypeCheckboxes(
  productName = 'CUSTOM_OBJECTS',
  fieldName
): any {
  try {
    const arrCheckboxes =
      formMapper[productName].fieldProps[fieldName.toString()].checkboxes;
    if (arrCheckboxes && arrCheckboxes.length > 0) {
      return deepCloneObject(arrCheckboxes);
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return null;
}

// function to check if only english characters are present in the passed string
export function detectEnglish(text) {
  const regexEnglish = /^[A-Z0-9_s]+$/i;
  return regexEnglish.test(text);
}

// function to generate internal field name based on the typed label
export function deriveInternalNameFromLabel(text) {
  const regexAlphaNum = /[^a-z0-9_]/gi;
  let derivedText = (text && text.toLowerCase().trim()) || '';
  derivedText = derivedText.replace(/\s+/g, '_').replace(regexAlphaNum, '');
  derivedText = !/^(_+)$/g.test(derivedText) ? derivedText : '';
  return derivedText;
}

// function to check the first occurence of string and remove the characters
export function removeFirstOccurrence(strWhole, charRemove) {
  try {
    if (strWhole && strWhole !== '' && charRemove && charRemove !== '') {
      const index = strWhole.indexOf(charRemove);
      if (index === -1) {
        return strWhole;
      }
      return (
        strWhole.slice(0, index) + strWhole.slice(index + charRemove.length)
      );
    }
  } catch (error) {
    return strWhole;
  }
  return strWhole;
}

// function to validate the permissions for the assigned property and return boolean value
export function hasPermission(
  strRole,
  objPermission,
  strProperty,
  boolEditCheckbox = false
) {
  if (objPermission) {
    if (strRole === 'trial' && strProperty === 'EDIT' && boolEditCheckbox) {
      return true;
    } else if (strRole === 'trial' || !objPermission.view) {
      return false;
    } else {
      switch (strProperty) {
        case 'CREATE':
          if (
            hasCustomProperty(objPermission, 'create') &&
            objPermission.create
          ) {
            return true;
          }
          break;
        case 'EDIT':
          if (hasCustomProperty(objPermission, 'edit') && objPermission.edit) {
            return true;
          }
          break;
        case 'DELETE':
          if (
            hasCustomProperty(objPermission, 'delete') &&
            objPermission.delete
          ) {
            return true;
          }
          break;
      }
    }
  }
  return false;
}

// function to generate a random id
export function createUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export function checkIfCustomToggleField(
  productName = 'CUSTOM_OBJECTS',
  fieldName
) {
  const dbConfig = formMapper[productName];
  return (
    dbConfig?.config?.boolShowCustomToggle &&
    fieldName === dbConfig?.config?.showCustomToggleField
  );
}

export function filterDropdownValues(choices, idsToFilter) {
  if (!idsToFilter.length) {
    return choices;
  }

  return choices.filter((choice) => idsToFilter.includes(choice.id));
}

export function assignFieldChoices(
  dataProvider,
  objFieldData,
  fieldLevels,
  internalNamePrefix
) {
  const fieldSchema = deepCloneObject(objFieldData);

  const assignChoices = (json, fieldJson, ids) => {
    fieldJson.choices =
      hasCustomProperty(json, 'choices') && json.choices.length > 0
        ? deepCloneObject(filterDropdownValues(json.choices, ids))
        : [];
    fieldJson.label = hasCustomProperty(json, 'label') ? json.label : '';
    fieldJson.name = hasCustomProperty(json, 'name')
      ? removeFirstOccurrence(json.name, internalNamePrefix)
      : '';

    if (hasCustomProperty(json, 'field_options')) {
      fieldJson.field_options = json.field_options;
    }

    if (json.fields && json.fields.length) {
      const fieldLevel = fieldLevels[`level${json.field_options.level}`] || 0;
      assignChoices(
        json.fields[0],
        fieldJson.fields[0],
        json.choices[fieldLevel]?.dependent_ids?.choice || []
      );
    }
  };

  assignChoices(dataProvider, fieldSchema, []);

  return fieldSchema;
}

export function updateDependentField(objFieldData, value, level, type) {
  const onUpdateField = (json) => {
    if (json?.field_options?.level === level) {
      json[type] = value;
    } else {
      onUpdateField(json.fields[0]);
    }
  };

  onUpdateField(objFieldData);

  return objFieldData;
}
