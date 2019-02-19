const error = 2;
const warn = 1;
const ignore = 0;

module.exports = {
  extends: [
    '@ndelangen/eslint-config-airbnb',
    'prettier',
  ],
  plugins: [
    'prettier',
    'react',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    strict: [error, 'never'],
    'prettier/prettier': ['warn', {
      printWidth: 100,
      tabWidth: 2,
      bracketSpacing: true,
      trailingComma: 'all',
      singleQuote: true,
    }],
    quotes: ['warn', 'single'],
    'class-methods-use-this': ignore,
    'arrow-parens': ['warn', 'as-needed'],
    'space-before-function-paren': ignore,
    'import/no-extraneous-dependencies': [error, {
      devDependencies: [
        '**/.scripts/*.js',
        '**/stories/*.js',
        '**/tests/*.js'
      ],
      peerDependencies: true
    }],
    'import/prefer-default-export': ignore,
    'react/jsx-uses-react': error,
    'react/jsx-uses-vars': error,
    'react/react-in-jsx-scope': error,
    'react/jsx-filename-extension': [warn, {
      extensions: ['.js', '.jsx']
    }],
    'jsx-a11y/accessible-emoji': ignore,
    'jsx-a11y/no-static-element-interactions': warn,
    'jsx-a11y/no-autofocus': warn,
    'react/require-default-props': warn,
    'react/forbid-prop-types': warn,
    'react/no-unescaped-entities': ignore,
    'react/no-array-index-key': warn,
    'react/no-string-refs': warn,
    'import/no-named-as-default-member': warn
  },
}
