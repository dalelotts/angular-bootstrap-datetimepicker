/*globals module, require */
/*jslint vars:true */
module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var paths = require('./paths');

  // Project configuration.
  grunt.initConfig({
    bump: {
      options: {
        files: paths.bump,
        updateConfigs: [],
        commit: false,
        createTag: false,
        push: false,
        globalReplace: false
      }
    }
  });
};
