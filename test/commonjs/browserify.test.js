/*globals  require */
/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2015 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/** This file is intentionally named browserify.test.js so that it is not picked up by the karma runner **/

var angular = require('angular');
var tapeTest = require('tape');

tapeTest('can load module after requiring', function (t) {
  'use strict';

  function loadModule() {
    angular.module('ui.bootstrap.datetimepicker');
  }

  t.throws(loadModule);
  require('../../');
  t.doesNotThrow(loadModule);
  t.end();
});