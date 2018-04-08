import {DlDateAdapter} from './dl-date-adapter';
import * as _moment from 'moment';
import {Inject, InjectionToken} from '@angular/core';

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
 * InjectionToken for string dates that can be used to override default output format.
 **/
export const DL_STRING_DATE_OUTPUT_FORMAT = new InjectionToken<string>('DL_STRING_DATE_OUTPUT_FORMAT');

/**
 * InjectionToken for string dates that can be used to override default input formats.
 **/
export const DL_STRING_DATE_INPUT_FORMATS = new InjectionToken<string[]>('DL_STRING_DATE_INPUT_FORMATS');

/**
 * Adapts `string` to be usable as a date by date/time components that work with dates.
 **/
export class DlDateAdapterString extends DlDateAdapter<string> {

  private readonly modelFormat: string;
  private readonly inputFormats: string[];

  constructor(@Inject(DL_STRING_DATE_INPUT_FORMATS) inputFormats: string[],
              @Inject(DL_STRING_DATE_OUTPUT_FORMAT) modelFormat: string) {
    super();
    this.inputFormats = inputFormats;
    this.modelFormat = modelFormat;
  }

  /**
   * Returns the specified number.
   * @param milliseconds
   *  a moment time time.
   * @returns
   *  the specified moment in time.
   */
  fromMilliseconds(milliseconds: number): string {
    return moment(milliseconds).format(this.modelFormat);
  }

  /**
   * Returns the specified number.
   * @param value
   *  a moment time time or `null`
   * @returns
   *  the milliseconds for the specified value or `null`
   *  `null` is returned when value is not a valid input date string
   */
  toMilliseconds(value: string | null): number | null {
    if (value !== undefined && value !== null) {
      const newMoment = moment(value, this.inputFormats, true);
      return newMoment.isValid() ? newMoment.valueOf() : undefined;
    }
  }
}
