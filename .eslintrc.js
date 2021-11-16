/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
    extends: ['react-app', 'prettier', 'prettier/react', 'plugin:@typescript-eslint/recommended'],
    plugins: ['simple-import-sort', 'prettier'],
    rules: {
        'prettier/prettier': ['warn', prettierOptions],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/no-non-null-assertion': 0,
    },
};
