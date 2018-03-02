import {browser, by, element, ElementFinder} from 'protractor';
import {DlDateTimePickerPage} from './dl-date-time-picker.po';

export class AppPage {

  dtpEn: DlDateTimePickerPage;
  selectedDateEn: ElementFinder;

  constructor() {
    this.dtpEn = new DlDateTimePickerPage('dl-date-time-picker.en');
    this.selectedDateEn = element(by.css('label.en'));
  }

  navigateTo() {
    return browser.get('/');
  }
}
