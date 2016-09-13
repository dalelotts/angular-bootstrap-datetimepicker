/*globals angular, moment, $ */
(function () {
  'use strict';

  angular
    .module('demo.demoController', [])
    .controller('demoController', demoController);

  demoController.$inject = ['$scope', '$log'];

  function demoController ($scope, $log) {

    var validViews = ['year', 'month', 'day', 'hour', 'minute'];
    var selectable = true;

    $scope.controllerName = 'demoController';

    /* Bindable functions
     -----------------------------------------------*/
    $scope.beforeRender = beforeRender;
    $scope.changeConfig = changeConfig;
    $scope.checkboxOnTimeSet = checkboxOnTimeSet;
    $scope.configFunction = configFunction;
    $scope.endDateBeforeRender = endDateBeforeRender
    $scope.endDateOnSetTime = endDateOnSetTime
    $scope.getLocale = getLocale;
    $scope.guardianOnSetTime = guardianOnSetTime;
    $scope.inputOnTimeSet = inputOnTimeSet;
    $scope.renderOnBeforeRender = renderOnBeforeRender;
    $scope.renderOnClick = renderOnClick;
    $scope.setLocale = setLocale;
    $scope.startDateBeforeRender = startDateBeforeRender
    $scope.startDateOnSetTime = startDateOnSetTime

    moment.locale('en');

    $scope.config = {
      datetimePicker: {
        startView: 'year'
      }
    };

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

    function checkboxOnTimeSet () {
      $scope.data.checked = false;
    }

    function inputOnTimeSet (newDate) {
      // If you are not using jQuery or bootstrap.js,
      // this will throw an error.
      // However, can write this function to take any
      // action necessary once the user has selected a
      // date/time using the picker
      $log.info(newDate);
      $('#dropdown3').dropdown('toggle');
    }

    function getLocale () {
      return moment.locale();
    }

    function setLocale (newLocale) {
      moment.locale(newLocale);
    }

    function guardianOnSetTime ($index, guardian, newDate, oldDate) {
      $log.info($index);
      $log.info(guardian.name);
      $log.info(newDate);
      $log.info(oldDate);
      angular.element('#guardian' + $index).dropdown('toggle');
    }

    function beforeRender ($dates) {
      var index = Math.ceil($dates.length / 2);
      $log.info(index);
      $dates[index].selectable = false;
    }

    function configFunction () {
      return {startView: 'month'};
    }

    function changeConfig () {
      var newIndex = validViews.indexOf($scope.config.configureOnConfig.startView) + 1;
      console.log(newIndex);
      if (newIndex >= validViews.length) {
        newIndex = 0;
      }
      $scope.config.configureOnConfig.startView = validViews[newIndex];
      $scope.$broadcast('config-changed');
    }

    function renderOnBeforeRender ($dates) {
      angular.forEach($dates, function (dateObject) {
        dateObject.selectable = selectable;
      });
    }

    function renderOnClick () {
      selectable = (!selectable);
      $scope.$broadcast('valid-dates-changed');
    }

    function startDateOnSetTime () {
      $scope.$broadcast('start-date-changed');
    }

    function endDateOnSetTime () {
      $scope.$broadcast('end-date-changed');
    }

    function startDateBeforeRender ($dates) {
      if ($scope.dateRangeEnd) {
        var activeDate = moment($scope.dateRangeEnd);

        $dates.filter(function (date) {
          return date.localDateValue() >= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false;
        })
      }
    }

    function endDateBeforeRender ($view, $dates) {
      if ($scope.dateRangeStart) {
        var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

        $dates.filter(function (date) {
          return date.localDateValue() <= activeDate.valueOf()
        }).forEach(function (date) {
          date.selectable = false;
        })
      }
    }
  }
})();
