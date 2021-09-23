module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'], // Your TypeScript files extension
  //     parserOptions: {
  //       project: ['./tsconfig.json'], // Specify it only for TypeScript files
  //     },
  //   },
  // ],
  parserOptions: {
    ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    useJSXTextNode: true,
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "es5",
        printWidth: 120,
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-unused-vars": 0,
    "react/no-jsx-bind": 0,
  },
  settings: {
    "import/core-modules": ["@stencil/core/testing"],
    // react: {
    //   version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    // },
  },
};
