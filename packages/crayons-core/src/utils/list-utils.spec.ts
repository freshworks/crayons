import {
  validateAndParseInputSelectedValues,
  updateChildSelectionState,
  updateSelectedValues,
} from './list-utils';

describe('validateAndParseInputSelectedValues', () => {
  it('return isArray as false, and array of strings as [id1,id2]', () => {
    expect(validateAndParseInputSelectedValues('id1,id2')).toEqual({
      isArray: false,
      strSelectedValues: 'id1,id2',
      arrSelectedValues: ['id1', 'id2'],
    });
  });

  it('return isArray as true, and array of strings as [id1,id2] and string input as "id1,id2', () => {
    expect(validateAndParseInputSelectedValues(['id1', 'id2'])).toEqual({
      isArray: true,
      strSelectedValues: 'id1,id2',
      arrSelectedValues: ['id1', 'id2'],
    });
  });
});

function createToggleButton(strValue, boolSelected = false) {
  return Object.assign(document.createElement('fw-toggle-group-button'), {
    value: strValue,
    selected: boolSelected,
  });
}

describe('updateSelectedValues', () => {
  const el1 = createToggleButton('id1');
  const el2 = createToggleButton('id2');

  it('if multiple is false, deselect the already selected item and select the new index item - return an array of "id2', () => {
    expect(updateSelectedValues([el1, el2], 1, true, false, ['id1'])).toEqual([
      'id2',
    ]);
    // expect(el2.selected).toBeTruthy();
  });

  const el3 = createToggleButton('id3', true);
  const el4 = createToggleButton('id4');
  const el5 = createToggleButton('id5');
  it('if multiple is true and selected is set to true, select the new index item and append it to already selected items', () => {
    expect(
      updateSelectedValues([el3, el4, el5], 2, true, true, ['id3'])
    ).toEqual(['id3', 'id5']);
  });

  const el6 = createToggleButton('id6', true);
  const el7 = createToggleButton('id7', true);
  const el8 = createToggleButton('id8', true);
  it('if multiple is true and selected is set to false, deselect the passed index item and remove from the selected items array', () => {
    expect(
      updateSelectedValues([el6, el7, el8], 1, false, true, [
        'id6',
        'id7',
        'id8',
      ])
    ).toEqual(['id6', 'id8']);
  });
});

describe('updateChildSelectionState', () => {
  const el1 = createToggleButton('id1');
  const el2 = createToggleButton('id2');
  const el3 = createToggleButton('id3');
  it('set the selected state of all the elements based on the input values and return the first valid selected index - multiple selection true', () => {
    expect(
      updateChildSelectionState([el1, el2, el3], true, ['id2', 'id3'])
    ).toBe(1);
    expect(el1.selected).toBeFalsy();
    expect(el2.selected).toBeTruthy();
    expect(el3.selected).toBeTruthy();
  });

  const el4 = createToggleButton('id4');
  const el5 = createToggleButton('id5');
  const el6 = createToggleButton('id6');
  it('deselect the selected item, if any and select the new item if multiple is false', () => {
    expect(
      updateChildSelectionState([el4, el5, el6], false, ['id4', 'id5'])
    ).toBe(0);
    expect(el4.selected).toBeTruthy();
    expect(el5.selected).toBeFalsy();
    expect(el6.selected).toBeFalsy();
  });
});

// describe('doKeyDownOperations', () => {
//   it('set the selected state of all the elements based on the input values and return the first valid selected index - multiple selection true', async () => {
//     const page = await newE2EPage();
//     await page.setContent(
//       '<fw-toggle-group name="Test icon toggle group" value="id1"><fw-toggle-group-button data-id="id1" id="id1" value="id1111"></fw-toggle-group-button><fw-toggle-group-button id="id2" value="id2"></fw-toggle-group-button><fw-toggle-group-button id="id3" value="id3"></fw-toggle-group-button></fw-toggle-group>'
//     );

//     const appHome = await page.find('fw-toggle-group');
//     const el1 = await appHome.shadowRoot.querySelector('button data-id=id1');
//     const el2 = appHome.shadowRoot.querySelector('#id2');
//     const el3 = appHome.shadowRoot.querySelector('#id3');

//     // expect(el1.getProperty('value')).toBe('id1111');
//     // expect(el1).toEqualHtml('aaa');

//     // expect(doKeyDownOperations('ArrowRight', [el1, el2, el3], 0, true)).toEqual(
//     //   { index: 2, changeSelection: false, selected: false }
//     // );
//     // expect(el1.getProperty('selected')).toBeFalsy();
//     // expect(el2.getProperty('selected')).toBeTruthy();
//     // expect(el3.getProperty('selected')).toBeTruthy();
//   });
// });
