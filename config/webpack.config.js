const config = {
  mode: 'production',
  entry: {
    main: './src/index',
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    // library: 'lib',
    libraryTarget: 'umd',
    path: `dist`,
  },
  resolve: {
    // alias: {
    //   "@": path.join(rootPath, "./src"),
    // },
    // modules: [path.join(rootPath, "src"), path.join(rootPath, "node_modules")],
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(md|txt)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /src/, // foo.js?src
            use: 'raw-loader',
          },
          {
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                  plugins: [
                    [
                      '@babel/plugin-proposal-decorators',
                      {
                        legacy: true,
                      },
                    ],
                    // "@babel/plugin-transform-runtime",
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-syntax-import-meta',
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                    '@babel/plugin-proposal-json-strings',
                    '@babel/plugin-proposal-function-sent',
                    '@babel/plugin-proposal-export-namespace-from',
                    '@babel/plugin-proposal-numeric-separator',
                    '@babel/plugin-proposal-throw-expressions',
                    [
                      'import',
                      {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: true, // `style: true` 会加载 less 文件
                      },
                    ],
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.css?$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less?$/,
        // exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /src/, // foo.css?src
            use: 'raw-loader',
          },
          {
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {},
              },
              {
                loader: 'less-loader',
                options: {
                  // javascriptEnabled: true,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=image/svg+xml',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=8192&name=[path][name].[hash:12].[ext]'],
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    __dirname: true,
    path: true,
  },
};

module.exports = config;
