module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    useJSXTextNode: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        useJSXTextNode: true,
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      env: {
        browser: true,
        jest: true,
        node: true,
      },
      extends: [
        'plugin:vue/essential',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['@typescript-eslint', 'jsx-a11y'],
      rules: {
        '@typescript-eslint/no-unused-vars': 0,
        'react/no-jsx-bind': 0,
        'jsx-quotes': [1, 'prefer-single'],
      },
    },
  ],
};
