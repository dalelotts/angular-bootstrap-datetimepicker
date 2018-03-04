import {DlDateAdapter} from './dl-date-adapter';

/**
 * Adapts `Date` to be usable as a date by date/time components that work with dates.
 **/
export class DlDateAdapterNative extends DlDateAdapter<Date> {
  /**
   * Create a new instance of a `moment` type from milliseconds.
   * @param milliseconds
   *  a time value as milliseconds (local time zone)
   * @returns
   *  an instance of `moment` for the specified moment in time.
   */
  fromMilliseconds(milliseconds: number): Date {
    return new Date(milliseconds);
  }


  /**
   * Returns a moment in time value as milliseconds (local time zone).
   * @param value
   *  a Date or null.
   * @returns
   *  a `value.getTime()` result for the specified `Date` or `null`.
   */
  toMilliseconds(value: Date | null): number | null {
    return (value) ? value.getTime() : undefined;
  }
}
