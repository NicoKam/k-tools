module.exports = function getBabelConfig({ esm, babelRuntime }) {
  const plugins = [
    require.resolve('@babel/plugin-transform-member-expression-literals'),
    require.resolve('@babel/plugin-transform-object-assign'),
    require.resolve('@babel/plugin-transform-property-literals'),
    require.resolve('@babel/plugin-transform-spread'),
    require.resolve('@babel/plugin-transform-template-literals'),
    require.resolve('@babel/plugin-proposal-export-default-from'),
    require.resolve('@babel/plugin-proposal-export-namespace-from'),
    require.resolve('@babel/plugin-proposal-object-rest-spread'),
    require.resolve('@babel/plugin-proposal-class-properties'),
  ];
  if (babelRuntime) {
    plugins.push([
      require.resolve('@babel/plugin-transform-runtime'),
      {
        helpers: false,
      },
    ]);
  }else{
    plugins.push([
      require.resolve('babel-plugin-transform-async-to-promises'),
    ]);
  }
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules: esm ? false : 'cjs',
          exclude: ['transform-typeof-symbol'],
          loose: true,
        },
      ],
      require.resolve(`@babel/preset-react`),
    ],
    plugins,
  };
};
