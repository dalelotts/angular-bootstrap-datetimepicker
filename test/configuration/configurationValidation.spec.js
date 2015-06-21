/*globals describe, beforeEach, it, expect, module, inject */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        8/4/13
 */
describe('configuration validation', function () {
  'use strict';
  var $rootScope;
  var $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('does not throw exception', function () {
    it('when no configuration is specified', function () {
      $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
    });
    it('when ng-model value is a valid date string (as if coming from json api)', function () {
      $rootScope.date = '2013-08-04T23:00:00';
      $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
      $rootScope.$digest();
    });
  });

  describe('throws exception', function () {
    it('if ng-model is not specified', function () {
      function compile() {
        $compile('<datetimepicker></datetimepicker>')($rootScope);
      }

      // Can't specify the error message here because it changed starting with 1.2.x
      expect(compile).toThrow();
    });
    it('if invalid option name is specified', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minview: \'year\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('invalid option: minview');
    });
  });
});

