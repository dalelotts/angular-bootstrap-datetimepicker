import {by, ElementArrayFinder, ElementFinder} from 'protractor';

/**
 * This file is an example of how you can implement automated end-to-end tests for the
 * date/time picker component.
 *
 * The overall strategy here is to use the `dl-abdtp-value` attributes, which contain numeric date values,
 * to determine which buttons to click on the picker in order to select a target dates.
 */

/**
 * Clicks the nearest date button with a value less than or equal to the specified time.
 * @param dateButtons
 *  the possible date buttons.
 * @param time
 *  the desired selected time.
 */

export function clickNearestDateButton(dateButtons: ElementArrayFinder, time: number) {
  return dateButtons
    .filter(button => button.getAttribute('dl-abdtp-value').then(buttonValue => Number(buttonValue) <= time))
    .last().click();
}

/**
 * Have the dateTimePicker select the best possible value that is less than or equal to the specified time.
 * based on the current configuration of the dateTimePicker.
 *
 * This function will `not` select a time value `greater than` the specified time value.
 *
 * Additionally, this function depends on `ng-reflect-*` attributes which will never exist in a production build.
 *
 * @param dateTimePicker
 *  the target dateTimePicker
 *
 * @param time
 *  the desired selected time.
 */
async function pickTime(dateTimePicker: ElementFinder, time: number) {
  const dateButtons = dateTimePicker.all(by.className('dl-abdtp-date-button'));
  const leftButton = dateTimePicker.element(by.className('dl-abdtp-left-button'));
  const rightButton = dateTimePicker.element(by.className('dl-abdtp-right-button'));
  const upButton = dateTimePicker.element(by.className('dl-abdtp-up-button'));
  const viewAttributeName = 'data-dl-abdtp-view';
  const viewElement = dateTimePicker.element(by.css(`[${viewAttributeName}]`));

  const maxView = await dateTimePicker.getAttribute('ng-reflect-max-view');
  const minView = await dateTimePicker.getAttribute('ng-reflect-min-view');

  let currentView = await viewElement.getAttribute(viewAttributeName);

  // Go up to the max view in order to drill down by selecting the nearest button value.
  while (maxView !== currentView) {
    await upButton.click();
    currentView = await viewElement.getAttribute(viewAttributeName);
  }

  let firstButtonValue = await dateButtons.first().getAttribute('dl-abdtp-value');

  // This left and right navigation to find the target date range assumes that earlier times are to the left.
  // This is true for the default implementation but may not be true for all implementations.

  while (Number(firstButtonValue) > time) {
    await leftButton.click();
    firstButtonValue = await dateButtons.first().getAttribute('dl-abdtp-value');
  }

  let lastButtonValue = await dateButtons.last().getAttribute('dl-abdtp-value');

  while (Number(lastButtonValue) <= time) {
    await rightButton.click();
    lastButtonValue = await dateButtons.last().getAttribute('dl-abdtp-value');
  }

  while (minView !== currentView) {
    await clickNearestDateButton(dateButtons, time);
    currentView = await viewElement.getAttribute(viewAttributeName);
  }

  return clickNearestDateButton(dateButtons, time);
}

export default pickTime;
