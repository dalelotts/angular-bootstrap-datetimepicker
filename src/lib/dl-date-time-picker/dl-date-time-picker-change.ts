/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

/**
 * Emitted when the value of a date/time picker changes.
 */
export class DlDateTimePickerChange {

  /**
   * The new value of the picker.
   */
  private _value: number;

  /**
   * Constructs a new instance.
   * @param milliseconds
   * the new value of the date/time picker.
   */
  constructor(milliseconds: number) {
    this._value = milliseconds;
  }

  /**
   * Get the new value of the date/time picker.
   * @returns
   *    the new value or null.
   */
  get value() {
    return this._value;
  }
}
