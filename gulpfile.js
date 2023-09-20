const gulp = require('gulp');
const cssbeautify = require('gulp-cssbeautify');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const { series } = require('gulp');
const concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');

function style() {
  return gulp.src('./src/assets/sass/main.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(cssbeautify())
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream());
};

function htmlfileinclude() {
  return gulp.src('./src/html/pages/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.stream());
}

function copyHTMLFiles() {
  return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
}

function copyAssets() {
  return gulp.src('./src/assets/**')
        .pipe(gulp.dest('./dist/assets/'));
}

function watch() {
  
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  });

  gulp.watch('./src/html/partials/*.html', htmlfileinclude);
  gulp.watch('./src/html/pages/*.html', htmlfileinclude);
  gulp.watch('./src/assets/sass/**/*.scss', style);

  gulp.watch('./src/html/partials/*.html').on('change', browserSync.reload);
  gulp.watch('./src/html/pages/*.html').on('change', browserSync.reload);
  gulp.watch('./src/assets/sass/**/*.scss').on('change', browserSync.reload);
}

exports.watch = watch;
exports.build = series(copyHTMLFiles, copyAssets);