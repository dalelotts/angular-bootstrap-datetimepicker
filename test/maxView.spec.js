describe('maxView', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('throws exception', function () {
    it('if value is not a valid value', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ maxView: \'bar\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("invalid maxView value: bar");
    });
    it('if value is a numeric value', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ maxView: 0 }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("invalid maxView value: 0");
    });
    it('if value is greater than startView', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'year\',  maxView: \'month\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("startView must be less than maxView");
    });
  });
  describe('does NOT throw exception for valid values', function () {
    it('if value is between 1 and 59', function () {
      var validViews = ['year', 'month', 'day', 'hour', 'minute'];

      for (var i = 0; i < validViews.length; i++) {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ startView: \'minute\', maxView: \'' + validViews[i] + '\' }"></datetimepicker>')($rootScope);
      }
    });
  });
});
