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

gulp.task('build-css', ['scss'], function () {
  var Comb = require('csscomb');
  var config = require('./config/csscomb.json');
  var comb = new Comb(config);
  comb.processPath('./src/css/');
});

gulp.task('clean', function () {

  var del = require('del');
  return del([
    'build'
  ]);
});

gulp.task('default', ['clean:mobile']);

gulp.task('complexity', function (done) {

  var callback = function () {
    done();
  };

  plato.inspect(paths.lint, 'build/complexity', {title: 'prerender', recurse: true}, callback);
});


gulp.task('csslint', function () {
  return gulp.src(paths.css)
    .pipe(csslint())
    .pipe(csslint.reporter())
    .pipe(csslint.failReporter());
});

gulp.task('jscs', function () {
  return gulp
    .src(paths.lint)
    .pipe(jscs('.jscsrc'));
});

gulp.task('lint', function () {
  return gulp
    .src(paths.lint)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default', {verbose: true}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


gulp.task('scss', ['scss-lint'], function () {
  var scss = require('gulp-sass');
  var postcss = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefixer = require('autoprefixer');

  return gulp.src(paths.scss)
    .pipe(scss())
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('scss-lint', function () {
  var scssLint = require('gulp-scss-lint');
  var scssLintStylish = require('gulp-scss-lint-stylish');
  return gulp.src('./src/scss/*.scss')
    .pipe(scssLint({customReport: scssLintStylish}));
});

var testConfig = function (options) {
  var travisOptions = process.env.TRAVIS &&
    {
      browsers: ['Firefox'],
      reporters: ['dots', 'coverage', 'threshold']
    };

  return lodash.assign(options, travisOptions);
};

gulp.task('tdd', function (done) {
  gulp.watch(paths.all.concat(paths.scss), ['jscs', 'lint', 'build-css']);

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


gulp.task('default', ['jscs', 'lint', 'complexity', 'csslint', 'test']);
