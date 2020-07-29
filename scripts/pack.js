const fs = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const getWebpackConfig = require('../config/webpackConfig.js');
const argv = require('minimist')(process.argv.slice(2));

const cwd = process.cwd();

const webpackConfig = getWebpackConfig({
  name: argv.name,
  cwd: cwd,
  externals: {
    react: 'react',
    'prop-types': 'prop-types',
  },
});

function createIfNotExists(dirName) {
  const dir = resolve(cwd, dirName);
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

module.exports.default = run;
