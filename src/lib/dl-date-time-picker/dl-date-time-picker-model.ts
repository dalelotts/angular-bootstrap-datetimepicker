/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {DateButton} from './dl-date-time-picker-date-button';

/**
 * Interface that represents the model for every view in a date/time picker.
 */
export interface DlDateTimePickerModel {
  /**
   * The date value of the currently active cell in the model.
   */
  activeDate: number;
  /**
   * Represent the configuration for the left button.
   */
  leftButton: {
    /**
     * The value for the model to the left of this model.
     */
    value: number;

    /**
     * The accessible label for the left button.
     * Used by screen readers.
     */
    ariaLabel: string;

    /**
     * The classes to add to the left button
     */
    classes: {};
  };
  /**
   * Represents the configuration for the right button.
   */
  rightButton: {

    /**
     * The value for the model to the right this model.
     */
    value: number;

    /**
     * The accessible label for the right button.
     * Used by screen readers.
     */
    ariaLabel: string;

    /**
     * The classes to add to the up button
     */
    classes: {};
  };
  /**
   * Optional row labels.
   * Used to include the weekday labels in the `day` view
   */
  rowLabels?: string[];
  /**
   * The rows in the current view.
   */
  rows: Array<{
    /**
     * The cells in the current row.
     */
    cells: Array<DateButton>
  }>;
  /**
   * Represent the configuration for the up button.
   */
  upButton?: {

    /**
     * The value for the model above this model.
     */
    value: number;

    /**
     * The accessible label for the up button.
     * Used by screen readers.
     */
    ariaLabel: string;

    /**
     * The classes to add to the up button
     */
    classes: {};
  };
  /**
   * The label displayed in the top-center of the date/time picker
   */
  viewLabel: string;
  /**
   * The name of the view represented by this model.
   */
  viewName: string;
}
