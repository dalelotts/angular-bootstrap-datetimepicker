/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        7/21/13
 */

describe('current view displayed on the markup', function () {
  'use strict';

  var element;

  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('de');
    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));

  it('should have `.hour-view` class', function () {
    expect(jQuery('table', element).hasClass('hour-view')).toBeTruthy();
  });
});

describe('hour view with initial date of 2013-01-22', function () {
  'use strict';
  var rootScope;
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('de');
    $rootScope.date = moment('2013-01-22').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
    rootScope = $rootScope;
  }));
  it('has `.switch` element with a value of 2013-1-22', function () {
    expect(jQuery('.switch', element).text()).toBe('22. Jan. 2013');
  });
  it('has 24 `.hour` elements', function () {
    expect(jQuery('.hour', element).length).toBe(24);
  });
  it('has 1 `.active` element with a value of 0:00', function () {
    expect(jQuery('.active', element).text()).toBe(moment(rootScope.date).format('LT'));
  });
  it('has a `<th class=`left`>` that contains a sr description set in german', function () {
    expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('vorige');
  });
  it('has a `<th class=`right`>` that contains a sr description set in english', function () {
    expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('weiter');
  });
});


describe('hour view with initial date of "2020-01-01T00:00:00.000", minView="hour", minuteStep: 15', function () {
  'use strict';
  var rootScope;
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    rootScope = $rootScope;
    $rootScope.date = moment('2020-01-01T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\', minView: \'hour\', minuteStep: 15 }" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('clicking the 4th `.hour` element will set the date value to 2020-01-01T03:00:00.000"', function () {
    expect(jQuery('.switch', element).text()).toBe('1. Jan. 2020');

    expect(jQuery('.active', element).length).toBe(1);
    expect(jQuery('.hour', element).length).toBe(24);

    jQuery(jQuery('.hour', element)[3]).trigger('click');

    expect(jQuery('.active', element).text()).toBe('03:00');
    expect(rootScope.date).toEqual(moment('2020-01-01T03:00:00.000').toDate());
  });
});
