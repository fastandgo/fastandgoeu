'use strict';
//
//  S T Y L E G U I D E
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp      = require('gulp');
let path      = require('../paths.js');
let error     = require('../error-handler.js');

let postcss   = require('gulp-postcss');

let options    = require('../options.js');
let styleguide = {}

styleguide.compile = () => {
  return gulp
    .src(path.to.scss.destination + 'app.css')
    .pipe(
      postcss([
        require('mdcss')(options.styleguide)
      ])
    )
    .on('error', error.handler);
}

styleguide.compile.displayName = "Generate styleguide";

module.exports = styleguide;