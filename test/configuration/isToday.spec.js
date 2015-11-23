/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Erik LaBianca @easel
 *    @since         2015-11-23
 */
describe('the date element for today', function () {
    'use strict';
    var $rootScope;
    var $compile;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    it('should have the today class', function () {
        $rootScope.date = moment();
        var element = $compile('<form name="pickerform"><datetimepicker data-ng-model="data.dateValue" name="dateValue" required ></datetimepicker></form>')($rootScope);

        $rootScope.$digest();
        var todayElement = jQuery('.today', element);
        expect(todayElement.text()).toBe(String(moment().date()));
    });
});

