const gulp = require('gulp');
const path = require('path');
const merge2 = require('merge2');
const babel = require('gulp-babel');
const del = require('del');
const getBabelConfig = require('./babelConfig');
const ts = require('gulp-typescript');
const getTsConfig = require('./getTSCommonConfig');
// const tsConfig = getTsConfig();
// const tsDefaultReporter = ts.reporter.defaultReporter();
const argv = require('minimist')(process.argv.slice(2));

const { 'babel-runtime': babelRuntime = true, esm = true } = argv;

const root = process.cwd();

// const root = "/Users/whm/project/cbd-group/aliyun-gts-whale-front/packagmpagination";

async function clearTargetDir() {
  await del('lib/**');
  await del('esm/**');
  // await del('dist/**');
}

function compile(esm) {
  const streams = [];
  const src = path.resolve(root, (argv.src || 'src').replace(/(\/|\\|\.)/g, ''));
  const dest = path.resolve(root, esm ? 'esm/' : 'lib/');
  const babelConfig = getBabelConfig({
    esm,
    babelRuntime,
  });
  const assets = gulp
    .src([`${src}/**/*.@(png|svg|less|d.ts)`])
    .pipe(gulp.dest(dest));
  streams.push(assets);
  /* js */
  const js = gulp.src([`${src}/**/*.js`, `${src}/**/*.jsx`])
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(dest));
  streams.push(js);


  /* ts */
  let tsProject = ts.createProject(getTsConfig.getConfigPath(root), {
    // module: esm ? 'esnext' : 'commonjs',
    declaration: true,
  });
  const tsResult = gulp.src([`${src}/**/*.ts`, `${src}/**/*.tsx`, `${src}/**/*.d.ts`])
    .pipe(tsProject());
  // .pipe(ts({ ...tsConfig, module: modules ? 'esnext' : 'commonjs' }, tsDefaultReporter))
  // .pipe(gulp.dest(dest))


  streams.push(tsResult.js
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(dest)));
  streams.push(tsResult.dts
    .pipe(gulp.dest(dest)));

  return merge2(streams);
};


module.exports.default = async (cb = () => null) => {
  await clearTargetDir();
  compile();
  if (esm) compile(true);
  cb();
};
