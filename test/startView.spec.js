/**
 CONTENTS PROPRIETARY AND CONFIDENTIAL

 Copyright © 2013 Knight Rider Consulting, Inc. All rights reserved.
 http://www.knightrider.com

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES INCLUDING,
 BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        7/21/13
 */

describe('startView', function () {
    var $rootScope, element, $compile;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
    }));

    describe('throws exception', function () {
        it('if value is not a valid value', function () {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'foo\' }"></datetimepicker>')($rootScope);
            }
            expect(compile).toThrow("invalid startView value: foo");
        });
        it('if value is a numeric value', function () {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: -1 }"></datetimepicker>')($rootScope);
            }
            expect(compile).toThrow("invalid startView value: -1");
        });
        it('if value is less than minView', function () {
            function compile() {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'hour\',  minView: \'day\' }"></datetimepicker>')($rootScope);
            }
            expect(compile).toThrow("startView must be greater than minView");
        });
    });
    describe('does NOT throw exception for valid values', function () {
        it('if value is between 1 and 59', function () {
            var validViews = ['year','month','day','hour','minute'];

            for (var i = 0; i < validViews.length; i++ ) {
                $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'' + validViews[i] + '\' }"></datetimepicker>')($rootScope);
            }
        });
    });
});

