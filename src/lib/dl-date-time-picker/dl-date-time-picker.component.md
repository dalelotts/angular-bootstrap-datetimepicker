This Component provides all of the user facing functionality of the date/time picker.
 
## Keyboard Accessibility 
The following keyboard shortcuts are supported in in all views:

| Shortcut             | Action                                          |
|----------------------|-------------------------------------------------|
| `LEFT_ARROW`         | Go to the cell to the left                      |
| `RIGHT_ARROW`        | Go to the cell to the right                     |
| `UP_ARROW`           | Go to the cell above                            |
| `DOWN_ARROW`         | Go to the cell below                            |
| `HOME`               | Go to the first cell in the view                |
| `END`                | Go to the last cell in the view                 |
| `PAGE_UP`            | Go to the same cell in the previous time period |
| `PAGE_DOWN`          | Go to the same cell in the next time period     |
| `ENTER` or `SPACE`   | Select current cell                             |

## Date Adapter

A `DateAdapter` is used to adapt the data type in the model to the `number` data type 
used internally by the date/time picker.
 
If you need a different data type than what is currently supported, you can extend 
`DlDateAdapter<D>` to provide the data type you need then override the `DlDateAdapter` 
provider in `app.module.ts` to use your new class. 

`providers: [{provide: DlDateAdapter, useClass: MyCustomDateAdapter}],`

## Model Provider

`ModelProvider`s are used to create the `Model` for each of the `views` in the date/time picker.
If your project has special requirements for one or more of the `views`, you may override 
one or more of the model providers to meet your needs.

### Override `DlYearModelProvider` to display 25 years
For example, imagine you want the year view to display `25 years` rather than the default of 
`10 years`, you can override the the `DlYearModelProvider` in your application so all date/time pickers
display `25 years`  by doing the following:
 
1. Test and implement `QuarterCenturyYearModelProvider`

    It might look something like this: 
    
    ```typescript
    /**
     * @license
     * Copyright 2013-present Dale Lotts All Rights Reserved.
     * http://www.dalelotts.com
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
     */
    
    import {DlDateTimePickerModel, DlModelProvider} from 'angular-bootstrap-datetimepicker';
    import {SimpleChanges} from '@angular/core';
    import * as _moment from 'moment';
    import {Moment} from 'moment';
    
    /**
     * Work around for moment namespace conflict when used with webpack and rollup.
     * See https://github.com/dherges/ng-packagr/issues/163
     *
     * Depending on whether rollup is used, moment needs to be imported differently.
     * Since Moment.js doesn't have a default export, we normally need to import using
     * the `* as`syntax.
     *
     * rollup creates a synthetic default module and we thus need to import it using
     * the `default as` syntax.
     *
     * @internal
     **/
    const moment = _moment;
    
    /**
     * Quarter century implementation for the `year` view.
     */
    export class QuarterCenturyYearModelProvider implements DlModelProvider {
    
      /**
       * Create a moment at midnight january 1 at the start of the quarter-century.
       * The start of the quarter-century is always a year ending in zero or five.
       *
       * @param fromMilliseconds
       *  the moment in time from which the start of the quarter-century will be determined.
       * @returns
       *  moment at midnight january 1 at the start of the current quarter-century.
       * @internal
       */
      private static getStartOfQuarterCentury(fromMilliseconds: number): Moment {
        const currentYear = moment(fromMilliseconds).year();
        const yearsToSubtract = currentYear % 25;
        return moment({year: currentYear - yearsToSubtract}).startOf('year');
      }
    
      /**
       * Receives input changes detected by Angular.
       *
       * @param changes
       *  the input changes detected by Angular.
       */
      onChanges(changes: SimpleChanges): void {
      }
    
      /**
       * Returns the `year` model for the specified moment in `local` time with the
       * `active` year set to January 1 of the specified year.
       *
       * The `year` model represents a quarter-century (25 years) as five rows with five columns.
       *
       * The quarter-century always starts on a year ending with zero or 5.
       *
       * Each cell represents midnight January 1 of the indicated year.
       *
       * The `active` year will be the January 1 of year of the specified milliseconds.
       *
       * @param milliseconds
       *  the moment in time from which the year model will be created.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  the model representing the specified moment in time.
       */
      getModel(milliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        const rowNumbers = [0, 1, 2, 3, 4];
        const columnNumbers = [0, 1, 2, 3, 4];
    
        const startYear = moment(milliseconds).startOf('year');
        const startDate = QuarterCenturyYearModelProvider.getStartOfQuarterCentury(milliseconds);
    
        const futureYear = startDate.year() + 24;
        const pastYear = startDate.year();
        const activeValue = startYear.valueOf();
        const selectedValue = selectedMilliseconds === null || selectedMilliseconds === undefined
          ? selectedMilliseconds
          : moment(selectedMilliseconds).startOf('year').valueOf();
    
        const result: DlDateTimePickerModel = {
          viewName: 'year',
          viewLabel: `${pastYear}-${futureYear}`,
          activeDate: activeValue,
          leftButton: {
            value: moment(startDate).subtract(25, 'years').valueOf(),
            ariaLabel: `Go to ${pastYear - 25}-${pastYear - 1}`,
            classes: {},
          },
          rightButton: {
            value: moment(startDate).add(25, 'years').valueOf(),
            ariaLabel: `Go to ${futureYear + 1}-${futureYear + 25}`,
            classes: {},
          },
          rows: rowNumbers.map(rowOfYears.bind(this))
        };
    
        result.leftButton.classes[`${result.leftButton.value}`] = true;
        result.rightButton.classes[`${result.rightButton.value}`] = true;
    
        return result;
    
        function rowOfYears(rowNumber) {
    
          const currentMoment = moment();
          const cells = columnNumbers.map((columnNumber) => {
            const yearMoment = moment(startDate).add((rowNumber * columnNumbers.length) + columnNumber, 'years');
            return {
              display: yearMoment.format('YYYY'),
              value: yearMoment.valueOf(),
              classes: {
                'dl-abdtp-active': activeValue === yearMoment.valueOf(),
                'dl-abdtp-selected': selectedValue === yearMoment.valueOf(),
                'dl-abdtp-now': yearMoment.isSame(currentMoment, 'year'),
              }
            };
          });
          return {cells};
        }
      }
    
      /**
       * Move the active `year` one row `down` from the specified moment in time.
       *
       * The `active` year will be the January 1 `five (5) years after` the specified milliseconds.
       * This moves the `active` date one row `down` in the current `year` view.
       *
       * Moving `down` can result in the `active` year being part of a different quarter-century than
       * the specified `fromMilliseconds`, in this case the quarter-century represented by the model
       * will change to show the correct quarter-century.
       *
       * @param fromMilliseconds
       *  the moment in time from which the next `year` model `down` will be constructed.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  model containing an `active` `year` one row `down` from the specified moment in time.
       */
      goDown(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        return this.getModel(moment(fromMilliseconds).add(5, 'year').valueOf(), selectedMilliseconds);
      }
    
      /**
       * Move the active `year` one row `up` from the specified moment in time.
       *
       * The `active` year will be the January 1 `five (5) years before` the specified milliseconds.
       * This moves the `active` date one row `up` in the current `year` view.
       *
       * Moving `up` can result in the `active` year being part of a different quarter-century than
       * the specified `fromMilliseconds`, in this case the quarter-century represented by the model
       * will change to show the correct quarter-century.
       *
       * @param fromMilliseconds
       *  the moment in time from which the previous `year` model `up` will be constructed.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  model containing an `active` `year` one row `up` from the specified moment in time.
       */
      goUp(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(5, 'year').valueOf(), selectedMilliseconds);
      }
    
      /**
       * Move the `active` `year` one (1) year to the `left` of the specified moment in time.
       *
       * The `active` year will be the January 1 `one (1) year before` the specified milliseconds.
       * This moves the `active` date one year `left` in the current `year` view.
       *
       * Moving `left` can result in the `active` year being part of a different quarter-century than
       * the specified `fromMilliseconds`, in this case the quarter-century represented by the model
       * will change to show the correct quarter-century.
       *
       * @param fromMilliseconds
       *  the moment in time from which the `year` model to the `left` will be constructed.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  model containing an `active` `year` one year to the `left` of the specified moment in time.
       */
      goLeft(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(1, 'year').valueOf(), selectedMilliseconds);
      }
    
      /**
       * Move the `active` `year` one (1) year to the `right` of the specified moment in time.
       *
       * The `active` year will be the January 1 `one (1) year after` the specified milliseconds.
       * This moves the `active` date one year `right` in the current `year` view.
       *
       * Moving `right` can result in the `active` year being part of a different quarter-century than
       * the specified `fromMilliseconds`, in this case the quarter-century represented by the model
       * will change to show the correct quarter-century.
       *
       * @param fromMilliseconds
       *  the moment in time from which the `year` model to the `right` will be constructed.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  model containing an `active` `year` one year to the `right` of the specified moment in time.
       */
      goRight(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        return this.getModel(moment(fromMilliseconds).add(1, 'year').valueOf(), selectedMilliseconds);
      }
    
      /**
       * Move the active `year` one quarter-century `down` from the specified moment in time.
       *
       * The `active` year will be the January 1 `ten (10) years after` the specified milliseconds.
       * This moves the `active` date one `page` `down` from the current `year` view.
       *
       * Paging `down` will result in the `active` year being part of a different quarter-century than
       * the specified `fromMilliseconds`. As a result, the quarter-century represented by the model
       * will change to show the correct quarter-century.
       *
       * @param fromMilliseconds
       *  the moment in time from which the next `year` model page `down` will be constructed.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  model containing an `active` `year` one quarter-century `down` from the specified moment in time.
       */
      pageDown(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        return this.getModel(moment(fromMilliseconds).add(25, 'year').valueOf(), selectedMilliseconds);
      }
    
      /**
       * Move the active `year` one quarter-century `up` from the specified moment in time.
       *
       * The `active` year will be the January 1 `ten (10) years before` the specified milliseconds.
       * This moves the `active` date one `page-up` from the current `year` view.
       *
       * Paging `up` will result in the `active` year being part of a different quarter-century than
       * the specified `fromMilliseconds`. As a result, the quarter-century represented by the model
       * will change to show the correct quarter-century.
       *
       * @param fromMilliseconds
       *  the moment in time from which the next `year` model page `up` will be constructed.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  model containing an `active` `year` one quarter-century `up` from the specified moment in time.
       */
      pageUp(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(25, 'year').valueOf(), selectedMilliseconds);
      }
    
      /**
       * Move the `active` `year` to the `last` year in the quarter-century.
       *
       * The view or time range will not change unless the `fromMilliseconds` value
       * is in a different quarter-century than the displayed quarter-century.
       *
       * @param fromMilliseconds
       *  the moment in time from which the `last` active `year` will be calculated.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  a model with the `last` cell in the view as the active `year`.
       */
      goEnd(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        return this.getModel(
          QuarterCenturyYearModelProvider.getStartOfQuarterCentury(fromMilliseconds)
            .add(24, 'years')
            .endOf('year')
            .valueOf(),
          selectedMilliseconds
        );
      }
    
      /**
       * Move the `active` `year` to the `first` year in the quarter-century.
       *
       * The view or time range will not change unless the `fromMilliseconds` value
       * is in a different quarter-century than the displayed quarter-century.
       *
       * @param fromMilliseconds
       *  the moment in time from which the `first` active `year` will be calculated.
       * @param selectedMilliseconds
       *  the current value of the date/time picker.
       * @returns
       *  a model with the `first` cell in the view as the active `year`.
       */
      goHome(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
        return this.getModel(
          QuarterCenturyYearModelProvider.getStartOfQuarterCentury(fromMilliseconds)
            .startOf('year')
            .valueOf(),
          selectedMilliseconds
        );
      }
    }
    ```
    
1. Override `DlYearModelProvider` with `QuarterCenturyYearModelProvider` in app.module.ts

    ```typescript
      providers: [
        FormsModule,
        {provide: DlYearModelProvider, useClass: QuarterCenturyYearModelProvider}
      ]
    ```
    This will result in `QuarterCenturyYearModelProvider` being used in every instance of the date/time
    picker in your application. 
    
This approach can be extended to any of the `ModelProvider`'s for a view.

For example, imagine you need a time picker that only displays certain hours of the day. You can implement 
an `HourModelProvider` that has the exact functionality you need without having the write the entire 
component yourself.  
