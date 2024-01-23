import moment from 'moment';
import { appPage } from '../po/app.po';
import { dateTimePickerPage } from '../po/date-time-picker.po';

const selectors = {
  minViewAttributeName: 'ng-reflect-min-view',
  maxViewAttributeName: 'ng-reflect-max-view'
};

describe('date-time-picker tests', () => {

  const app = appPage();
  const dateTimePicker = dateTimePickerPage();

  beforeEach(() => {
    app.navigateTo();
  });

  it('should configure date-time-picker with max view set to year and min view set to minute', () => {
    app.getDateTimePicker().should('be.visible').then(el => {

      cy.wrap(el).invoke('attr', selectors.maxViewAttributeName).should('eq', 'year');
      cy.wrap(el).invoke('attr', selectors.minViewAttributeName).should('eq', 'minute');
    });
  });

  it('should use date-time-picker to select the nearest date to the specified one', () => {
    const targetDate = moment('2003-11-07T21:32:17.800Z').valueOf();
    const expectedDate = new Date('2003-11-07T21:30:00.000Z').toString();

    app.getDateTimePicker().should('be.visible').then(el => {
      const maxView = el.attr(selectors.maxViewAttributeName);
      const minView = el.attr(selectors.minViewAttributeName);

      dateTimePicker.pickTime(maxView, minView, targetDate);

      app.getSelectedDate().contains(`Selected Date: ${expectedDate}`);
    });
  })
});
