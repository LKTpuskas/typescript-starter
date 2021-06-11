'use strict';
module.exports = function (api) {
  const isProd = api.env('production');
  const isCI = api.env('ci');
  return {
    presets: [
      [
        '@babel/env',
        {
          bugfixes: true,
          shippedProposals: true,
          corejs: 3,
          useBuiltIns: 'entry'
        }
      ],
      '@babel/typescript',
      ['@babel/react', { runtime: 'automatic' }]
    ],
    plugins: [
      ['@babel/transform-runtime', { useESModules: true }],
      '@babel/proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      isProd ? 'babel-plugin-jsx-remove-data-test-id' : undefined,
      isCI ? 'babel-plugin-istanbul' : undefined
    ].filter(Boolean),
    env: {
      hot: {
        presets: [
          [
            '@babel/env',
            {
              corejs: 3,
              useBuiltIns: 'entry'
            }
          ],
          '@babel/typescript',
          ['@babel/react', { runtime: 'automatic' }]
        ],
        plugins: [
          ['@babel/transform-runtime', { useESModules: true }],
          '@babel/proposal-class-properties',
          ['react-intl', { removeDefaultMessage: true }],
          ['react-refresh/babel', { skipEnvCheck: true }]
        ]
      },
      test: {
        presets: [
          [
            '@babel/env',
            {
              bugfixes: true,
              shippedProposals: true,
              corejs: 3,
              modules: 'commonjs',
              useBuiltIns: 'entry'
            }
          ],
          '@babel/typescript',
          ['@babel/react', { runtime: 'automatic' }]
        ],
        plugins: [
          ['@babel/transform-runtime', { useESModules: false }],
          '@babel/proposal-class-properties',
          ['react-intl', { removeDefaultMessage: true }]
        ]
      }
    }
  };
};
