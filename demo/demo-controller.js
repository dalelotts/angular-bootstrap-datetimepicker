/*globals angular, moment, $ */

angular.module('demo.demoController', [])
  .controller('demoController', [
    '$scope',
    function ($scope) {
      'use strict';
      $scope.controllerName = 'demoController';

      moment.locale("en");

      $scope.data = {};

      $scope.checkboxOnTimeSet = function () {
        $scope.data.checked = false;
      };

      $scope.inputOnTimeSet = function () {
        // If you are not using jQuery or bootstrap.js,
        // this will throw an error.
        // However, can write this function to take any
        // action necessary once the user has selected a
        // date/time using the picker

        $('#dropdown3').dropdown('toggle');
      };

      $scope.getLocale = function () {
        return moment.locale();
      };

      $scope.setLocale = function (newLocale) {
        moment.locale(newLocale);
      };


    }
  ]);