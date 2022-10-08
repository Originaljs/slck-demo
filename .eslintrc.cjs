module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: "plugin:vue/vue3-essential",
  overrides: [],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
  settings: {
    "import/resolver": {
      typescript: {
        project: `${__dirname}/tsconfig.json`,
      },
    },
  },
};
