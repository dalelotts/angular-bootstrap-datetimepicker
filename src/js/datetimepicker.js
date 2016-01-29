/*globals define, jQuery, module, require */
/*jslint vars:true */

/**
 * @license angular-bootstrap-datetimepicker  version: 0.4.0
 * Copyright 2015 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 */

/**
 *
 *    @author        Dale "Ducky" Lotts
 *    @since        2013-Jul-8
 */

(function (factory) {
  'use strict';
  /* istanbul ignore if */
  if (typeof define === 'function' && /* istanbul ignore next */ define.amd) {
    define(['angular', 'moment'], factory); // AMD
    /* istanbul ignore next */
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular'), require('moment')); // CommonJS
  } else {
    factory(window.angular, window.moment); // Browser global
  }
}(function (angular, moment) {
  'use strict';
  angular.module('ui.bootstrap.datetimepicker', [])
    .constant('dateTimePickerConfig', {
      configureOn: null,
      dropdownSelector: null,
      minuteStep: 5,
      minView: 'minute',
      modelType: 'Date',
      parseFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZZ',
      renderOn: null,
      startView: 'day',
      hourDisplayFormat: 'LT'
    })
    .constant('srDictionary', {
      'bg': {prev: 'предишна', next: 'следваща'},
      'ca': {prev: 'anterior', next: 'següent'},
      'da': {prev: 'forrige', next: 'næste'},
      'de': {prev: 'vorige', next: 'weiter'},
      'en-au': {prev: 'previous', next: 'next'},
      'en-gb': {prev: 'previous', next: 'next'},
      'en': {prev: 'previous', next: 'next'},
      'es-us': {prev: 'atrás', next: 'siguiente'},
      'es': {prev: 'atrás', next: 'siguiente'},
      'fi': {prev: 'edellinen', next: 'seuraava'},
      'fr': {prev: 'précédent', next: 'suivant'},
      'hu': {prev: 'előző', next: 'következő'},
      'it': {prev: 'precedente', next: 'successivo'},
      'ja': {prev: '前へ', next: '次へ'},
      'ml': {prev: 'മുൻപുള്ളത്', next: 'അടുത്തത്'},
      'nl': {prev: 'vorige', next: 'volgende'},
      'pl': {prev: 'poprzednia', next: 'następna'},
      'pt-br': {prev: 'anteriores', next: 'próximos'},
      'pt': {prev: 'anterior', next: 'próximo'},
      'ro': {prev: 'anterior', next: 'următor'},
      'ru': {prev: 'предыдущая', next: 'следующая'},
      'sk': {prev: 'predošlá', next: 'ďalšia'},
      'sv': {prev: 'föregående', next: 'nästa'},
      'tr': {prev: 'önceki', next: 'sonraki'},
      'uk': {prev: 'назад', next: 'далі'},
      'zh-cn': {prev: '上一页', next: '下一页'},
      'zh-tw': {prev: '上一頁', next: '下一頁'}
    })
    .directive('datetimepicker', ['$log', 'dateTimePickerConfig', 'srDictionary', function datetimepickerDirective($log, defaultConfig, srDictionary) {

      function DateObject() {

        var tempDate = new Date();
        var localOffset = tempDate.getTimezoneOffset() * 60000;
        this.utcDateValue = tempDate.getTime();
        this.selectable = true;


        this.localDateValue = function () {
          return this.utcDateValue + localOffset;
        };

        var validProperties = ['utcDateValue', 'localDateValue', 'display', 'active', 'selectable', 'past', 'future'];

        for (var prop in arguments[0]) {
          /* istanbul ignore else */
          //noinspection JSUnfilteredForInLoop
          if (validProperties.indexOf(prop) >= 0) {
            //noinspection JSUnfilteredForInLoop
            this[prop] = arguments[0][prop];
          }
        }
      }

      var validateConfiguration = function validateConfiguration(configuration) {

        var validOptions = [
          'configureOn',
          'dropdownSelector',
          'minuteStep',
          'minView',
          'modelType',
          'parseFormat',
          'renderOn',
          'startView',
          'hourDisplayFormat'
        ];

        for (var prop in configuration) {
          //noinspection JSUnfilteredForInLoop
          if (validOptions.indexOf(prop) < 0) {
            throw ('invalid option: ' + prop);
          }
        }

        // Order of the elements in the validViews array is significant.
        var validViews = ['minute', 'hour', 'day', 'month', 'year'];

        if (validViews.indexOf(configuration.startView) < 0) {
          throw ('invalid startView value: ' + configuration.startView);
        }

        if (validViews.indexOf(configuration.minView) < 0) {
          throw ('invalid minView value: ' + configuration.minView);
        }

        if (validViews.indexOf(configuration.minView) > validViews.indexOf(configuration.startView)) {
          throw ('startView must be greater than minView');
        }

        if (!angular.isNumber(configuration.minuteStep)) {
          throw ('minuteStep must be numeric');
        }
        if (configuration.minuteStep <= 0 || configuration.minuteStep >= 60) {
          throw ('minuteStep must be greater than zero and less than 60');
        }
        if (configuration.configureOn !== null && !angular.isString(configuration.configureOn)) {
          throw ('configureOn must be a string');
        }
        if (configuration.configureOn !== null && configuration.configureOn.length < 1) {
          throw ('configureOn must not be an empty string');
        }
        if (configuration.renderOn !== null && !angular.isString(configuration.renderOn)) {
          throw ('renderOn must be a string');
        }
        if (configuration.renderOn !== null && configuration.renderOn.length < 1) {
          throw ('renderOn must not be an empty string');
        }
        if (configuration.modelType !== null && !angular.isString(configuration.modelType)) {
          throw ('modelType must be a string');
        }
        if (configuration.modelType !== null && configuration.modelType.length < 1) {
          throw ('modelType must not be an empty string');
        }
        if (configuration.modelType !== 'Date' && configuration.modelType !== 'moment' && configuration.modelType !== 'milliseconds') {
          // modelType contains string format, overriding parseFormat with modelType
          configuration.parseFormat = configuration.modelType;
        }
        if (configuration.dropdownSelector !== null && !angular.isString(configuration.dropdownSelector)) {
          throw ('dropdownSelector must be a string');
        }

        /* istanbul ignore next */
        if (configuration.dropdownSelector !== null && ((typeof jQuery === 'undefined') || (typeof jQuery().dropdown !== 'function'))) {
          $log.error('Please DO NOT specify the dropdownSelector option unless you are using jQuery AND Bootstrap.js. ' +
            'Please include jQuery AND Bootstrap.js, or write code to close the dropdown in the on-set-time callback. \n\n' +
            'The dropdownSelector configuration option is being removed because it will not function properly.');
          delete configuration.dropdownSelector;
        }
      };

      return {
        restrict: 'E',
        require: 'ngModel',
        template: '<div class="datetimepicker table-responsive">' +
        '<table class="table table-condensed  {{ data.currentView }}-view">' +
        '   <thead>' +
        '       <tr>' +
        '           <th class="left" data-ng-click="changeView(data.currentView, data.leftDate, $event)" data-ng-show="data.leftDate.selectable"><i class="glyphicon glyphicon-arrow-left"><span class="sr-only">{{ data.srText.prev }}</span></i></th>' +
        '           <th class="switch" colspan="5" data-ng-show="data.previousViewDate.selectable" data-ng-click="changeView(data.previousView, data.previousViewDate, $event)">{{ data.previousViewDate.display }}</th>' +
        '           <th class="right" data-ng-click="changeView(data.currentView, data.rightDate, $event)" data-ng-show="data.rightDate.selectable"><i class="glyphicon glyphicon-arrow-right"><span class="sr-only">{{ data.srText.next }}</span></i></th>' +
        '       </tr>' +
        '       <tr>' +
        '           <th class="dow" data-ng-repeat="day in data.dayNames" >{{ day }}</th>' +
        '       </tr>' +
        '   </thead>' +
        '   <tbody>' +
        '       <tr data-ng-if="data.currentView !== \'day\'" >' +
        '           <td colspan="7" >' +
        '              <span    class="{{ data.currentView }}" ' +
        '                       data-ng-repeat="dateObject in data.dates"  ' +
        '                       data-ng-class="{active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}" ' +
        '                       data-ng-click="changeView(data.nextView, dateObject, $event)">{{ dateObject.display }}</span> ' +
        '           </td>' +
        '       </tr>' +
        '       <tr data-ng-if="data.currentView === \'day\'" data-ng-repeat="week in data.weeks">' +
        '           <td data-ng-repeat="dateObject in week.dates" ' +
        '               data-ng-click="changeView(data.nextView, dateObject, $event)"' +
        '               class="day" ' +
        '               data-ng-class="{active: dateObject.active, past: dateObject.past, future: dateObject.future, disabled: !dateObject.selectable}" >{{ dateObject.display }}</td>' +
        '       </tr>' +
        '   </tbody>' +
        '</table></div>',
        scope: {
          onSetTime: '&',
          beforeRender: '&'
        },
        replace: true,
        link: function link(scope, element, attrs, ngModelController) {

          var configure = function configure() {
            var directiveConfig = {};

            if (attrs.datetimepickerConfig) {
              directiveConfig = scope.$parent.$eval(attrs.datetimepickerConfig);
            }

            var configuration = {};

            angular.extend(configuration, defaultConfig, directiveConfig);

            validateConfiguration(configuration);

            return configuration;
          };

          var configuration = configure();
          var srText = srDictionary[moment.locale().toLowerCase()];

          var startOfDecade = function startOfDecade(milliseconds) {
            var startYear = (parseInt(moment.utc(milliseconds).year() / 10, 10) * 10);
            return moment.utc(milliseconds).year(startYear).startOf('year');
          };

          var formatValue = function formatValue(timeValue, formatString) {
            if (timeValue) {
              return getMoment(timeValue).format(formatString);
            } else {
              return '';
            }
          };

          /**
           * Converts a time value into a moment.
           *
           * This function is now necessary because moment logs a warning when parsing a string without a format.
           * @param modelValue
           *  a time value in any of the supported formats (Date, moment, milliseconds, and string)
           * @returns {moment}
           *  representing the specified time value.
           */

          var getMoment = function getMoment(modelValue) {
            return moment(modelValue, angular.isString(modelValue) ? configuration.parseFormat : undefined);
          };

          /**
           * Converts a time value to UCT/GMT time.
           * @param modelValue
           *  a time value in any of the supported formats (Date, moment, milliseconds, and string)
           * @returns {number}
           *  number of milliseconds since 1/1/1970
           */

          var getUTCTime = function getUTCTime(modelValue) {
            var tempDate = new Date();
            if (modelValue) {
              var tempMoment = getMoment(modelValue);
              if (tempMoment.isValid()) {
                tempDate = tempMoment.toDate();
              } else {
                throw 'Invalid date: ' + modelValue;
              }
            }
            return tempDate.getTime() - (tempDate.getTimezoneOffset() * 60000);
          };

          var dataFactory = {
            year: function year(milliseconds) {
              var selectedDate = moment.utc(milliseconds).startOf('year');
              // View starts one year before the decade starts and ends one year after the decade ends
              // i.e. passing in a date of 1/1/2013 will give a range of 2009 to 2020
              // Truncate the last digit from the current year and subtract 1 to get the start of the decade
              var startDecade = (parseInt(selectedDate.year() / 10, 10) * 10);
              var startDate = moment.utc(startOfDecade(milliseconds)).subtract(1, 'year').startOf('year');

              var activeYear = formatValue(ngModelController.$modelValue, 'YYYY');

              var result = {
                'currentView': 'year',
                'nextView': configuration.minView === 'year' ? 'setTime' : 'month',
                'previousViewDate': new DateObject({
                  utcDateValue: null,
                  display: startDecade + '-' + (startDecade + 9)
                }),
                'leftDate': new DateObject({utcDateValue: moment.utc(startDate).subtract(9, 'year').valueOf()}),
                'rightDate': new DateObject({utcDateValue: moment.utc(startDate).add(11, 'year').valueOf()}),
                'dates': [],
                'srText': srText
              };

              for (var i = 0; i < 12; i += 1) {
                var yearMoment = moment.utc(startDate).add(i, 'years');
                var dateValue = {
                  'utcDateValue': yearMoment.valueOf(),
                  'display': yearMoment.format('YYYY'),
                  'past': yearMoment.year() < startDecade,
                  'future': yearMoment.year() > startDecade + 9,
                  'active': yearMoment.format('YYYY') === activeYear
                };

                result.dates.push(new DateObject(dateValue));
              }

              return result;
            },

            month: function month(milliseconds) {

              var startDate = moment.utc(milliseconds).startOf('year');
              var previousViewDate = startOfDecade(milliseconds);
              var activeDate = formatValue(ngModelController.$modelValue, 'YYYY-MMM');

              var result = {
                'previousView': 'year',
                'currentView': 'month',
                'nextView': configuration.minView === 'month' ? 'setTime' : 'day',
                'previousViewDate': new DateObject({
                  utcDateValue: previousViewDate.valueOf(),
                  display: startDate.format('YYYY')
                }),
                'leftDate': new DateObject({utcDateValue: moment.utc(startDate).subtract(1, 'year').valueOf()}),
                'rightDate': new DateObject({utcDateValue: moment.utc(startDate).add(1, 'year').valueOf()}),
                'dates': [],
                'srText': srText
              };

              for (var i = 0; i < 12; i += 1) {
                var monthMoment = moment.utc(startDate).add(i, 'months');
                var dateValue = {
                  'utcDateValue': monthMoment.valueOf(),
                  'display': monthMoment.format('MMM'),
                  'active': monthMoment.format('YYYY-MMM') === activeDate
                };

                result.dates.push(new DateObject(dateValue));
              }

              return result;
            },

            day: function day(milliseconds) {

              var selectedDate = moment.utc(milliseconds);
              var startOfMonth = moment.utc(selectedDate).startOf('month');
              var previousViewDate = moment.utc(selectedDate).startOf('year');
              var endOfMonth = moment.utc(selectedDate).endOf('month');

              var startDate = moment.utc(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');

              var activeDate = formatValue(ngModelController.$modelValue, 'YYYY-MMM-DD');

              var result = {
                'previousView': 'month',
                'currentView': 'day',
                'nextView': configuration.minView === 'day' ? 'setTime' : 'hour',
                'previousViewDate': new DateObject({
                  utcDateValue: previousViewDate.valueOf(),
                  display: startOfMonth.format('YYYY-MMM')
                }),
                'leftDate': new DateObject({utcDateValue: moment.utc(startOfMonth).subtract(1, 'months').valueOf()}),
                'rightDate': new DateObject({utcDateValue: moment.utc(startOfMonth).add(1, 'months').valueOf()}),
                'dayNames': [],
                'weeks': [],
                'srText': srText
              };


              for (var dayNumber = 0; dayNumber < 7; dayNumber += 1) {
                result.dayNames.push(moment.utc().weekday(dayNumber).format('dd'));
              }

              for (var i = 0; i < 6; i += 1) {
                var week = {dates: []};
                for (var j = 0; j < 7; j += 1) {
                  var monthMoment = moment.utc(startDate).add((i * 7) + j, 'days');
                  var dateValue = {
                    'utcDateValue': monthMoment.valueOf(),
                    'display': monthMoment.format('D'),
                    'active': monthMoment.format('YYYY-MMM-DD') === activeDate,
                    'past': monthMoment.isBefore(startOfMonth),
                    'future': monthMoment.isAfter(endOfMonth)
                  };
                  week.dates.push(new DateObject(dateValue));
                }
                result.weeks.push(week);
              }

              return result;
            },

            hour: function hour(milliseconds) {
              var selectedDate = moment.utc(milliseconds).startOf('day');
              var previousViewDate = moment.utc(selectedDate).startOf('month');

              var activeFormat = formatValue(ngModelController.$modelValue, 'YYYY-MM-DD H');

              var result = {
                'previousView': 'day',
                'currentView': 'hour',
                'nextView': configuration.minView === 'hour' ? 'setTime' : 'minute',
                'previousViewDate': new DateObject({
                  utcDateValue: previousViewDate.valueOf(),
                  display: selectedDate.format('ll')
                }),
                'leftDate': new DateObject({utcDateValue: moment.utc(selectedDate).subtract(1, 'days').valueOf()}),
                'rightDate': new DateObject({utcDateValue: moment.utc(selectedDate).add(1, 'days').valueOf()}),
                'dates': [],
                'srText': srText
              };

              for (var i = 0; i < 24; i += 1) {
                var hourMoment = moment.utc(selectedDate).add(i, 'hours');
                var dateValue = {
                  'utcDateValue': hourMoment.valueOf(),
                  'display': hourMoment.format(configuration.hourDisplayFormat),
                  'active': hourMoment.format('YYYY-MM-DD H') === activeFormat
                };

                result.dates.push(new DateObject(dateValue));
              }

              return result;
            },

            minute: function minute(milliseconds) {
              var selectedDate = moment.utc(milliseconds).startOf('hour');
              var previousViewDate = moment.utc(selectedDate).startOf('day');
              var activeFormat = formatValue(ngModelController.$modelValue, 'YYYY-MM-DD H:mm');

              var result = {
                'previousView': 'hour',
                'currentView': 'minute',
                'nextView': 'setTime',
                'previousViewDate': new DateObject({
                  utcDateValue: previousViewDate.valueOf(),
                  display: selectedDate.format('lll')
                }),
                'leftDate': new DateObject({utcDateValue: moment.utc(selectedDate).subtract(1, 'hours').valueOf()}),
                'rightDate': new DateObject({utcDateValue: moment.utc(selectedDate).add(1, 'hours').valueOf()}),
                'dates': [],
                'srText': srText
              };

              var limit = 60 / configuration.minuteStep;

              for (var i = 0; i < limit; i += 1) {
                var hourMoment = moment.utc(selectedDate).add(i * configuration.minuteStep, 'minute');
                var dateValue = {
                  'utcDateValue': hourMoment.valueOf(),
                  'display': hourMoment.format(configuration.hourDisplayFormat),
                  'active': hourMoment.format('YYYY-MM-DD H:mm') === activeFormat
                };

                result.dates.push(new DateObject(dateValue));
              }

              return result;
            },

            setTime: function setTime(milliseconds) {
              var tempDate = new Date(milliseconds);
              var newDate = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate(), tempDate.getUTCHours(), tempDate.getUTCMinutes(), tempDate.getUTCSeconds(), tempDate.getUTCMilliseconds());

              switch (configuration.modelType) {
                case 'Date':
                  // No additional work needed
                  break;
                case 'moment':
                  newDate = moment(newDate);
                  break;
                case 'milliseconds':
                  newDate = milliseconds;
                  break;
                default: // It is assumed that the modelType is a formatting string.
                  newDate = moment(newDate).format(configuration.modelType);
              }

              var oldDate = ngModelController.$modelValue;
              ngModelController.$setViewValue(newDate);

              if (configuration.dropdownSelector) {
                jQuery(configuration.dropdownSelector).dropdown('toggle');
              }

              scope.onSetTime({newDate: newDate, oldDate: oldDate});

              return dataFactory[configuration.startView](milliseconds);
            }
          };

          scope.changeView = function changeView(viewName, dateObject, event) {
            if (event) {
              event.stopPropagation();
              event.preventDefault();
            }

            if (viewName && (dateObject.utcDateValue > -Infinity) && dateObject.selectable && dataFactory[viewName]) {
              var result = dataFactory[viewName](dateObject.utcDateValue);

              var weekDates = [];
              if (result.weeks) {
                for (var i = 0; i < result.weeks.length; i += 1) {
                  var week = result.weeks[i];
                  for (var j = 0; j < week.dates.length; j += 1) {
                    var weekDate = week.dates[j];
                    weekDates.push(weekDate);
                  }
                }
              }

              scope.beforeRender({
                $view: result.currentView,
                $dates: result.dates || weekDates,
                $leftDate: result.leftDate,
                $upDate: result.previousViewDate,
                $rightDate: result.rightDate
              });

              scope.data = result;
            }
          };

          ngModelController.$render = function $render() {
            scope.changeView(configuration.startView, new DateObject({utcDateValue: getUTCTime(ngModelController.$viewValue)}));
          };

          if (configuration.configureOn) {
            scope.$on(configuration.configureOn, function () {
              configuration = configure();
              ngModelController.$render();
            });
          }
          if (configuration.renderOn) {
            scope.$on(configuration.renderOn, ngModelController.$render);
          }
        }
      };
    }]);
}));
