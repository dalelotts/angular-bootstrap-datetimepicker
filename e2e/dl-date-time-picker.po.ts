/* See the file "LICENSE" for the full license governing this code. */

import {by, element, ElementFinder} from 'protractor';

export class DlDateTimePickerPage {
  private dtp: ElementFinder;

  constructor(css: string) {
    this.dtp = element(by.css(css));
  }

  getTimeElement(time: Number) {
    console.error(`[data-value=${time}]`);
    return this.dtp.element(by.css(`[data-value="${time}"]`));
  }
}

