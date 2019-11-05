/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {Component, DebugElement, ViewChild} from '@angular/core';
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
import {JAN} from '../month-constants';

@Component({

  template: '<dl-date-time-picker startView="minute"></dl-date-time-picker>'
})
class MinuteStartViewComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
}

@Component({
  template: '<dl-date-time-picker startView="minute" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class MinuteStartViewWithNgModelComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
  selectedDate = new Date(2018, JAN, 26, 15, 52, 26).getTime(); // 26 Jan 2018 15:53:27
}


describe('DlDateTimePickerComponent startView=minute', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeNumberModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        MinuteStartViewComponent,
        MinuteStartViewWithNgModelComponent,
      ]
    })
      .compileComponents();
  }));

  describe('default behavior ', () => {
    let component: MinuteStartViewComponent;
    let fixture: ComponentFixture<MinuteStartViewComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(MinuteStartViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should start with minute-view', () => {
      const minuteView = fixture.debugElement.query(By.css('.dl-abdtp-minute-view'));
      expect(minuteView).toBeTruthy();
    });

    it('should contain 0 .dl-abdtp-col-label elements', () => {
      const labelElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-col-label'));
      expect(labelElements.length).toBe(0);
    });

    it('should contain 12 .dl-abdtp-minute elements', () => {
      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements.length).toBe(12);
    });

    it('should contain 1 .dl-abdtp-now element for the current  minute', () => {
      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now'));
      expect(currentElements.length).toBe(1);

      const now = moment();
      const startDate = moment(now).startOf('hour');

      const step = 5;

      const minuteSteps = new Array(60 / step).fill(0).map((value, index) => index * step);
      const minuteValues = minuteSteps.map((minutesToAdd) => moment(startDate).add(minutesToAdd, 'minutes').valueOf());
      const currentMoment = moment(minuteValues.filter((value) => value < now.valueOf()).pop());

      expect(currentElements[0].nativeElement.textContent.trim()).toBe(currentMoment.format('LT'));
      expect(currentElements[0].nativeElement.classList).toContain(currentMoment.valueOf().toString());
    });

    it('should NOT contain an .dl-abdtp-now element in the previous hour', () => {
      // click on the left button to move to the previous hour
      debugElement.query(By.css('.dl-abdtp-left-button')).nativeElement.click();
      fixture.detectChanges();

      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now'));
      expect(currentElements.length).toBe(0);
    });

    it('should NOT contain an .dl-abdtp-now element in the next hour', () => {
      // click on the left button to move to the previous hour
      debugElement.query(By.css('.dl-abdtp-right-button')).nativeElement.click();
      fixture.detectChanges();

      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-now'));
      expect(currentElements.length).toBe(0);
    });

    it('should contain 1 [tabindex=1] element', () => {
      const tabIndexElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute[tabindex="0"]'));
      expect(tabIndexElements.length).toBe(1);
    });

    it('should contain 1 .dl-abdtp-active element for the current minute', () => {
      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-active'));
      expect(currentElements.length).toBe(1);

      const now = moment();
      const startDate = moment(now).startOf('hour');

      const step = 5;

      const minuteSteps = new Array(60 / step).fill(0).map((value, index) => index * step);
      const minuteValues = minuteSteps.map((minutesToAdd) => moment(startDate).add(minutesToAdd, 'minutes').valueOf());
      const currentMoment = moment(minuteValues.filter((value) => value < now.valueOf()).pop());

      expect(currentElements[0].nativeElement.textContent.trim()).toBe(currentMoment.format('LT'));
      expect(currentElements[0].nativeElement.classList).toContain(currentMoment.valueOf().toString());
    });

    it('should contain 1 .dl-abdtp-selected element for the current minute', () => {
      const currentElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-active'));
      expect(currentElements.length).toBe(1);

      const now = moment();
      const startDate = moment(now).startOf('hour');

      const step = 5;

      const minuteSteps = new Array(60 / step).fill(0).map((value, index) => index * step);
      const minuteValues = minuteSteps.map((minutesToAdd) => moment(startDate).add(minutesToAdd, 'minutes').valueOf());
      const currentMoment = moment(minuteValues.filter((value) => value < now.valueOf()).pop());

      component.picker.value = currentMoment.valueOf();
      fixture.detectChanges();

      expect(currentElements[0].nativeElement.textContent.trim()).toBe(currentMoment.format('LT'));
      expect(currentElements[0].nativeElement.classList).toContain(currentMoment.valueOf().toString());
    });
  });

  describe('ngModel=2018-01-26T15:53:27Z', () => {
    let component: MinuteStartViewWithNgModelComponent;
    let fixture: ComponentFixture<MinuteStartViewWithNgModelComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(MinuteStartViewWithNgModelComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should contain .dl-abdtp-view-label element with "2018"', () => {
      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018 3:00 PM');
    });

    it('should contain 12 .dl-abdtp-minute elements with start of minute utc time as class and role of gridcell', () => {
      const expectedClass = new Array(12)
        .fill(0)
        .map((value, index) => new Date(2018, JAN, 26, 15, 5 * index).getTime());

      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements.length).toBe(12);

      minuteElements.forEach((minuteElement, index) => {
        const key = expectedClass[index];
        const ariaLabel = moment(key).format('LLL');
        expect(minuteElement.nativeElement.classList).toContain(key.toString(10));
        expect(minuteElement.attributes['role']).toBe('gridcell', index);
        expect(minuteElement.attributes['aria-label']).toBe(ariaLabel, index);
      });
    });

    it('.dl-abdtp-left-button should contain a title', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      expect(leftButton.attributes['title']).toBe('Go to Jan 26, 2018 2:00 PM');
    });

    it('.dl-abdtp-left-button should contain aria-label', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      expect(leftButton.attributes['aria-label']).toBe('Go to Jan 26, 2018 2:00 PM');
    });

    it('should have a class for previous hour value on .dl-abdtp-left-button ', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      expect(leftButton.nativeElement.classList).toContain(new Date(2018, JAN, 26, 14).getTime().toString());
    });

    it('should switch to previous hour value after clicking .dl-abdtp-left-button', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      leftButton.nativeElement.click();
      fixture.detectChanges();

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018 2:00 PM');

      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements[0].nativeElement.textContent.trim()).toBe('2:00 PM');
      expect(minuteElements[0].nativeElement.classList).toContain(new Date(2018, JAN, 26, 14).getTime().toString());
    });

    it('.dl-abdtp-right-button should contain a title', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      expect(leftButton.attributes['title']).toBe('Go to Jan 26, 2018 4:00 PM');
    });

    it('.dl-abdtp-right-button should contain aria-label', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      expect(leftButton.attributes['aria-label']).toBe('Go to Jan 26, 2018 4:00 PM');
    });

    it('should have a class for next hour value on .dl-abdtp-right-button ', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      expect(leftButton.nativeElement.classList).toContain(new Date(2018, JAN, 26, 16).getTime().toString());
    });

    it('should switch to next hour value after clicking .dl-abdtp-right-button', () => {
      const rightButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      rightButton.nativeElement.click();
      fixture.detectChanges();

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018 4:00 PM');

      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      expect(minuteElements[0].nativeElement.textContent.trim()).toBe('4:00 PM');
      expect(minuteElements[0].nativeElement.classList).toContain(new Date(2018, JAN, 26, 16).getTime().toString());
    });

    it('.dl-abdtp-up-button should contain a title', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(leftButton.attributes['title']).toBe('Go to Jan 26, 2018');
    });

    it('.dl-abdtp-up-button should contain aria-label', () => {
      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(leftButton.attributes['aria-label']).toBe('Go to Jan 26, 2018');
    });

    it('should switch to hour view after clicking .dl-abdtp-up-button', () => {
      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      upButton.nativeElement.click();
      fixture.detectChanges();

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018');

      const hourView = fixture.debugElement.query(By.css('.dl-abdtp-hour-view'));
      expect(hourView).toBeTruthy();
    });

    it('should emit a change event when clicking .dl-abdtp-minute', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      minuteElements[0].nativeElement.click();
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalled();
    });

    it('should store value in ngModel when selecting .dl-abdtp-minute', () => {
      const minuteElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-minute'));
      minuteElements[6].nativeElement.click(); //  15:30
      fixture.detectChanges();

      expect(component.picker.value).toBe(new Date(2018, JAN, 26, 15, 30).getTime());
    });

    it('should have one .dl-abdtp-active element', () => {
      const activeElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-active'));
      expect(activeElements.length).toBe(1);
    });

    it('should change .dl-abdtp-active element on right arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('3:55 PM');
    });

    it('should change to next hour when last .dl-abdtp-minute is .dl-abdtp-active element and pressing on right arrow', () => {
      // DDL: setting the activeDate here does not work. I'm not sure why.
      component.picker.value = new Date(2018, JAN, 26, 15, 55).getTime();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement.textContent).toBe('3:55 PM');

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', RIGHT_ARROW); // 2018
      fixture.detectChanges();

      const newActive = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActive.nativeElement.textContent).toBe('4:00 PM');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018 4:00 PM');
    });

    it('should change .dl-abdtp-active element on left arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('3:45 PM');
    });

    it('should change to previous hour when first .dl-abdtp-minute is .dl-abdtp-active element and pressing on left arrow', () => {
      (component.picker as any)._model.activeDate = new Date(2018, JAN, 26, 15).getTime();
      fixture.detectChanges();

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', LEFT_ARROW); // 2019
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2:55 PM');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018 2:00 PM');
    });

    it('should change .dl-abdtp-active element on up arrow', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('3:30 PM');
    });

    it('should change to previous hour when first .dl-abdtp-minute is .dl-abdtp-active element and pressing on up arrow', () => {
      (component.picker as any)._model.activeDate = new Date(2018, JAN, 26, 15).getTime();
      fixture.detectChanges();

      dispatchKeyboardEvent(fixture.debugElement.query(By.css('.dl-abdtp-active')).nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('2:40 PM');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018 2:00 PM');
    });

    it('should change .dl-abdtp-active element on down arrow', () => {
      component.picker.value = new Date(2018, JAN, 26, 15, 30).getTime();
      fixture.detectChanges();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:30 PM');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('3:50 PM');
    });

    it('should change .dl-abdtp-active element on page-up (fn+up-arrow)', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', PAGE_UP);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('2:50 PM');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018 2:00 PM');
    });

    it('should change .dl-abdtp-active element on page-down (fn+down-arrow)', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', PAGE_DOWN);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('4:50 PM');

      const viewLabel = fixture.debugElement.query(By.css('.dl-abdtp-view-label'));
      expect(viewLabel.nativeElement.textContent.trim()).toBe('Jan 26, 2018 4:00 PM');
    });

    it('should change .dl-abdtp-active element to first .dl-abdtp-minute on HOME', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', HOME);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('3:00 PM');
    });

    it('should change .dl-abdtp-active element to last .dl-abdtp-minute on END', () => {
      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');

      activeElement.nativeElement.focus();
      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', END);
      fixture.detectChanges();

      const newActiveElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(newActiveElement.nativeElement.textContent).toBe('3:55 PM');
    });

    it('should do nothing when hitting non-supported key', () => {
      fixture.detectChanges();

      let activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', 'A');
      fixture.detectChanges();

      activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));
      expect(activeElement.nativeElement.textContent).toBe('3:50 PM');
    });

    it('should emit change event when hitting ENTER', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();

      const minuteView = fixture.debugElement.query(By.css('.dl-abdtp-minute-view'));
      expect(minuteView).toBeTruthy();
      expect(changeSpy).toHaveBeenCalled();
      expect(component.picker.value).toBe(new Date(2018, JAN, 26, 15, 50).getTime()); // 2018-01-26T15:50
    });

    it('should emit change event when hitting SPACE', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', SPACE);
      fixture.detectChanges();

      const minuteView = fixture.debugElement.query(By.css('.dl-abdtp-minute-view'));
      expect(minuteView).toBeTruthy();
      expect(changeSpy).toHaveBeenCalled();

      expect(component.picker.value).toBe(new Date(2018, JAN, 26, 15, 50).getTime()); // 2018-01-26T15:50
    });
  });
});
