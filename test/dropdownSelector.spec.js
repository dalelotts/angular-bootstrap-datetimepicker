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

describe('dropdownSelector', function () {
    var $rootScope, element, $compile;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('throws exception', function () {
        it('if value is not a string', function () {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dropdownSelector: 0 }"></datetimepicker>')($rootScope);
            }
            expect(compile).toThrow("dropdownSelector must be a string");
        });
    });
    describe('does NOT throw exception', function () {
        it('if value is a string', function () {
            $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ dropdownSelector: \'.dropdown\' }"></datetimepicker>')($rootScope);
        });
    });
});

