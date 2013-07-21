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


describe('minute view with initial date of 2013-01-22 0:00', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = moment("2013-01-22T00:0:00.000").toDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2013-Jan-22 0:00', function () {
        expect(jQuery('.switch', element).text()).toBe('2013-Jan-22 0:00');
    });
    it('has 12 `.minute` elements', function () {
        expect(jQuery('.minute', element).length).toBe(12);
    });
    it('has 1 `.active` element', function () {
        expect(jQuery('.active', element).length).toBe(1);
    });
    it('`.active` element with a value of 0:00', function () {
        expect(jQuery('.active', element).text()).toBe('0:00');
    });
});


describe('minute view with initial date of 2013-01-22 1:15', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = moment("2013-01-22T01:15:00.000").toDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', minuteStep: 15 }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2013-Jan-22 1:00', function () {
        expect(jQuery('.switch', element).text()).toBe('2013-Jan-22 1:00');
    });
    it('has 4 `.minute` elements', function () {
        expect(jQuery('.minute', element).length).toBe(4);
    });
    it('has 1 `.active` element with a value of 1:15', function () {
        expect(jQuery('.active', element).text()).toBe('1:15');
    });
    it('changes date/time to 1:00 to when clicking first `.minute` element with a value of 0:00', function () {
        expect(jQuery('.active', element).text()).toBe('1:15');

        var selectedElement = jQuery(jQuery('.minute', element)[0]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('1:00');
        expect($rootScope.date).toEqual( moment("2013-01-22T01:00:00.000").toDate());
    });
});