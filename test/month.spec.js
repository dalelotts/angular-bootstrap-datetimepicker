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


describe('month view with initial date of 2010-10-01', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = new Date("2010-10-01");
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2010', function () {
        expect(jQuery('.switch', element).text()).toBe('2010');
    });
    it('has 12 `.month` elements', function () {
        expect(jQuery('.month', element).length).toBe(12);
    });
    it('has 1 `.active` element with a value of Oct', function () {
        expect(jQuery('.active', element).text()).toBe('Oct');
    });
});


describe('month view with initial date of "2020-01-01T00:00:00.000" and minView="month"', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = moment("2020-01-01T00:00:00.000").toDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\', minView: \'month\' }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the 12th `.month` element will set the date value to 2020-12-01T00:00:00.000"', function () {
        expect(jQuery('.switch', element).text()).toBe('2020');

        expect(jQuery('.month', element).length).toBe(12);

        var selectedElement = jQuery(jQuery('.month', element)[11]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('Dec');
        expect($rootScope.date).toEqual(moment("2020-12-01T00:00:00.000").toDate());
    });
});