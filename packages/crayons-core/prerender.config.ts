import { PrerenderConfig } from '@stencil/core';
export const config: PrerenderConfig = {
  afterSerializeTemplate: (html) => {
    console.log('this is document', html);
    return html;
  },
};
