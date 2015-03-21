/*globals describe, beforeEach, it, expect, module, inject */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        7/21/13
 */

describe('minuteStep', function () {
  'use strict';
  var $rootScope;
  var $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('throws exception', function () {
    it('if value is zero', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: 0 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('minuteStep must be greater than zero and less than 60');
    });
    it('if value is less than zero', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: -1 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('minuteStep must be greater than zero and less than 60');
    });
    it('if value is 60', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: 60 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('minuteStep must be greater than zero and less than 60');
    });
    it('if value is greater 60', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: 61 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('minuteStep must be greater than zero and less than 60');
    });
    it('if value is not numeric', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: \'5\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('minuteStep must be numeric');
    });
  });
  describe('does NOT throw exception', function () {
    it('if value is between 1 and 59', function () {
      for (var i = 1; i < 60; i += 1) {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteStep: ' + i + ' }"></datetimepicker>')($rootScope);
      }
    });
  });
});

