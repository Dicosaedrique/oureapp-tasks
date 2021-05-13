const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
    extends: ['react-app', 'prettier', 'prettier/react'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', prettierOptions],
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    '@material-ui/*/*/*',
                    '!@material-ui/core/test-utils/*',
                ],
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
