'use strict';
//
//  I M A G E S
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp      = require('gulp');
let path      = require('../paths.js');
let error     = require('../error-handler.js');
let server    = require('browser-sync').get('server');

let rename    = require('gulp-rename');
let imagemin  = require('gulp-imagemin');

let options   = require('../options.js');;
let images = {};

images.minify = () => {
  return gulp
    .src(path.to.images.files)
    .pipe(imagemin())
    .pipe(gulp.dest(path.to.images.destination))
    .pipe(server.reload({ stream: true }));
};
images.watch = () => {
	gulp.watch(path.to.images.files, images.minify);
};

images.minify.displayName = 'Images minification';
images.watch.displayName = 'Watching Images';

module.exports = images;