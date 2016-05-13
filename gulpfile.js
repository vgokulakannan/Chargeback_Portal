var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
    js: ['./src/**/**/*.js']
};

gulp.task('concat-js', function() {
  return gulp.src(paths.js)
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./www/js/'));
});

// gulp.task('watch', function() {
//   gulp.watch(paths.js, ['concat-js']);
// });

gulp.task('default', [],  function() {
  gulp.start('concat-js')
});
