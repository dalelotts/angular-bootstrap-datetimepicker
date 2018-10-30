/**
 * Determines the model type of the Date/Time picker another type.
 */
export abstract class DlDateAdapter<D> {

  /**
   * Create a new instance of a `D` type from milliseconds.
   * @param milliseconds
   *  a moment in time value as milliseconds (local time zone)
   * @returns
   *  an instance of `D` for the specified moment in time.
   */
  abstract fromMilliseconds(milliseconds: number): D;

  /**
   * Returns a moment in time value as milliseconds (local time zone).
   * @param value
   *  a moment in time value as `D` or `null`.
   * @returns
   *  a moment in` for the specified value or `null`
   */
  abstract toMilliseconds(value: D | null): number | null;
}
