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
