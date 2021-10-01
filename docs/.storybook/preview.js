import {
  addParameters,
  addDecorator,
  setCustomElements,
} from '@storybook/web-components';
import { withA11y } from '@storybook/addon-a11y';
import { withActions } from '@storybook/addon-actions';
import theme from './freshworksStorybookTheme';

import { defineCustomElements } from '../../packages/crayons-core/loader';

import { defineCustomElements as defineCustomElementsTable } from '../../packages/crayons-datatable/loader';

// import customElements from '../../crayons-core/src/custom-elements.json';
// import customElementsDataTable from '../../crayons-datatable/src/custom-elements.json';

defineCustomElements(window);
defineCustomElementsTable(window);

import { Parser } from 'html-to-react';

// setCustomElements(customElements);
// setCustomElements(customElementsDataTable);

const toReact = new Parser();

addParameters({
  docs: {
    prepareForInline: (storyFn) => {
      return toReact.parse(storyFn());
    },
    inlineStories: true,
  },
  options: {
    theme,
  },
});

addDecorator(withA11y);

addDecorator(
  withActions(
    'click',
    'select',
    'submit',
    'blur',
    'focus',
    'fwSelect',
    'fwClick',
    'fwBlur',
    'fwFocus',
    'fwChange',
    'fwAction',
    'fwInput',
    'fwDeselect',
    'fwSelected',
    'fwClosed',
    'fwInputClear'
  )
);
