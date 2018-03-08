/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {take} from 'rxjs/operators';
import {DateButton, DlDateTimePickerModel} from './dl-date-time-picker-model';
import {DlModelProvider} from './dl-model-provider';
import {DlDateTimePickerChange} from './dl-date-time-picker-change';
import * as _moment from 'moment';
import {DlDateAdapter} from './dl-date-adapter';
import {DlYearModelProvider} from './dl-model-provider-year';
import {DlMonthModelProvider} from './dl-model-provider-month';
import {DlDayModelProvider} from './dl-model-provider-day';
import {DlHourModelProvider} from './dl-model-provider-hour';
import {DlMinuteModelProvider} from './dl-model-provider-minute';

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
 * Maps key codes to the model provider function name
 * that should be called to perform the action.
 *
 * @internal
 **/

const keyCodeToModelProviderMethod = {
  33: 'pageUp',
  34: 'pageDown',
  35: 'goEnd',
  36: 'goHome',
  37: 'goLeft',
  38: 'goUp',
  39: 'goRight',
  40: 'goDown',
};


/**
 * List of view names for the calendar.
 *
 * This list must be in order from
 * smallest increment of time to largest increment of time.
 *
 * @internal
 **/
const VIEWS = [
  'minute',
  'hour',
  'day',
  'month',
  'year'
];

/**
 * Component that provides all of the user facing functionality of the date/time picker.
 *
 * This component supports the following keyboard shortcuts in all views:
 *
 * | Shortcut             | Action                                          |
 * |----------------------|-------------------------------------------------|
 * | `LEFT_ARROW`         | Go to the cell to the left                      |
 * | `RIGHT_ARROW`        | Go to the cell to the right                     |
 * | `UP_ARROW`           | Go to the cell above                            |
 * | `DOWN_ARROW`         | Go to the cell below                            |
 * | `HOME`               | Go to the first cell in the view                |
 * | `END`                | Go to the last cell in the view                 |
 * | `PAGE_UP`            | Go to the same cell in the previous time period |
 * | `PAGE_DOWN`          | Go to the same cell in the next time period     |
 * | `ENTER` or `SPACE`   | Select current cell                             |
 *
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DlDateTimePickerComponent,
      multi: true
    }
  ],
  selector: 'dl-date-time-picker',
  styleUrls: ['./dl-date-time-picker.component.scss'],
  templateUrl: './dl-date-time-picker.component.html',
})
export class DlDateTimePickerComponent<D> implements OnChanges, OnInit, ControlValueAccessor {

  /**
   * Specifies the classes used to display the left icon.
   *
   * This component uses OPENICONIC https://useiconic.com/open
   * by default but any icon library may be used.
   */
  @Input()
  leftIconClass: string | string[] | Set<string> | {} = [
    'oi',
    'oi-chevron-left'
  ];

  /**
   * The highest view that the date/time picker can show.
   * Setting this to a view less than year could make it more
   * difficult for the end-user to navigate to certain dates.
   */
  @Input()
  maxView: 'year' | 'month' | 'day' | 'hour' | 'minute' = 'year';

  /**
   * The number of minutes between each `.dl-abdtp-minute` button.
   *
   * Must be greater than `0` and less than `60`.
   */
  @Input()
  minuteStep = 5;

  /**
   * The view that will be used for date/time selection.
   *
   * The default of `minute  means that selection will not happen
   * until the end-user clicks on a cell in the minute view.
   *
   * for example, if you want the end-user to select a only day (date),
   * setting `minView` to `day` will cause selection to happen when the
   * end-user selects a cell in the day view.
   *
   * NOTE: This must be set lower than or equal to `startView'
   */
  @Input()
  minView: 'year' | 'month' | 'day' | 'hour' | 'minute' = 'minute';

  /**
   * Specifies the classes used to display the right icon.
   *
   * This component uses OPENICONIC https://useiconic.com/open
   * by default but any icon library may be used.
   */
  @Input()
  rightIconClass = [
    'oi',
    'oi-chevron-right'
  ];

  /**
   *  Start at the view containing startDate when no value is selected.
   */
  @Input()
  startDate: number;

  /**
   * The initial view that the date/time picker will show.
   * The picker will also return to this view after a date/time
   * is selected.
   *
   * NOTE: This must be set lower than or equal to `maxView'
   */
  @Input()
  startView: 'year' | 'month' | 'day' | 'hour' | 'minute' = 'day';

  /**
   * Specifies the classes used to display the up icon.
   *
   * This component uses OPENICONIC https://useiconic.com/open
   * by default but any icon library may be used.
   */
  @Input()
  upIconClass = [
    'oi',
    'oi-chevron-top'
  ];

  /**
   * Emits when a `change` event when date/time is selected or
   * the value of the date/time picker changes.
   **/
  @Output()
  readonly change = new EventEmitter<DlDateTimePickerChange<D>>();

  /**
   * Change listener callback functions registered
   * via `registerOnChange`
   * @internal
   **/
  private _changed: ((value: D) => void)[] = [];

  /**
   * Model for the current view.
   *
   * @internal
   **/
  _model: DlDateTimePickerModel;

  /**
   * Maps view name to the next view (the view for the next smallest increment of time).
   * @internal
   **/
  private _nextView = {
    'year': 'month',
    'month': 'day',
    'day': 'hour',
    'hour': 'minute'
  };

  /**
   * Maps view name to the previous view (the view for the next largest increment of time).
   * @internal
   **/
  private _previousView = {
    'minute': 'hour',
    'hour': 'day',
    'day': 'month',
    'month': 'year'
  };

  /**
   * Touch listener callback functions registered
   * via `registerOnChange`
   * @internal
   **/
  private _touched: (() => void)[] = [];

  /**
   * Stores the selected value for this picker.
   * @internal
   **/
  private _value: D;

  /**
   * Maps view name to the model provider for that view.
   * @internal
   **/
  private _viewToModelProvider: {
    year: DlModelProvider;
    month: DlModelProvider;
    day: DlModelProvider;
    hour: DlModelProvider;
    minute: DlModelProvider;
  };

  /**
   * Used to construct a new instance of a date/time picker.
   *
   * @param _elementRef
   *  reference to this element.
   * @param _ngZone
   *  reference to an NgZone instance used to select the active element outside of angular.
   * @param _dateAdapter
   *  date adapter for the date type in the model.
   * @param yearModelComponent
   *  provider for the year view model.
   * @param monthModelComponent
   *  provider for the month view model.
   * @param dayModelComponent
   *  provider for the day view model.
   * @param hourModelComponent
   *  provider for the hour view model.
   * @param minuteModelComponent
   *  provider for the minute view model.
   */
  constructor(private _elementRef: ElementRef,
              private _ngZone: NgZone,
              private _dateAdapter: DlDateAdapter<D>,
              private yearModelComponent: DlYearModelProvider,
              private monthModelComponent: DlMonthModelProvider,
              private dayModelComponent: DlDayModelProvider,
              private hourModelComponent: DlHourModelProvider,
              private minuteModelComponent: DlMinuteModelProvider) {

    this._viewToModelProvider = {
      year: yearModelComponent,
      month: monthModelComponent,
      day: dayModelComponent,
      hour: hourModelComponent,
      minute: minuteModelComponent,
    };
  }

  /**
   * Receives configuration changes detected by Angular and passes the changes on
   * to the model providers so the provider is aware of any necessary configuration
   * changes (i.e. minuteStep)
   *
   * @param changes
   *  the input changes detected by Angular.
   */
  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(this._viewToModelProvider)
      .map((key) => this._viewToModelProvider[key])
      .forEach((provider: DlModelProvider) => provider.onChanges(changes));

    if (this._model) { // only update the model after ngOnInit has set it the first time.
      this.model = this._viewToModelProvider[this._model.viewName].getModel(this._model.activeDate, this.valueOf);
    }
  }

  /**
   * Sets the initial model.
   *
   * @internal
   **/
  ngOnInit(): void {
    this.model = this._viewToModelProvider[this.getStartView()].getModel(this.getStartDate(), this.valueOf);
  }

  /**
   * Handles click (and enter & space key down) events on the date elements.
   *
   * If the current view is the minimum view then the date value is selected
   * and the picker returns to the start view.
   *
   * Otherwise the picker displays the next view with the next
   * smallest time increment.
   *
   * @internal
   **/
  _onDateClick(dateButton: DateButton) {
    if (dateButton.classes['dl-abdtp-disabled']) {
      return;
    }

    let nextView = this._nextView[this._model.viewName];

    if ((this.minView || 'minute') === this._model.viewName) {
      this.value = this._dateAdapter.fromMilliseconds(dateButton.value);
      nextView = this.startView;
    }

    this.model = this._viewToModelProvider[nextView].getModel(dateButton.value, this.valueOf);

    this.onTouch();
  }

  /**
   * Handles click (and enter & space key down) events on the left button.
   *
   * Changes the displayed time range of the picker to the previous time range.
   * For example, in year view, the previous decade is displayed.
   *
   * @internal
   **/
  _onLeftClick() {
    this.model = this._viewToModelProvider[this._model.viewName].getModel(this._model.leftButton.value, this.valueOf);
    this.onTouch();
  }

  /**
   * Handles click (and enter & space key down) events on the up button.
   *
   * Changes the view of the picker to the next largest time increment.
   * For example, in day view, the next view displayed will be month view.
   *
   * @internal
   **/
  _onUpClick() {
    this.model = this._viewToModelProvider[this._previousView[this._model.viewName]].getModel(this._model.upButton.value, this.valueOf);
  }

  /**
   * Handles click (and enter & space key down) events on the right button.
   *
   * Changes the displayed time range of the picker to the next time range.
   * For example, in year view, the next decade is displayed.
   *
   * @internal
   **/
  _onRightClick() {
    this.model = this._viewToModelProvider[this._model.viewName].getModel(this._model.rightButton.value, this.valueOf);
    this.onTouch();
  }

  /**
   * Handles various key down events to move the `active date` around the calendar.
   *
   * @internal
   **/
  _handleKeyDown($event: KeyboardEvent): void {
    const functionName = keyCodeToModelProviderMethod[$event.keyCode];

    if (functionName) {
      const modelProvider = this._viewToModelProvider[this._model.viewName];
      this.model = modelProvider[functionName](this._model.activeDate, this.valueOf);

      this.focusActiveCell();
      // Prevent unexpected default actions such as form submission.
      event.preventDefault();
    }
  }


  /**
   * Applies the `selectionFilter` by adding the `dl-abdtp-disabled`
   * class to any `DateButton` where `selectFilter` returned false.
   *
   * @param model
   *  the new model
   *
   * @returns
   *  the supplied model with zero or more `DateButton`'s
   *  having the `dl-abdtp-disabled` class set to `true` if the
   *  selection for that date should be disabled.
   *
   * @internal
   */
  private applySelectFilter(model: DlDateTimePickerModel): DlDateTimePickerModel {
    if (this.selectFilter) {
      model.rows = model.rows.map((row) => {
        row.cells.map((dateButton: DateButton) => {
          const disabled = !this.selectFilter(dateButton, model.viewName);
          dateButton.classes['dl-abdtp-disabled'] = disabled;
          if (disabled) {
            dateButton.classes['aria-disabled'] = true;
          }
          return dateButton;
        });
        return row;
      });
    }

    return model;
  }

  /**
   * Focuses the `.dl-abdtp-active` cell after the microtask queue is empty.
   * @internal
   **/
  private focusActiveCell() {
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
        this._elementRef.nativeElement.querySelector('.dl-abdtp-active').focus();
      });
    });
  }

  /**
   * Determines the start date for the picker.
   * @internal
   **/
  private getStartDate() {
    if (hasValue(this._value)) {
      return this._value;
    }
    if (hasValue(this.startDate)) {
      return this.startDate;
    }
    return moment().valueOf();
  }

  /**
   * Determine the start view for the picker
   * @returns
   *  the largest time increment view between the `minView` or `minute` view and the `startView` or `day` view.
   */
  private getStartView(): string {
    const startIndex = Math.max(VIEWS.indexOf(this.minView || 'minute'), VIEWS.indexOf(this.startView || 'day'));
    return VIEWS[startIndex];
  }


  /**
   * Set's the model for the current view after applying the selection filter.
   *
   * @internal
   **/
  private set model(model: DlDateTimePickerModel) {
    this._model = this.applySelectFilter(model);
  }

  /**
   * Calls all registered `touch` callback functions.
   * @internal
   **/
  private onTouch() {
    this._touched.forEach((onTouch) => onTouch());
  }

  /**
   * Implements ControlValueAccessor.registerOnChange to register change listeners.
   * @internal
   **/
  registerOnChange(fn: (value: D) => void) {
    this._changed.push(fn);
  }

  /**
   * Implements ControlValueAccessor.registerOnTouched to register touch listeners.
   * @internal
   **/
  registerOnTouched(fn: () => void) {
    this._touched.push(fn);
  }

  /**
   *  Determine whether or not the `DateButton` is selectable by the end user.
   */
  @Input()
  selectFilter: (dateButton: DateButton, viewName: string) => boolean = () => true

  /**
   * Returns `D` value of the date/time picker or undefined/null if no value is set.
   **/
  get value(): D {
    return this._value;
  }

  /**
   * Sets value of the date/time picker and emits a change event if the
   * new value is different from the previous value.
   **/
  set value(value: D) {
    if (this._value !== value) {
      this._value = value;
      this.model = this._viewToModelProvider[this._model.viewName].getModel(this.getStartDate(), this.valueOf);
      this._changed.forEach(f => f(value));
      this.change.emit(new DlDateTimePickerChange<D>(value));
    }
  }

  /**
   * Returns `milliseconds` value of the date/time picker or undefined/null if no value is set.
   **/
  get valueOf(): number | null {
    return this._dateAdapter.toMilliseconds(this._value);
  }


  /**
   * Implements ControlValueAccessor.writeValue to store the value from the model.
   * @internal
   **/
  writeValue(value: D) {
    this.value = value;
  }

}

/** @internal */
function hasValue(value: any): boolean {
  return (typeof value !== 'undefined') && (value !== null);
}
