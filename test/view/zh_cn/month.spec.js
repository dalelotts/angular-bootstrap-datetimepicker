/* globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT

 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

describe('current view displayed on the markup', function () {
  'use strict'

  var element

  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('zh-cn')
    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate()
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\'}" data-ng-model="date"></datetimepicker>')($rootScope)
    $rootScope.$digest()
  }))

  it('should have `.month-view` class', function () {
    expect(jQuery('table', element).hasClass('month-view')).toBeTruthy()
  })
})

describe('month view with initial date of 2010-10-01', function () {
  'use strict'
  var element
  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('zh-cn')
    $rootScope.date = moment('2010-10-01').toDate()
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\'}" data-ng-model="date"></datetimepicker>')($rootScope)
    $rootScope.$digest()
  }))
  it('has `.switch` element with a value of 2010', function () {
    expect(jQuery('.switch', element).text()).toBe('2010')
  })
  it('has 12 `.month` elements', function () {
    expect(jQuery('.month', element).length).toBe(12)
  })
  it('has 1 `.active` element with a value of Oct', function () {
    expect(jQuery('.active', element).text()).toBe('10月')
  })
  it('has a `<th class=`left`>` that contains a sr description set in simplified chinese', function () {
    expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('上一页')
  })
  it('has a `<th class=`right`>` that contains a sr description set in simplified chinese', function () {
    expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('下一页')
  })
})

describe('month view with initial date of "2020-01-01T00:00:00.000" and minView="month"', function () {
  'use strict'
  var rootScope
  var element
  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function ($compile, $rootScope) {
    rootScope = $rootScope
    $rootScope.date = moment('2020-01-01T00:00:00.000').toDate()
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\', minView: \'month\' }" data-ng-model="date"></datetimepicker>')($rootScope)
    $rootScope.$digest()
  }))
  it('clicking the 12th `.month` element will set the date value to 2020-12-01T00:00:00.000"', function () {
    expect(jQuery('.switch', element).text()).toBe('2020')

    expect(jQuery('.month', element).length).toBe(12)

    var selectedElement = jQuery(jQuery('.month', element)[11])
    selectedElement.trigger('click')

    expect(jQuery('.active', element).text()).toBe('12月')
    expect(rootScope.date).toEqual(moment('2020-12-01T00:00:00.000').toDate())
  })
})
