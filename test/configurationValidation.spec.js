/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        8/4/13
 */
describe('configuration validation', function () {
    var $rootScope, $compile;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('does not throw exception', function () {
        it('when no configuration is specified', function () {
            $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
        });
    });

    describe('throws exception', function () {
        it('if ng-model is not specified', function () {
            function compile() {
                $compile('<datetimepicker></datetimepicker>')($rootScope);
            }

            expect(compile).toThrow("No controller: ngModel");
        });
        it('if invalid option name is specified', function () {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ minview: \'year\' }"></datetimepicker>')($rootScope);
            }

            expect(compile).toThrow("invalid option: minview");
        });
    });
});
