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
var lessFiles = ['src/less/*.less'];
var cssFiles = ['src/css/*.css'];
var demoFiles = ['demo/**/*.js'];
var miscFiles = ['GruntFile.js', 'gulpfile.js', 'karma.conf.js', 'paths.js'];
var sourceFiles = ['src/**/*.js'];
var testFiles = ['test/**/*.spec.js'];

module.exports = {
  all: modules.concat(sourceFiles).concat(testFiles).concat(demoFiles).concat(cssFiles),
  app: sourceFiles,
  bump: bumpFiles.concat(cssFiles).concat(lessFiles),
  css: cssFiles,
  less: lessFiles,
  lint: miscFiles.concat(sourceFiles).concat(testFiles).concat(miscFiles),
  src: sourceFiles,
  test: testFiles
};
