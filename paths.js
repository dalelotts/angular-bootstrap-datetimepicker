/* jshint node:true */

var bower = [
  'bower_components/jquery/dist/jquery.js',
  'bower_components/moment/moment.js',
  'bower_components/moment/locale/*.js',
  'bower_components/bootstrap/dist/js/bootstrap.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-mocks/angular-mocks.js'
];
var bumpFiles = ['package.json', 'bower.json', 'README.md', 'src/js/*.js', 'src/css/*.css'];
var miscFiles = ['GruntFile.js', 'gulpfile.js', 'karma.conf.js', 'paths.js'];
var demoFiles = ['demo/**/*.js'];
var sourceFiles = ['src/**/*.js'];
var testFiles = ['test/**/*.spec.js'];

module.exports = {
  all: bower.concat(sourceFiles).concat(testFiles).concat(demoFiles),
  app: sourceFiles,
  bump: bumpFiles,
  lint: miscFiles.concat(sourceFiles).concat(testFiles).concat(miscFiles),
  src: sourceFiles,
  test: testFiles
};
