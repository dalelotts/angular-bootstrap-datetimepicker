/*globals describe, beforeEach, it, expect, module, inject */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

describe('minView', function () {
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
    it('if value is not a valid value', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minView: \'bar\' }"></datetimepicker>')($rootScope);
        $rootScope.$digest();
      }

      expect(compile).toThrow('invalid minView value: bar');
    });
    it('if value is a numeric value', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minView: 0 }"></datetimepicker>')($rootScope);
        $rootScope.$digest();
      }

      expect(compile).toThrow('invalid minView value: 0');
    });
    it('if value is greater than startView', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'month\',  minView: \'year\' }"></datetimepicker>')($rootScope);
        $rootScope.$digest();
      }

      expect(compile).toThrow('startView must be greater than minView');
    });
  });
  describe('does NOT throw exception for valid values', function () {
    it('if value is between 1 and 59', function () {
      var validViews = ['year', 'month', 'day', 'hour', 'minute'];

      for (var i = 0; i < validViews.length; i += 1) {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'' + validViews[i] + '\' }"></datetimepicker>')($rootScope);
      }
    });
  });
});

