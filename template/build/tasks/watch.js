import path from 'path';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import config from '../config';
import './build';

gulp.task('watch:css', () => gulp.watch(path.join(config.sourceDir, '**', '*.scss'), ['build:css']));
gulp.task('watch:pages', () => gulp.watch(path.join(config.sourceDir, '**', '*.ejs'), ['build:pages']));
gulp.task('watch:static', () => gulp.watch(path.join(config.staticDir, '**', '*'), ['build:static']));

gulp.task('watch', () => runSequence(
  'clean',
  ['build:js', 'build:css', 'build:pages'],
  'build:static',
  ['watch:js', 'watch:css', 'watch:pages', 'watch:static'],
));
