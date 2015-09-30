/*globals require, __dirname */
/* jshint node:true */
'use strict';

var csslint = require('gulp-csslint');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var karmaConfig = __dirname + '/karma.conf.js';
var lodash = require('lodash');
var paths = require('./paths');
var plato = require('plato');
var Server = require('karma').Server;

gulp.task('complexity', function (done) {

  var callback = function () {
    done();
  };

  plato.inspect(paths.lint, 'complexity', {title: 'prerender', recurse: true}, callback);
});


gulp.task('csslint', function () {
  return gulp.src(paths.css)
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(csslint.failReporter());
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

  var config = testConfig(
    {
      configFile: karmaConfig,
      singleRun: true,
      reporters: ['progress', 'coverage', 'threshold']
    }
  );

  var server = new Server(config, done);
  server.start();
});

gulp.task('tdd', function (done) {
  gulp.watch(paths.all, ['jscs', 'lint', 'csslint']);

  var config = testConfig(
    {
      autoWatch: true,
      browsers: ['PhantomJS'],
      configFile: karmaConfig,
      singleRun: false
    }
  );

  var server = new Server(config, done);
  server.start();
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

gulp.task('default', ['jscs', 'lint', 'csslint', 'complexity', 'test']);
