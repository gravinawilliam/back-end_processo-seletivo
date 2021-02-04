module.exports = {
    env: {
      es2021: true,
      node: true,
      jest: true
    },
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/camelcase': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '_',
        },
      ],
      'class-methods-use-this': 'off',
      camelcase: 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  };
  