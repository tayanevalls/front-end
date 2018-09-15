var gulp                = require('gulp'),
    sass                = require('gulp-sass'),
    cleanCss            = require('gulp-clean-css'),
    rename              = require('gulp-rename'),
    postcss             = require('gulp-postcss'),
    autoprefixer        = require('autoprefixer'),
    browserSync         = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src(['scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
});


gulp.task('browser-sync', function() {
  browserSync.init({
      proxy: "localhost:8080"
  });
});


gulp.task('default', ['sass'], function() {

  browserSync.init({
      server: "./"
  });

  gulp.watch("scss/*.scss", ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload);
});


