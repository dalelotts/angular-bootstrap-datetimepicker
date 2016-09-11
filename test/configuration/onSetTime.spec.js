/* globals describe, beforeEach, it, expect, module, inject, jQuery, moment, spyOn */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        11/8/2013
 */
describe('onSetTime', function () {
  'use strict'
  var $rootScope
  var $compile
  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_
    $rootScope = _$rootScope_
    $rootScope.date = null
  }))

  describe('does not throw exception', function () {
    it('when onSetTime is missing', function () {
      $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope)
    })
    it('when onSetTime is not a function', function () {
      $compile('<datetimepicker data-ng-model="date" data-onSetTime="foo"></datetimepicker>')($rootScope)
    })
  })

  describe('calls onSetTime when date is selected', function () {
    it('onSetTime accepts date parameter', function () {
      $rootScope.setTimeFunction = function (selectedDate) {
        expect(selectedDate).toEqual(moment('2009-01-01T00:00:00.000').toDate())
      }

      spyOn($rootScope, 'setTimeFunction').and.callThrough()

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction(newDate)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope)
      $rootScope.$digest()

      var selectedElement = jQuery('.past', element)
      selectedElement.trigger('click')
      expect($rootScope.setTimeFunction).toHaveBeenCalled()
      expect($rootScope.date).toEqual(moment('2009-01-01T00:00:00.000').toDate())
    })
  })

  describe('ignores onSetTime', function () {
    it('if onSetTime is not a function', function () {
      $rootScope.setTimeFunction = 'notAFunction'

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope)
      $rootScope.$digest()

      var selectedElement = jQuery('.future', element)
      selectedElement.trigger('click')
    })
  })

  describe('accepts additional parameter for onSetTime', function () {
    it('if onSetTime is not a function', function () {
      $rootScope.setTimeFunction = function (index, oldDate, newDate) {
        expect(oldDate).toBe(null)
        expect(oldDate).not.toEqual(newDate)
        expect(newDate).toEqual(moment('2020-01-01T00:00:00.000').toDate())
        expect(index).toEqual(3)
      }

      spyOn($rootScope, 'setTimeFunction').and.callThrough()

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-on-set-time=\'setTimeFunction(3, oldDate, newDate, "foo")\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope)
      $rootScope.$digest()

      var selectedElement = jQuery('.future', element)
      selectedElement.trigger('click')
      expect($rootScope.setTimeFunction).toHaveBeenCalled()
    })
  })
})

