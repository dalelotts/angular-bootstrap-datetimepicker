/*globals describe, beforeEach, it, expect, module, inject, jQuery */

/**
 * @license angular-bootstrap-datetimepicker
 * Copyright 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author       Artur Sabirov
 *    @since        8/17/15
 */

describe('icons', function () {
  'use strict';

  var $rootScope;
  var $compile;
  var element;

  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('with option "icons"', function () {
    it('uses that icons', function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ icons: {left: \'fa fa-arrow-left\', right: \'fa fa-arrow-right\'} }"></datetimepicker>')($rootScope);
      $rootScope.$digest();
      expect(jQuery('i', element)[0].className).toEqual('fa fa-arrow-left');
      expect(jQuery('i', element)[1].className).toEqual('fa fa-arrow-right');
    });
  });

  describe('not options "icons"', function () {
    it('use default icons', function () {
      element = $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config=""></datetimepicker>')($rootScope);
      $rootScope.$digest();
      expect(jQuery('i', element)[0].className).toEqual('glyphicon glyphicon-arrow-left');
      expect(jQuery('i', element)[1].className).toEqual('glyphicon glyphicon-arrow-right');
    });
  });
});

