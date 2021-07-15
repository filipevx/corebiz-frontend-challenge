var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var pump = require('pump');


/*
 * Variables
 */
// Sass Source
var scssFiles = './src/scss/**/*.scss';

// CSS destination
var cssDest = 'build/css';

// Pug Source
var pugFiles = './src/pug/*.pug';

// Js Source
var jsFiles = './src/js/*.js';

// HTML destination
var htmlDest = 'build/template';

// Options for development
var sassDevOptions = {
  outputStyle: 'expanded'
}

// Options for production
var sassProdOptions = {
  outputStyle: 'compressed'
}

/*
* Tasks
*/

// pug
gulp.task ('gulppug', function(){
  return gulp.src('src/pug/*.pug')
  .pipe(pug({pretty: true}))
  .pipe( gulp.dest('build/template'));
});

// Task 'sassprod' - Run with command 'gulp sassprod'
gulp.task('sassprod', function() {
  return gulp.src('./src/scss/style.scss')
    .pipe(sass(sassProdOptions).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(cssDest));
});
  

gulp.task('compress', function (cb) {
  pump([
        gulp.src(jsFiles),
        uglify(),
        gulp.dest('build/js')
    ],
    cb
  );
});

// Task 'watch' - Run with command 'gulp watch'
gulp.task('watch', function() {
  gulp.watch(scssFiles, ['sassprod']);
  gulp.watch(pugFiles, ['gulppug']);
  gulp.watch(jsFiles, ['compress']);  
});

// Default task - Run with command 'gulp'
gulp.task('default', ['watch', 'gulppug', 'sassprod', 'compress']);



