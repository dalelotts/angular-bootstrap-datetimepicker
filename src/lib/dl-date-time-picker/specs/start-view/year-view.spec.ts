/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {Component, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import * as moment from 'moment';
import {DlDateTimeNumberModule, DlDateTimePickerComponent, DlDateTimePickerModule} from '../../../public-api';
import {
  dispatchKeyboardEvent,
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW
} from '../dispatch-events';
import {DEC, JAN} from '../month-constants';

@Component({
  template: '<dl-date-time-picker startView="year"></dl-date-time-picker>'
})
class YearStartViewComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
}

@Component({
  template: '<dl-date-time-picker startView="year" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class YearStartViewWithNgModelComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate = new Date(2017, DEC, 22).getTime();
}

@Component({
  template: '<dl-date-time-picker startView="year" minView="year" maxView="year"></dl-date-time-picker>'
})
class YearSelectorComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
}

describe('DlDateTimePickerComponent', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeNumberModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        YearStartViewComponent,
        YearStartViewWithNgModelComponent,
        YearSelectorComponent
      ]
    })
      .compileComponents();
  }));

  describe('default behavior ', () => {
    let component: YearStartViewComponent;
    let fixture: ComponentFixture<YearStartViewComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(YearStartViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
      });
    }));

    it('should start with year-view', () => {
      const monthView = fixture.debugElement.query(By.css('.dl-abdtp-year-view'));
      expect(monthView).toBeTruthy();
    });

    it('should contain 0 .dl-abdtp-col-label elements', () => {
      const dayLabelElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-col-label'));
      expect(dayLabelElements.length).toBe(0);
    });

    it('should contain 10 .dl-abdtp-year elements', () => {
      const monthElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));
      expect(monthElements.length).toBe(10);
    });

    it('should contain 1 .dl-abdtp-now element for the current year', () => {
      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now'));
      expect(currentElements.length).toBe(1);
      expect(currentElements[0].nativeElement.textContent.trim()).toBe(moment().year().toString());
      expect(currentElements[0].attributes['dl-abdtp-value']).toBe(moment().startOf('year').valueOf().toString());
    });

    it('should contain 1 [tabindex=1] element', () => {
      const tabIndexElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year[tabindex="0"]'));
      expect(tabIndexElements.length).toBe(1);
    });

    it('should NOT contain an .dl-abdtp-now element in the previous decade', () => {
      // click on the left button to move to the previous hour
      fixture.debugElement.query(By.css('.dl-abdtp-left-button')).nativeElement.click();
      fixture.detectChanges();

      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now'));
      expect(currentElements.length).toBe(0);
    });

    it('should NOT contain an .dl-abdtp-now element in the next decade', () => {
      // click on the left button to move to the previous hour
      fixture.debugElement.query(By.css('.dl-abdtp-right-button')).nativeElement.click();
      fixture.detectChanges();

      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now'));
      expect(currentElements.length).toBe(0);
    });

    it('should contain 1 .dl-abdtp-active element for the current year', () => {
      const activeElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-active'));
      expect(activeElements.length).toBe(1);
      expect(activeElements[0].nativeElement.textContent.trim()).toBe(moment().year().toString());
      expect(activeElements[0].attributes['dl-abdtp-value']).toBe(moment().startOf('year').valueOf().toString());
    });

    it('should contain 1 .dl-abdtp-selected element for the current year', () => {
      component.picker.value = moment().startOf('year').valueOf();
      fixture.detectChanges();

      // Bug: The value change is not detected until there is some user interaction
      // **ONlY** when there is no ngModel binding on the component.
      // I think it is related to https://github.com/angular/angular/issues/10816
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement;
      activeElement.focus();
      dispatchKeyboardEvent(activeElement, 'keydown', HOME);
      fixture.detectChanges();

      const selectedElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-selected'));
      expect(selectedElements.length).toBe(1);
      expect(selectedElements[0].nativeElement.textContent.trim()).toBe(moment().year().toString());
      expect(selectedElements[0].attributes['dl-abdtp-value']).toBe(moment().startOf('year').valueOf().toString());
    });
  });

  describe('ngModel=2017-12-22', () => {
    let component: YearStartViewWithNgModelComponent;
    let fixture: ComponentFixture<YearStartViewWithNgModelComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(YearStartViewWithNgModelComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
      });
    }));

    it('should contain .dl-abdtp-view-label element with "2010-2019"', () => {
      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent).toBe('2010-2019');
    });

    it('should contain 10 .dl-abdtp-year elements with start of year utc time as class and role of gridcell', () => {
      // Truncate the last digit from the current year to get the start of the decade
      const startDecade = (Math.trunc(moment().year() / 10) * 10);

      const expectedValues = new Array(10)
        .fill(JAN)
        .map((january, index) => new Date(startDecade + index, january, 1).getTime());

      const yearElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));

      yearElements.forEach((yearElement, index) => {
        const expectedValue = expectedValues[index];
        expect(yearElement.attributes['dl-abdtp-value']).toBe(expectedValue.toString(10), index);
        expect(yearElement.attributes['role']).toBe('gridcell', index);
        expect(yearElement.attributes['aria-label']).toBeNull(); // why isn't this undefined?
      });
    });

    it('should have a dl-abdtp-value attribute with the previous decade value on .dl-abdtp-left-button ', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      const expected = new Date(2000, JAN, 1).getTime();
      expect(leftButton.attributes['dl-abdtp-value']).toBe(expected.toString());
    });

    it('should switch to previous decade value after clicking .dl-abdtp-left-button', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      leftButton.nativeElement.click();
      fixture.detectChanges();

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent).toBe('2000-2009');

      const yearElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));
      expect(yearElements[0].nativeElement.textContent.trim()).toBe('2000');
    });

    it('should has a dl-abdtp-value attribute with the next decade value on .dl-abdtp-right-button ', () => {
      const rightButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      const expected = new Date(2020, JAN, 1).getTime();
      expect(rightButton.attributes['dl-abdtp-value']).toBe(expected.toString());
    });

    it('should switch to next decade after clicking .dl-abdtp-right-button', () => {
      const rightButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      rightButton.nativeElement.click();
      fixture.detectChanges();

      const yearElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));
      expect(yearElements[0].nativeElement.textContent.trim()).toBe('2020');
    });

    it('.dl-abdtp-left-button should have a title', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      expect(leftButton.attributes['title']).toBe('Go to 2000-2009');
    });


    it('.dl-abdtp-left-button should have arial label', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      expect(leftButton.attributes['aria-label']).toBe('Go to 2000-2009');
    });

    it('.dl-abdtp-right-button should have a title', () => {
      const rightButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      expect(rightButton.attributes['title']).toBe('Go to 2020-2029');
    });

    it('.dl-abdtp-right-button should have aria-label', () => {
      const rightButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      expect(rightButton.attributes['aria-label']).toBe('Go to 2020-2029');
    });

    it('should not emit a change event when clicking .dl-abdtp-year', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      const yearElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));
      yearElements[9].nativeElement.click(); // 2019
      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should change to .dl-abdtp-month-view when selecting year', () => {
      const yearElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));
      yearElements[0].nativeElement.click(); // 2009
      fixture.detectChanges();

      const monthView = fixture.debugElement.query(By.css('.dl-abdtp-month-view'));
      expect(monthView).toBeTruthy();

      const yearView = fixture.debugElement.query(By.css('.dl-abdtp-year-view'));
      expect(yearView).toBeFalsy();
    });

    it('should do nothing when hitting non-supported key', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', 'A');
      fixture.detectChanges();

      expect(activeElement.nativeElement.textContent).toBe('2017');
    });

    it('should change to .dl-abdtp-month-view when hitting ENTER', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();

      const monthView = fixture.debugElement.query(By.css('.dl-abdtp-month-view'));
      expect(monthView).toBeTruthy();

      const yearView = fixture.debugElement.query(By.css('.dl-abdtp-year-view'));
      expect(yearView).toBeFalsy();
    });

    it('should change to .dl-abdtp-month-view when hitting SPACE', () => {
      (component.picker as any)._model.activeDate = new Date(2011, JAN, 1).getTime();
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', SPACE);
      fixture.detectChanges();

      const monthView = fixture.debugElement.query(By.css('.dl-abdtp-month-view'));
      expect(monthView).toBeTruthy();

      const yearView = fixture.debugElement.query(By.css('.dl-abdtp-year-view'));
      expect(yearView).toBeFalsy();
    });

    it('should have one .dl-abdtp-active element', () => {
      const activeElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-active'));
      expect(activeElements.length).toBe(1);
    });

    it('should change .dl-abdtp-active element on right arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      activeElement.nativeElement.focus();
      expect(document.activeElement).toBe(activeElement.nativeElement, document.activeElement.outerHTML);

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', RIGHT_ARROW);

      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2018');
    });

    it('should change to next decade when last .dl-abdtp-year is .dl-abdtp-active element and pressing on right arrow', () => {
      (component.picker as any)._model.activeDate = new Date(2019, JAN, 1).getTime();
      fixture.detectChanges();

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', RIGHT_ARROW); // 2019
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2020');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent).toBe('2020-2029');
    });

    it('should change .dl-abdtp-active element on left arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2016');
    });

    it('should change to previous decade when first .dl-abdtp-year is .dl-abdtp-active element and pressing on left arrow', () => {
      (component.picker as any)._model.activeDate = new Date(2010, JAN, 1).getTime();
      fixture.detectChanges();

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', LEFT_ARROW); // 2019
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2009');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent).toBe('2000-2009');
    });

    it('should change .dl-abdtp-active element on up arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2012');
    });

    it('should change to previous decade when first .dl-abdtp-year is .dl-abdtp-active element and pressing on up arrow', () => {
      (component.picker as any)._model.activeDate = new Date(2014, JAN, 1).getTime();
      fixture.detectChanges();

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', UP_ARROW); // 2019
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2009');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent).toBe('2000-2009');
    });

    it('should change .dl-abdtp-active element on down arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      activeElement.nativeElement.focus();

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2022');
    });

    it('should change .dl-abdtp-active element on page-up (fn+up-arrow)', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', PAGE_UP);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2007');
    });

    it('should change .dl-abdtp-active element on page-down (fn+down-arrow)', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', PAGE_DOWN);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2027');
    });

    it('should change .dl-abdtp-active element to first .dl-abdtp-year on HOME', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', HOME);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2010');
    });

    it('should change .dl-abdtp-active element to last .dl-abdtp-year on END', () => {
      fixture.debugElement.nativeElement.dispatchEvent(new Event('input'));

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2017');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', END);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2019');
    });
  });

  describe('year selector (minView=year)', () => {
    let component: YearSelectorComponent;
    let fixture: ComponentFixture<YearSelectorComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(YearSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should store the value and emit change event when clicking a .dl-abdtp-year', function () {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      const yearElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));
      yearElements[0].nativeElement.click();
      fixture.detectChanges();

      // Truncate the last digit from the current year to get the start of the decade
      const startDecade = (Math.trunc(moment().year() / 10) * 10);

      const expectedTime = new Date(startDecade, JAN, 1).getTime();
      expect(component.picker.value).toBe(expectedTime);
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.calls.first().args[0].value).toBe(expectedTime);
    });
  });
});
