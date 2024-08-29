module.exports = {
  root: true,
  rules: {
    'react/react-in-jsx-scope':'off',
  },
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
};
