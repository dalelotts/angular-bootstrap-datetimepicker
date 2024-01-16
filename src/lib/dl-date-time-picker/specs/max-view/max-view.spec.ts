/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {DlDateTimeNumberModule, DlDateTimePickerComponent, DlDateTimePickerModule} from '../../../public-api';

@Component({
  template: '<dl-date-time-picker maxView="year" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class YearMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker maxView="month" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class MonthMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker maxView="day" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class DayMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker maxView="hour" startView="hour" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class HourMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker maxView="minute"  startView="minute" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class MinuteMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker [maxView]="maxView" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class UndefinedMaxViewComponent {
  maxView: string;  // intentionally did not assign value
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

describe('DlDateTimePickerComponent maxView', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeNumberModule,
        DlDateTimePickerModule
      ],
      declarations: [
        YearMaxViewComponent,
        MonthMaxViewComponent,
        DayMaxViewComponent,
        HourMaxViewComponent,
        MinuteMaxViewComponent,
        UndefinedMaxViewComponent,
      ]
    }).compileComponents();
  });

  describe('year', () => {
    let fixture: ComponentFixture<YearMaxViewComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(YearMaxViewComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });

    it('should start with day-view', () => {
      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeTruthy();
    });

    it('should not have an .dl-abdtp-up-button', () => {
      fixture.debugElement.query(By.css('.dl-abdtp-up-button')).nativeElement.click();  // to go month-view
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.dl-abdtp-up-button')).nativeElement.click();  // go to year-view
      fixture.detectChanges();

      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(upButton).toBeFalsy();
    });
  });

  describe('month', () => {
    let fixture: ComponentFixture<MonthMaxViewComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(MonthMaxViewComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });

    it('should start with day-view', () => {
      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeTruthy();
    });

    it('should not have an .dl-abdtp-up-button', () => {
      fixture.debugElement.query(By.css('.dl-abdtp-up-button')).nativeElement.click();  // go to month-view
      fixture.detectChanges();
      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(upButton).toBeFalsy();
    });
  });

  describe('day', () => {
    let fixture: ComponentFixture<DayMaxViewComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(DayMaxViewComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });

    it('should start with day-view', () => {
      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeTruthy();
    });

    it('should not have an .dl-abdtp-up-button', () => {
      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(upButton).toBeFalsy();
    });
  });

  describe('hour', () => {
    let fixture: ComponentFixture<HourMaxViewComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(HourMaxViewComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });

    it('should start with hour-view', () => {
      const hourView = fixture.debugElement.query(By.css('.dl-abdtp-hour-view'));
      expect(hourView).toBeTruthy();
    });

    it('should not have an .dl-abdtp-up-button', () => {
      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(upButton).toBeFalsy();
    });
  });

  describe('minute', () => {
    let fixture: ComponentFixture<MinuteMaxViewComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(MinuteMaxViewComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });

    it('should start with minute-view', () => {
      const minuteView = fixture.debugElement.query(By.css('.dl-abdtp-minute-view'));
      expect(minuteView).toBeTruthy();
    });

    it('should not have an .dl-abdtp-up-button', () => {
      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(upButton).toBeFalsy();
    });
  });

  describe('undefined', () => {
    let fixture: ComponentFixture<UndefinedMaxViewComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(UndefinedMaxViewComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });

    it('should start with day-view', () => {
      const dayView = fixture.debugElement.query(By.css('.dl-abdtp-day-view'));
      expect(dayView).toBeTruthy();
    });

    it('should not have an .dl-abdtp-up-button', () => {
      fixture.debugElement.query(By.css('.dl-abdtp-up-button')).nativeElement.click();  // to go month-view
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.dl-abdtp-up-button')).nativeElement.click();  // go to year-view
      fixture.detectChanges();

      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(upButton).toBeFalsy();
    });
  });
});
