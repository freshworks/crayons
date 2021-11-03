module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-a11y/recommended'],
  plugins: ['stylelint-scss', 'stylelint-a11y', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-invalid-position-at-import-rule': null,
    'selector-type-no-unknown': [
      true,
      { ignore: ['custom-elements'] },
      { ignoreTypes: [/^fw-/, 'my-component'] },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': true,
  },
};
