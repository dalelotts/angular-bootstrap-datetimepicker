/* jshint node:true */

var modules = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/moment/moment.js',
  'node_modules/moment/locale/*.js',
  'node_modules/bootstrap/dist/js/bootstrap.js',
  'node_modules/angular/angular.js',
  'node_modules/angular-mocks/angular-mocks.js'
];
var bumpFiles = ['package.json', 'bower.json', 'README.md', 'src/js/*.js'];
var cssFiles = ['src/css/*.css'];
var demoFiles = ['demo/**/*.js'];
var miscFiles = ['GruntFile.js', 'gulpfile.js', 'karma.conf.js', 'paths.js'];
var sourceFiles = ['src/**/*.js'];
var testFiles = ['test/**/*.spec.js'];
var sassFiles = ['src/sass/*.scss'];

module.exports = {
  all: modules.concat(sourceFiles).concat(testFiles).concat(demoFiles),
  app: sourceFiles,
  bump: bumpFiles.concat(cssFiles),
  css: cssFiles,
  sass : sassFiles,
  lint: miscFiles.concat(sourceFiles).concat(testFiles).concat(miscFiles),
  src: sourceFiles,
  test: testFiles
};
