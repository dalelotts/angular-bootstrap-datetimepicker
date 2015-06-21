/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment, spyOn */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2014 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        11/15/2014
 */

describe('dateimePickerConfig', function () {
  'use strict';
  var $rootScope;
  var $compile;

  beforeEach(module('ui.bootstrap.datetimepicker'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    moment.locale('en');
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));


  describe('retrieves information from', function () {
    it('function on scope', function () {

      var $scope = $rootScope.$new();
      $scope.date = moment('2014-11-15T00:00:00.000').toDate();
      $scope.configFunction = function configFunction() {
        return {startView: 'month'};
      };

      spyOn($scope, 'configFunction').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="configFunction()" ></datetimepicker>')($scope);
      $scope.$digest();

      expect(jQuery('.switch', element).text()).toBe('2014');
      expect($scope.configFunction).toHaveBeenCalled();
    });

    it('property on scope', function () {

      var $scope = $rootScope.$new();
      $scope.date = moment('2014-11-15T00:00:00.000').toDate();
      $scope.config = {
        datetimePicker: {
          startView: 'year'
        }
      };

      spyOn($scope, 'config').and.callThrough();

      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="config.datetimePicker" ></datetimepicker>')($scope);
      $scope.$digest();

      expect(jQuery('.switch', element).text()).toBe('2010-2019');
    });
  });
});
