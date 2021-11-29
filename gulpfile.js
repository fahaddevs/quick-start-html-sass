
const gulp = require('gulp');
const { series } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssbeautify = require('gulp-cssbeautify');
// const uglify = require('gulp-uglify');
// const uglifycss = require('gulp-uglifycss');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./src/assets/sass/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sass())
    .pipe(cssbeautify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream());
};

function htmlfileinclude() {
  return gulp.src('./src/html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
}


function watch() {
  gulp.watch('./src/partial-html/*.html', htmlfileinclude);
  gulp.watch('./src/html/*.html', htmlfileinclude);
  gulp.watch('./src/assets/sass/**/*.sass', style);
}

function live() {
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  });
}

exports.watch = watch;
exports.live = live;
// exports.default = series(style, miniJs, miniCss);