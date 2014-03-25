module.exports = function (grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', ['jshint', 'karma:unit', 'coverage']);

  var testConfig = function (configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    coverage: {
      options: {
        thresholds: {
          'statements': 100,
          'branches': 95,
          'lines': 100,
          'functions': 100
        },
        dir: ''
      }
    },
    karma: {
      unit: {
        options: testConfig('karma.conf.js')
      },
      watch: {
        options: testConfig('karma.conf.js',
          {
            singleRun: false,
            autoWatch: true,
            keepalive: true,
            browsers: ['PhantomJS']
          })
      }
    },
    jshint: {
      files: ['src/**/*.js', 'test/**/*.js', 'demo/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {}
      }
    }
  });
};