/*globals describe, beforeEach, it, expect, module, inject, jQuery, spyOn */

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

describe('renderOn', function () {
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
    it('if value is an empty string', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ renderOn: \'\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('renderOn must not be an empty string');
    });
    it('if value is numeric', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ renderOn: 3 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('renderOn must be a string');
    });
  });
  describe('does NOT throw exception', function () {
    it('if value is a string', function () {

      $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ renderOn: \'foo\' }"></datetimepicker>')($rootScope);
    });
  });
  describe('renderOn event', function () {
    it('causes view to re-render after event is received', function () {


      var selectable = true;

      $rootScope.config = {
        data: {
          startView: 'year',
          renderOn: 'valid-dates-changed'
        }
      };

      $rootScope.beforeRender = function (dates) {
        dates[2].selectable = selectable;
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model="date" data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="config.data"></datetimepicker>')($rootScope);
      $rootScope.$digest();


      var selectedElement = jQuery(jQuery('.year', element)[2]);
      expect(selectedElement.hasClass('disabled')).toBeFalsy();

      selectable = false;

      $rootScope.$broadcast('valid-dates-changed');
      $rootScope.$digest();

      expect($rootScope.beforeRender.calls.count()).toBe(2);

      selectedElement = jQuery(jQuery('.year', element)[2]);
      expect(selectedElement.hasClass('disabled')).toBeTruthy();
    });
  });
});

