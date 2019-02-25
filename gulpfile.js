const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const compileFile = ['./src/server/**/*.js'];

gulp.task('default', () => {
  gulp.src(compileFile)
    .pipe($.babel({
      presets: ['env'],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('./bin/server'))
})

const watcher = gulp.watch(compileFile, ['default']);

watcher.on('change', e => {
  console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
})