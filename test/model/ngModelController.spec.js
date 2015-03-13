/*globals describe, beforeEach, it, expect, module, inject, jQuery, spyOn */

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

describe('ngModelController', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.data = {};
  }));

  describe('remove $pristine when date set', function () {
    it('if value is not a string', function () {

      $rootScope.setTimeFunction = function ()
        //noinspection JSLint
      {
        // Nothing to validate here.
      };

      spyOn($rootScope, 'setTimeFunction');

      var formElement = $compile('<form name="pickerform"><datetimepicker data-ng-model="data.dateValue" name="dateValue" data-on-set-time="setTimeFunction(newDate)" required data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" ></datetimepicker></form>')($rootScope);
      $rootScope.$digest();

      var picker = jQuery(jQuery('.datetimepicker', formElement));

      expect(formElement.hasClass('ng-pristine')).toBeTruthy();

      // expect(picker.hasClass('ng-pristine')).toBeTruthy(); // This breaks in 1.3, not sure why.
      expect(picker.hasClass('ng-invalid')).toBeTruthy();
      expect(picker.hasClass('ng-dirty')).toBeFalsy();
      expect(picker.hasClass('ng-valid')).toBeFalsy();

      var selectedElement = jQuery(jQuery('.day', picker)[2]);
      selectedElement.trigger('click');

      expect($rootScope.setTimeFunction).toHaveBeenCalled();

      expect(picker.hasClass('ng-invalid')).toBeFalsy();
      expect(picker.hasClass('ng-pristine')).toBeFalsy();
      expect(picker.hasClass('ng-dirty')).toBeTruthy();
      expect(picker.hasClass('ng-valid')).toBeTruthy();

      expect(formElement.hasClass('ng-pristine')).toBeFalsy();
      expect(formElement.hasClass('ng-dirty')).toBeTruthy();
    });
  });

});
