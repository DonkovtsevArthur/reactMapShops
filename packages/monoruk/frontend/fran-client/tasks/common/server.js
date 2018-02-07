import gulp from 'gulp';
import browserSync from 'browser-sync';

export default gulp.task('server', () => {
  browserSync.init({
    proxy: 'localhost:8000',
  });
});
