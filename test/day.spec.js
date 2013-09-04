/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

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

describe('day view with initial date of 2013-01-22', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'day\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has `.switch` element with a value of 2013-1', function () {
    expect(jQuery('.switch', element).text()).toBe('2013-Jan');
  });
  it('has 42 `.day` elements', function () {
    expect(jQuery('.day', element).length).toBe(42);
  });
  it('has 2 `.past` elements', function () {
    expect(jQuery('.past', element).length).toBe(2);
  });
  it('has 9 `.future` elements', function () {
    expect(jQuery('.future', element).length).toBe(9);
  });
  it('has 1 `.active` element with a value of 22', function () {
    expect(jQuery('.active', element).text()).toBe('22');
  });
});


describe('day with initial date of "2020-01-01T00:00:00.000" and minView="day"', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2020-01-01T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('clicking the 14th `.day` element will set the date value to 2020-01-11T00:00:00.000"', function () {
    expect(jQuery('.switch', element).text()).toBe('2020-Jan');

    expect(jQuery('.active', element).length).toBe(1);
    expect(jQuery('.day', element).length).toBe(42);

    var selectedElement = jQuery(jQuery('.day', element)[13]);
    selectedElement.trigger('click');

    expect(jQuery('.active', element).text()).toBe('11');
    expect($rootScope.date).toEqual(moment("2020-01-11T00:00:00.000").toDate());
  });
});