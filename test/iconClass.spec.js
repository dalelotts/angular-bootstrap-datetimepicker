
describe('iconClass', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('previousIconClass', function () {
    it('defaults to glyphicon-arrow-left', function () {
      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{}"></datetimepicker>')($rootScope);

      $rootScope.$digest();
      var previousIcon = jQuery('.glyphicon-arrow-left', element);
      expect(previousIcon.length).toEqual(1);
      expect(previousIcon.parent().hasClass('left')).toBe(true);
    });

    it('can be set to custom string', function () {
      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{previousIconClass: \'testPreviousIcon\'}"></datetimepicker>')($rootScope);

      $rootScope.$digest();
      var previousIcon = jQuery('.testPreviousIcon', element);
      expect(previousIcon.length).toEqual(1);
      expect(previousIcon.parent().hasClass('left')).toBe(true);
    });

    it('can be set to custom array', function () {
      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{previousIconClass: [\'testPreviousIcon1\', \'testPreviousIcon2\']}"></datetimepicker>')($rootScope);

      $rootScope.$digest();
      var previousIcon = jQuery('.testPreviousIcon1.testPreviousIcon2', element);
      expect(previousIcon.length).toEqual(1);
      expect(previousIcon.parent().hasClass('left')).toBe(true);
    });
  });

  describe('nextIconClass', function () {
    it('defaults to glyphicon-arrow-right', function () {
      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{}"></datetimepicker>')($rootScope);

      $rootScope.$digest();
      var nextIcon = jQuery('.glyphicon-arrow-right', element);
      expect(nextIcon.length).toEqual(1);
      expect(nextIcon.parent().hasClass('right')).toBe(true);
    });

    it('can be set to custom string', function () {
      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{nextIconClass: \'testNextIcon\'}"></datetimepicker>')($rootScope);

      $rootScope.$digest();
      var nextIcon = jQuery('.testNextIcon', element);
      expect(nextIcon.length).toEqual(1);
      expect(nextIcon.parent().hasClass('right')).toBe(true);
    });

    it('can be set to custom array', function () {
      var element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{nextIconClass: [\'testNextIcon1\', \'testNextIcon2\']}"></datetimepicker>')($rootScope);

      $rootScope.$digest();
      var nextIcon = jQuery('.testNextIcon1.testNextIcon2', element);
      expect(nextIcon.length).toEqual(1);
      expect(nextIcon.parent().hasClass('right')).toBe(true);
    });
  });
});

