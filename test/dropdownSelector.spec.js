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

