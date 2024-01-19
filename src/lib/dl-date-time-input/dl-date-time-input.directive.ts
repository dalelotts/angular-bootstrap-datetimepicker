import {Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, Renderer2} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import moment from 'moment';
import {DL_DATE_TIME_DISPLAY_FORMAT, DL_DATE_TIME_INPUT_FORMATS, DlDateAdapter} from '../core/public-api';
import {DlDateTimeInputChange} from './dl-date-time-input-change';

/**
 *  This directive allows the user to enter dates, using the keyboard, into an input box and
 *  angular will then store a date value in the model.
 *
 *  The input format(s), display format, and model format are independent and fully customizable.
 */
@Directive({
  selector: 'input[dlDateTimeInput]',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting:  DlDateTimeInputDirective, multi: true},
    {provide: NG_VALIDATORS, useExisting:  DlDateTimeInputDirective, multi: true}
  ]
})
export class DlDateTimeInputDirective<D> implements ControlValueAccessor, Validator {

  /* tslint:disable:member-ordering */
  private _filterValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return (this._inputFilter || (() => true))(this._value) ?
      null : {'dlDateTimeInputFilter': {'value': control.value}};
  }
  private _inputFilter: (value: (D | null)) => boolean = () => true;
  private _isValid = true;
  private _parseValidator: ValidatorFn = (): ValidationErrors | null => {
    return this._isValid ?
      null : {'dlDateTimeInputParse': {'text': this._elementRef.nativeElement.value}};
  }
  private _changed: ((value: D) => void)[] = [];
  private _touched: (() => void)[] = [];
  private _validator = Validators.compose([this._parseValidator, this._filterValidator]);
  private _onValidatorChange: () => void = () => {};
  private _value: D | undefined = undefined;

  /**
   * Emits when a `change` event when date/time is selected or
   * the value of the date/time picker changes.
   **/
  @Output()
  readonly dateChange = new EventEmitter<DlDateTimeInputChange<D>>();

  /**
   * Constructs a new instance of this directive.
   * @param _renderer
   *  reference to the renderer.
   * @param _elementRef
   *  reference to this element.
   * @param _dateAdapter
   *  date adapter for the date type in the model.
   * @param _displayFormat
   *  from `DL_DATE_TIME_DISPLAY_FORMAT`, which defines the format to use for a valid date/time value.
   * @param _inputFormats
   *  from `DL_DATE_TIME_INPUT_FORMATS`, which defines the input formats that allowed as valid date/time values.
   *  NB: moment is always in strict parse mode for this directive.
   */
  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _dateAdapter: DlDateAdapter<D>,
    @Inject(DL_DATE_TIME_DISPLAY_FORMAT) private readonly _displayFormat: string,
    @Inject(DL_DATE_TIME_INPUT_FORMATS) private readonly _inputFormats: string[]
  ) {}

  /**
   * Set a function used to determine whether or not the `value` entered by the user is allowed.
   * @param inputFilterFunction
   *   a function that returns `true` if the `value` entered by the user is allowed, otherwise `false`.
   */
  @Input()
  set dlDateTimeInputFilter(inputFilterFunction: (value: D | null) => boolean) {
    this._inputFilter = inputFilterFunction || (() => true);
    this._onValidatorChange();
  }

  /* tslint:enable:member-ordering */

  /**
   * Returns `D` value of the date/time input or `undefined` | `null` if no value is set.
   **/
  get value(): D {
    return this._value;
  }

  /**
   * Set the value of the date/time input to a value of `D` | `undefined` | `null`;
   * @param newValue
   *  the new value of the date/time input
   */

  set value(newValue: D | null | undefined) {
    if (newValue !== this._value) {
      this._value = newValue;
      this._changed.forEach(onChanged => onChanged(this._value));
    }
  }

  /**
   * Emit a `change` event when the value of the input changes.
   */
  @HostListener('change') _onChange() {
    this.dateChange.emit(new DlDateTimeInputChange(this._value));
  }

  /**
   * Format the input text using {@link DL_DATE_TIME_DISPLAY_FORMAT} and mark the control as touched.
   */
  @HostListener('blur') _onBlur() {
    if (this._value) {
      this._setElementValue(this._value);
    }
    this._touched.forEach(onTouched => onTouched());
  }

  /**
   * Parse the user input into a possibly valid date.
   * The model value is not set if the input is NOT one of the {@link DL_DATE_TIME_INPUT_FORMATS}.
   * @param value
   *   Value of the input control.
   */
  @HostListener('input', ['$event.target.value']) _onInput(value: string | null | undefined): void {
    const testDate = value === null || value === undefined || value === ''
      ? undefined
      : moment(value, this._inputFormats, true);

    this._isValid = testDate && testDate.isValid();
    this.value = this._isValid ? this._dateAdapter.fromMilliseconds(testDate.valueOf()) : undefined;
  }

  /**
   * @internal
   */
  private _setElementValue(value: D) {
    if (value !== null && value !== undefined) {
      this._renderer.setProperty(this._elementRef.nativeElement, 'value', moment(value).format(this._displayFormat));
    }
  }

  /**
   * @internal
   */
  registerOnChange(onChange: (value: any) => void): void {
    this._changed.push(onChange);
  }

  /**
   * @internal
   */
  registerOnTouched(onTouched: () => void): void {
    this._touched.push(onTouched);
  }

  /**
   * @internal
   */
  registerOnValidatorChange(validatorOnChange: () => void): void {
    this._onValidatorChange = validatorOnChange;
  }

  /**
   * @internal
   */
  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  /**
   * @internal
   */
  validate(control: AbstractControl): ValidationErrors | null {
    return this._validator(control);
  }

  /**
   * @internal
   */
  writeValue(value: D): void {
    this._isValid = true;
    this.value = value;
    this._setElementValue(value);
  }
}
