'use strict';
//
//  L I Q U I D
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp      = require('gulp');
let path      = require('../paths.js');
let error     = require('../error-handler.js');
let server    = require('browser-sync').get('server');

let liquify   = require('gulp-liquify');
let fs        = require('fs');
let rename    = require('gulp-rename');

let options   = require('../options.js');;
let liquid = {};

liquid.compile = () => {
  let locales = JSON.parse(
    fs.readFileSync(path.to.liquid.source + 'locales.json', 'utf8')
  );

  return gulp
    .src(path.to.liquid.files)
    .pipe(liquify(locales, { base: path.to.liquid.source }))
    .on('error', error.handler)
    .pipe(
      rename({ extname: '.html' })
    )
    .pipe(gulp.dest(path.to.liquid.destination))
    .pipe(server.reload({ stream: true }));
};
liquid.watch = () => {
	gulp.watch(path.to.liquid.source + '**/*.liquid', liquid.compile);
};

liquid.compile.displayName = 'Liquid compilation';
liquid.watch.displayName = 'Watching Liquid';

module.exports = liquid;