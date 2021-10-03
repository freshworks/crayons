import { addParameters, addDecorator } from '@storybook/web-components';
import { withA11y } from '@storybook/addon-a11y';
import { withActions } from '@storybook/addon-actions';
import theme from '../../../docs/.storybook/freshworksStorybookTheme';

import { defineCustomElements } from '../loader';

defineCustomElements(window);

import { Parser } from 'html-to-react';

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
