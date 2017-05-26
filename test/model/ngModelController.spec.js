/* globals describe, beforeEach, it, expect, module, inject, jQuery, spyOn */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

describe('ngModelController', function () {
  'use strict'
  beforeEach(module('ui.bootstrap.datetimepicker'))

  describe('remove $pristine when date set', function () {
    it('if value is not a string', inject(function ($compile, $rootScope) {
      $rootScope.data = {}

      $rootScope.setTimeFunction = function setTimeFunction () {
        // Nothing to validate here.
        return undefined
      }

      spyOn($rootScope, 'setTimeFunction')

      var formElement = $compile('<form name="pickerform"><datetimepicker data-ng-model="data.dateValue" name="dateValue" data-on-set-time="setTimeFunction(newDate)" required data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" ></datetimepicker></form>')($rootScope)
      $rootScope.$digest()

      expect(formElement.hasClass('ng-pristine')).toBeTruthy()

      var picker = jQuery(jQuery('.datetimepicker', formElement))
      expect(picker.hasClass('ng-invalid')).toBeTruthy()
      expect(picker.hasClass('ng-dirty')).toBeFalsy()
      expect(picker.hasClass('ng-valid')).toBeFalsy()

      jQuery(jQuery('.day', picker)[2]).trigger('click')

      expect($rootScope.setTimeFunction).toHaveBeenCalled()

      expect(picker.hasClass('ng-invalid')).toBeFalsy()
      expect(picker.hasClass('ng-pristine')).toBeFalsy()
      expect(picker.hasClass('ng-dirty')).toBeTruthy()
      expect(picker.hasClass('ng-valid')).toBeTruthy()

      expect(formElement.hasClass('ng-pristine')).toBeFalsy()
      expect(formElement.hasClass('ng-dirty')).toBeTruthy()
    }))
  })
})
