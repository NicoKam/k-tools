const gulp = require("gulp");
const path = require("path");
const merge2 = require("merge2");
const babel = require("gulp-babel");
const getBabelConfig = require("./babelConfig");

const root = process.cwd();
const src = path.resolve(root, "src");

function compile(modules) {
  const streams = [];
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


  return merge2(streams);
};


module.exports.default = (cb = () => null) => {
  compile();
  compile(false);
  cb();
};
