/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        11/8/2013
 */
describe('beforeRender', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('does not throw exception', function () {
    it('when beforeRender is missing', function () {
      $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
    });
    it('when beforeRender is not a function', function () {
      $compile('<datetimepicker data-ng-model="date" data-beforeRender="foo"></datetimepicker>')($rootScope);
    });
  });

  describe('calls beforeRender before a new view is rendered', function () {
    it('in year view $dates parameter contains 12 members', function () {

      $rootScope.date = moment("2008-01-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function (dates) {
        expect(dates.length).toBe(12);
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.year', element)[2]);

      expect(selectedElement.hasClass('disabled')).toBeFalsy();
      selectedElement.trigger('click');
      expect($rootScope.date).toEqual(moment("2001-01-01T00:00:00.000").toDate());

      expect($rootScope.beforeRender).toHaveBeenCalled();

    });
  });


  describe('calls beforeRender before a new view is rendered', function () {
    it('in month view $dates parameter contains 12 members', function () {

      $rootScope.date = moment("2008-01-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function (dates) {
        expect(dates.length).toBe(12);
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'month\', minView: \'month\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.month', element)[4]);

      expect(selectedElement.hasClass('disabled')).toBeFalsy();
      selectedElement.trigger('click');
      expect($rootScope.date).toEqual(moment("2008-05-01T00:00:00.000").toDate());

      expect($rootScope.beforeRender).toHaveBeenCalled();

    });
  });

  describe('calls beforeRender before a new view is rendered', function () {
    it('in day view $dates parameter contains 42 members', function () {

      $rootScope.date = moment("2014-01-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function (dates) {
        expect(dates.length).toBe(42);
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.day', element)[11]);

      expect(selectedElement.hasClass('disabled')).toBeFalsy();
      selectedElement.trigger('click');
      expect($rootScope.date).toEqual(moment("2014-01-09T00:00:00.000").toDate());

      expect($rootScope.beforeRender).toHaveBeenCalled();

    });
  });

  describe('calls beforeRender before a new view is rendered', function () {
    it('dates parameter has 12 members', function () {

      $rootScope.date = moment("2008-01-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function (dates) {
        expect(dates).not.toBeUndefined();
        expect(dates.length).toEqual(12);
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.year', element)[2]);
      expect(selectedElement.hasClass('disabled')).toBeFalsy();
      selectedElement.trigger('click');

      expect($rootScope.beforeRender).toHaveBeenCalled();
    });

    it('view parameter is "year"', function () {

      $rootScope.date = moment("2008-01-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function (view) {
        expect(view).toEqual('year');
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($view)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.year', element)[2]);
      selectedElement.trigger('click');

      expect($rootScope.beforeRender).toHaveBeenCalled();
    });

    it('$leftDate parameter is the beginning of the previous view', function () {

      $rootScope.date = moment("2008-01-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function ($leftDate) {
        expect($leftDate).not.toBeUndefined();
        expect(moment($leftDate.dateValue).toDate()).toEqual(moment.utc("1990-01-01T00:00:00.000").toDate());
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($leftDate)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.year', element)[2]);
      selectedElement.trigger('click');

      expect($rootScope.beforeRender).toHaveBeenCalled();
    });


    it('$rightDate parameter is the beginning of the next view', function () {

      $rootScope.date = moment("2014-04-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function ($rightDate) {
        expect($rightDate).not.toBeUndefined();
        expect(moment($rightDate.dateValue).toDate()).toEqual(moment.utc("2015-01-01T00:00:00.000").toDate());
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($rightDate)\' data-datetimepicker-config="{ startView: \'month\', minView: \'month\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.month', element)[2]);
      selectedElement.trigger('click');

      expect($rootScope.beforeRender).toHaveBeenCalled();
    });

    it('$upDate parameter is the beginning of the next view up ', function () {

      // i.e. minute -> hour -> day -> month -> year

      $rootScope.date = moment("2014-10-18T13:00:00.000").toDate();
      $rootScope.beforeRender = function ($upDate) {
        expect($upDate).not.toBeUndefined();
        expect(moment($upDate.dateValue).toDate()).toEqual(moment.utc("2014-10-18T00:00:00.000").toDate());
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($upDate)\' data-datetimepicker-config="{ startView: \'hour\', minView: \'hour\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.hour', element)[2]);
      selectedElement.trigger('click');

      expect($rootScope.beforeRender).toHaveBeenCalled();
    });


    it('year view and 2001 date is disabled', function () {

      $rootScope.date = moment("2008-01-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function (dates) {
        dates[2].selectable = false;
      };

      spyOn($rootScope, 'beforeRender').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender($dates)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery(jQuery('.year', element)[2]);
      expect(selectedElement.hasClass('disabled')).toBeTruthy();
      selectedElement.trigger('click'); // No change if clicked!

      expect($rootScope.beforeRender).toHaveBeenCalled();
      expect($rootScope.date).toEqual(moment("2008-01-01T00:00:00.000").toDate());

    });
  });
});

