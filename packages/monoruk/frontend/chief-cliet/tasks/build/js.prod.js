import gulp from 'gulp';
import util from 'gulp-util';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import envify from 'envify';
import tsify from 'tsify';
import settings from './../settings';

export default gulp.task('js.prod', () => (
  browserify({
    entries: settings.js.entries,
    extensions: ['.jsx', '.js'],
  })
    .transform(envify, {
      global: true,
      NODE_ENV: 'production',
    })
    .plugin(tsify)
    .plugin('bundle-collapser/plugin')
    .bundle()
    .on('error', (err) => {
      util.log(util.colors.red.bold(settings.js.errorMsg));
      util.log(err.message);
    })
    .pipe(source(settings.js.buildFileName))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(settings.js.buildDir))
));
