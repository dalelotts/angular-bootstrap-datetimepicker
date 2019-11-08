import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getDateTimePicker() {
    return element(by.tagName('dl-date-time-picker'));
  }

  getSelectedDate() {
    return element(by.id('selectedDate'));
  }
}
