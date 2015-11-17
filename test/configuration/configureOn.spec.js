/*globals describe, beforeEach, it, expect, module, inject, jQuery */

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

describe('configureOn', function () {
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
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ configureOn: \'\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('configureOn must not be an empty string');
    });
    it('if value is numeric', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ configureOn: 3 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow('configureOn must be a string');
    });
  });
  describe('does NOT throw exception', function () {
    it('if value is a string', function () {

      $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ configureOn: \'foo\' }"></datetimepicker>')($rootScope);
    });
  });
  describe('configureOn event', function () {
    it('causes view to reflect changes to configuration', function () {

      $rootScope.config = {
        data: {
          configureOn: 'config-changed'
        }
      };

      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="config.data"></datetimepicker>')($rootScope);
      $rootScope.$digest();

      expect(jQuery('.day-view', element).length).toBe(1);

      $rootScope.config.data.startView = 'minute';

      $rootScope.$broadcast('config-changed');
      $rootScope.$digest();

      expect(jQuery('.day-view', element).length).toBe(0);

    });
  });
});

