/*globals require, __dirname */
/* jshint node:true */
'use strict';

var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var karmaConfig = __dirname + '/karma.conf.js';
var lodash = require('lodash');
var paths = require('./paths');
var plato = require('plato');

gulp.task('complexity', function (done) {

  var callback = function () {
    done();
  };

  plato.inspect(paths.lint, 'complexity', {title: 'prerender', recurse: true}, callback);
});

var testConfig = function (options) {
  var travisOptions = process.env.TRAVIS &&
    {
      browsers: ['Firefox'],
      reporters: ['dots', 'coverage', 'threshold']
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

gulp.task('jscs', function () {
  return gulp
    .src(paths.lint)
    .pipe(jscs('.jscsrc'));
});

gulp.task('default', ['jscs', 'lint', 'complexity', 'test']);
