const gulp = require("gulp");
const path = require("path");
const merge2 = require("merge2");
const babel = require("gulp-babel");
const getBabelConfig = require("./babelConfig");
const ts = require("gulp-typescript");
const tsConfig = require("./getTSCommonConfig")();
const tsDefaultReporter = ts.reporter.defaultReporter();
const argv = require("minimist")(process.argv.slice(2));

const { 'babel-runtime': babelRuntime = true } = argv;

const root = process.cwd();
// const root = "D:/project/class-prefix";

function compile(moduleMode) {
  const streams = [];
  const src =  path.resolve(root, (argv.src || "src").replace(/(\/|\\|\.)/g,""));
  const dest = path.resolve(root, moduleMode === false ? "es" : "lib");
  const babelConfig = getBabelConfig({
    modules: moduleMode,
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
  const tsStream = gulp.src([`${src}/**/*.ts`, `${src}/**/*.tsx`, `${src}/**/*.d.ts`])
    .pipe(ts(tsConfig, tsDefaultReporter))
    .pipe(gulp.dest(dest))
    .pipe(babel(babelConfig))
    .pipe(gulp.dest(dest));
  streams.push(tsStream);


  return merge2(streams);
};


module.exports.default = (cb = () => null) => {
  compile();
  compile(false);
  cb();
};
