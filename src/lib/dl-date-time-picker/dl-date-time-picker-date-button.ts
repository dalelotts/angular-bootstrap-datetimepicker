/**
 * Represents the configuration for a cell in the picker.
 */
export interface DateButton {

  /**
   * The accessible label for the cell.
   * Used by screen readers.
   */
  ariaLabel: string;
  /**
   * The classes to add to the cell button
   */
  classes: {};
  /**
   * The text to display in the cell.
   */
  display: string;
  /**
   * The value for the cell.
   */
  value: number;
}
