"use strict";
//
//  S C S S
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp = require("gulp");
let path = require("../paths.js");
let error = require("../error-handler.js");
let server = require("browser-sync").get("server");

let sass = require("gulp-sass");
let postcss = require("gulp-postcss");
let rename = require("gulp-rename");

let styleguide = require("./styleguide.js");

let options = require("../options.js");
let scss = {};

scss.compile = () => {
  return gulp
    .src(path.to.scss.files)
    .pipe(sass())
    .on("error", error.handler)
    .pipe(
      postcss([
        require("postcss-inline-svg"),
        require("postcss-normalize")(options.normalize),
        require("autoprefixer")(options.autoprefixer)
      ])
    )
    .on("error", error.handler)
    .pipe(gulp.dest(path.to.scss.destination))
    .pipe(server.reload({ stream: true }));
};
scss.clean = () => {
  return gulp
    .src(path.to.scss.destination + "app.css")
    .pipe(postcss([require("postcss-cleaner")(options.cleaner)]))
    .on("error", error.handler)
    .pipe(rename({ suffix: ".clean" }))
    .pipe(gulp.dest(path.to.scss.destination));
};
scss.minify = () => {
  return gulp
    .src(path.to.scss.destination + "app.clean.css")
    .pipe(postcss([require("cssnano")]))
    .on("error", error.handler)
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.to.scss.destination));
};
scss.watch = () => {
  gulp.watch(
    path.to.scss.source + "**/*.scss",
    gulp.series([scss.compile, styleguide.compile])
  );
};

scss.compile.displayName = "Scss compilation";
scss.clean.displayName = "CSS cleaning";
scss.minify.displayName = "CSS minification";
scss.watch.displayName = "Watching CSS";

module.exports = scss;
