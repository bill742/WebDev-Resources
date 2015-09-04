var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync');;

gulp.task('sass', function(){
  return gulp.src('development/css/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('development/css'))
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