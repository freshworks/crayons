module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-a11y/recommended'],
  plugins: ['stylelint-scss', 'stylelint-a11y', 'stylelint-prettier', "stylelint-use-logical-spec"],
  rules: {
    'prettier/prettier': true,
    'no-invalid-position-at-import-rule': null,
    'selector-type-no-unknown': [
      true,
      { ignore: ['custom-elements'] },
      { ignoreTypes: [/^fw-/, 'my-component'] },
    ],
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': true,
    'liberty/use-logical-spec': ['always', { "except": ['float', /^.*height/i, /^.*width/i] } ]
  },
};
