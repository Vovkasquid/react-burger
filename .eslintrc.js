module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: { 'prettier/prettier': 0,  "import/no-named-as-default": 0, 'import/no-named-as-default-member': 0 , "react/prop-types": 0, 'react/jsx-props-no-spreading': 0, 'react/jsx-no-bind' : 0 },
  
}
