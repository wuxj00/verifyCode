// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  globals: {
    'echarts': true,
      'window': true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    "linebreak-style": [0 ,"error", "windows"],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 0,
    'no-param-reassign': 0,
    'no-console': 0,
    "no-mixed-spaces-and-tabs": [2, false],
    "unicode-bom":0,
    "indent": [1, 4, { "SwitchCase": 1 }],
    "linebreak-style": [0, "windows"],
    "eol-last": ["error", "always"],
    "max-len": [1, 120],
    "semi": [2, "always"],
    "curly": [2, "all"],
    "no-use-before-define": ["error", { "functions": true, "classes": true }],
    "no-unused-vars": [2, {"vars": "all", "args": "after-used"}],
    "no-loop-func": "error",
    "radix": "error",
    "quotes": [1, "single", "avoid-escape"],
    "no-multi-str": "error",
    "no-new-wrappers":2,
    "no-new-object": "error",
    "no-new-func": 1,
    "no-array-constructor":2,
    "guard-for-in": 1,
    "no-inner-declarations": [2, "functions"],
    "no-prototype-builtins":2,
    "no-extend-native": 2,
    "no-proto":2,
    "no-eval":2,
    "no-with":2,
    "no-delete-var": "error"
  }
}
