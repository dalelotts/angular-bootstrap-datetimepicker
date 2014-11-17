/*globals module, require, process */
/*jslint vars:true */
module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  grunt.registerTask('default', ['jshint', 'complexity', 'karma', 'coverage']);

  var testConfig = function (configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && {
      browsers: ['Firefox'],
      reporters: ['dots', 'coverage'],
      singleRun: true
    };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Project configuration.
  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json', 'bower.json', 'README.md', 'src/js/*.js', 'src/css/*.css'],
        updateConfigs: [],
        commit: false,
        createTag: false,
        push: false,
        globalReplace: false
      }
    },
    complexity: {
      generic: {
        src: ['src/**/*.js'],
        options: {
          breakOnErrors: false,
          jsLintXML: 'complexity/report.xml',         // create XML JSLint-like report
          errorsOnly: false,               // show only maintainability errors
          cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
          halstead: [8, 13, 20],           // or optionally a single value, like 8
          maintainability: 100
        }
      }
    },
    coverage: {
      options: {
        thresholds: {
          'statements': 100,
          'branches': 96.9,
          'lines': 100,
          'functions': 100
        },
        dir: 'coverage',
        root: ''
      }
    },
    karma: {
      unit: {
        options: testConfig('karma.conf.js',
          {
            singleRun: true,
            autoWatch: true,
            keepalive: true,
            browsers: ['Chrome']
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
