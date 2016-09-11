/* globals require, __dirname */
/* jshint node:true */
'use strict'

var gulp = require('gulp')
var gulpStylelint = require('gulp-stylelint')
var jshint = require('gulp-jshint')
var lodash = require('lodash')
var path = require('path')
var paths = require('./paths')
var plato = require('plato')
var Server = require('karma').Server
var standard = require('gulp-standard')

var karmaConfig = path.join(__dirname, 'karma.conf.js')

gulp.task('build-css', ['scss'], function () {
  var Comb = require('csscomb')
  var config = require('./.csscomb.json')
  var comb = new Comb(config)
  comb.processPath('./src/css/')
})

gulp.task('clean', function () {
  var del = require('del')
  return del([
    'build'
  ])
})

gulp.task('default', ['clean:mobile'])

gulp.task('complexity', function (done) {
  function callback () {
    done()
  }
  plato.inspect(paths.lint, 'build/complexity', {title: 'prerender', recurse: true}, callback)
})

gulp.task('csslint', function () {
  return gulp.src(paths.css)
    .pipe(gulpStylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
})

gulp.task('standard', function () {
  return gulp
    .src(paths.lint)
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('lint', function () {
  return gulp
    .src(paths.lint)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default', {verbose: true}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
})

gulp.task('scss', ['scss-lint'], function () {
  var scss = require('gulp-sass')
  var postcss = require('gulp-postcss')
  var sourcemaps = require('gulp-sourcemaps')
  var autoprefixer = require('autoprefixer')

  return gulp.src(paths.scss)
    .pipe(scss())
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/css'))
})

gulp.task('scss-lint', function () {
  var scssLint = require('gulp-scss-lint')
  var scssLintStylish = require('gulp-scss-lint-stylish')
  return gulp.src('./src/scss/*.scss')
    .pipe(scssLint({customReport: scssLintStylish}))
})

function testConfig (options) {
  var travisDefaultOptions = {
    browsers: ['Firefox'],
    reporters: ['dots', 'coverage', 'threshold']
  }

  var travisOptions = process.env.TRAVIS && travisDefaultOptions

  return lodash.assign(options, travisOptions)
}

gulp.task('templatecache', function () {
  var templateCache = require('gulp-angular-templatecache')
  var htmlMin = require('gulp-htmlmin')

  return gulp
    .src('src/templates/**/*.html')
    .pipe(htmlMin({removeComments: true}))
    .pipe(templateCache('datetimepicker.templates.js', {
      base: path.join(__dirname, 'src'),
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

gulp.task('test', ['standard', 'lint', 'csslint'], function (done) {
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
