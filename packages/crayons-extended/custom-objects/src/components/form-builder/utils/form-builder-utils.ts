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
export function getMaximumLimitsConfig(productName = 'CUSTOM_OBJECTS'): any {
  try {
    const objMaxLimits = formMapper[productName]['maximumLimits'];
    return objMaxLimits;
    // eslint-disable-next-line no-empty
  } catch (error) {}
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
