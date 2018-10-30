import * as _moment from 'moment';
import {Moment} from 'moment';
import {DlDateAdapter} from './dl-date-adapter';

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
 * Adapts `moment` to be usable as a date by date/time components that work with dates.
 **/
export class DlDateAdapterMoment extends DlDateAdapter<Moment> {

  /**
   * Create a new instance of a `moment` type from milliseconds.
   * @param milliseconds
   *  a time value as milliseconds (local time zone)
   * @returns
   *  an instance of `moment` for the specified moment in time.
   */
  fromMilliseconds(milliseconds: number): Moment {
    return moment(milliseconds);
  }

  /**
   * Returns a moment in time value as milliseconds (local time zone).
   * @param value
   *  a moment or `null`.
   * @returns
   *  a `moment.valueOf()` result for the specified `moment` or `null`
   */
  toMilliseconds(value: Moment | null): number | null {
    return (value) ? value.valueOf() : undefined;
  }
}
