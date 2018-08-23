module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:security/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['prettier', 'security', 'import'],
  rules: {
    'no-var': 0,
    'prefer-const': 0,
    'no-multiple-empty-lines': [1, { "max": 1, "maxEOF": 1 }],
    'no-use-before-define': [1, { functions: false }],
    'no-alert': 0,
    'no-bitwise': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-param-reassign': 0,
    'no-mixed-operators': [
      1,
      {
        groups: [
          ['+', '-', '*', '/', '%', '**'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'object-property-newline': 2,
    'object-curly-newline': [2, { minProperties: 2 }],
  },
};
