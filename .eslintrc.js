module.exports = {
  /* your base configuration of choice */
 

  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },


  plugins: [
    "react"
  ],

  extends: ["plugin:react/recommended"],

  rules: {
    "import/no-webpack-loader-syntax": "off",
    "jsx-a11y/href-no-hash": "off",
    "comma-dangle": 0,
    "react/jsx-uses-vars": 1,
    "react/display-name": 1,
    "no-unused-vars": ["warn", { "vars": "all", "args": "none", "ignoreRestSiblings": false, "argsIgnorePattern": "^_" }],
    "no-console": 0,
    "no-unexpected-multiline": "warn"
  },

  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  }
}

