var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');

var outputDir,
    jsSources,
    sassStyle;

cssSources = [
  'css/bootstrap.min.css',
  'css/styles.css'
];

jsSources = [
  'lib/angular.min.js',
  'lib/angular-route.min.js',
  'app/*.js'
];

gulp.task('sass', function(){
  return gulp.src('css/styles.sass')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('css', function(){
	gulp.src(cssSources)
    .pipe(concat('styles.min.css'))
		.pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  gulp.src(jsSources)
      .pipe(concat('scripts.js'))
      .pipe(uglify())
      .pipe(gulp.dest('js'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('html', function(){
	gulp.src('*.html')
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('partials', function(){
	gulp.src('partials/*')
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('misc', function(){
	gulp.src(['js/*.json', 'fonts/*'])
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'js', 'misc', 'sass', 'css', 'partials'], function(){
  gulp.watch('css/*.sass', ['sass']);
  gulp.watch('css/*.css', ['css']);
  gulp.watch('*.html', ['html']);
  gulp.watch(jsSources, ['js']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
  });
});

gulp.task('default', ['sass', 'css', 'js', 'html', 'partials', 'misc', 'watch']);
