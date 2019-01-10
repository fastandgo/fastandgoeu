"use strict";

//
//  G U L P F I L E
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//  Loading project info & core
//  ───────────────────────────────────
var p = require("./package.json");
var gulp = require("gulp");

console.log("// " + p.name + " - " + p.version);
console.log("// " + p.description);
console.log("// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("");

//  Require tasks
//  ───────────────────────────────────
var clean = require("./tasks/clean");
var server = require("./tasks/server");
var deploy = require("./tasks/deploy");
var scss = require("./tasks/build/scss");
var js = require("./tasks/build/js");
var liquid = require("./tasks/build/liquid");
var svg = require("./tasks/build/svg");
var images = require("./tasks/build/images");
var styleguide = require("./tasks/build/styleguide");

//  Global tasks
//  ───────────────────────────────────
gulp.task("clean", clean);

gulp.task(
  "default",
  gulp.series([
    gulp.parallel([
      gulp.series([scss.compile]),
      gulp.series([js.compile, js.clean, js.doc]),
      gulp.series([svg.minify]),
      gulp.series([svg.sprite, liquid.compile]),
      gulp.series([images.minify])
    ]),
    styleguide.compile
  ])
);

gulp.task(
  "watch",
  gulp.series([
    "default",
    server.start,
    gulp.parallel([scss.watch, js.watch, svg.watch, liquid.watch])
  ])
);

gulp.task(
  "build",
  gulp.series([
    "clean",
    "default",
    gulp.parallel([gulp.series([scss.clean, scss.minify]), js.minify])
  ])
);

gulp.task("deploy", gulp.series(["build", deploy.gh_pages]));
