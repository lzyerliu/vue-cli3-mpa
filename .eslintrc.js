module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never'],
    'indent': 0,
    'no-tabs': 'off',
    'no-undef': 'off',
    'space-before-function-paren': 0,
    'vue/no-side-effects-in-computed-properties': 'off',
    'standard/no-callback-literal': [0, ['cb', 'callback']],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'no-sequences': 'off',
    'no-return-assign': 'off',
    'no-useless-escape': 'off',
    'prefer-const': 'off',
    'vue/html-self-closing': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/attributes-order': 'off',
    'vue/no-confusing-v-for-v-if': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-new': 'off',
    'no-extra-parens': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
