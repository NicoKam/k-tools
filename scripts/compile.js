const gulp = require("gulp");
const path = require("path");
const merge2 = require("merge2");
const through2 = require("through2");
const babel = require("gulp-babel");
const getBabelConfig = require("./babelConfig");
const ts = require("gulp-typescript");
const tsConfig = require("./getTSCommonConfig")();
const tsDefaultReporter = ts.reporter.defaultReporter();
const argv = require("minimist")(process.argv.slice(2));

const root = process.cwd();

function compile(modules) {
  const streams = [];
  const src =  path.resolve(root, (argv.src || "src").replace(/(\/|\\|\.)/g,""));
  const dest = path.resolve(root, modules === false ? "es" : "lib");
  const assets = gulp
    .src([`${src}/**/*.@(png|svg|less|d.ts)`])
    .pipe(gulp.dest(dest));
  streams.push(assets);
  /* js */
  const js = gulp.src([`${src}/**/*.js`, `${src}/**/*.jsx`])
    .pipe(babel(getBabelConfig(modules)))
    .pipe(gulp.dest(dest));
  streams.push(js);

  /* ts */
  const tsStream = gulp.src([`${src}/**/*.ts`, `${src}/**/*.tsx`, `${src}/**/*.d.ts`])
    .pipe(ts(tsConfig, tsDefaultReporter))
    .pipe(gulp.dest(dest))
    .pipe(babel(getBabelConfig(modules)))
    .pipe(gulp.dest(dest));
  streams.push(tsStream);


  return merge2(streams);
};


module.exports.default = (cb = () => null) => {
  compile();
  compile(false);
  cb();
};
