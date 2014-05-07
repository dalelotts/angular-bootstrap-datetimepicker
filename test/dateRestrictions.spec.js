/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Simeon Cheeseman
 *    @since        11/19/13
 */

describe('invalid minimum date', function(){
  'use strict';
  beforeEach(module('ui.bootstrap.datetimepicker'));
  it('throws error', inject(function ($compile, $rootScope) {
    expect(function(){
      $rootScope.date = moment().toDate();
      element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', minDate: \'not-a-date\'}" data-ng-model="date"></datetimepicker>')($rootScope);
      $rootScope.$digest();
    }).toThrow('invalid minDate: not-a-date');
  }));
});

describe('invalid maximum date', function(){
  'use strict';
  beforeEach(module('ui.bootstrap.datetimepicker'));
  it('throws error', inject(function ($compile, $rootScope) {
    expect(function(){
      $rootScope.date = moment().toDate();
      element = $compile('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', maxDate: \'not-a-date\'}" data-ng-model="date"></datetimepicker>')($rootScope);
      $rootScope.$digest();
    }).toThrow('invalid maxDate: not-a-date');
  }));
});

describe('minimum date set to "now"', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment().toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', minDate: \'now\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('last `.disabled` element should be closest 5 minute mark prior to now', function () {
    var expectedDateString = $rootScope.date.getHours() + ':';
    var minutes = $rootScope.date.getMinutes();
    minutes = minutes - ((minutes % 5 === 0)? 5 : 0) - (minutes % 5);
    if(minutes < 10){
      expectedDateString += '0';
    }
    expectedDateString += minutes;
    expect(jQuery('.disabled', element).last().text()).toBe(expectedDateString);
  });
});

describe('maximum date set to "now"', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment().toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', maxDate: \'now\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('first `.disabled` element should be closest 5 minute mark after to now', function () {
    var expectedDateString = $rootScope.date.getHours() + ':';
    var minutes = $rootScope.date.getMinutes();
    minutes = minutes + 5 - (minutes % 5);
    if(minutes < 10){
      expectedDateString += '0';
    }
    expectedDateString += minutes;
    expect(jQuery('.disabled', element).first().text()).toBe(expectedDateString);
  });
});

describe('minimum date of 2013-01-10T12:30 - minute granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T12:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', minDate: \'2013-01-22T12:30\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 6 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(6);
  });
  it('last `.disabled` element should be 2013-01-22T12:25', function () {
    expect(jQuery('.disabled', element).last().text()).toBe('12:25');
  });
});

describe('maximum date of 2013-01-10T12:30 - minute granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T12:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'minute\', maxDate: \'2013-01-22T12:30\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 5 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(5);
  });
  it('first `.disabled` element should be 2013-01-22T12:35', function () {
    expect(jQuery('.disabled', element).first().text()).toBe('12:35');
  });
});

describe('minimum date of 2013-01-10T12:30 - hour granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T12:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'hour\', minDate: \'2013-01-22T12:30\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 12 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(12);
  });
  it('last `.disabled` element should be 2013-01-22T11:00', function () {
    expect(jQuery('.disabled', element).last().text()).toBe('11:00');
  });
});

describe('maximum date of 2013-01-10T12:30 - hour granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T12:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'hour\', maxDate: \'2013-01-22T12:30\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 11 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(11);
  });
  it('first `.disabled` element should be 2013-01-22T13:00', function () {
    expect(jQuery('.disabled', element).first().text()).toBe('13:00');
  });
});

describe('minimum date of 2013-01-10 - date granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minDate: \'2013-01-10\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 11 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(11);
  });
  it('last `.disabled` element should be 2013-01-09', function () {
    expect(jQuery('.disabled', element).last().text()).toBe('9');
  });
});

describe('maximum date of 2013-01-26 - date granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'day\', maxDate: \'2013-01-26\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 11 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(14);
  });
  it('first `.disabled` element should be 2013-01-27', function () {
    expect(jQuery('.disabled', element).first().text()).toBe('27');
  });
});

describe('minimum date of 2013-06 - month granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'month\', minDate: \'2013-06\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 11 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(5);
  });
  it('last `.disabled` element should be May', function () {
    expect(jQuery('.disabled', element).last().text()).toBe('May');
  });
});

describe('maximum date of 2013-01-26 - month granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'month\', maxDate: \'2013-06\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 11 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(6);
  });
  it('first `.disabled` element should be Jul', function () {
    expect(jQuery('.disabled', element).first().text()).toBe('Jul');
  });
});

describe('minimum date of 2013 - year granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'year\', minDate: \'2013\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 11 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(4);
  });
  it('last `.disabled` element should be 2013-01-09', function () {
    expect(jQuery('.disabled', element).last().text()).toBe('2012');
  });
});

describe('maximum date of 2013 - year granularity', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'year\', maxDate: \'2013\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 11 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(7);
  });
  it('first `.disabled` element should be 2013-01-27', function () {
    expect(jQuery('.disabled', element).first().text()).toBe('2014');
  });
});

describe('.past dates earlier than minDate are .disabled', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minDate: \'2013-01-10\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 0 .past:not(.disabled)', function () {
    expect(jQuery('.past:not(.disabled)', element).length).toBe(0);
  });
});

describe('.future dates later than maxDate are .disabled', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'day\', maxDate: \'2013-01-26\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 0 .future:not(.disabled)', function () {
    expect(jQuery('.future:not(.disabled)', element).length).toBe(0);
  });
});

describe('click on .disabled dates does nothing', function () {
  'use strict';
  var $rootScope, element;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $rootScope.date = moment("2013-01-22T00:00:00.000").toDate();
    element = _$compile_('<datetimepicker data-datetimepicker-config="{ startView: \'day\', minDate: \'2013-01-10\', maxDate: \'2013-01-26\'}" data-ng-model="date"></datetimepicker>')($rootScope);
    $rootScope.$digest();
  }));
  it('has 25 `.disabled` elements', function () {
    expect(jQuery('.disabled', element).length).toBe(25);
  });
  it('click on .past.disabled day does nothing', function () {
    jQuery('.past.disabled', element).last().trigger('click');
    expect(jQuery('.hour', element).length).toBe(0);
  });
  it('click on .future.disabled day does nothing', function () {
    jQuery('.future.disabled', element).last().trigger('click');
    expect(jQuery('.hour', element).length).toBe(0);
  });
  it('click on .disabled:not(.past):not(.future) day does nothing', function () {
    jQuery('.disabled:not(.past):not(.future)', element).last().trigger('click');
    expect(jQuery('.hour', element).length).toBe(0);
  });
});