describe('datepicker directive with empty initial state', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
        element = $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));

    // this feels rather fragile - the implementation details are not important - consider deleting.
    describe('where initial structure', function () {
        it('is a `<div>` element', function () {
            expect(element.prop('tagName')).toBe('DIV');
        });
        it('`<div>` element has a `datetimepicker` class', function () {
            expect(element.hasClass('datetimepicker')).toBe(true);
        });
        it('has a `<div>` that contains a table element', function () {
            expect(element.find('table').length).toBe(1);
        });
        it('has a `<table>` that contains a thead element', function () {
            expect(element.find('table').find('thead').length).toBe(1);
        });
        it('has a `<thead>` that contains two tr elements', function () {
            expect(element.find('table').find('thead').find('tr').length).toBe(2);
        });
        it('has a `<tr>` that contains a <th class=`left`> element', function () {
            expect(jQuery('th[class*=left]', element).length).toBe(1);
        });
        it('has a `<th class=`left`>` that contains a <i class=`icon-arrow-left`> element', function () {
            expect(jQuery('th[class*=left] > i[class*=icon-arrow-left]', element).length).toBe(1);
        });
        it('has a `<tr>` that contains a <th class=`switch` colspan="5"> element', function () {
            expect(jQuery('th[class*=switch][colspan=5]', element).length).toBe(1);
        });
        it('has a `<tr>` that contains a <th class=`right`> element', function () {
            expect(jQuery('th[class*=right]', element).length).toBe(1);
        });
        it('has a `<th class=`right`>` that contains a <i class=`icon-arrow-right`> element', function () {
            expect(jQuery('th[class*=right] > i[class*=icon-arrow-right]', element).length).toBe(1);
        });
        it('has a `<table>` that contains a tbody element', function () {
            expect(element.find('table').find('tbody').length).toBe(1);
        });
    });

    describe('where year view', function () {
        it('has a `<th class="switch">` element that contains the current decade range (2010-2019)', function () {
            expect(jQuery('thead th[class*=switch]', element).html()).toBe('2010-2019');
        });
        it('has a total of 12 `<span class="year">` elements', function () {
            expect(jQuery('tbody span[class*=year]', element).length).toBe(12);
        });
        it('does not have a `<span class="year active">` element', function () {
            // At this point there is not date set, so there is no active date.
            expect(jQuery('tbody span[class*=year][class*=active]', element).length).toBe(0);
        });
        it('has a `<span class="year past">` element that contains a year value prior to the current decade', function () {
            expect(jQuery('tbody span[class*=year][class*=past]', element).length).toBe(1);
            expect(jQuery('tbody span[class*=year][class*=past]', element).text()).toBe('2009');
        });
        it('has a `<span class="year future">` element that contains a year value after to the current decade', function () {
            expect(jQuery('tbody span[class*=year][class*=future]', element).length).toBe(1);
            expect(jQuery('tbody span[class*=year][class*=future]', element).text()).toBe('2020');
        });
        it('has a `<th class="left">` element that, when clicked, changes the title to the previous decade.', function () {
            jQuery('.left', element).trigger('click');
            expect(jQuery('.switch', element).html()).toBe('2000-2009');
        });
        it('has a `<th class="right">` element that, when clicked, changes the title to the previous decade.', function () {
            jQuery('.right', element).trigger('click');
            expect(jQuery('.switch', element).html()).toBe('2020-2029');
        });
        it('has a `<th class="switch">` element that, when clicked, changes nothing while in the year view.', function () {
            jQuery('.switch', element).trigger('click');
            expect(jQuery('.switch', element).html()).toBe('2010-2019');
        });
        it('has a `<span class="year past">` element that, when clicked, changes the calendar to the month view for the selected year.', function () {
            var pastElement = jQuery('.past', element);
            pastElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe(pastElement.text());
        });
        it('has a `<span class="year future">` element that, when clicked, changes the calendar to the month view for the selected year.', function () {
            var futureElement = jQuery('.future', element);
            futureElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe(futureElement.text());
        });
        it('has a `<th class="switch">` element that, when clicked, changes the calendar to the previous view.', function () {
            // First, click a given date
            var pastElement = jQuery('.past', element);
            pastElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe(pastElement.text());
            // Second, click .switch and the view should update
            var switchElement = jQuery('.switch', element);
            switchElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2000-2009');
        });

        it('has one `.active` element with a value of 2010 when view is month and date is 2010', function () {
            expect(jQuery('.active', element).length).toBe(0);

            $rootScope.date = new Date("2010-10-01");
            $rootScope.$apply();

            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.active', element).text()).toBe('2010');
        });
    });

    describe('where month view', function () {
        beforeEach(inject(function () {
            $rootScope.date = new Date("2010-10-01");
            $rootScope.$digest();
            // Switch to month view...
            var pastElement = jQuery('.past', element);
            pastElement.trigger('click');
        }));
        it('has one `.right` element, when clicked, changes the view to the next year', function () {
            // Starts on 2009 because the setup clicks the .past element.
            var rightElement = jQuery('.right', element);
            rightElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010');
        });
        it('has one `.left` element, when clicked, changes the view to the next year', function () {
            var rightElement = jQuery('.left', element);
            rightElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2008');
        });
        it('has one `.switch` element, when clicked, changes the view to year view', function () {
            var rightElement = jQuery('.switch', element);
            rightElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2000-2009');
        });
        it('has zero `.past` elements', function () {
            expect(jQuery('.past', element).length).toBe(0);
        });
        it('has zero `.future` elements', function () {
            expect(jQuery('.future', element).length).toBe(0);
        });
        it('has one `.active` element with a value of 2010 when view is month and date is 2010', function () {
            expect(jQuery('.active', element).length).toBe(0);

            var rightElement = jQuery('.right', element);
            rightElement.trigger('click');
            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.switch', element).text()).toBe('2010');

            var monthElement = jQuery('.active', element);
            monthElement.trigger('click');
            //expect(jQuery('.switch', element).text()).toBe('2010-Oct');
            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.active', element).text()).toBe('1');
        });
    });
    describe('where day view', function () {
        beforeEach(inject(function () {
            $rootScope.date = new Date("2010-10-01");
            $rootScope.$digest();
            // Switch to day view...
            var pastElement = jQuery('.active', element);
            pastElement.trigger('click');
            pastElement = jQuery('.active', element);
            pastElement.trigger('click');
        }));
        it('has one `.active` element with a value of 1 when view is day and date is 2010', function () {
            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.active', element).text()).toBe('1');
        });
        it('has one `.left` element, when clicked, changes the view to the previous month', function () {
            var selectedElement = jQuery('.left', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Sep');
        });
        it('has one `.right` element, when clicked, changes the view to the next month', function () {
            var selectedElement = jQuery('.right', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Nov');

        });
        it('has one `.switch` element, when clicked, changes the view to month view', function () {
            var selectedElement = jQuery('.switch', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010');
        });
        it('changes to hour view after clicking a `.past` element', function () {
            var selectedElement = jQuery(jQuery('.past', element)[0]);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Sep-26');
        });
        it('changes to hour view after clicking a `.future` element', function () {
            var selectedElement = jQuery(jQuery('.future', element)[0]);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Nov-01');
        });
        it('has 42 `.day` elements when date is oct-2010', function () {
            expect(jQuery('.day', element).length).toBe(42);
        });

        it('has 5 `.past` elements when date is oct-2010', function () {
            expect(jQuery('.past', element).length).toBe(5);
        });

        it('has 6 `.future` elements when date is oct-2010', function () {
            expect(jQuery('.future', element).length).toBe(6);
        });
    });
    describe('where hour view', function () {
        beforeEach(inject(function () {
            $rootScope.date = new Date("2010-10-01");
            $rootScope.$digest();
            // Switch to day view...
            var selectedElement = jQuery('.active', element);
            selectedElement.trigger('click');
            selectedElement = jQuery('.active', element);
            selectedElement.trigger('click');
            selectedElement = jQuery('.active', element);
            selectedElement.trigger('click');
        }));
        it('has one `.active` element with a value of 0:00 when view is hour and date is 2010-Oct-01 00:00', function () {
            expect(jQuery('.active', element).length).toBe(1);
            expect(jQuery('.active', element).text()).toBe('0:00');
        });
        it('changes the view to the previous day when `.left` element is clicked', function () {
            var selectedElement = jQuery('.left', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Sep-30');
        });
        it('changes the view to the next day when `.right` element is clicked', function () {
            var selectedElement = jQuery('.right', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Oct-02');
        });
        it('changes the view to day view when `.switch` element is clicked', function () {
            var selectedElement = jQuery('.switch', element);
            selectedElement.trigger('click');
            expect(jQuery('.switch', element).text()).toBe('2010-Oct');
        });
        it('changes the view to minute view when `.active` element is clicked', function () {
            var selectedElement = jQuery('.active', element);
            selectedElement.trigger('click');
            expect(jQuery('.minute', element).length).toBe(12);
        });
    });
});
describe('datepicker directive with initial date of 2010-10-01 and startView = "month"', function () {
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
describe('datepicker directive with initial date of 2013-01-22 and startView = "day"', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = new Date("2013-01-22");
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2013-1', function () {
        expect(jQuery('.switch', element).text()).toBe('2013-Jan');
    });
    it('has 42 `.day` elements', function () {
        expect(jQuery('.day', element).length).toBe(42);
    });
    it('has 2 `.past` elements', function () {
        expect(jQuery('.past', element).length).toBe(2);
    });
    it('has 9 `.future` elements', function () {
        expect(jQuery('.future', element).length).toBe(9);
    });
    it('has 1 `.active` element with a value of 22', function () {
        expect(jQuery('.active', element).text()).toBe('22');
    });
});
describe('datepicker directive with initial date of 2013-01-22 and startView = "hour"', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = new Date("2013-01-22");
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2013-1-22', function () {
        expect(jQuery('.switch', element).text()).toBe('2013-Jan-22');
    });
    it('has 12 `.hour` elements', function () {
        expect(jQuery('.hour', element).length).toBe(12);
    });
    it('has 1 `.active` element with a value of 0:00', function () {
        expect(jQuery('.active', element).text()).toBe('0:00');
    });
});
describe('datepicker directive with initial date of 2013-01-22 and startView = "minute"', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = new Date("2013-01-22");
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\'}" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2013-1-22 0:00', function () {
        expect(jQuery('.switch', element).text()).toBe('2013-Jan-22 0:00');
    });
    it('has 12 `.minute` elements', function () {
        expect(jQuery('.minute', element).length).toBe(12);
    });
    it('has 1 `.active` element with a value of 0:00', function () {
        expect(jQuery('.active', element).text()).toBe('0:00');
    });
});
describe('datepicker directive with initial date of 2013-01-22 1:15 and startView = "minute"', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = moment.utc("2013-01-22T01:15:00.000Z").toDate() ;
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', minuteStep: 15 }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('has `.switch` element with a value of 2013-1-22 0:00', function () {
        expect(jQuery('.switch', element).text()).toBe('2013-Jan-22 1:00');
    });
    it('has 4 `.minute` elements', function () {
        expect(jQuery('.minute', element).length).toBe(4);
    });
    it('has 1 `.active` element with a value of 0:00', function () {
        expect(jQuery('.active', element).text()).toBe('1:15');
    });
    it('changes date/time to 1:00 to when clicking first `.minute` element with a value of 0:00', function () {
        expect(jQuery('.active', element).text()).toBe('1:15');

        var selectedElement = jQuery(jQuery('.minute', element)[0]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('1:00');
        expect($rootScope.date).toEqual(moment.utc("2013-01-22T01:00:00.000Z").toDate());
    });
});

describe('datepicker directive with no initial date, minView="year"', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = null;
        element = $compile('<datetimepicker data-datetimepicker-config="{ minView: \'year\' }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the `.future` element will set the date value to 2020-01-01T00:00:00.000Z"', function () {
        expect(jQuery('.switch', element).text()).toBe('2010-2019');

        var selectedElement = jQuery('.future', element);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('2020');
        expect($rootScope.date).toEqual(moment.utc("2020-01-01T00:00:00.000Z").toDate());
    });
});

describe('datepicker directive with initial date of "2020-01-01T00:00:00.000Z", startView="month" minView="month"', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = moment.utc("2020-01-01T00:00:00.000Z").toDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'month\', minView: \'month\' }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the 12th `.month` element will set the date value to 2020-12-01T00:00:00.000Z"', function () {
        expect(jQuery('.switch', element).text()).toBe('2020');

        expect(jQuery('.month', element).length).toBe(12);

        var selectedElement = jQuery(jQuery('.month', element)[11]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('Dec');
        expect($rootScope.date).toEqual(moment.utc("2020-12-01T00:00:00.000Z").toDate());
    });
});
describe('datepicker directive with initial date of "2020-01-01T00:00:00.000Z", startView="day" minView="day"', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = moment.utc("2020-01-01T00:00:00.000Z").toDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minView: \'day\' }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the 14th `.month` element will set the date value to 2020-12-01T00:00:00.000Z"', function () {
        expect(jQuery('.switch', element).text()).toBe('2020-Jan');

        expect(jQuery('.active', element).length).toBe(1);
        expect(jQuery('.day', element).length).toBe(42);

        var selectedElement = jQuery(jQuery('.day', element)[13]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('11');
        expect($rootScope.date).toEqual(moment.utc("2020-01-11T00:00:00.000Z").toDate());
    });
});
describe('datepicker directive with initial date of "2020-01-01T00:00:00.000Z", startView="hour" minView="hour", minuteStep: 15', function () {
    var $rootScope, element;
    beforeEach(module('ui.bootstrap.datetimepicker'));
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.date = moment.utc("2020-01-01T00:00:00.000Z").toDate();
        element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'hour\', minView: \'hour\', minuteStep: 15 }" data-ng-model="date"></datetimepicker>')($rootScope);
        $rootScope.$digest();
    }));
    it('clicking the 4th `.hour` element will set the date value to 2020-12-01T03:00:00.000Z"', function () {
        expect(jQuery('.switch', element).text()).toBe('2020-Jan-01');

        expect(jQuery('.active', element).length).toBe(1);
        expect(jQuery('.hour', element).length).toBe(12);

        var selectedElement = jQuery(jQuery('.hour', element)[3]);
        selectedElement.trigger('click');

        expect(jQuery('.active', element).text()).toBe('3:00');
        expect($rootScope.date).toEqual(moment.utc("2020-01-01T03:00:00.000Z").toDate());
    });
});
// ToDo: Test dropdownSelector
// ToDo: Test invalid configuration
// ToDo: Test multiple languages