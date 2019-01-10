'use strict';

//
//  P A T H S
//
//  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let root = './';
let source = root + 'src/';

module.exports = {
	to: {
    root: root,
    source: source,
		liquid: {
      source: source + 'templates/',
			files: source + 'templates/*.liquid',
			destination: root
		},
		scss: {
			source: source + 'scss/',
			files: source + 'scss/*.scss',
			destination: root + 'css/'
		},
		js: {
			source: source + 'js/',
			files: source + 'js/app.js',
			destination: root + 'js/',
			doc: root + 'jsDoc/'
		},
		images: {
			source: source + 'img/',
			files: source + 'img/**/*.{jpg,jpeg,png,gif}',
			destination: root + 'img/'
		},
		svg: {
			source: source + 'svg/',
			files: source + 'svg/**/*.svg',
			destination: root + 'svg/'
    },
    styleguide: {
      source: root,
      destination: root + 'styleguide/'
    }
	}
};