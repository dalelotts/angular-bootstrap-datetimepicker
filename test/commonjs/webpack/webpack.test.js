/* globals require */

require('angular');
describe('webpack require', function () {
  'use strict';

	function loadModule() {
		angular.module('ui.bootstrap.datetimepicker');
	}

	it('should throw an error if the module is not defined', function () {
		expect(loadModule).toThrow();
	});

	it('should be available when required', function () {
		require('../../../');
		expect(loadModule).not.toThrow();
	});
});
