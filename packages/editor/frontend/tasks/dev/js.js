import gulp from 'gulp';
import util from 'gulp-util';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import settings from './../settings';

export default gulp.task('js', () => (
  browserify({
    entries: settings.js.entries,
    extensions: ['.jsx', '.js'],
    debug: true,
  })
    .transform(babelify, {
      plugins: ['transform-class-properties', 'transform-async-to-generator'],
    })
    .bundle()
    .on('error', (err) => {
      util.log(util.colors.red.bold(settings.js.errorMsg));
      util.log(err.message);
    })
    .pipe(source(settings.js.buildFileName))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(settings.js.buildDir))
));
