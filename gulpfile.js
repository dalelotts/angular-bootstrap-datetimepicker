/*globals require, __dirname */
/* jshint node:true */
'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var lodash = require('lodash');
var plato = require('gulp-plato');
var karmaConfig = __dirname + '/karma.conf.js';
var paths = require('./paths');

gulp.task('complexity', function () {
  return gulp.src('src/**/*.js')
    .pipe(plato('complexity'));
});

var testConfig = function (options) {
  var travisOptions = process.env.TRAVIS &&
    {
      browsers: ['Firefox']
    };

  return lodash.assign(options, travisOptions);
};

gulp.task('test', function (done) {
  karma.start(testConfig(
    {
      configFile: karmaConfig,
      singleRun: true,
      reporters: ['progress', 'coverage', 'threshold']
    }
  ), done);
});

gulp.task('tdd', function (done) {
  gulp.watch(paths.all, ['lint']);

  karma.start({
    configFile: karmaConfig
  }, done);
});

gulp.task('lint', function () {
  return gulp
    .src(paths.lint)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default', {verbose: true}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['lint', 'complexity', 'test']);
