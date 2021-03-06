module.exports = {
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'react-native',
    'jsx-a11y',
    'jest',
  ],
  'env': {
    'browser': true,
    'jest/globals': true,
  },
  'extends': [
    'airbnb',
  ],
  'rules': {
    'react/jsx-filename-extension': 0,
  },
};
