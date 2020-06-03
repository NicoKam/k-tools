const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
// const Config = require('webpack-chain');
const webpackConfig = require('../config/webpack.config.js');

const { resolve } = path;

const cwd = 'D:/project/gts-defc/test-component';
// const cwd = process.cwd();

// const chain = new Config(webpackConfig);

// chain.entry('main').clear().add(resolve(cwd, 'src/index'));
// chain.output.path(resolve(cwd, 'dist')).filename('[name].bundle.js');
// chain.mode('production');

// console.log(chain.toConfig());

webpackConfig.entry.main = resolve(cwd, 'src/index');
webpackConfig.output.path = resolve(cwd, 'dist');
webpackConfig.resolve.modules = [resolve(__dirname, 'node_modules'), resolve(cwd, 'node_modules')];
webpackConfig.externals = {
  react: 'react',
  'prop-types': 'prop-types',
};
webpackConfig.mode = 'development';

function createIfNotExists(dirName) {
  const dir = path.resolve(cwd, dirName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

createIfNotExists('dist');

let isFirstCompile = true;

function compile() {
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    console.log(chalk.red('Failed to initialize compile.'));
    console.log(err.message || err);
    process.exit(1);
  }
  compiler.hooks.done.tap('compilerDone', (status) => {
    const messages = status.toJson({}, true);

    // const messages = formatWebpackMessages(stats.toJson({}, true));

    if (!messages.errors.length && !messages.warnings.length) {
      if (isFirstCompile) {
        console.log('Project build complete.');
        isFirstCompile = false;
      }
    } else if (messages.errors.length) {
      console.log(chalk.red('Failed to build.'));
      messages.errors.forEach((message) => {
        console.error(chalk.red(message));
      });
      messages.warnings.forEach((message) => {
        console.warn(chalk.yellow(message));
      });
    }
  });
  return compiler;
}

function run() {
  const compiler = compile();
  compiler.run((error, status) => {
    if (error) {
      console.error(error);
      console.error('【错误】由于上面的异常，导致打包失败');
      process.exit(1);
    }
    if (status) {
      const messages = status.toJson({}, true);
      // const messages = formatWebpackMessages(status.toJson({}, true));
      messages.errors.forEach((message) => {
        console.error(chalk.red(message));
      });
      messages.warnings.forEach((message) => {
        console.warn(chalk.yellow(message));
      });
    }
    console.log('执行完毕.');
  });
}

run();
