/* jshint node:true */

var modules = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/moment/moment.js',
  'node_modules/moment/locale/*.js',
  'node_modules/bootstrap/dist/js/bootstrap.js',
  'node_modules/angular/angular.js',
  'node_modules/angular-mocks/angular-mocks.js'
];
var bumpFiles = ['package.json', 'bower.json', 'README.md', 'src/js/*.js', 'src/scss/datetimepicker.scss'];
var cssFiles = ['src/css/*.css'];
var demoFiles = ['demo/**/*.js'];
var miscFiles = ['GruntFile.js', 'gulpfile.js', 'karma.conf.js', 'paths.js'];
var scssFiles = ['src/scss/*.scss'];
var sourceFiles = ['src/**/*.js'];
var testFiles = ['test/**/*.spec.js'];

module.exports = {
  all: modules.concat(sourceFiles).concat(testFiles).concat(demoFiles).concat(cssFiles),
  app: sourceFiles,
  bump: bumpFiles.concat(cssFiles),
  css: cssFiles,
  lint: miscFiles.concat(sourceFiles).concat(testFiles).concat(miscFiles),
  scss: scssFiles,
  src: sourceFiles,
  test: testFiles
};
