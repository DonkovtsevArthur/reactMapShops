import gulp from 'gulp';
import settings from './../settings';

export default gulp.task('template', () =>
  gulp.src(settings.template.src).pipe(gulp.dest(settings.template.build)));
