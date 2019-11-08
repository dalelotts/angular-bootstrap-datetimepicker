import {AppPage} from './app.po';
import pickTime from './dl-date-time-picker-protractor';
import moment = require('moment');

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    return page.navigateTo();
  });

  it('Picking time updates Selected Date:', async () => {
    const todayAtMidnight = moment('2003-11-07T21:32:17.800Z');
    const expectedDate = new Date('2003-11-07T21:30:00.000Z').toString();

    await pickTime(page.getDateTimePicker(), todayAtMidnight.valueOf());

    const selectedDate = page.getSelectedDate().getText();
    expect(selectedDate).toBe(`Selected Date: ${expectedDate}`);
  });
});
