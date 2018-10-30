/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DlDateTimePickerComponent} from './dl-date-time-picker.component';
import {DlDayModelProvider} from './dl-model-provider-day';
import {DlHourModelProvider} from './dl-model-provider-hour';
import {DlMinuteModelProvider} from './dl-model-provider-minute';
import {DlMonthModelProvider} from './dl-model-provider-month';
import {DlYearModelProvider} from './dl-model-provider-year';

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
