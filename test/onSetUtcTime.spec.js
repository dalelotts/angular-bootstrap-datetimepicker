/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author       Alessandro Cavallaro
 *    @since        21/1/2014
 */
describe('onSetUtcTime', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('does not throw exception', function () {
    it('when onSetUtcTime is missing', function () {
      $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
    });
    it('when onSetUtcTime is not a function', function () {
      $compile('<datetimepicker data-ng-model="date" data-onSetUtcTime="foo"></datetimepicker>')($rootScope);
    });
  });

  describe('calls onSetUtcTime when date is selected', function () {
    it('onSetUtcTime accepts date parameter', function () {

      $rootScope.setTimeFunction = function (selectedDate) {
        expect(selectedDate).toEqual(1230768000000);
      };

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-utc-time=\'setTimeFunction\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery('.past', element);
      selectedElement.trigger('click');
      expect($rootScope.date).toEqual(moment("2009-01-01T00:00:00.000").toDate());
    });
  });

  describe('ignores onSetUtcTime', function () {
    it('if onSetUtcTime is not a function', function () {

      $rootScope.setTimeFunction = "notAFunction";

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-utc-time=\'setTimeFunction\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery('.future', element);
      selectedElement.trigger('click');
    });
  });
});

