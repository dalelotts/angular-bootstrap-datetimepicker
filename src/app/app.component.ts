/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {Component, ViewChild} from '@angular/core';
import {DlDateTimePickerComponent} from '../lib/dl-date-time-picker';
import {DateButton} from '../lib/dl-date-time-picker';
import moment = require('moment');
import {unitOfTime} from 'moment';

@Component({
  selector: 'dl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dale Lotts\' angular bootstrap date & time picker';
  startView = 'day';
  minuteStep = 5;
  selectedDate: Date;
  selectFilter = (dateButton: DateButton, viewName: string) => {
    const now = moment().startOf(viewName as unitOfTime.StartOf).valueOf();
    return dateButton.value >= now;
  }
}
