var gulp = require('gulp');
sass = require('gulp-sass');
concat = require('gulp-concat');//gulp合并插件 
uglify = require('gulp-uglify');//用于压缩 JS
connect = require('gulp-connect');//用于创建本地服务器
livereload = require('gulp-livereload');//实现浏览器自动刷新页面

/**------------------ gulp default ------------------*/
gulp.task('default', ['client']);


/**------------------ gulp client ------------------*/
gulp.task('client', ['sass', 'connect', 'watch']);
gulp.task('sass', function(){
    //sass()方法用于转换sass到css
  return gulp.src('./client/scss/**/*.scss')
    .pipe(concat('app.css'))//.scss合并到app.css 
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('./client/css'))
});
// Static Server
gulp.task('connect', function() {
  connect.server({
    root: './client/',
    port: 8009,
    livereload: true
  });
});
// Reload Static Server
gulp.task('livereload', ['sass'], function() {
  gulp.src('./client/**/*.*')
    .pipe(connect.reload());
});
// Watch Client
gulp.task('watch', function() {
  gulp.watch(['./client/scss/**/*.*', './client/**/*.html'], ['livereload','sass']);
})
