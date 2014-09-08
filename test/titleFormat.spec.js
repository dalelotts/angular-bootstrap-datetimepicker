/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2014 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author       Guillaume "Mogztter" Grossetie
 *    @since        9/8/14
 */

describe('titleFormat', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));
  describe('throws exception', function () {
    it('if minuteTitleFormat is not a String', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteTitleFormat: 0 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("minuteTitleFormat must be a string");
    });
    it('if hourTitleFormat is not a String', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ hourTitleFormat: 0 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("hourTitleFormat must be a string");
    });
    it('if dayTitleFormat is not a String', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dayTitleFormat: 0 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("dayTitleFormat must be a string");
    });
    it('if monthTitleFormat is not a String', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ monthTitleFormat: 0 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("monthTitleFormat must be a string");
    });
  });

  describe('does NOT throw exception', function () {
    it('if minuteTitleFormat is a string', function () {
      $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minuteTitleFormat: \'DD/MM/YY H:mm\' }"></datetimepicker>')($rootScope);
    });
    it('if hourTitleFormat is a string', function () {
      $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ hourTitleFormat: \'DD/MM/YY\' }"></datetimepicker>')($rootScope);
    });
    it('if dayTitleFormat is a string', function () {
      $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dayTitleFormat: \'MM/YY\' }"></datetimepicker>')($rootScope);
    });
    it('if monthTitleFormat is a string', function () {
      $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ monthTitleFormat: \'YY\' }"></datetimepicker>')($rootScope);
    });
  });
});

