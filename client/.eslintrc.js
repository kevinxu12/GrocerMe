/**
 * @file Frontend Eslint preferences
 * Maybe we should make the eslint on the server and client consistent, maybe not.
 * @author Kevin Xu
 */
const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['react-app', 'prettier', 'plugin:jsdoc/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'jsdoc/require-file-overview': ['error'],
    'jsdoc/require-jsdoc': [
      'error',
      {
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
