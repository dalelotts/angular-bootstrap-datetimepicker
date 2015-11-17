/*globals angular, moment, $ */

angular.module('demo.demoController', [])
  .controller('demoController', [
    '$scope',
    '$log',
    function ($scope, $log) {
      'use strict';
      $scope.controllerName = 'demoController';

      moment.locale('en');

      $scope.data = {
        guardians: [
          {
            name: 'Peter Quill',
            dob: null
          },
          {
            name: 'Groot',
            dob: null
          }
        ]
      };

      $scope.checkboxOnTimeSet = function () {
        $scope.data.checked = false;
      };

      $scope.inputOnTimeSet = function (newDate) {
        // If you are not using jQuery or bootstrap.js,
        // this will throw an error.
        // However, can write this function to take any
        // action necessary once the user has selected a
        // date/time using the picker
        $log.info(newDate);
        $('#dropdown3').dropdown('toggle');
      };

      $scope.getLocale = function () {
        return moment.locale();
      };

      $scope.setLocale = function (newLocale) {
        moment.locale(newLocale);
      };


      $scope.guardianOnSetTime = function ($index, guardian, newDate, oldDate) {
        $log.info($index);
        $log.info(guardian.name);
        $log.info(newDate);
        $log.info(oldDate);
        angular.element('#guardian' + $index).dropdown('toggle');
      };

      $scope.beforeRender = function ($dates) {
        var index = Math.ceil($dates.length / 2);
        $log.info(index);
        $dates[index].selectable = false;
      };

      $scope.config = {
        datetimePicker: {
          startView: 'year'
        }
      };

      $scope.configFunction = function configFunction() {
        return {startView: 'month'};
      };

      $scope.config = {
        configureOnConfig: {
          startView: 'year',
          configureOn: 'config-changed'
        },
        renderOnConfig: {
          startView: 'year',
          renderOn: 'valid-dates-changed'
        }
      };

      var validViews = ['year', 'month', 'day', 'hour', 'minute'];

      $scope.changeConfig = function changeConfig() {
        var newIndex = validViews.indexOf($scope.config.configureOnConfig.startView) + 1;
        console.log(newIndex);
        if (newIndex >= validViews.length) {
          newIndex = 0;
        }
        $scope.config.configureOnConfig.startView = validViews[newIndex];
        $scope.$broadcast('config-changed');
      };

      var selectable = true;

      $scope.renderOnBeforeRender = function ($dates) {
        angular.forEach($dates, function (dateObject) {
          dateObject.selectable = selectable;
        });
      };

      $scope.renderOnClick = function renderOnClick() {
        selectable = (!selectable);
        $scope.$broadcast('valid-dates-changed');
      };
    }
  ]);
