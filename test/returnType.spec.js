/*globals describe, beforeEach, it, expect, module, inject */

/**
 * @license angular-bootstrap-datetimepicker
 * (c) 2013 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author       A.M. Knight
 *    @since        1/29/14
 */

describe('returnType', function () {
  'use strict';
  var $rootScope, $compile;
  beforeEach(module('ui.bootstrap.datetimepicker'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.date = null;
  }));

  describe('throws exception', function () {
    it('if returnType is not a valid returnType', function () {
      function compile() {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ returnType: \'foo\' }"></datetimepicker>')($rootScope);
      }

      expect(compile).toThrow("returnType must be either moment or date. Received: foo");
    });
  });
  describe('does NOT throw exception for valid values', function () {
    it('if value is in valid return types', function () {
      var validReturnTypes = ['moment', 'date'];

      for (var i = 0; i < validReturnTypes.length; i++) {
        $compile('<datetimepicker data-ng-model="date" data-datetimepicker-config="{ returnType: \'' + validReturnTypes[i] + '\' }"></datetimepicker>')($rootScope);
      }
    });
  });
});