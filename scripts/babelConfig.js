module.exports = function getBabelConfig({ esm, babelRuntime }) {
  const plugins = [
    // [
    //   // 类装饰器
    //   require.resolve('@babel/plugin-proposal-decorators'),
    //   {
    //     legacy: true,
    //   },
    // ],
    // 支持解析文件顶部的 meta
    // require.resolve('@babel/plugin-syntax-import-meta'),
    // 支持 function.sent
    // require.resolve('@babel/plugin-proposal-function-sent'),
    // 表达式中抛出异常
    // require.resolve('@babel/plugin-proposal-throw-expressions'),
    // 解析 Object.assign (这个可以用结构代替，少用这种方式)
    // require.resolve('@babel/plugin-transform-object-assign'),
    // export 时，自动添加为 export default
    // require.resolve('@babel/plugin-proposal-export-default-from'),
  ];

  if (babelRuntime) {
    plugins.push([
      require.resolve('@babel/plugin-transform-runtime'),
      {
        helpers: false,
      },
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
