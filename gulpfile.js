const { src, dest, parallel, watch, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const fileinclude = require('gulp-file-include');

const srcDirectory = 'src/';
const buildDirectory = 'build/';

const vendorsJs = [
  // vendors js paths
  srcDirectory + '/vendors/jquery/jquery-3.3.1.min.js',
  srcDirectory + '/vendors/slider/slick.min.js',
  srcDirectory + '/vendors/mosaicflow/masonry.pkgd.min.js',
  srcDirectory + '/vendors/baguetteBox/baguetteBox.min.js',
]
const vendorsCSS = [
  // vendors css paths
  srcDirectory + '/vendors/baguetteBox/baguetteBox.min.css',
]
const files = {
  html: [srcDirectory + 'html/**/*.html', srcDirectory + 'html-components/**/*.html'],
  scss: srcDirectory + 'scss/**/*.scss',
  js: srcDirectory + 'js/**/*.js',
}

/** HTML */
function html() {
  return src(files.html)
    .pipe( fileinclude({
      prefix: '@@',
      basepath: srcDirectory + 'html-components'
    }) )
    .pipe( dest(buildDirectory) )
}
/** -//- */

/** Styles */
function styles() {
  return src(files.scss)
    .pipe( scss() )
    .pipe( postcss([ autoprefixer(), cssnano() ]) )
    .pipe( concat('styles.css') )
    .pipe( dest(buildDirectory + 'css/') )
}

function vendorsStyles() {
  return src(vendorsCSS)
    .pipe( postcss([ cssnano() ]) )
    .pipe( concat('vendors.css') )
    .pipe( dest(buildDirectory + 'css/') )
}
/** -//- */

/** Scripts */
function scripts() {
  return src(files.js)
    .pipe( concat('scripts.js') )
    .pipe( dest(buildDirectory + 'js/') )
}

function vendorsScripts() {
  return src(vendorsJs)
    .pipe( concat('vendors.js') )
    .pipe( dest(buildDirectory + 'js/') )
}
/** -//- */

/** Assets */
function images() {
  return src(srcDirectory + 'img/**/*')
    .pipe( imagemin() )
    .pipe( dest(buildDirectory + 'img/') )
}

function assets() {
  return src(srcDirectory + 'assets/**/*')
    .pipe( dest(buildDirectory + 'assets/') )
}
/** -//- */

function watchTask(){
  watch(files.scss, styles);
  watch(files.js, scripts);
  watch(files.html, html);
}

function connectTask() {
  connect.server({
    root: buildDirectory,
    host: 'localhost',
    port: '3000',
    livereload: true
  })
}

const build = parallel(html, styles, vendorsStyles, vendorsScripts, scripts, images, assets)

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.assets = assets;
exports.vendorsScripts = vendorsScripts;
exports.vendorsStyles = vendorsStyles;
exports.images = images;
exports.build = build;

exports.default = series(
  build,
  parallel(watchTask, connectTask),
);