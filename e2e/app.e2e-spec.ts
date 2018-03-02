import { AppPage } from './app.po';

describe('angular-bootstrap-datetimepicker App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  describe('english', () => {
    it('should set model when selecting January 1, 2017 at midnight', () => {
      page.dtpEn.getTimeElement(new Date('2017-01-01').getTime()).click();
      return expect(page.selectedDateEn.getText()).toEqual('2017-Nov');
    });
  });
});
