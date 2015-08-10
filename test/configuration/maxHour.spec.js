/*globals describe, beforeEach, it, expect, module, inject */
/*License: MIT
 *
 *@author        Dima Lebedynskyi
 *@since        8/10/15
 */
 describe('maxHour', function () {
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
    var errorExpected = 'maxHour must be numeric and in [0,24] range';
    it('if value is not a numeric value', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ maxHour: \'text\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow(errorExpected);
    });
    it('if value is smaller then [0,24] range', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ maxHour: 25 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow(errorExpected);
    });
  });
  
  describe('does NOT throw exception for valid values', function () {
    it('if value is between 1 and 24', function () {
      for (var i = 0; i < 24; i++) {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ maxHour:'+ i +' }"></datetimepicker>')($rootScope);
      } 
    });
  });
});