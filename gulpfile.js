'use strict';

require('../../gulp/gulp-init.js');

const
  SCSS = './assets/scss',
  CSS  = './assets/css',
  HTML = '.',
  JS   = './assets/js';

global.$.path = {
  scss: {
    folder: SCSS + '/',
    files: SCSS + '/**/*.scss',
    combFolder: SCSS + '-comb/',
    combFiles: SCSS + '-comb/**/*.scss'
  },
  css: {
    folder: CSS + '/',
    files: CSS + '/**/*.css',
    filesMin: CSS + '/**/*.min.css',
    mapFolder: CSS + '/',
    mapFiles: CSS + '/**/*.map'
  },
  html: {
    folder: HTML + '/',
    files: HTML + '/**/*.html'
  },
  js: {
    folder: JS + '/',
    files: JS + '/**/*.js',
    filesMin: JS + '/**/*.min.js'
  }
};

const comb    = require('../../gulp/tasks/comb.js').comb,
  combUpdate  = require('../../gulp/tasks/comb.js').update,
  combDelete  = require('../../gulp/tasks/comb.js').delete,
  scss        = require('../../gulp/tasks/scss.js'),
  mincss      = require('../../gulp/tasks/mincss.js'),
  uglifyes    = require('../../gulp/tasks/uglify.js').uglifyes,
  sync        = require('../../gulp/tasks/sync.js').sync,
  syncInit    = require('../../gulp/tasks/sync.js').init;

function watchFiles () {
  syncInit;
  watch($.path.scss.files, series(comb, scss, combDelete, mincss));
  watch([$.path.js.files, '!' + $.path.js.filesMin], series(uglifyes, sync));
  watch($.path.html.files, sync);
}

task('combScssOnly', combUpdate);
task('uglifyEs6', series(uglifyes, sync));
task('sass2minCss', series(comb, scss, combDelete, mincss));
task('watch', watchFiles);