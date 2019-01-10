"use strict";
//
//  J S
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp = require("gulp");
let path = require("../paths.js");
let error = require("../error-handler.js");
let server = require("browser-sync").get("server");

let svgSprite = require("gulp-svg-sprite");
let svgmin = require("gulp-svgmin");
let rename = require("gulp-rename");

let styleguide = require("./styleguide.js");

let options = require("../options.js");
let svg = {};

svg.sprite = () => {
  return gulp
    .src(path.to.svg.source + "sprite/**/*.svg")
    .pipe(svgSprite(options.sprite))
    .on("error", error.handler)
    .pipe(rename("sprite.svg"))
    .on("error", error.handler)
    .pipe(gulp.dest(path.to.svg.destination))
    .pipe(rename("sprite.liquid"))
    .on("error", error.handler)
    .pipe(gulp.dest(path.to.liquid.source + "partials"))
    .pipe(server.reload({ stream: true }));
};
svg.minify = () => {
  return gulp
    .src([path.to.svg.source + "*.svg"])
    .pipe(svgmin())
    .pipe(gulp.dest(path.to.svg.destination));
};
svg.watch = () => {
  gulp.watch(
    path.to.svg.source + "sprite/*.svg",
    gulp.series([svg.sprite, styleguide.compile])
  );
  gulp.watch(path.to.svg.source + "*.svg", svg.minify);
};

svg.sprite.displayName = "SVG sprite compilation";
svg.minify.displayName = "SVG minifying";
svg.watch.displayName = "Watching SVG sprite";

module.exports = svg;
