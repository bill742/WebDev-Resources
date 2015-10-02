var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync');

var env,
    outputDir,
    sassStyle;

env = process.env.NODE_ENV || 'production';

if (env==='development') {
  outputDir = 'development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'production/';
  sassStyle = 'compressed';
}

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

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('development/css/*.scss', ['sass']); 
  gulp.watch('development/*.html', browserSync.reload); 
  gulp.watch('development/js/*.js', browserSync.reload); 
  gulp.watch('development/js/*.json', browserSync.reload); 
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'development'
    },
  })
})


gulp.task('default', ['sass', 'watch']);