import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import settings from '../settings';

export default gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: settings.server.baseDir,
      middleware: [historyApiFallback()],
    },
  });
});

