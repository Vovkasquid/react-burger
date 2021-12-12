module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'plugin:import/errors', 'plugin:import/warnings', 'plugin:import/typescript'],
  parserOptions: {
    ecmaFeatures: {
      // jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: { 'prettier/prettier': 0,  "import/no-named-as-default": 0, 'import/no-named-as-default-member': 0 , 'react/prop-types': 0, 'react/jsx-props-no-spreading': 0, 'react/jsx-no-bind' : 0,  'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }], 'import/extensions': 'off'
,},
  
}
