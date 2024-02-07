/**
 * This file is an example of how you can implement automated end-to-end tests for the
 * date/time picker component.
 *
 * The overall strategy here is to use the `dl-abdtp-value` attributes, which contain numeric date values,
 * to determine which buttons to click on the picker in order to select a target dates.
 */

const selectors = {
  currentViewAttributeName: 'data-dl-abdtp-view',
  changeViewButton: '.dl-abdtp-up-button',
  dateTimeButton: '.dl-abdtp-date-button',
  dateValueAttributeName: 'dl-abdtp-value',
  navigateLeftButton: '.dl-abdtp-left-button',
  navigateRightButton: '.dl-abdtp-right-button'
}

export const dateTimePickerPage = () => {

  /**
   * Navigates to the given date-picker target date selection view.
   *
   * @param targetView the date-picker view to navigate to
   */
  const navigateToView = (targetView: string): void => {
    cy.get(`[${selectors.currentViewAttributeName}]`).then(el => {
      if (el.attr(selectors.currentViewAttributeName) !== targetView) {
        cy.get(selectors.changeViewButton).click();
        navigateToView(targetView);
      }
    });
  }

  /**
   * Navigates to the past dates until the first date button in the view contains the date-time value bigger than the given time.
   *
   * @param targetDateTime - the date-time to navigate to
   */
  const navigateLeft = (targetDateTime: number): void => {
    cy.get(selectors.dateTimeButton).first().then(el => {
      if (Number(el.attr(selectors.dateValueAttributeName)) > targetDateTime) {
        cy.get(selectors.navigateLeftButton).click();
        navigateLeft(targetDateTime);
      }
    });
  }

  /**
   * Navigates to the future dates until the late date button in the view contains the date-time value smaller or equal to the given time.
   *
   * @param targetDateTime - the date-time to navigate to
   */
  const navigateRight = (time: number): void => {
    cy.get(selectors.dateTimeButton).last().then(el => {
      if (Number(el.attr(selectors.dateValueAttributeName)) <= time) {
        cy.get(selectors.navigateRightButton).click();
        navigateRight(time);
      }
    });
  }

  /**
   * Picks the nearest date to the specified target date0time. Continues to select dates until the min target view is reached.
   *
   * @param minView - target min view
   * @param targetDateTime - the target date time to select
   */
  const pickNearestDate = (minView: string, targetDateTime: number): void => {
    cy.get(`[${selectors.currentViewAttributeName}]`).then(el => {
      if (el.attr(selectors.currentViewAttributeName) !== minView) {
        clickNearestDateButtonInTheView(targetDateTime);
        pickNearestDate(minView, targetDateTime);
      } else {
        clickNearestDateButtonInTheView(targetDateTime);
      }
    });
  }

  const clickNearestDateButtonInTheView = (targetDateTime: number) => {
    cy.get(selectors.dateTimeButton).then(els => {
      const buttons = els.toArray().filter(el => Number(el.getAttribute(selectors.dateValueAttributeName)) <= targetDateTime);
      buttons[buttons.length - 1].click();
    });
  }

  /**
   * Have the dateTimePicker select the best possible value that is less than or equal to the specified time based on the current configuration of the dateTimePicker.
   *
   * @param maxView - the max view to start the selection with
   * @param minView - the min view to end the selection with
   * @param targetDateTime - target date-time to select
   */
  const pickTime = (maxView: string, minView: string, targetDateTime: number): void => {
    navigateToView(maxView);
    navigateLeft(targetDateTime);
    navigateRight(targetDateTime);
    pickNearestDate(minView, targetDateTime);
  }

  return {
    pickTime
  }
};
