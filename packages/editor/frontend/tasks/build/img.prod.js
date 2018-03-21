import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import flatten from 'gulp-flatten';
import settings from './../settings';

export default gulp.task('img.prod', () => (
  gulp.src(settings.img.src)
    .pipe(imagemin())
    .pipe(flatten())
    .pipe(gulp.dest(settings.img.build))
));
