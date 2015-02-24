/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment, spyOn */

describe('showCurrent', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('does not throw exception', function () {
    it('when showCurrent is missing', function () {
      $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
    });
  });

  describe('has 0 elements with .today class', function () {
    it('if showCurrent is empty array', function () {

      var element = $compile('<datetimepicker data-ng-model=\'date\' show-current="[]" data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      expect(jQuery('.today', element).length).toEqual(0);
    });

    it('if showCurrent has only day and minView is year', function () {

      var element = $compile('<datetimepicker data-ng-model=\'date\' show-current="[\'day\']" data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      expect(jQuery('.today', element).length).toEqual(0);
    });
  });

  describe('has 1 element with .today class', function () {
    it('if showCurrent has only year and startView is year', function () {

      var element = $compile('<datetimepicker data-ng-model=\'date\' show-current="[\'year\']" data-datetimepicker-config="{ startView: \'year\' }"></datetimepicker>')($rootScope);
      $rootScope.$digest();

      expect(jQuery('.today', element).length).toEqual(1);
    });

    it('if showCurrent has only month and startView is month', function () {

      var element = $compile('<datetimepicker data-ng-model=\'date\' show-current="[\'month\']" data-datetimepicker-config="{ startView: \'month\' }"></datetimepicker>')($rootScope);
      $rootScope.$digest();

      expect(jQuery('.today', element).length).toEqual(1);
    });

    it('if showCurrent has only day and startView is day', function () {

      var element = $compile('<datetimepicker data-ng-model=\'date\' show-current="[\'day\']" data-datetimepicker-config="{ startView: \'day\' }"></datetimepicker>')($rootScope);
      $rootScope.$digest();

      expect(jQuery('.today', element).length).toEqual(1);
    });

    it('if showCurrent has only hour and startView is hour', function () {

      var element = $compile('<datetimepicker data-ng-model=\'date\' show-current="[\'hour\']" data-datetimepicker-config="{ startView: \'hour\' }"></datetimepicker>')($rootScope);
      $rootScope.$digest();

      expect(jQuery('.today', element).length).toEqual(1);
    });

    it('if showCurrent has only minute and startView is minute', function () {

      var element = $compile('<datetimepicker data-ng-model=\'date\' show-current="[\'minute\']" data-datetimepicker-config="{ startView: \'minute\' }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      
      expect(jQuery('.today', element).length).toEqual(1);
    });
  });

});

