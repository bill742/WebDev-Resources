var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat');

var env,
    outputDir,
    jsSources,
    sassStyle;

env = process.env.NODE_ENV || 'production';

if (env==='development') {
  outputDir = 'development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'production/';
  sassStyle = 'compressed';
}

jsSources = [
  'development/js/app.js',
  'development/js/controllers.js'
];

gulp.task('sass', function(){
  return gulp.src('development/css/styles.scss')
    .pipe(sass({
      outputStyle: sassStyle
    }))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('css', function(){
	gulp.src(['development/css/bootstrap-theme.min.css', 'development/css/bootstrap.min.css'],{base: 'development/css/'})
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'css')))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  gulp.src(jsSources)
      // .pipe(concat('scripts.js'))
      .pipe(gulpif(env === 'production', concat('scripts.js')))
      .pipe(gulp.dest(outputDir + 'js'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('json', function(){
  gulp.src('development/js/*.json')
    .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function(){
	gulp.src('development/*.html')
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('partials', function(){
	gulp.src('development/partials/*')
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'partials')))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('misc', function(){
	gulp.src(['development/lib/*', 'development/fonts/*'], {base: 'development/'})
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'js', 'json', 'sass'], function(){
  gulp.watch('development/css/*.scss', ['sass']);
  gulp.watch('development/*.html', ['html']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('development/js/*.json', ['json']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'development'
    },
  });
});

gulp.task('default', ['sass', 'css', 'js', 'json', 'html', 'partials', 'misc', 'watch']);
