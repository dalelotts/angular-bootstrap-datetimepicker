/*globals describe, beforeEach, it, expect, module, inject, jQuery, moment */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Anton Trushkevich
 *    @since         12/11/13
 */

describe('weekStart', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('throws exception', function () {
    it('if value is less than zero', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: -1 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("weekStart must be greater than or equal to zero and less than 7");
    });
    it('if value is 7', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 7 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("weekStart must be greater than or equal to zero and less than 7");
    });
    it('if value is greater 7', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 8 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("weekStart must be greater than or equal to zero and less than 7");
    });
    it('if value is not numeric', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: \'5\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("weekStart must be numeric");
    });
  });
  describe('does NOT throw exception', function () {
    it('if value is between 0 and 6', function () {
      for (var i = 0; i < 7; i++) {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: ' + i + ' }"></datetimepicker>')($rootScope);
      }
    });
  });
  describe('with a value of 0', function () {
    var element;
    beforeEach(inject(function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 0 }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      $rootScope.date = moment("2010-10-01").toDate();
      $rootScope.$digest();
    }));
    it('has seven `.dow` elements', function () {
      expect(jQuery('.dow', element).length).toBe(7);
    });
    it('the first `.dow` element has a value of Su', function () {
      expect(jQuery(jQuery('.dow', element)[0]).text()).toBe('Su');
    });
    it('there are 42 `.day` elements', function () {
      expect(jQuery('.day', element).length).toBe(42);
    });
    it('the first `.day` element has a value of 26', function () {
      expect(jQuery(jQuery('.day', element)[0]).text()).toBe('26');
    });
    it('the last `.day` element has a value of 6', function () {
      expect(jQuery(jQuery('.day', element)[41]).text()).toBe('6');
    });
  });
  describe('with a value of 1', function () {
    var element;
    beforeEach(inject(function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 1 }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      $rootScope.date = moment("2010-10-01").toDate();
      $rootScope.$digest();
    }));
    it('has seven `.dow` elements', function () {
      expect(jQuery('.dow', element).length).toBe(7);
    });
    it('the first `.dow` element has a value of Mo', function () {
      expect(jQuery(jQuery('.dow', element)[0]).text()).toBe('Mo');
    });
    it('there are 42 `.day` elements', function () {
      expect(jQuery('.day', element).length).toBe(42);
    });
    it('the first `.day` element has a value of 27', function () {
      expect(jQuery(jQuery('.day', element)[0]).text()).toBe('27');
    });
    it('the last `.day` element has a value of 7', function () {
      expect(jQuery(jQuery('.day', element)[41]).text()).toBe('7');
    });
  });
  describe('with a value of 2', function () {
    var element;
    beforeEach(inject(function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 2 }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      $rootScope.date = moment("2010-10-01").toDate();
      $rootScope.$digest();
    }));
    it('has seven `.dow` elements', function () {
      expect(jQuery('.dow', element).length).toBe(7);
    });
    it('the first `.dow` element has a value of tu', function () {
      expect(jQuery(jQuery('.dow', element)[0]).text()).toBe('Tu');
    });
    it('there are 42 `.day` elements', function () {
      expect(jQuery('.day', element).length).toBe(42);
    });
    it('the first `.day` element has a value of 28', function () {
      expect(jQuery(jQuery('.day', element)[0]).text()).toBe('28');
    });
    it('the last `.day` element has a value of 8', function () {
      expect(jQuery(jQuery('.day', element)[41]).text()).toBe('8');
    });
  });

  describe('with a value of 3', function () {
    var element;
    beforeEach(inject(function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 3 }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      $rootScope.date = moment("2010-10-01").toDate();
      $rootScope.$digest();
    }));
    it('has seven `.dow` elements', function () {
      expect(jQuery('.dow', element).length).toBe(7);
    });
    it('the first `.dow` element has a value of We', function () {
      expect(jQuery(jQuery('.dow', element)[0]).text()).toBe('We');
    });
    it('there are 42 `.day` elements', function () {
      expect(jQuery('.day', element).length).toBe(42);
    });
    it('the first `.day` element has a value of 29', function () {
      expect(jQuery(jQuery('.day', element)[0]).text()).toBe('29');
    });
    it('the last `.day` element has a value of 9', function () {
      expect(jQuery(jQuery('.day', element)[41]).text()).toBe('9');
    });
  });
  describe('with a value of 4', function () {
    var element;
    beforeEach(inject(function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 4 }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      $rootScope.date = moment("2010-10-01").toDate();
      $rootScope.$digest();
    }));
    it('has seven `.dow` elements', function () {
      expect(jQuery('.dow', element).length).toBe(7);
    });
    it('the first `.dow` element has a value of Th', function () {
      expect(jQuery(jQuery('.dow', element)[0]).text()).toBe('Th');
    });
    it('there are 42 `.day` elements', function () {
      expect(jQuery('.day', element).length).toBe(42);
    });
    it('the first `.day` element has a value of 30', function () {
      expect(jQuery(jQuery('.day', element)[0]).text()).toBe('30');
    });
    it('the last `.day` element has a value of 10', function () {
      expect(jQuery(jQuery('.day', element)[41]).text()).toBe('10');
    });
  });
  describe('with a value of 5', function () {
    var element;
    beforeEach(inject(function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 5 }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      $rootScope.date = moment("2010-10-01").toDate();
      $rootScope.$digest();
    }));
    it('has seven `.dow` elements', function () {
      expect(jQuery('.dow', element).length).toBe(7);
    });
    it('the first `.dow` element has a value of Fr', function () {
      expect(jQuery(jQuery('.dow', element)[0]).text()).toBe('Fr');
    });
    it('there are 42 `.day` elements', function () {
      expect(jQuery('.day', element).length).toBe(42);
    });
    it('the first `.day` element has a value of 31', function () {
      expect(jQuery(jQuery('.day', element)[0]).text()).toBe('1');
    });
    it('the last `.day` element has a value of 10', function () {
      expect(jQuery(jQuery('.day', element)[41]).text()).toBe('11');
    });
  });
  describe('with a value of 6', function () {
    var element;
    beforeEach(inject(function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ weekStart: 6 }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      $rootScope.date = moment("2010-10-01").toDate();
      $rootScope.$digest();
    }));
    it('has seven `.dow` elements', function () {
      expect(jQuery('.dow', element).length).toBe(7);
    });
    it('the first `.dow` element has a value of Sa', function () {
      expect(jQuery(jQuery('.dow', element)[0]).text()).toBe('Sa');
    });
    it('there are 42 `.day` elements', function () {
      expect(jQuery('.day', element).length).toBe(42);
    });
    it('the first `.day` element has a value of 30', function () {
      expect(jQuery(jQuery('.day', element)[0]).text()).toBe('30');
    });
    it('the last `.day` element has a value of 10', function () {
      expect(jQuery(jQuery('.day', element)[41]).text()).toBe('10');
    });
  });
});
