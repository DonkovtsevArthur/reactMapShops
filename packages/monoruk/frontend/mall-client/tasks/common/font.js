import gulp from "gulp";
import settings from "./../settings";

export default gulp.task("fonts", () => {
  return gulp.src(settings.fonts.src).pipe(gulp.dest(settings.fonts.build));
});
