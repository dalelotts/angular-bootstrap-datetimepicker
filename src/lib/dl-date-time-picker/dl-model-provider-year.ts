/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {SimpleChanges} from '@angular/core';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {DlDateTimePickerModel} from './dl-date-time-picker-model';
import {DlModelProvider} from './dl-model-provider';

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
 * Default implementation for the `year` view.
 */
export class DlYearModelProvider implements DlModelProvider {

  /**
   * Create a moment at midnight january 1 at the start of the current decade.
   * The start of the decade is always a year ending in zero.
   *
   * @param fromMilliseconds
   *  the moment in time from which the start of the decade will be determined.
   * @returns
   *  moment at midnight january 1 at the start of the current decade.
   * @internal
   */
  private static getStartOfDecade(fromMilliseconds: number): Moment {
    // Truncate the last digit from the current year to get the start of the decade
    const startDecade = (Math.trunc(moment(fromMilliseconds).year() / 10) * 10);
    return moment({year: startDecade}).startOf('year');
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
   * The `year` model represents a decade (10 years) as two rows with five columns.
   *
   * The decade always starts on a year ending with zero.
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
    const rowNumbers = [0, 1];
    const columnNumbers = [0, 1, 2, 3, 4];

    const startYear = moment(milliseconds).startOf('year');
    const startDate = DlYearModelProvider.getStartOfDecade(milliseconds);

    const futureYear = startDate.year() + 9;
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
        value: moment(startDate).subtract(10, 'years').valueOf(),
        ariaLabel: `Go to ${pastYear - 10}-${pastYear - 1}`,
        classes: {},
      },
      rightButton: {
        value: moment(startDate).add(10, 'years').valueOf(),
        ariaLabel: `Go to ${futureYear + 1}-${futureYear + 10}`,
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
   * Moving `down` can result in the `active` year being part of a different decade than
   * the specified `fromMilliseconds`, in this case the decade represented by the model
   * will change to show the correct decade.
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
   * Moving `up` can result in the `active` year being part of a different decade than
   * the specified `fromMilliseconds`, in this case the decade represented by the model
   * will change to show the correct decade.
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
   * Moving `left` can result in the `active` year being part of a different decade than
   * the specified `fromMilliseconds`, in this case the decade represented by the model
   * will change to show the correct decade.
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
   * Moving `right` can result in the `active` year being part of a different decade than
   * the specified `fromMilliseconds`, in this case the decade represented by the model
   * will change to show the correct decade.
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
   * Move the active `year` one decade `down` from the specified moment in time.
   *
   * The `active` year will be the January 1 `ten (10) years after` the specified milliseconds.
   * This moves the `active` date one `page` `down` from the current `year` view.
   *
   * Paging `down` will result in the `active` year being part of a different decade than
   * the specified `fromMilliseconds`. As a result, the decade represented by the model
   * will change to show the correct decade.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `year` model page `down` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `year` one decade `down` from the specified moment in time.
   */
  pageDown(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(10, 'year').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the active `year` one decade `up` from the specified moment in time.
   *
   * The `active` year will be the January 1 `ten (10) years before` the specified milliseconds.
   * This moves the `active` date one `page-up` from the current `year` view.
   *
   * Paging `up` will result in the `active` year being part of a different decade than
   * the specified `fromMilliseconds`. As a result, the decade represented by the model
   * will change to show the correct decade.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `year` model page `up` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `year` one decade `up` from the specified moment in time.
   */
  pageUp(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(10, 'year').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the `active` `year` to the `last` year in the decade.
   *
   * The view or time range will not change unless the `fromMilliseconds` value
   * is in a different decade than the displayed decade.
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
      DlYearModelProvider.getStartOfDecade(fromMilliseconds)
        .add(9, 'years')
        .endOf('year')
        .valueOf(),
      selectedMilliseconds
    );
  }

  /**
   * Move the `active` `year` to the `first` year in the decade.
   *
   * The view or time range will not change unless the `fromMilliseconds` value
   * is in a different decade than the displayed decade.
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
      DlYearModelProvider.getStartOfDecade(fromMilliseconds)
        .startOf('year')
        .valueOf(),
      selectedMilliseconds
    );
  }
}
