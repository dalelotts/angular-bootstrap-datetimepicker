/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {DlModelProvider} from './dl-model-provider';
import {DlDateTimePickerModel} from './dl-date-time-picker-model';
import {Component, SimpleChanges} from '@angular/core';
import * as _moment from 'moment';
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
 * Default implementation for the `hour` view.
 */
@Component({
  providers: [
    {
      provide: DlHourModelComponent,
      useClass: DlHourModelComponent,
    },
  ],
})
export class DlHourModelComponent implements DlModelProvider {

  /**
   * Receives input changes detected by Angular.
   *
   * @param changes
   *  the input changes detected by Angular.
   */
  onChanges(changes: SimpleChanges): void {
  }


  /**
   * Returns the `hour` model for the specified moment in `local` time with the
   * `active` hour set to the beginning of the day.
   *
   * The `hour` model represents a day (24 hours) as six rows with four columns
   * and each cell representing one-hour increments.
   *
   * The hour always starts at the beginning of the hour.
   *
   * Each cell represents a one-hour increment starting at midnight.
   *
   * @param milliseconds
   *  the moment in time from which the minute model will be created.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  the model representing the specified moment in time.
   */
  getModel(milliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    const startDate = moment(milliseconds).startOf('day');

    const rowNumbers = [0, 1, 2, 3, 4, 5];
    const columnNumbers = [0, 1, 2, 3];

    const previousDay = moment(startDate).subtract(1, 'day');
    const nextDay = moment(startDate).add(1, 'day');
    const activeValue = moment(milliseconds).startOf('hour').valueOf();
    const selectedValue = selectedMilliseconds === null || selectedMilliseconds === undefined
      ? selectedMilliseconds
      : moment(selectedMilliseconds).startOf('hour').valueOf();

    const result: DlDateTimePickerModel = {
      viewName: 'hour',
      viewLabel: startDate.format('ll'),
      activeDate: activeValue,
      leftButton: {
        value: previousDay.valueOf(),
        ariaLabel: `Go to ${previousDay.format('ll')}`,
        classes: {},
      },
      upButton: {
        value: startDate.valueOf(),
        ariaLabel: `Go to ${startDate.format('MMM YYYY')}`,
        classes: {},
      },
      rightButton: {
        value: nextDay.valueOf(),
        ariaLabel: `Go to ${nextDay.format('ll')}`,
        classes: {},
      },
      rows: rowNumbers.map(rowOfHours)
    };

    result.leftButton.classes[`${result.leftButton.value}`] = true;
    result.rightButton.classes[`${result.rightButton.value}`] = true;

    return result;

    function rowOfHours(rowNumber) {

      const currentMoment = moment();
      const cells = columnNumbers.map((columnNumber) => {
        const hourMoment = moment(startDate).add((rowNumber * columnNumbers.length) + columnNumber, 'hours');
        return {
          display: hourMoment.format('LT'),
          ariaLabel: hourMoment.format('LLL'),
          value: hourMoment.valueOf(),
          classes: {
            'dl-abdtp-active': activeValue === hourMoment.valueOf(),
            'dl-abdtp-selected': selectedValue === hourMoment.valueOf(),
            'dl-abdtp-now': hourMoment.isSame(currentMoment, 'hour'),
          }
        };
      });
      return {cells};
    }
  }

  /**
   * Move the active `hour` one row `down` from the specified moment in time.
   *
   * Moving `down` can result in the `active` hour being part of a different day than
   * the specified `fromMilliseconds`, in this case the day represented by the model
   * will change to show the correct hour.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `hour` model `down` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `hour` one row `down` from the specified moment in time.
   */
  goDown(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(4, 'hour').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the active `hour` one row `up` from the specified moment in time.
   *
   * Moving `up` can result in the `active` hour being part of a different day than
   * the specified `fromMilliseconds`, in this case the day represented by the model
   * will change to show the correct hour.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `hour` model `up` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `hour` one row `up` from the specified moment in time.
   */
  goUp(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(4, 'hour').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the `active` hour one cell `left` in the current `hour` view.
   *
   * Moving `left` can result in the `active` hour being part of a different day than
   * the specified `fromMilliseconds`, in this case the day represented by the model
   * will change to show the correct year.
   *
   * @param fromMilliseconds
   *  the moment in time from which the `hour` model to the `left` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `hour` one cell to the `left` of the specified moment in time.
   */
  goLeft(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'hour').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the `active` hour one cell `right` in the current `hour` view.
   *
   * Moving `right` can result in the `active` hour being part of a different day than
   * the specified `fromMilliseconds`, in this case the day represented by the model
   * will change to show the correct year.
   *
   * @param fromMilliseconds
   *  the moment in time from which the `hour` model to the `right` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `hour` one cell to the `right` of the specified moment in time.
   */
  goRight(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'hour').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the active `hour` one day `down` from the specified moment in time.
   *
   * Paging `down` will result in the `active` hour being part of a different day than
   * the specified `fromMilliseconds`. As a result, the day represented by the model
   * will change to show the correct year.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `hour` model page `down` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `hour` one day `down` from the specified moment in time.
   */
  pageDown(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'day').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the active `hour` one day `up` from the specified moment in time.
   *
   * Paging `up` will result in the `active` hour being part of a different day than
   * the specified `fromMilliseconds`. As a result, the day represented by the model
   * will change to show the correct year.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `hour` model page `up` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `hour` one day `up` from the specified moment in time.
   */
  pageUp(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'day').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the `active` `hour` to `11:00 pm` of the current day.
   *
   * The view or time range will not change unless the `fromMilliseconds` value
   * is in a different day than the displayed decade.
   *
   * @param fromMilliseconds
   *  the moment in time from which `11:00 pm` will be calculated.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  a model with the `11:00 pm` cell in the view as the active `hour`.
   */
  goEnd(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment
    (fromMilliseconds)
      .endOf('day')
      .startOf('hour')
      .valueOf(), selectedMilliseconds);
  }

  /**
   * Move the `active` `hour` to `midnight` of the current day.
   *
   * The view or time range will not change unless the `fromMilliseconds` value
   * is in a different day than the displayed decade.
   *
   * @param fromMilliseconds
   *  the moment in time from which `midnight` will be calculated.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  a model with the `midnight` cell in the view as the active `hour`.
   */
  goHome(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).startOf('day').valueOf(), selectedMilliseconds);
  }
}
