import moment from 'moment';
import {Moment} from 'moment';
import {DlDateAdapter} from './dl-date-adapter';

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
