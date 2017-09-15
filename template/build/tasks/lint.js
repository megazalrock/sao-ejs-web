import path from 'path';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import config from '../config';
import Util from '../Util';

export const doEslint = source => gulp.src([source])
  .pipe(plumber({
    errorHandler() {
      Util.notify('ESlint Error');
      this.emit('end');
    },
  }))
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());

export const doScssLint = () => {};

gulp.task('lint:eslint', doEslint.bind(null, path.join(config.sourceDir, config.jsDirName, config.jsFileName)));

gulp.task('lint', ['lint:eslint']);
