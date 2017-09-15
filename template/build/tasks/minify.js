import path from 'path';
import gulp from 'gulp';
import uglify from 'gulp-uglify';
import cleanCss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import pump from 'pump';
import config from '../config';

gulp.task('minify:js', (cb) => {
  pump([
    gulp.src(path.join(config.distDir, '**', '*.js')),
    sourcemaps.init({ loadMaps: true }),
    uglify(),
    sourcemaps.write(config.sourceMapDir),
    gulp.dest(path.join(config.distDir, config.jsDirName)),
  ], cb);
});

gulp.task('minify:css', (cb) => {
  pump([
    gulp.src(path.join(config.distDir, '**', '*.css')),
    sourcemaps.init({ loadMaps: true }),
    cleanCss(),
    sourcemaps.write(config.sourceMapDir),
    gulp.dest(path.join(config.distDir, config.cssDirName)),
  ], cb);
});

gulp.task('minify', ['minify:js', 'minify:css']);
