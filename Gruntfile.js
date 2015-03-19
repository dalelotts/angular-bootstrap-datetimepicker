/*globals module, require */
/*jslint vars:true */
module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
    }
  });
};
