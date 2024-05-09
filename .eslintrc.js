/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        project: ['./tsconfig.json'],
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue', '.json'],
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:vue/recommended',
        'plugin:jsonc/recommended-with-jsonc',
    ],
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        indent: 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ['ConditionalExpression'],
            },
        ],
        'vue/html-indent': [
            'error',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'jsonc/indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                ignoredNodes: ['ConditionalExpression'],
            },
        ],
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 0,
                switchCase: 1,
                ignores: [],
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 3,
                multiline: 1,
            },
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'never',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'no-undef': 'off',
        'vue/multi-word-component-names': 'off',
        quotes: ['error', 'single'],
        'quote-props': ['error', 'as-needed'],
        'comma-style': ['error', 'last'],
        'semi-style': ['error', 'last'],
        semi: 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'brace-style': ['error', '1tbs'],
        'eol-last': ['error', 'always'],
        'vue/no-multiple-template-root': 'off',
        'space-before-blocks': 'error',
        'no-multi-spaces': 'error',
        'key-spacing': ['error', { afterColon: true }],
        'arrow-parens': ['error', 'as-needed'],
        'vue/no-v-html': 'off',
        'vue/no-unused-components': 'off',
        'vue/no-mutating-props': 'off',
        'vue/one-component-per-file': 'off',
        'object-curly-newline': ['error', {
            ObjectExpression: {
                multiline: true,
                minProperties: 3,
            },
            ObjectPattern: { multiline: true },
            ImportDeclaration: {
                multiline: true,
                minProperties: 3,
            },
            ExportDeclaration: {
                multiline: true,
                minProperties: 3,
            },
        }],
        'object-curly-spacing': ['error', 'always'],
        'vue/object-curly-spacing': ['error', 'always'],
        'object-property-newline': 'error',
        'object-shorthand': 'error',
        'vue/singleline-html-element-content-newline': ['warn', { ignores: ['pre', 'textarea'] }],
        'vue/multiline-html-element-content-newline': ['warn', { ignores: ['pre', 'textarea'] }],
        'vue/require-default-prop': 'warn',
        'no-prototype-builtins': 'off',
        'prefer-const': 'error',
        'space-infix-ops': ['error', { int32Hint: false }],
        'no-useless-escape': 'off',
        'comma-spacing': ['error', {
            before: false,
            after: true, 
        }],
        'vue/no-v-model-argument': 'off',
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: true,
                allowedNames: ['self'],
            },
        ],
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: { indent: 'off' },
        },
        {
            files: ['*.ts'],
            extends: [
                'plugin:@typescript-eslint/recommended-type-checked',
                'plugin:@typescript-eslint/stylistic-type-checked',
            ],
        },
        {
            files: ['components/**/*.vue'],
            rules: {
                'vue/match-component-file-name': [
                    'error',
                    {
                        extensions: ['vue'],
                        shouldMatchCase: false,
                    },
                ],
            },
        },
        {
            files: ['*.json', '*.json5', '*.jsonc'],
            parser: 'jsonc-eslint-parser',
        },
    ],
};

