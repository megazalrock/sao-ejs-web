import gulp from 'gulp';
import browserSync from 'browser-sync';
import nodemon from 'gulp-nodemon';
import config from './build/config';
import './build/tasks';

gulp.task('nodemon', cb => {
  let started = false;
  return nodemon({
    script: 'dev-server.js',
  })
    .on('start', () => {
      if (!started) {
        cb();
        started = true;
      }
    });
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init({
    files: ['dist/**/*'],
    proxy: `${config.host}:${config.port}`,
    port: config.port,
    open: false,
    browser: 'google chrome',
  });
});

gulp.task('default', ['browser-sync', 'watch']);
