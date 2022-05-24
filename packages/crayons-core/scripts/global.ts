import { setMode } from '@stencil/core';
import { setTheme } from '../src/global/crayons';
import * as crayonsTokens from '../design-tokens/crayons/base.json';

setMode((elm) => {
  return elm.mode || elm.getAttribute('mode') || 'default';
});

setTheme(crayonsTokens);
