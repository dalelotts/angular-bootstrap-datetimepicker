/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        7/21/13
 */

describe('current view displayed on the markup', function () {
  'use strict';

  var element;

  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('zh-cn');
    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'year\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));

  it('should have `.year-view` class', function () {
    expect(jQuery('table', element).hasClass('year-view')).toBeTruthy();
  });
});

describe('year view with ng-model = null', function () {
  'use strict';
  var rootScope;
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    moment.locale('zh-cn');
    $rootScope.date = null;
    element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\' }"></datetimepicker>')($rootScope);
    $rootScope.$digest();
    rootScope = $rootScope;
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
    it('has a `<th class=`left`>` that contains a sr description set in simplified chinese', function () {
      expect(jQuery('th[class*=left] .sr-only', element).text()).toBe('上一页');
    });
    it('has a `<th class=`right`>` that contains a sr description set in simplified chinese', function () {
      expect(jQuery('th[class*=right] .sr-only', element).text()).toBe('下一页');
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
      jQuery('.switch', element).trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2000-2009');
    });

    it('has one `.active` element with a value of 2010 when view is month and date is 2010', function () {
      expect(jQuery('.active', element).length).toBe(0);

      rootScope.date = moment('2010-10-01').toDate();
      rootScope.$apply();

      expect(jQuery('.active', element).length).toBe(1);
      expect(jQuery('.active', element).text()).toBe('2010');
    });
  });

  describe('where month view', function () {
    beforeEach(inject(function () {
      rootScope.date = moment('2010-10-01').toDate();
      rootScope.$digest();
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

      jQuery('.active', element).trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2010-10月');
      expect(jQuery('.active', element).length).toBe(1);
      expect(jQuery('.active', element).text()).toBe('1');
    });
  });
  describe('where day view', function () {
    beforeEach(inject(function () {
      rootScope.date = moment('2010-10-01').toDate();
      rootScope.$digest();
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
      expect(jQuery('.switch', element).text()).toBe('2010-9月');
    });
    it('has one `.right` element, when clicked, changes the view to the next month', function () {
      var selectedElement = jQuery('.right', element);
      selectedElement.trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2010-11月');

    });
    it('has one `.switch` element, when clicked, changes the view to month view', function () {
      var selectedElement = jQuery('.switch', element);
      selectedElement.trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2010');
    });
    it('changes to hour view after clicking a `.past` element', function () {
      var selectedElement = jQuery(jQuery('.past', element)[0]);
      selectedElement.trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2010年9月27日');
    });
    it('changes to hour view after clicking a `.future` element', function () {
      var selectedElement = jQuery(jQuery('.future', element)[0]);
      selectedElement.trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2010年11月1日');
    });
    it('has 42 `.day` elements when date is oct-2010', function () {
      expect(jQuery('.day', element).length).toBe(42);
    });

    it('has 5 `.past` elements when date is oct-2010', function () {
      expect(jQuery('.past', element).length).toBe(4);
    });

    it('has 6 `.future` elements when date is oct-2010', function () {
      expect(jQuery('.future', element).length).toBe(7);
    });
  });
  describe('where hour view', function () {
    beforeEach(inject(function () {
      rootScope.date = moment('2010-10-01').toDate();
      rootScope.$digest();
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
      expect(jQuery('.active', element).text()).toBe(moment(rootScope.date).format('LT'));
    });
    it('changes the view to the previous day when `.left` element is clicked', function () {
      var selectedElement = jQuery('.left', element);
      selectedElement.trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2010年9月30日');
    });
    it('changes the view to the next day when `.right` element is clicked', function () {
      var selectedElement = jQuery('.right', element);
      selectedElement.trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2010年10月2日');
    });
    it('changes the view to day view when `.switch` element is clicked', function () {
      var selectedElement = jQuery('.switch', element);
      selectedElement.trigger('click');
      expect(jQuery('.switch', element).text()).toBe('2010-10月');
    });
    it('changes the view to minute view when `.active` element is clicked', function () {
      var selectedElement = jQuery('.active', element);
      selectedElement.trigger('click');
      expect(jQuery('.minute', element).length).toBe(12);
    });
  });
});
describe('year view with with ng-model = null and minView="year"', function () {
  'use strict';
  var rootScope;
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    $rootScope.date = null;
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
    rootScope = $rootScope;
  }));
  it('clicking the `.future` element will set the date value to 2020-01-01T00:00:00.000"', function () {
    expect(jQuery('.switch', element).text()).toBe('2010-2019');

    var selectedElement = jQuery('.future', element);
    selectedElement.trigger('click');

    expect(jQuery('.active', element).text()).toBe('2020');
    expect(rootScope.date).toEqual(moment('2020-01-01T00:00:00.000').toDate());
  });
});

describe('year view with with ng-model = 1970-1-1 (unix date of zero) and minView="year"', function () {
  'use strict';
  var rootScope;
  var element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function ($compile, $rootScope) {
    $rootScope.date = moment('1970-01-01T00:00:00.000').toDate();
    element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'year\', minView: \'year\' }" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
    rootScope = $rootScope;
  }));
  it('clicking the `.left` element will change the view to 1960-1969"', function () {
    expect(jQuery('.switch', element).text()).toBe('1970-1979');

    var selectedElement = jQuery('.left', element);
    selectedElement.trigger('click');

    expect(jQuery('.switch', element).text()).toBe('1960-1969');
    expect(rootScope.date).toEqual(moment('1970-01-01T00:00:00.000').toDate());
  });
});
