/* globals describe, beforeEach, it, expect, module, inject, jQuery, moment, spyOn */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

describe('dropdownSelector', function () {
  'use strict'
  var $rootScope
  var $compile
  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_
    $rootScope = _$rootScope_
    $rootScope.date = null
  }))

  describe('throws exception', function () {
    it('if value is not a string', function () {
      function compile () {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dropdownSelector: 0 }"></datetimepicker>')($rootScope)
        $rootScope.$digest()
      }

      expect(compile).toThrow(new Error('dropdownSelector must be a string'))
    })
  })
  describe('does NOT throw exception', function () {
    it('if value is a string', function () {
      $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dropdownSelector: \'.dropdown\' }"></datetimepicker>')($rootScope)
    })
  })
  describe('toggles dropdown', function () {
    it('if value is a string', function () {
      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'year\', dropdownSelector: \'#dropdown\' }"></datetimepicker>')($rootScope)
      $rootScope.$digest()
      var pastElement = jQuery('.past', element)
      pastElement.trigger('click')
      expect($rootScope.date).not.toEqual(null)
    })
    it('and calls bootstrap methods', function () {
      var html = '<div class="dropdown">' +
        '<a class="dropdown-toggle" id="dropdown" role="button" data-toggle="dropdown" data-target="#" href="#">' +
        ' <div class="input-group">' +
        '   <input type="text" class="form-control" data-ng-model="data.dateDropDownInputNoFormatting">' +
        '   <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
        ' </div>' +
        '</a>' +
        '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">' +
        ' <datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'year\', dropdownSelector: \'#dropdown\' }"></datetimepicker>' +
        '</ul>' +
        '</div>'

      var element = $compile(html)($rootScope)
      $rootScope.$digest()

      expect($rootScope.date).toEqual(null)

      var dropdownLink = jQuery('#dropdown', element)
      var parent = dropdownLink.parent('div.dropdown')
      expect(parent.hasClass('open')).toBeFalsy()

      dropdownLink.dropdown().trigger('click')
      expect(parent.hasClass('open')).toBeTruthy()

      var dropDownSpy = spyOn(jQuery.fn, 'dropdown').and.callThrough()

      var pastElement = jQuery('.past', element)
      pastElement.trigger('click')

      expect($rootScope.date).toEqual(moment('2009-01-01T00:00:00.000').toDate())
      expect(dropDownSpy).toHaveBeenCalledWith('toggle')
    })
  })
  describe('does NOT toggle dropdown', function () {
    it('if dropdownSelector is NOT specified', function () {
      var html = '<div class="dropdown">' +
        '<a class="dropdown-toggle" id="dropdown" role="button" data-toggle="dropdown" data-target="#" href="#">' +
        ' <div class="input-group">' +
        '   <input type="text" class="form-control" data-ng-model="data.dateDropDownInputNoFormatting">' +
        '   <span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span>' +
        ' </div>' +
        '</a>' +
        '<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">' +
        ' <datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }"></datetimepicker>' +
        '</ul>' +
        '</div>'

      var element = $compile(html)($rootScope)
      $rootScope.$digest()

      expect($rootScope.date).toEqual(null)

      var dropdownLink = jQuery('#dropdown', element)
      var parent = dropdownLink.parent('div.dropdown')
      expect(parent.hasClass('open')).toBeFalsy()

      dropdownLink.dropdown().trigger('click')
      expect(parent.hasClass('open')).toBeTruthy()

      var dropDownSpy = spyOn(jQuery.fn, 'dropdown').and.callThrough()

      var pastElement = jQuery('.past', element)
      pastElement.trigger('click')

      expect($rootScope.date).toEqual(moment('2009-01-01T00:00:00.000').toDate())
      expect(dropDownSpy).not.toHaveBeenCalled()
    })
  })
})

