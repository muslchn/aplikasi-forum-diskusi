module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.config.js',
          '**/*.config.cjs',
          '**/*.test.js',
          '**/*.test.jsx',
          'src/test/**/*.js',
          'cypress/**/*.js',
          'vite.config.js',
        ],
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
      },
    ],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx'],
      },
    ],
    'react/prop-types': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
  },
  overrides: [
    {
      files: ['vite.config.js'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['**/*.test.js', '**/*.test.jsx'],
      env: {
        node: true,
      },
    },
    {
      files: ['cypress/**/*.js'],
      env: {
        browser: true,
      },
      globals: {
        cy: 'readonly',
        describe: 'readonly',
        it: 'readonly',
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
