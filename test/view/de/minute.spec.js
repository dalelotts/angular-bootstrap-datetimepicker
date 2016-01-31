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
    moment.locale('de');
    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));

  it('should have `.minute-view` class', function () {
    expect(jQuery('table', element).hasClass('minute-view')).toBeTruthy();
  });
});

describe('minute view with initial date of 2013-01-22 0:00', function () {
  'use strict';
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('de');
    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has `.switch` element with a value of 2013-Jan-22 0:00', function () {
    expect(jQuery('.switch', element).text()).toBe('22. Jan. 2013 00:00');
  });
  it('has 12 `.minute` elements', function () {
    expect(jQuery('.minute', element).length).toBe(12);
  });
  it('has 1 `.active` element', function () {
    expect(jQuery('.active', element).length).toBe(1);
  });
  it('`.active` element with a value of 0:00', function () {
    expect(jQuery('.active', element).text()).toBe('00:00');
  });
  it('has a `<th class=`left`>` that contains a sr description set in german', function () {
    expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('vorige');
  });
  it('has a `<th class=`right`>` that contains a sr description set in english', function () {
    expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('weiter');
  });
});


describe('minute view with initial date of 2013-01-22 1:15', function () {
  'use strict';
  var rootScope;
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    rootScope = $rootScope;
    $rootScope.date = moment('2013-01-22T01:15:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', minuteStep: 15 }" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has `.switch` element with a value of 22. Jan. 2013 01:00 Uhr', function () {
    expect(jQuery('.switch', element).text()).toBe('22. Jan. 2013 01:00');
  });
  it('has 4 `.minute` elements', function () {
    expect(jQuery('.minute', element).length).toBe(4);
  });
  it('has 1 `.active` element with a value of 1:15', function () {
    expect(jQuery('.active', element).text()).toBe('01:15');
  });
  it('changes date/time to 1:00 to when clicking first `.minute` element with a value of 01:00 Uhr', function () {
    expect(jQuery('.active', element).text()).toBe('01:15');

    var selectedElement = jQuery(jQuery('.minute', element)[0]);
    selectedElement.trigger('click');

    expect(jQuery('.active', element).text()).toBe('01:00');
    expect(rootScope.date).toEqual(moment('2013-01-22T01:00:00.000').toDate());
  });
});
