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

/**
 *
 * DEPENDENT FIELD UTILS
 * */

/** Returns filtered choices by ids */
const getChoicesById = (choices, ids) => {
  return choices.filter((choice) => ids.includes(choice.id));
};

const getChoicesWithoutId = (choices, id) => {
  return choices.filter((choice) => id !== choice.id);
};

/** Returns choice by id */
const findChoice = (choices, id) => {
  return choices.find((choice) => choice.id === id);
};

/** Mapping id to parent on creating new child dropdown field */
const mapchildChoiceToParent = (id, parentChoices, parentId) => {
  const choice = findChoice(parentChoices, parentId);

  if (choice && choice.id) {
    choice.dependent_ids.choice.push(id);
  }
};

/** Updates field value by choice */
const updateChoiceByValue = (choices, { id, value }) => {
  const choice = findChoice(choices, id);

  if (choice) {
    choice.value = value;
  }
};

/** deleteChildChoices */
const deleteChildChoices = (json, { id }) => {
  const choice = findChoice(json.choices, id);

  if (choice) {
    json.choices = getChoicesWithoutId(json.choices, id);
  }

  return json;
};

/** Handles and updates dependent level upon selection */
export function updateLevelSelection(instance, event) {
  if (!instance.isDependentField) {
    return;
  }

  const dependentLevels = instance.dependentLevels;
  const clonedDependentLevels = deepCloneObject(dependentLevels);

  Object.keys(dependentLevels).forEach((key) => {
    if (Number(removeFirstOccurrence(key, 'level_')) > event.detail.level) {
      delete clonedDependentLevels[key];
    }
  });

  return {
    ...clonedDependentLevels,
    [`level_${event.detail.level}`]: event.detail.id,
  };
}

/** Recurse and updates the fields [Name, Label] */
export function updateNameLabelDependentField(
  fieldBuilderOption,
  level,
  strInputValue,
  strInternalName,
  types
) {
  const objFieldData = deepCloneObject(fieldBuilderOption);

  if (level.includes('name_level_')) {
    level = removeFirstOccurrence(level, 'name_level_');
  }

  if (level.includes('internalName_level_')) {
    level = removeFirstOccurrence(level, 'internalName_level_');
  }

  const onUpdateNameLabel = (json, level) => {
    if (json?.field_options?.level === level) {
      if (types.includes('label')) {
        json.label = strInputValue;
      }
      if (types.includes('name')) {
        json.name = strInternalName;
        json.internalName = `cf_${strInternalName}`;
      }
    }

    if (json.fields && json.fields.length > 0) {
      onUpdateNameLabel(json.fields[0], level);
    }
  };

  onUpdateNameLabel(objFieldData, level);

  return objFieldData;
}

export function getParentId(parentChoices, parentLevel, dependentLevels) {
  const parentChoiceId = dependentLevels[`level_${parentLevel}`];
  if (parentChoiceId) {
    return parentChoiceId;
  }

  return parentChoices[0].id;
}

/** Selecting parent updates child choices */
export function getChildChoices(
  parentChoices,
  currentField,
  parentLevel,
  dependentLevels
) {
  const parentChoiceId = getParentId(
    parentChoices,
    parentLevel,
    dependentLevels
  );
  const parentChoice = findChoice(parentChoices, parentChoiceId);

  if (!parentChoice.dependent_ids.choice.length) {
    const id = createUUID();
    parentChoice.dependent_ids.choice.push(id);
    currentField.choices.push({
      id: id,
      value: '',
      dependent_ids: { choice: [] },
    });
  }

  return getChoicesById(
    currentField.choices,
    parentChoice.dependent_ids.choice
  );
}

/** Add choices in level - Dependent field */
export function addChoiceInLevel(instance, event, type) {
  if (!instance.isDependentField) {
    return;
  }

  const dataProvider = instance.fieldBuilderOptions;
  const { level, choice, parentId } = event.detail;
  const updateChoice = (json, choice, parentChoices) => {
    if (json.field_options.level === level) {
      switch (type) {
        case 'ADD':
          json.choices.push({ ...choice, dependent_ids: { choice: [] } });
          if (level !== '1') {
            mapchildChoiceToParent(choice.id, parentChoices, parentId);
          }
          break;
        case 'DELETE':
          deleteChildChoices(json, choice);
          break;
        case 'VALUE_CHANGE':
          updateChoiceByValue(json.choices, choice);
          break;
        default:
          break;
      }

      return dataProvider;
    }

    if (json.fields.length) {
      return updateChoice(json.fields[0], choice, json.choices);
    }
  };

  return updateChoice(dataProvider, choice, dataProvider.choices);
}

export function updateFieldAttributes(
  dataProvider,
  objValues,
  types = [],
  prefix = ''
) {
  const objJsonClone = deepCloneObject(objValues);

  const updateChoices = (source, target) => {
    if (source?.field_options?.level === target?.field_options?.level) {
      target.choices = source.choices;
      if (types.includes('label')) {
        target.label = source.label;
      }
      if (types.includes('name')) {
        target.name = removeFirstOccurrence(source.name, prefix) || '';
        target.internalName = removeFirstOccurrence(source.name, prefix) || '';
      }
    }

    if (source?.fields?.length && target?.fields?.length) {
      updateChoices(source.fields[0], target.fields[0]);
    }
  };

  updateChoices(dataProvider, objJsonClone);

  return objJsonClone;
}

function validateChoices(choices, value) {
  return choices.find((choice) => choice.value === value);
}

export function buildChoicesFromText(text, dataProvider) {
  const lines = text.split('\n');
  const hierarchyChoices = {
    choices: [],
    field_options: { level: '1' },
    fields: [
      {
        choices: [],
        field_options: { level: '2' },
        fields: [
          {
            choices: [],
            field_options: { level: '3' },
          },
        ],
      },
    ],
  };
  let currentCategory = null;
  let currentSubcategory = null;

  lines.forEach((line) => {
    const value = line.trim().replace(/\t/g, '');

    if (!line.startsWith('\t')) {
      if (!validateChoices(hierarchyChoices.choices, value)) {
        currentCategory = {
          id: createUUID(),
          value: value,
          dependent_ids: { choice: [] },
        };
        hierarchyChoices.choices.push(currentCategory);
      }
    } else if (line.startsWith('\t') && !line.startsWith('\t\t')) {
      if (
        currentCategory &&
        !validateChoices(hierarchyChoices.fields[0].choices, value)
      ) {
        currentSubcategory = {
          id: createUUID(),
          value: value,
          dependent_ids: { choice: [] },
        };
        currentCategory.dependent_ids.choice.push(currentSubcategory.id);
        hierarchyChoices.fields[0].choices.push(currentSubcategory);
      }
    } else {
      if (
        currentSubcategory &&
        !validateChoices(hierarchyChoices.fields[0].fields[0].choices, value)
      ) {
        const item = { id: createUUID(), value: value };
        currentSubcategory.dependent_ids.choice.push(item.id);
        hierarchyChoices.fields[0].fields[0].choices.push(item);
      }
    }
  });

  return updateFieldAttributes(hierarchyChoices, dataProvider);
}
