'use strict';

//
//  C L E A N
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let gulp = require('gulp');
let del = require('del');
let path = require('./paths.js');

let clean = () => {
  return del([
    path.to.liquid.destination + '*.html',
    path.to.scss.destination,
    path.to.js.destination,
    path.to.js.doc,
    path.to.svg.destination,
    path.to.liquid.source + 'partials/sprite.liquid',
    path.to.styleguide.destination,
    path.to.images.destination
  ]);
};

clean.displayName = "Cleaning project"

module.exports = clean;
