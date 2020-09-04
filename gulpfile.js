const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

// Paths
var paths = {
  styles: {
    scss: './public/scss/**/*.scss',
    css: './public/css/styles.css',
    cssDir: './public/css/'
  }
};

// SCSS to CSS
function style() {
  return gulp.src(paths.styles.scss)
    .pipe(sass({
      errorLogToConsole: true,
    }))
    .on('error', console.error.bind(console))
    .pipe(rename({
      basename: 'styles',
    }))
    .pipe(gulp.dest(paths.styles.cssDir))
}

// Clean CSS
function minifyCss() {
  return gulp.src(paths.styles.css)
    .pipe(cleanCSS({
      level: { 1: { specialComments: 0 } }
    }))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(paths.styles.cssDir))
}

// Watch for changes
function watch() {
  gulp.watch(paths.styles.scss, style);
  gulp.watch(paths.styles.css, minifyCss);
}

exports.style = style;
exports.minifyCss = minifyCss;
exports.watch = watch;