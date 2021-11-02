module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'react-app',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/prop-types': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'react/jsx-no-bind': 0,
    'prefer-promise-reject-errors': 0,
    'react/react-in-jsx-scope': 0,
    'no-console': 0,
  },
};
