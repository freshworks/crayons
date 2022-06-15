const postcss = require('postcss');

const map = {
  'top': {
    type: 'substitute-prop',
    with: 'inset-block-start',
  },
  'right': {
    type: 'substitute-prop',
    with: 'inset-inline-end',
  },
  'bottom': {
    type: 'substitute-prop',
    with: 'inset-block-end',
  },
  'left': {
    type: 'substitute-prop',
    with: 'inset-inline-start',
  },
  // https://caniuse.com/mdn-css_properties_float_flow_relative_values
  // "float": {
  //   "type": "substitute-value",
  //   "with": {
  //     "left": "inline-start",
  //     "right": "inline-end"
  //   }
  // },
  'clear': {
    type: 'substitute-value',
    with: {
      left: 'inline-start',
      right: 'inline-end',
    },
  },
  'text-align': {
    type: 'substitute-value',
    with: {
      left: 'start',
      right: 'end',
    },
  },
  'border-bottom-left-radius': {
    type: 'substitute-prop',
    with: 'border-end-start-radius',
  },
  'border-bottom-right-radius': {
    type: 'substitute-prop',
    with: 'border-end-end-radius',
  },
  'border-top-left-radius': {
    type: 'substitute-prop',
    with: 'border-start-start-radius',
  },
  'border-top-right-radius': {
    type: 'substitute-prop',
    with: 'border-start-end-radius',
  },
  'border-left': {
    type: 'substitute-prop',
    with: 'border-inline-start',
  },
  'border-left-color': {
    type: 'substitute-prop',
    with: 'border-inline-start-color',
  },
  'border-left-style': {
    type: 'substitute-prop',
    with: 'border-inline-start-style',
  },
  'border-left-width': {
    type: 'substitute-prop',
    with: 'border-inline-start-width',
  },
  'border-right': {
    type: 'substitute-prop',
    with: 'border-inline-end',
  },
  'border-right-color': {
    type: 'substitute-prop',
    with: 'border-inline-end-color',
  },
  'border-right-style': {
    type: 'substitute-prop',
    with: 'border-inline-end-style',
  },
  'border-right-width': {
    type: 'substitute-prop',
    with: 'border-inline-end-width',
  },
  'border-top': {
    type: 'substitute-prop',
    with: 'border-block-start',
  },
  'border-bottom': {
    type: 'substitute-prop',
    with: 'border-block-end',
  },
  'border-radius': {
    type: 'replace',
    with: {
      'if-value-count': {
        2: {
          'border-start-start-radius': '1',
          'border-start-end-radius': '2',
          'border-end-end-radius': '1',
          'border-end-start-radius': '2',
        },
        3: {
          'border-start-start-radius': '1',
          'border-start-end-radius': '2',
          'border-end-end-radius': '3',
          'border-end-start-radius': '2',
        },
        4: {
          'border-start-start-radius': '1',
          'border-start-end-radius': '2',
          'border-end-end-radius': '3',
          'border-end-start-radius': '4',
        },
      },
    },
  },
  'border-style': {
    type: 'replace',
    with: {
      'if-value-count': {
        2: {
          'border-block-style': '1',
          'border-inline-style': '2',
        },
        3: {
          'border-block-start-style': '1',
          'border-inline-style': '2',
          'border-block-end-style': '3',
        },
        4: {
          'border-block-start-style': '1',
          'border-inline-end-style': '2',
          'border-block-end-style': '3',
          'border-inline-start-style': '4',
        },
      },
    },
  },
  'margin-left': {
    type: 'substitute-prop',
    with: 'margin-inline-start',
  },
  'margin-right': {
    type: 'substitute-prop',
    with: 'margin-inline-end',
  },
  'margin-top': {
    type: 'substitute-prop',
    with: 'margin-block-start',
  },
  'margin-bottom': {
    type: 'substitute-prop',
    with: 'margin-block-end',
  },
  'padding-left': {
    type: 'substitute-prop',
    with: 'padding-inline-start',
  },
  'padding-right': {
    type: 'substitute-prop',
    with: 'padding-inline-end',
  },
  'padding-top': {
    type: 'substitute-prop',
    with: 'padding-block-start',
  },
  'padding-bottom': {
    type: 'substitute-prop',
    with: 'padding-block-end',
  },
  'margin': {
    type: 'replace',
    with: {
      'if-value-count': {
        2: {
          'margin-block': '1',
          'margin-inline': '2',
        },
        3: {
          'margin-block-start': '1',
          'margin-inline': '2',
          'margin-block-end': '3',
        },
        4: {
          'margin-block-start': '1',
          'margin-inline-end': '2',
          'margin-block-end': '3',
          'margin-inline-start': '4',
        },
      },
    },
  },
  'padding': {
    type: 'replace',
    with: {
      'if-value-count': {
        2: {
          'padding-block': '1',
          'padding-inline': '2',
        },
        3: {
          'padding-block-start': '1',
          'padding-inline': '2',
          'padding-block-end': '3',
        },
        4: {
          'padding-block-start': '1',
          'padding-inline-end': '2',
          'padding-block-end': '3',
          'padding-inline-start': '4',
        },
      },
    },
  },
  'border-width': {
    type: 'replace',
    with: {
      'if-value-count': {
        2: {
          'border-block-width': '1',
          'border-inline-width': '2',
        },
        3: {
          'border-block-start-width': '1',
          'border-inline-width': '2',
          'border-block-end-width': '3',
        },
        4: {
          'border-block-start-width': '1',
          'border-inline-end-width': '2',
          'border-block-end-width': '3',
          'border-inline-start-width': '4',
        },
      },
    },
  },
  'border-color': {
    type: 'replace',
    with: {
      'if-value-count': {
        2: {
          'border-block-color': '1',
          'border-inline-color': '2',
        },
        3: {
          'border-block-start-color': '1',
          'border-inline-color': '2',
          'border-block-end-color': '3',
        },
        4: {
          'border-block-start-color': '1',
          'border-inline-end-color': '2',
          'border-block-end-color': '3',
          'border-inline-start-color': '4',
        },
      },
    },
  },
};

const cssValueSplit = (valueString) => {
  const parts = [];
  let continuation = false;
  valueString.split(' ').forEach((part) => {
    if (continuation) {
      parts[parts.length - 1] = parts[parts.length - 1] + ' ' + part;
      if (part.includes(')')) {
        continuation = false;
      }
    } else {
      if (
        ['var', 'darken', 'lighten', 'rgba'].some((scssFuncName) =>
          part.includes(scssFuncName)
        )
      ) {
        continuation = true;
      }
      parts.push(part);
    }
  });

  return parts;
};

module.exports = postcss.plugin('postcss-directional-to-logical', function () {
  return function (root) {
    root.walkRules((rule) => {
      rule.walkDecls((decl) => {
        if (map[decl.prop]) {
          const prop = map[decl.prop];
          switch (prop.type) {
            case 'substitute-prop':
              decl.prop = prop.with;
              break;
            case 'substitute-value':
              decl.value = prop.with[decl.value]
                ? prop.with[decl.value]
                : decl.value;
              break;
            case 'replace':
              {
                const values = cssValueSplit(decl.value);
                if (prop.with['if-value-count'][values.length]) {
                  const replaceWith =
                    prop.with['if-value-count'][values.length];
                  Object.keys(replaceWith).forEach((replaceProp) => {
                    decl.cloneAfter({
                      prop: replaceProp,
                      value: values[replaceWith[replaceProp] - 1],
                    });
                  });
                  decl.remove();
                }
              }
              break;
            default:
              break;
          }
        }
      });
    });
  };
});
