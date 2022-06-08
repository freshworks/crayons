import map from './map';

/**
 * cssValueSplit function. Purpose is to avoid splitting CSS variables.
 * @param {String} valueString css value of a property
 * @returns array of values
 */
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

const plugin = () => ({
  postcssPlugin: 'postcss-directional-to-logical',
  Once(root) {
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
  },
});

plugin.postcss = true;

export default plugin;
