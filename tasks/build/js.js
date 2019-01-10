"use strict";
//
//  J S
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp = require("gulp");
let path = require("../paths.js");
let error = require("../error-handler.js");
let server = require("browser-sync").get("server");

let rename = require("gulp-rename");

let rollup = require("rollup-stream");
let source = require("vinyl-source-stream");
let commonjs = require("rollup-plugin-commonjs");
let resolve = require("rollup-plugin-node-resolve");
let babel = require("rollup-plugin-babel");
// let babel = require("gulp-babel");
let uglify = require("gulp-uglify");

let jsdoc = require("gulp-jsdoc3");

let options = require("../options.js");
let js = {};

js.compile = () => {
  return rollup({
    input: path.to.js.files,
    plugins: [
      commonjs({
        include: "node_modules/**"
      }),
      babel(),
      resolve({
        browser: true
      })
    ],
    format: "umd"
  })
    .on("error", error.handler)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(path.to.js.destination));
};
js.clean = () => {
  return (
    gulp
      .src([
        path.to.js.destination + "bundle.js",
        path.to.js.source + "styleguide.js"
      ])
      // .pipe(babel())
      // .on("error", error.handler)
      .pipe(rename({ suffix: ".min" }))
      .pipe(gulp.dest(path.to.js.destination))
      .pipe(server.reload({ stream: true }))
  );
};
js.minify = () => {
  return gulp
    .src(path.to.js.destination + "bundle.min.js")
    .pipe(uglify())
    .on("error", error.handler)
    .pipe(gulp.dest(path.to.js.destination));
};
js.doc = done => {
  return gulp
    .src(
      [path.to.js.source + "**/*.js", "!" + path.to.js.source + "vendor/*.js"],
      { read: false }
    )
    .pipe(jsdoc(options.jsDoc, done));
};
js.watch = () => {
  gulp.watch(
    path.to.js.source + "**/*.js",
    gulp.series([js.compile, js.clean, js.doc])
  );
};

js.compile.displayName = "JS compilation";
js.clean.displayName = "JS cleaning";
js.doc.displayName = "Generate jsDoc";
js.minify.displayName = "JS minifying";
js.watch.displayName = "Watching JS";

module.exports = js;
