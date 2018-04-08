/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {NgModule} from '@angular/core';
import {DlDateTimePickerComponent} from './dl-date-time-picker.component';
import {CommonModule} from '@angular/common';
import {DlDateAdapter} from './dl-date-adapter';
import {DlDateAdapterNumber} from './dl-date-adapter-number';
import {DlDateAdapterMoment} from './dl-date-adapter-moment';
import {DlDateAdapterNative} from './dl-date-adapter-native';
import {DlYearModelProvider} from './dl-model-provider-year';
import {DlMonthModelProvider} from './dl-model-provider-month';
import {DlDayModelProvider} from './dl-model-provider-day';
import {DlHourModelProvider} from './dl-model-provider-hour';
import {DlMinuteModelProvider} from './dl-model-provider-minute';
import {DL_STRING_DATE_INPUT_FORMATS, DL_STRING_DATE_OUTPUT_FORMAT, DlDateAdapterString} from './dl-date-adapter-string';

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
 *
 **/
const moment = _moment;

/**
 * `Moment`'s long date format `lll` used as the default output format
 * for string date's
 */
export const LONG_DATE_FORMAT = moment.localeData().longDateFormat('lll');

/**
 *  Default input format's used by `DlDateAdapterString`
 */
export const INPUT_FORMATS = [
  'YYYY-MM-DDTHH:mm',
  'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHH:mm:ss.SSS',
  'YYYY-MM-DD',
  LONG_DATE_FORMAT,
  moment.ISO_8601
];

/**
 * Import this module to supply your own `DateAdapter` provider.
 * @internal
 **/
@NgModule({
  declarations: [DlDateTimePickerComponent],
  imports: [CommonModule],
  exports: [DlDateTimePickerComponent],
  providers: [
    DlYearModelProvider,
    DlMonthModelProvider,
    DlDayModelProvider,
    DlHourModelProvider,

    DlMinuteModelProvider
  ],
})
export class DlDateTimePickerModule {
}

/**
 * Import this module to store `milliseconds` in the model.
 */
@NgModule({
  imports: [DlDateTimePickerModule],
  exports: [DlDateTimePickerComponent],
  providers: [{provide: DlDateAdapter, useClass: DlDateAdapterNumber}],
})
export class DlDateTimePickerNumberModule {
}

/**
 * Import this module to store a native JavaScript `Date` in the model.
 */
@NgModule({
  imports: [DlDateTimePickerModule],
  exports: [DlDateTimePickerComponent],
  providers: [{provide: DlDateAdapter, useClass: DlDateAdapterNative}],
})
export class DlDateTimePickerDateModule {
}

/**
 * Import this module to store a `moment` in the model.
 */
@NgModule({
  imports: [DlDateTimePickerModule],
  exports: [DlDateTimePickerComponent],
  providers: [{provide: DlDateAdapter, useClass: DlDateAdapterMoment}],
})
export class DlDateTimePickerMomentModule {
}

/**
 * Import this module to store a `string` in the model.
 */
@NgModule({
  imports: [DlDateTimePickerModule],
  exports: [DlDateTimePickerComponent],
  providers: [
    {provide: DL_STRING_DATE_INPUT_FORMATS, useValue: INPUT_FORMATS},
    {provide: DL_STRING_DATE_OUTPUT_FORMAT, useValue: LONG_DATE_FORMAT},
    {provide: DlDateAdapter, useClass: DlDateAdapterString}
  ],
})
export class DlDateTimePickerStringModule {
}

