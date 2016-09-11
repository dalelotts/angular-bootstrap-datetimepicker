/* globals require, __dirname */
/* jshint node:true */
'use strict'

var gulp = require('gulp')
var gulpStylelint = require('gulp-stylelint')
var lodash = require('lodash')
var path = require('path')
var paths = require('./paths')
var plato = require('plato')
var Server = require('karma').Server
var standard = require('gulp-standard')

var karmaConfig = path.join(__dirname, 'karma.conf.js')

gulp.task('css-lint', function () {
  return gulp.src(paths.css)
    .pipe(gulpStylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
})

gulp.task('clean', function () {
  var del = require('del')
  return del([
    'build'
  ])
})

gulp.task('complexity', function (done) {
  function callback () {
    done()
  }

  plato.inspect(paths.lint, 'build/complexity', {title: 'prerender', recurse: true}, callback)
})

gulp.task('lint', function () {
  return gulp
    .src(paths.lint)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('scss', function () {
  var autoprefixer = require('autoprefixer')
  var csscomb = require('gulp-csscomb')
  var postcss = require('gulp-postcss')
  var scss = require('gulp-sass')
  var scssLint = require('gulp-scss-lint')
  var scssLintStylish = require('gulp-scss-lint-stylish')
  var sourcemaps = require('gulp-sourcemaps')

  return gulp.src(paths.scss)
    .pipe(scssLint({customReport: scssLintStylish}))
    .pipe(scss())
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(sourcemaps.write('.'))
    .pipe(csscomb())
    .pipe(gulp.dest('./src/css'))
})

gulp.task('templatecache', function () {
  var templateCache = require('gulp-angular-templatecache')
  var htmlMin = require('gulp-htmlmin')

  return gulp
    .src('src/templates/**/*.html')
    .pipe(htmlMin({removeComments: true}))
    .pipe(templateCache('datetimepicker.templates.js', {
      base: path.join(__dirname, 'src'),
      modulesystem: 'IIFE',
      module: 'ui.bootstrap.datetimepicker'
    }))
    .pipe(gulp.dest('src/js'))
})

gulp.task('tdd', function (done) {
  gulp.watch(paths.all.concat(paths.scss), ['standard', 'lint', 'build-css'])

  var config = testConfig(
    {
      autoWatch: true,
      browsers: ['PhantomJS'],
      configFile: karmaConfig,
      singleRun: false
    }
  )

  var server = new Server(config, done)
  server.start()
})

gulp.task('test', ['lint', 'css-lint'], function (done) {
  var config = testConfig(
    {
      configFile: karmaConfig,
      singleRun: true,
      reporters: ['progress', 'coverage', 'threshold']
    }
  )

  var server = new Server(config, done)
  server.start()
})

gulp.task('default', ['complexity', 'test'])

function testConfig (options) {
  var travisDefaultOptions = {
    browsers: ['Firefox'],
    reporters: ['dots', 'coverage', 'threshold']
  }

  var travisOptions = process.env.TRAVIS && travisDefaultOptions

  return lodash.assign(options, travisOptions)
}

