/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        11/8/2013
 */
describe('beforeRender', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('does not throw exception', function () {
    it('when beforeRender is missing', function () {
      $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
    });
    it('when beforeRender is not a function', function () {
      $compile('<datetimepicker data-ng-model="date" data-beforeRender="foo"></datetimepicker>')($rootScope);
    });
  });

  describe('calls beforeRender before a new view is rendered', function () {
    it('year view and 2001 date is disabled', function () {

      $rootScope.date = moment("2008-01-01T00:00:00.000").toDate();
      $rootScope.beforeRender = function (dates) {
        dates[2].selectable = false;
      };

      var element = $compile('<datetimepicker data-ng-model=\'date\' data-before-render=\'beforeRender(dates)\' data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" ></datetimepicker>')($rootScope);
      $rootScope.$digest();

      var selectedElement = jQuery('.year', element)[2];
      expect(selectedElement).hasClass('disabled');
      selectedElement.trigger('click'); // No change if clicked!
      expect($rootScope.date).toEqual(moment("2009-01-01T00:00:00.000").toDate());
    });
  });
});

