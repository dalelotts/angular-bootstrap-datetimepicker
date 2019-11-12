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
   * The text to display in the button.
   */
  display: string;
  /**
   * The date/time value for the button.
   */
  value: number;
}
