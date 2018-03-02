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
import {DlYearModelComponent} from './dl-year-model.component';
import {DlMinuteModelComponent} from './dl-minute-model.component';
import {DlMonthModelComponent} from './dl-month-model.component';
import {DlDayModelComponent} from './dl-day-model.component';
import {DlHourModelComponent} from './dl-hour-model.component';

@NgModule({
  declarations: [DlDateTimePickerComponent],
  imports: [CommonModule],
  exports: [DlDateTimePickerComponent],
  providers: [
    DlYearModelComponent,
    DlMonthModelComponent,
    DlDayModelComponent,
    DlHourModelComponent,
    DlMinuteModelComponent
  ],
})
export class DlDateTimePickerModule {
}
