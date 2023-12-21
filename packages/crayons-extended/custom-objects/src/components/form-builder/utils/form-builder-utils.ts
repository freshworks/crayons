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
 *
 */
export function getFieldBasedOnLevel(data, level) {
  // Convert the level to an integer for easier comparison
  const numericLevel = parseInt(level, 10);

  // Function to recursively traverse the data structure
  function traverseFields(fields, currentLevel) {
    if (currentLevel === numericLevel) {
      return fields[0];
    }

    if (fields && fields[0] && fields[0].fields) {
      return traverseFields(fields[0].fields, currentLevel + 1);
    }

    return null;
  }

  return traverseFields(data.fields, 1);
}

const validateChoices = (choices, value) => {
  return choices.find((choice) => choice.value === value);
};

/** Returns filtered choices by ids */
const getChoicesById = (choices = [], ids = []) => {
  return choices.filter((choice) => ids.includes(choice.id));
};

/** Returns choice by id */
const findChoice = (choices, id) => {
  return choices.find((choice) => choice.id === id);
};

const arrFindIndex = (arr, value) => arr.findIndex((item) => item === value);

export function getDependentLevels(levels, choices, ids, level) {
  if (!level) {
    return {};
  }

  const selectedId = levels[`level_${level}`];
  const choiceIds = ids.length ? ids : choices.map((choice) => choice.id);

  if (selectedId && choiceIds.includes(selectedId)) {
    return levels;
  }

  return {
    [`level_${level}`]: choiceIds[0],
    ...levels,
  };
}

export function updateFieldAttributes(
  data,
  level,
  {
    label = null,
    internalName = null,
    name = null,
    choices = null,
    type = null,
  }
) {
  // For other fields
  if (!level) {
    const field = { ...data };
    label !== null && (field.label = label);
    name !== null && (field.name = name);

    return field;
  }

  // Dependent Field
  const getField = getFieldBasedOnLevel(data, level);

  if (getField) {
    label !== null && (getField['label'] = label);
    name !== null && (getField['name'] = name);
    internalName !== null && (getField['internalName'] = internalName);
    choices && choices.length && (getField['choices'] = choices);
    type && (getField['type'] = type);
  }

  return { ...data, fields: data.fields };
}

// NOTE: Need to optimize this better
export function buildChoicesFromText(text, dataProvider) {
  const lines = text.split('\n');
  const hierarchyChoices = dataProvider.fields[0];
  let currentCategory = null;
  let currentSubcategory = null;

  lines.forEach((line) => {
    const value = line.trim().replace(/\t/g, '');

    if (value && length) {
      if (!line.startsWith('\t')) {
        if (!validateChoices(hierarchyChoices.choices, value)) {
          const field = hierarchyChoices;
          if (!field.id) {
            field.id = createUUID();
          }
          currentCategory = {
            id: createUUID(),
            value: value,
            dependent_ids: { field: [], choice: [] },
          };
          hierarchyChoices.choices.push(currentCategory);
        }
      } else if (line.startsWith('\t') && !line.startsWith('\t\t')) {
        if (
          currentCategory &&
          !validateChoices(hierarchyChoices.fields[0].choices, value)
        ) {
          const field = hierarchyChoices.fields[0];
          if (!field.id) {
            field.id = createUUID();
          }
          currentSubcategory = {
            id: createUUID(),
            value: value,
            dependent_ids: { field: [], choice: [] },
          };
          currentCategory.dependent_ids.choice.push(currentSubcategory.id);
          if (!currentCategory.dependent_ids.field.length) {
            currentCategory.dependent_ids.field.push(field.id);
          }
          field.choices.push(currentSubcategory);
        }
      } else {
        if (
          currentSubcategory &&
          !validateChoices(hierarchyChoices.fields[0].fields[0].choices, value)
        ) {
          const field = hierarchyChoices.fields[0].fields[0];
          if (!field.id) {
            field.id = createUUID();
          }
          const item = {
            id: createUUID(),
            value: value,
            dependent_ids: { choice: [], field: [] },
          };
          currentSubcategory.dependent_ids.choice.push(item.id);
          if (!currentSubcategory.dependent_ids.field.length) {
            currentSubcategory.dependent_ids.field.push(field.id);
          }
          hierarchyChoices.fields[0].fields[0].choices.push(item);
        }
      }
    }
  });

  return { ...dataProvider, fields: [hierarchyChoices] };
}

export function hasStringDuplicates(stringObj, i18nText) {
  const values = Object.values(stringObj);
  const result = {};

  for (const key in stringObj) {
    const isDuplicateFound =
      values.filter((value) => value !== '' && value === stringObj[key])
        .length > 1;

    if (isDuplicateFound) {
      result[key] = i18nText('errors.fieldNameExists');
    }
  }

  return result;
}

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

export function getParentId(pChoices, pLevel, dependentLevels) {
  if (!pLevel || !pChoices || !pChoices.length) {
    return null;
  }

  const parentChoice = findChoice(pChoices, dependentLevels[`level_${pLevel}`]);

  if (parentChoice) {
    return parentChoice.id;
  }

  return pChoices[0].id;
}

/** Selecting parent updates child choices */
export function getChildChoices(field, pChoices, pLevel, depLevels) {
  if (!pLevel || !pChoices || !pChoices.length) {
    return { choices: field.choices, ids: [], pid: null };
  }

  const pId = getParentId(pChoices, pLevel, depLevels);
  const pChoice = findChoice(pChoices, pId);
  const choices = getChoicesById(field.choices, pChoice.dependent_ids.choice);

  return { ids: pChoice.dependent_ids.choice, choices, pId };
}

export function updateChoicesInFields(instance, event) {
  const field = instance.fieldBuilderOptions;
  const { level, parentId, value, choice } = event.detail;

  // Adding Choices to current level
  const currentField = getFieldBasedOnLevel(field, level);
  currentField.choices = value;

  if (parentId) {
    const parentLevel = parseInt(level, 10) - 1;
    const parentField = getFieldBasedOnLevel(field, parentLevel);
    const parentChoice = findChoice(parentField.choices, parentId);
    parentChoice.dependent_ids.choice.push(choice.id);
    parentChoice.dependent_ids.field.push(currentField.id);
  }

  return { ...field, fields: field.fields };
}

export function deleteChoicesInFields(instance, event) {
  const field = instance.fieldBuilderOptions;
  const { level, parentId, choice } = event.detail;

  // Level Above if exists
  if (parentId) {
    const parentLevel = parseInt(level, 10) - 1;
    const parentField = getFieldBasedOnLevel(field, parentLevel);
    const parentChoice = findChoice(parentField.choices, parentId);
    const delIndex = arrFindIndex(parentChoice.dependent_ids.choice, choice.id);

    if (delIndex > -1) {
      parentChoice.dependent_ids.choice = [
        ...parentChoice.dependent_ids.choice.slice(0, delIndex),
        ...parentChoice.dependent_ids.choice.slice(delIndex + 1),
      ];
    }
  }

  const depIds = choice.dependent_ids?.choice?.length
    ? choice.dependent_ids.choice
    : [];

  // Delete current fields choices
  const currentField = getFieldBasedOnLevel(field, level);
  currentField.choices = deepCloneObject(
    currentField.choices.filter((item) => item.id !== choice.id)
  );

  const deleteChildNodes = (depIds, currentLevel) => {
    const childLevel = parseInt(currentLevel, 10) + 1;
    const childField = getFieldBasedOnLevel(field, childLevel);
    const childDepIds = [];
    if (childField) {
      childField.choices = deepCloneObject(
        childField.choices.filter((item) => {
          if (depIds.includes(item.id)) {
            childDepIds.push(...item.dependent_ids.choice);
            return false;
          }

          return true;
        })
      );
    }

    childDepIds.length && deleteChildNodes(childDepIds, childLevel);
  };

  depIds.length && deleteChildNodes(depIds, level);

  return { ...field, fields: field.fields };
}

export function getDefaultDependentLevels(data, internalNamePrefix) {
  const dataCloned = deepCloneObject(data);

  function updateFieldAttribute(fProperties) {
    fProperties.name = removeFirstOccurrence(
      fProperties.name,
      internalNamePrefix
    );
    fProperties.label = fProperties.label || '';
    fProperties.id = fProperties.id || '';

    if (hasCustomProperty(fProperties, 'fields') && fProperties.fields.length) {
      updateFieldAttribute(fProperties.fields[0]);
    }
  }

  updateFieldAttribute(dataCloned.fields[0]);

  return { ...dataCloned, fields: dataCloned.fields };
}

export function addBulkChoices(data, text, { level, parentId, choiceIds }) {
  const dataCloned = deepCloneObject(data);
  const getField = getFieldBasedOnLevel(dataCloned, level);
  const arrChoices = text.split('\n');
  const seen = new Set();
  let filteredChoices = getField.choices;
  let parentField, parentChoice;

  if (parentId) {
    parentField = getFieldBasedOnLevel(dataCloned, parseInt(level, 10) - 1);
    parentChoice = findChoice(parentField.choices, parentId);
    filteredChoices = getField.choices.filter((item) =>
      choiceIds.includes(item.id)
    );
  }

  arrChoices.forEach((value) => {
    value = value?.trim();
    if (
      value &&
      value !== '' &&
      !validateChoices(filteredChoices, value) &&
      !seen.has(value)
    ) {
      const id = createUUID();
      const choice = {
        id,
        value,
        dependent_ids: { field: [], choice: [] },
      };
      getField.choices.push(choice);
      if (parentChoice?.id) {
        parentChoice.dependent_ids.choice.push(id);
        parentChoice.dependent_ids.field = [getField.id];
      }

      // Adding temp to check the duplication and remove
      seen.add(value);
    }
  });

  return dataCloned;
}
