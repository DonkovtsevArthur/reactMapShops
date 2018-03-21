import gulp from 'gulp';
import flatten from 'gulp-flatten';
import settings from './../settings';

export default gulp.task('img', () => (
  gulp.src(settings.img.src)
    .pipe(flatten())
    .pipe(gulp.dest(settings.img.build))
));
