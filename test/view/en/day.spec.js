/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT

 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

describe('current view displayed on the markup', function () {
  'use strict';

  var element;

  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('en');
    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));

  it('should have `.day-view` class', function () {
    expect(jQuery('table', element).hasClass('day-view')).toBeTruthy();
  });
});

describe('English day view with initial date of 2013-01-22', function () {
  'use strict';
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('en');
    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\'}" data-ng-model="date"></datetimepicker>')($rootScope);
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
  it('has a `<th class=`left`>` that contains a sr description set in english', function () {
    expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('previous');
  });
  it('has a `<th class=`right`>` that contains a sr description set in english', function () {
    expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('next');
  });
});


describe('day with initial date of "2020-01-01T00:00:00.000" and minView="day"', function () {
  'use strict';
  var rootScope;
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    rootScope = $rootScope;
    $rootScope.date = moment('2020-01-01T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('clicking the 14th `.day` element will set the date value to 2020-01-11T00:00:00.000"', function () {
    expect(jQuery('.switch', element).text()).toBe('2020-Jan');

    expect(jQuery('.active', element).length).toBe(1);
    expect(jQuery('.day', element).length).toBe(42);

    var selectedElement = jQuery(jQuery('.day', element)[13]);
    selectedElement.trigger('click');

    expect(jQuery('.active', element).text()).toBe('11');
    expect(rootScope.date).toEqual(moment('2020-01-11T00:00:00.000').toDate());
  });
});


describe('day with initial date of "2008-02-01T00:00:00.000" (leap year) and minView="day"', function () {
  'use strict';
  var rootScope;
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    rootScope = $rootScope;
    $rootScope.date = moment('2008-02-01T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('clicking the 34th `.day` element will set the date value to 2008-29-11T00:00:00.000"', function () {
    expect(jQuery('.switch', element).text()).toBe('2008-Feb');

    expect(jQuery('.active', element).length).toBe(1);
    expect(jQuery('.active', element).text()).toBe('1');
    expect(jQuery('.day', element).length).toBe(42);
    expect(jQuery('.past', element).length).toBe(5);

    expect(jQuery('.future', element).length).toBe(8);
    var selectedElement = jQuery(jQuery('.day', element)[33]);

    selectedElement.trigger('click');
    expect(jQuery('.active', element).text()).toBe('29');
    expect(rootScope.date).toEqual(moment('2008-02-29T00:00:00.000').toDate());
  });
});
