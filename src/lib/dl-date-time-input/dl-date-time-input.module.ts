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
import {DlDateTimeInputDirective} from './dl-date-time-input.directive';

/**
 * Import this module to allow date/time input.
 * @internal
 **/
@NgModule({
  declarations: [DlDateTimeInputDirective],
  imports: [CommonModule],
  exports: [DlDateTimeInputDirective],
})
export class DlDateTimeInputModule {
}
