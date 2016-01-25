/*globals describe, beforeEach, it, expect, module, inject, moment, angular, afterEach, jQuery */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        10/15/15
 */

describe('css styling', function () {
  'use strict';

  var element = null;

  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('en');
    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
    angular.element(document).find('body').append(element);
    $rootScope.$digest();
  }));

  it('of `.datetimepicker` should have a width of 320', function () {
    expect(element.width()).toBe(320);
    expect(jQuery(element).css('width')).toBe('320px');
  });

  describe('of `.active` element', function () {

    it('should have a height of 20', function () {
      var activeElement = jQuery('.active', element);
      expect(activeElement.height()).toBe(20);
    });
    it('should have blue background', function () {
      var activeElement = jQuery('.active', element);
      expect(activeElement.css('background-color')).toBe('rgb(0, 68, 204)');
    });
    it('should have white text', function () {
      var activeElement = jQuery('.active', element);
      expect(activeElement.css('color')).toBe('rgb(255, 255, 255)');
    });
  });


  describe('of `.past` element', function () {
    it('should have grey text', function () {
      var activeElement = jQuery('.past', element);
      expect(activeElement.css('color')).toBe('rgb(153, 153, 153)');
    });
  });

  describe('of `.future` element', function () {
    it('should have grey text', function () {
      var activeElement = jQuery('.future', element);
      expect(activeElement.css('color')).toBe('rgb(153, 153, 153)');
    });
  });

  afterEach(function () {
    angular.element(document).find('body').remove('.datetimepicker');
  });
});


describe('css styling today', function () {
  'use strict';

  var element = null;
  var header = null;
  var day = null;


  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('en');

    var d = moment.utc(new Date());
    header = d.format('YYYY-MMM');
    day = d.format('DD');

    $rootScope.date = d.toDate();
    element = $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
    angular.element(document).find('body').append(element);
    $rootScope.$digest();
  }));

  it('header is selecte to current month/year', function () {
    var todayElement = jQuery('.switch', element);
    expect(todayElement.text()).toBe(header);
  });


  it('today must have the same number', function () {
    var todayElement = jQuery('.today', element);
    expect(todayElement.text()).toBe(day);
  });
});
