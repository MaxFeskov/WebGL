const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('server:init', () => {
  browserSync.init({
    rewriteRules: [
      {
        match: /Content-Security-Policy/,
        fn() {
          return 'DISABLED-Content-Security-Policy';
        },
      },
    ],
    port: 8080,
    server: { baseDir: './' },
    reloadDelay: 75,
  });
});

gulp.task('server:reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('watch', () =>
  gulp.watch(['*.html', './build/**/*.*'], gulp.series('server:reload')));

gulp.task('default', gulp.parallel(
  'server:init',
  'watch',
));
