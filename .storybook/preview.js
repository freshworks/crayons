import { addParameters, addDecorator, setCustomElements } from '@storybook/web-components';
import { withA11y } from '@storybook/addon-a11y';
import { withActions } from '@storybook/addon-actions';
import customElements from '../src/custom-elements.json';
import { themes } from '@storybook/theming';
import theme from './freshworksStorybookTheme';

import { Parser } from 'html-to-react';

setCustomElements(customElements);

const toReact = new Parser();

addParameters({
  docs: {
    prepareForInline: storyFn => {
      return toReact.parse(storyFn());
    },
    inlineStories: true,
  },
  options: {
    theme,
  },
});

addDecorator(withA11y);

addDecorator(withActions('click', 'select', 'submit', 'blur', 'focus', 'fwSelect', 'fwClick', 'fwBlur', 'fwFocus', 'fwChange', 'fwAction', 'fwInput', 'fwDeselect', 'fwSelected', 'fwClosed', 'fwInputClear'));