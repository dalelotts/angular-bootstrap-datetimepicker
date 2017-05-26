/* globals require, angular */

/**
 * See the file "LICENSE" for the full license governing this code.
 *
 * @author Dale "Ducky" Lotts
 * @since 9/11/16.
 */

require('angular');
describe('webpack require', function () {
  'use strict';

  function loadDateTimePicker () {
    angular.module('ui.bootstrap.datetimepicker');
  }

  it('should throw an error if the module is not defined', function () {
    expect(loadDateTimePicker).toThrow();
  });

  it('should be available when required', function () {
    require('../../');
    expect(loadDateTimePicker).not.toThrow();
  });
});
