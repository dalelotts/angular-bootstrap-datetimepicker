/*globals describe, beforeEach, it, expect, module, inject, jQuery */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        7/21/13
 */

describe('dropdownSelector', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('throws exception', function () {
    it('if value is not a string', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dropdownSelector: 0 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('dropdownSelector must be a string');
    });
  });
  describe('does NOT throw exception', function () {
    it('if value is a string', function () {
      $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dropdownSelector: \'.dropdown\' }"></datetimepicker>')($rootScope);
    });
  });
  describe('toggles dropdown', function () {
    it('if value is a string', function () {
      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'year\', dropdownSelector: \'#dropdown\' }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      var pastElement = jQuery('.past', element);
      pastElement.trigger('click');
      expect($rootScope.date).not.toEqual(null);
    });
  });
});

