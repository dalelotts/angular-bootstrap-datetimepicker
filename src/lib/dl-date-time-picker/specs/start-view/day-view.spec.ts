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
import {DEC, FEB, JAN, NOV} from '../month-constants';

@Component({
  template: '<dl-date-time-picker></dl-date-time-picker>'
})
class DayStartViewComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
}

@Component({
  template: '<dl-date-time-picker [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class DayStartViewWithNgModelComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate = new Date(2018, JAN, 11).getTime();
}

@Component({
  template: '<dl-date-time-picker [startView]="startView"></dl-date-time-picker>'
})
class UndefinedStartViewComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  startView: string;  // intentionally did not assign value
}

describe('DlDateTimePickerComponent startView=day', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeNumberModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        DayStartViewComponent,
        DayStartViewWithNgModelComponent,
        UndefinedStartViewComponent
      ]
    })
      .compileComponents();
  }));

  describe('default behavior ', () => {
    let component: DayStartViewComponent;
    let fixture: ComponentFixture<DayStartViewComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(DayStartViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
      });
    }));

    it('should start with day-view', () => {
      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeTruthy();
    });

    it('should contain 7 .dl-abdtp-col-label elements', () => {
      const dayLabelElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-col-label'));
      expect(dayLabelElements.length).toBe(7);
      dayLabelElements.forEach((dayLabelElement, index) => {
        expect(dayLabelElement.nativeElement.textContent).toBe(moment().weekday(index).format('dd'));
      });
    });

    it('should contain 42 .dl-abdtp-day elements', () => {
      const dayElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-day'));
      expect(dayElements.length).toBe(42);
    });

    it('should contain 1 .dl-abdtp-now element for the current day', () => {
      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now'));
      expect(currentElements.length).toBe(1);
      expect(currentElements[0].nativeElement.textContent.trim()).toBe(moment().format('D'));
      expect(currentElements[0].attributes['dl-abdtp-value']).toBe(moment().startOf('day').valueOf().toString());
    });

    it('should NOT contain an .dl-abdtp-now element in the previous month', () => {
      // click on the left button to move to the previous hour
      fixture.debugElement.query(By.css('.dl-abdtp-left-button')).nativeElement.click();
      fixture.detectChanges();

      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now:not(.dl-abdtp-future):not(.dl-abdtp-past)'));
      expect(currentElements.length).toBe(0);
    });

    it('should NOT contain an .dl-abdtp-now element in the next month', () => {
      // click on the left button to move to the previous hour
      fixture.debugElement.query(By.css('.dl-abdtp-right-button')).nativeElement.click();
      fixture.detectChanges();

      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now:not(.dl-abdtp-future):not(.dl-abdtp-past)'));
      expect(currentElements.length).toBe(0);
    });

    it('should contain 1 .dl-abdtp-active element for the current day', () => {
      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-active'));
      expect(currentElements.length).toBe(1);
      expect(currentElements[0].nativeElement.textContent.trim()).toBe(moment().format('D'));
      expect(currentElements[0].attributes['dl-abdtp-value']).toBe(moment().startOf('day').valueOf().toString());
    });

    it('should contain 1 [tabindex=1] element', () => {
      const tabIndexElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-day[tabindex="0"]'));
      expect(tabIndexElements.length).toBe(1);
    });

    it('should contain 1 .dl-abdtp-selected element for the current value', () => {
      component.picker.value = moment().startOf('day').valueOf();
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
      expect(selectedElements[0].nativeElement.textContent.trim()).toBe(moment().format('D'));
      expect(selectedElements[0].attributes['dl-abdtp-value']).toBe(moment().startOf('day').valueOf().toString());
    });
  });

  describe('undefined start view', () => {
    let fixture: ComponentFixture<UndefinedStartViewComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(UndefinedStartViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    }));

    it('should start with day-view', () => {
      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeTruthy();
    });
  });

  describe('ngModel=2018-01-11', () => {
    let component: DayStartViewWithNgModelComponent;
    let fixture: ComponentFixture<DayStartViewWithNgModelComponent>;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(DayStartViewWithNgModelComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
      });
    }));

    it('should contain .dl-abdtp-view-label element with "2018"', () => {
      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 2018');
    });

    it('should contain 1 .dl-abdtp-past element for Dec 31', () => {
      const pastElement = fixture.debugElement.query(By.css('.dl-abdtp-past'));
      expect(pastElement.nativeElement.textContent.trim()).toBe('31');
    });

    it('should contain 10 .dl-abdtp-future elements for February', () => {
      const futureElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-future'));
      expect(futureElements.length).toBe(10);
      expect(futureElements[0].nativeElement.textContent.trim()).toBe('1');
      expect(futureElements[9].nativeElement.textContent.trim()).toBe('10');
    });

    it('should contain 42 .dl-abdtp-day elements with start of day utc time as class and role of gridcell', () => {

      const startMoment = moment(new Date(2017, DEC, 31));
      const expectedValues = new Array(42)
        .fill(0)
        .map((zero, index) => moment(startMoment).add(zero + index, 'days').valueOf());

      const dayElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-day'));
      expect(dayElements.length).toBe(42);

      dayElements.forEach((dayElement, index) => {
        const expectedValue = expectedValues[index];
        const ariaLabel = moment(expectedValue).format('ll');
        expect(dayElement.attributes['dl-abdtp-value']).toBe(expectedValue.toString(10), index);
        expect(dayElement.attributes['role']).toBe('gridcell', index);
        expect(dayElement.attributes['aria-label']).toBe(ariaLabel, index);
      });
    });

    it('.dl-abdtp-left-button should contain a title', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      expect(leftButton.attributes['title']).toBe('Go to Dec 2017');
    });

    it('.dl-abdtp-left-button should contain aria-label', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      expect(leftButton.attributes['aria-label']).toBe('Go to Dec 2017');
    });

    it('should have a dl-abdtp-value for previous month on .dl-abdtp-left-button ', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      expect(leftButton.attributes['dl-abdtp-value']).toBe(new Date(2017, DEC, 1).getTime().toString());
    });

    it('should switch to previous month value after clicking .dl-abdtp-left-button', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      leftButton.nativeElement.click();
      fixture.detectChanges();

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Dec 2017');

      const dayElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-day'));
      expect(dayElements[0].nativeElement.textContent.trim()).toBe('26');
      expect(dayElements[0].attributes['dl-abdtp-value']).toBe(new Date(2017, NOV, 26).getTime().toString());
    });

    it('.dl-abdtp-right-button should contain a title', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      expect(leftButton.attributes['title']).toBe('Go to Feb 2018');
    });

    it('.dl-abdtp-right-button should contain aria-label', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      expect(leftButton.attributes['aria-label']).toBe('Go to Feb 2018');
    });

    it('should have a dl-abdtp-value for next month on .dl-abdtp-right-button ', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      expect(leftButton.attributes['dl-abdtp-value']).toBe(new Date(2018, FEB, 1).getTime().toString());
    });

    it('should switch to next month value after clicking .dl-abdtp-right-button', () => {
      const rightButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      rightButton.nativeElement.click();
      fixture.detectChanges();

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Feb 2018');

      const dayElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-day'));
      expect(dayElements[0].nativeElement.textContent.trim()).toBe('28');
      expect(dayElements[0].attributes['dl-abdtp-value']).toBe(new Date(2018, JAN, 28).getTime().toString());
    });

    it('.dl-abdtp-up-button should contain a title', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(leftButton.attributes['title']).toBe('Go to month view');
    });

    it('.dl-abdtp-up-button should contain aria-label', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(leftButton.attributes['aria-label']).toBe('Go to month view');
    });

    it('should switch to month view after clicking .dl-abdtp-up-button', () => {
      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      upButton.nativeElement.click();
      fixture.detectChanges();

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('2018');

      const monthView = fixture.debugElement.query(By.css('.dl-abdtp-month-view'));
      expect(monthView).toBeTruthy();
    });

    it('should not emit a change event when clicking .dl-abdtp-day', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      const dayElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-day'));
      dayElements[0].nativeElement.click();
      fixture.detectChanges();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should change to .dl-abdtp-hour-view when selecting .dl-abdtp-day', () => {
      const dayElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-day'));
      dayElements[0].nativeElement.click(); // 2009
      fixture.detectChanges();

      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeFalsy();

      const hourView = fixture.debugElement.query(By.css('.dl-abdtp-hour-view'));
      expect(hourView).toBeTruthy();
    });

    it('should have one .dl-abdtp-active element', () => {
      const activeElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-active'));
      expect(activeElements.length).toBe(1);
    });

    it('should change .dl-abdtp-active element on right arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('12');
    });

    it('should change to next month when last .dl-abdtp-day is .dl-abdtp-active element and pressing on right arrow', () => {
      (component.picker as any)._model.activeDate = new Date(2018, JAN, 31).getTime();
      fixture.detectChanges();

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', RIGHT_ARROW); // 2018
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('1');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Feb 2018');
    });

    it('should change .dl-abdtp-active element on left arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('10');
    });

    it('should change to previous month when first .dl-abdtp-day is .dl-abdtp-active element and pressing on left arrow', () => {
      (component.picker as any)._model.activeDate = new Date(2018, JAN, 1).getTime();
      fixture.detectChanges();

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', LEFT_ARROW); // 2019
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('31');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Dec 2017');
    });

    it('should change .dl-abdtp-active element on up arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('4');
    });

    it('should change to previous month when first .dl-abdtp-day is .dl-abdtp-active element and pressing on up arrow', () => {
      (component.picker as any)._model.activeDate = new Date(2018, JAN, 1).getTime();
      fixture.detectChanges();

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', UP_ARROW); // 2019
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('25');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Dec 2017');
    });

    it('should change .dl-abdtp-active element on down arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('18');
    });

    it('should change .dl-abdtp-active element on page-up (fn+up-arrow)', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', PAGE_UP);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('11');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Dec 2017');
    });

    it('should change .dl-abdtp-active element on page-down (fn+down-arrow)', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', PAGE_DOWN);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('11');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Feb 2018');
    });

    it('should change .dl-abdtp-active element to first .dl-abdtp-day on HOME', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', HOME);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('1');
    });

    it('should change .dl-abdtp-active element to last .dl-abdtp-day on END', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', END);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('31');
    });

    it('should do nothing when hitting non-supported key', () => {
      fixture.detectChanges();

      let activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', 'A'); // A
      fixture.detectChanges();

      activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('11');
    });

    it('should change to .dl-abdtp-hour-view when hitting ENTER', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();

      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeFalsy();

      const hourView = fixture.debugElement.query(By.css('.dl-abdtp-hour-view'));
      expect(hourView).toBeTruthy();
    });

    it('should change to .dl-abdtp-hour-view when hitting SPACE', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', SPACE);
      fixture.detectChanges();

      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeFalsy();

      const hourView = fixture.debugElement.query(By.css('.dl-abdtp-hour-view'));
      expect(hourView).toBeTruthy();
    });
  });
});
