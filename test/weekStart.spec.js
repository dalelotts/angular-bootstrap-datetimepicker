/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Anton Trushkevich
 *    @since         12/11/13
 */

describe('weekStart', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('throws exception', function () {
    it('if value is less than zero', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: -1 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("weekStart must be greater or equal to zero and less than 7");
    });
    it('if value is 7', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 7 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("weekStart must be greater or equal to zero and less than 7");
    });
    it('if value is greater 7', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 8 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("weekStart must be greater or equal to zero and less than 7");
    });
    it('if value is not numeric', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: \'5\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("weekStart must be numeric");
    });
  });
  describe('does NOT throw exception', function () {
    it('if value is between 0 and 6', function () {
      for (var i = 0; i < 7; i++) {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: ' + i + ' }"></datetimepicker>')($rootScope);
      }
    });
  });
});
