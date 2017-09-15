import path from 'path';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixier from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';
import config from '../config';
import Util from '../Util';
import { doEslint } from './lint';
import settings from '../../src/settings';

const entry = path.join(config.sourceDir, config.jsDirName, config.jsFileName);
const borwserifyOption = {
  entries: [entry],
  transform: [babelify],
  cache: true,
  debug: true,
};

const compleJs = (doWatch = false) => {
  let bundler;
  if (doWatch) {
    bundler = watchify(browserify(borwserifyOption));
  } else {
    bundler = browserify(borwserifyOption);
  }

  const rebundle = function () {
    if (doWatch) {
      doEslint(entry);
    }
    return bundler
      .bundle()
      .on('error', err => {
        if (err.loc && err.loc.line && err.loc.column) {
          Util.notify(`${err.loc.line}:${err.loc.column} ${Util.getProjectPath(err.filename)}`, 'JS Compile Error');
        }
        Util.logError('JS Compile Error', err);
      })
      .pipe(source(borwserifyOption.entries[0]))
      .pipe(rename(path.basename(borwserifyOption.entries[0])))
      .pipe(gulp.dest(path.join(config.distDir, config.jsDirName)));
  };

  bundler
    .on('update', () => {
      rebundle();
    })
    .on('log', () => {
      Util.notify('JS Comple Succeed');
      Util.logSuccess('JS Comple Succeed');
    });

  return rebundle();
};

gulp.task('build:js', () => compleJs());
gulp.task('watch:js', () => compleJs(true));

gulp.task(
  'build:css',
  () => {
    let hasError = false;
    gulp.src([path.join(config.sourceDir, config.cssDirName, '*.scss')])
      .pipe(sourcemaps.init())
      .pipe(plumber({
        errorHandler(err) {
          console.log(err.messageFormatted);
          Util.notify('SCSS Build Error');
          hasError = true;
          this.emit('end');
        },
      }))
      .pipe(sass())
      .pipe(postcss([
        autoprefixier(config.browsers),
      ]))
      .pipe(sourcemaps.write(config.sourceMapDir))
      .pipe(gulp.dest(path.join(config.distDir, config.cssDirName)))
      .on('finish', () => {
        if (!hasError) {
          Util.logSuccess('SCSS Build Succeed');
          Util.notify('SCSS Build Succeed');
        }
      });
  }
);

gulp.task(
  'build:pages',
  () => gulp.src([path.join(config.sourceDir, 'html/pages/*.ejs'), `!${path.join(config.sourceDir, '**', '_*.ejs')}`])
    .pipe(ejs(settings)).on('error', console.log)
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(`${config.distDir}`))
);

gulp.task(
  'build:static',
  () => gulp.src(
    [path.join(config.staticDir, '**', '*')],
    { base: config.staticDir }
  )
    .pipe(gulp.dest(config.distDir))
);

gulp.task('build', () => runSequence(
  'lint',
  'clean',
  ['build:js', 'build:css', 'build:pages'],
  'build:static',
  'minify',
  () => {
    Util.notify('Build Complete');
    Util.logSuccess('Build Complete');
  }
));

// for gulp 4.0
/*
gulp.task(
  'build',
  gulp.series(
    'lint',
    'clean',
    gulp.parallel('build:js', 'build:css'),
    'minify',
    done => {
      Util.notify('build complete');
      done();
    }
  )
);*/
