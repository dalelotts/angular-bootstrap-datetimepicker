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
 * Default implementation for the `minute` view.
 */
export class DlMinuteModelProvider implements DlModelProvider {

  private step = 5;

  /**
   * Receives `minuteStep` configuration changes detected by Angular.
   *
   * Changes where the value has not changed are ignored.
   *
   * Setting `minuteStep` to `null` or `undefined` will result in a
   * minuteStep of `5`.
   *
   * @param changes
   *  the input changes detected by Angular.
   */

  onChanges(changes: SimpleChanges): void {

    const minuteStepChange = changes['minuteStep'];

    if (minuteStepChange
      && (minuteStepChange.previousValue !== minuteStepChange.currentValue)
    ) {
      this.step = minuteStepChange.currentValue;
      if (this.step === null || this.step === undefined) {
        this.step = 5;
      }
    }
  }


  /**
   * Returns the `minute` model for the specified moment in `local` time with the
   * `active` minute set to the beginning of the hour.
   *
   * The `minute` model represents an hour (60 minutes) as three rows with four columns
   * and each cell representing 5-minute increments.
   *
   * The hour always starts at midnight.
   *
   * Each cell represents a 5-minute increment starting at midnight.
   *
   * The `active` minute will be the 5-minute increments less than or equal to the specified milliseconds.
   *
   * @param milliseconds
   *  the moment in time from which the minute model will be created.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  the model representing the specified moment in time.
   */
  getModel(milliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    const startDate = moment(milliseconds).startOf('hour');
    const currentMilliseconds = moment().valueOf();

    const minuteSteps = new Array(Math.ceil(60 / this.step)).fill(0).map((zero, index) => zero + index * this.step);
    const minuteValues = minuteSteps.map((minutesToAdd) => moment(startDate).add(minutesToAdd, 'minutes').valueOf());
    const activeValue = moment(minuteValues.filter((value) => value <= milliseconds).pop()).valueOf();

    const nowValue = currentMilliseconds >= startDate.valueOf() && currentMilliseconds <= moment(startDate).endOf('hour').valueOf()
      ? moment(minuteValues.filter((value) => value <= currentMilliseconds).pop()).valueOf()
      : null;


    const previousHour = moment(startDate).subtract(1, 'hour');
    const nextHour = moment(startDate).add(1, 'hour');
    const selectedValue = selectedMilliseconds === null || selectedMilliseconds === undefined
      ? selectedMilliseconds
      : moment(minuteValues.filter((value) => value <= selectedMilliseconds).pop()).valueOf();

    const rows = new Array(Math.ceil(minuteSteps.length / 4))
      .fill(0)
      .map((zero, index) => zero + index)
      .map((value) => {
        return {cells: minuteSteps.slice((value * 4), (value * 4) + 4).map(rowOfMinutes)};
      });

    return {
      viewName: 'minute',
      viewLabel: startDate.format('lll'),
      activeDate: activeValue,
      leftButton: {
        value: previousHour.valueOf(),
        ariaLabel: `Go to ${previousHour.format('lll')}`,
        classes: {},
      },
      upButton: {
        value: startDate.valueOf(),
        ariaLabel: `Go to ${startDate.format('ll')}`,
        classes: {},
      },
      rightButton: {
        value: nextHour.valueOf(),
        ariaLabel: `Go to ${nextHour.format('lll')}`,
        classes: {},
      },
      rows
    };

    function rowOfMinutes(stepMinutes): {
      display: string;
      ariaLabel: string;
      value: number;
      classes: {};
    } {
      const minuteMoment = moment(startDate).add(stepMinutes, 'minutes');
      return {
        display: minuteMoment.format('LT'),
        ariaLabel: minuteMoment.format('LLL'),
        value: minuteMoment.valueOf(),
        classes: {
          'dl-abdtp-active': activeValue === minuteMoment.valueOf(),
          'dl-abdtp-selected': selectedValue === minuteMoment.valueOf(),
          'dl-abdtp-now': nowValue === minuteMoment.valueOf(),
        }
      };
    }
  }

  /**
   * Move the active `minute` one row `down` from the specified moment in time.
   *
   * Moving `down` can result in the `active` minute being part of a different hour than
   * the specified `fromMilliseconds`, in this case the hour represented by the model
   * will change to show the correct hour.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `minute` model `down` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `minute` one row `down` from the specified moment in time.
   */
  goDown(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(this.step * 4, 'minutes').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the active `minute` one row `down` from the specified moment in time.
   *
   * Moving `down` can result in the `active` minute being part of a different hour than
   * the specified `fromMilliseconds`, in this case the hour represented by the model
   * will change to show the correct hour.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `minute` model `down` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `minute` one row `down` from the specified moment in time.
   */
  goUp(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(this.step * 4, 'minutes').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the `active` date one cell to `left` in the current `minute` view.
   *
   * Moving `left` can result in the `active` hour being part of a different hour than
   * the specified `fromMilliseconds`, in this case the hour represented by the model
   * will change to show the correct hour.
   *
   * @param fromMilliseconds
   *  the moment in time from which the `minute` model to the `left` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `minute` one cell to the `left` of the specified moment in time.
   */
  goLeft(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(this.step, 'minutes').valueOf(), selectedMilliseconds);
  }

  /**
   * Move `active` minute one cell to `right` in the current `minute` view.
   *
   * Moving `right` can result in the `active` hour being part of a different hour than
   * the specified `fromMilliseconds`, in this case the hour represented by the model
   * will change to show the correct hour.
   *
   * @param fromMilliseconds
   *  the moment in time from which the `minute` model to the `right` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `minute` one cell to the `right` of the specified moment in time.
   */
  goRight(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(this.step, 'minutes').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the active `minute` one hour `down` from the specified moment in time.
   *
   * The `active` minute will be `one (1) hour after` the specified milliseconds.
   * This moves the `active` date one `page` `down` from the current `minute` view.
   *
   * The next cell `page-down` will be in a different hour than the currently
   * displayed view and the model time range will include the new active cell.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `month` model page `down` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `month` one year `down` from the specified moment in time.
   */
  pageDown(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'hour').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the active `minute` one hour `up` from the specified moment in time.
   *
   * The `active` minute will be `one (1) hour before` the specified milliseconds.
   * This moves the `active` date one `page` `down` from the current `minute` view.
   *
   * The next cell `page-up` will be in a different hour than the currently
   * displayed view and the model time range will include the new active cell.
   *
   * @param fromMilliseconds
   *  the moment in time from which the next `month` model page `down` will be constructed.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  model containing an `active` `month` one year `down` from the specified moment in time.
   */
  pageUp(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'hour').valueOf(), selectedMilliseconds);
  }

  /**
   * Move the `active` `minute` to the last cell of the current hour.
   *
   * The view or time range will not change unless the `fromMilliseconds` value
   * is in a different hour than the displayed decade.
   *
   * @param fromMilliseconds
   *  the moment in time from which the last cell will be calculated.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  a model with the last cell in the view as the active `minute`.
   */
  goEnd(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds)
      .endOf('hour')
      .valueOf(), selectedMilliseconds);
  }

  /**
   * Move the `active` `minute` to the first cell of the current hour.
   *
   * The view or time range will not change unless the `fromMilliseconds` value
   * is in a different hour than the displayed decade.
   *
   * @param fromMilliseconds
   *  the moment in time from which the first cell will be calculated.
   * @param selectedMilliseconds
   *  the current value of the date/time picker.
   * @returns
   *  a model with the first cell in the view as the active `minute`.
   */
  goHome(fromMilliseconds: number, selectedMilliseconds: number): DlDateTimePickerModel {
    return this.getModel(moment(fromMilliseconds).startOf('hour').valueOf(), selectedMilliseconds);
  }
}
