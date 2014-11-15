/*jslint node: true */
'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('karma').server;


var paths = {
  scripts: ['gulpfile.js', 'src/**/*.js', 'test/**/*.js', 'demo/**/*.js'],
  karmaConfig: __dirname + '/karma.conf.js'
};

gulp.task('test', function (done) {
  karma.start({
    configFile: paths.karmaConfig,
    singleRun: true
  }, done);
});

gulp.task('tdd', function (done) {
  gulp.watch(paths.scripts, ['lint']);

  karma.start({
    configFile: paths.karmaConfig
  }, done);
});

gulp.task('jshint', function () {
  return gulp
    .src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint', 'test']);
