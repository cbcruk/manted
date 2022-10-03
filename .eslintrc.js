module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: ['next', 'next/core-web-vitals'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
