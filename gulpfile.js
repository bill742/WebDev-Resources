var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync');

var env,
    outputDir,
    jsSources,
    sassStyle;

env = process.env.NODE_ENV || 'development';

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
    }))
});

gulp.task('js', function() {
  gulp.src(jsSources)
      // .pipe(concat('scripts.js'))
      .pipe(gulp.dest(outputDir + 'js'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('json', function(){
  gulp.src('development/js/*.json')
    //.pipe(gulpif(env === 'production', jsonminify()))
    .pipe(gulpif(env === 'production', gulp.dest('production/js')))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', ['browserSync', 'js', 'json', 'sass'], function(){
  gulp.watch('development/css/*.scss', ['sass']); 
  gulp.watch('development/*.html', browserSync.reload); 
  gulp.watch(jsSources, ['js']); 
  gulp.watch('development/js/*.json', ['json']); 
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'development'
    },
  })
})

gulp.task('default', ['sass', 'js', 'json', 'watch']);