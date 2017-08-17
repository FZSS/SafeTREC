module.exports = {
  'parser': 'babel-eslint',
  'plugins': [
    'react',
    'react-native',
    'jsx-a11y',
  ],
  'env': {
    'browser': true
  },
  'extends': [
    'airbnb',
  ],
  'rules': {
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 1,
  }
};
