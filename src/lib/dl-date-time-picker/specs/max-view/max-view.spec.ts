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
import {DlDateTimeNumberModule} from '../../../core';
import {DlDateTimePickerComponent} from '../../dl-date-time-picker.component';
import {DlDateTimePickerModule} from '../../dl-date-time-picker.module';

@Component({
  template: '<dl-date-time-picker maxView="year" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class YearMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker maxView="month" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class MonthMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker maxView="day" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class DayMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker maxView="hour" startView="hour" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class HourMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker maxView="minute"  startView="minute" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class MinuteMaxViewComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

@Component({
  template: '<dl-date-time-picker [maxView]="maxView" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class UndefinedMaxViewComponent {
  maxView: string;  // intentionally did not assign value
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
}

describe('DlDateTimePickerComponent maxView', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
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
    })
      .compileComponents();
  }));

  describe('year', () => {
    let component: YearMaxViewComponent;
    let fixture: ComponentFixture<YearMaxViewComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(YearMaxViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

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
    let component: MonthMaxViewComponent;
    let fixture: ComponentFixture<MonthMaxViewComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(MonthMaxViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

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
    let component: DayMaxViewComponent;
    let fixture: ComponentFixture<DayMaxViewComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(DayMaxViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

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
    let component: HourMaxViewComponent;
    let fixture: ComponentFixture<HourMaxViewComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(HourMaxViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

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
    let component: MinuteMaxViewComponent;
    let fixture: ComponentFixture<MinuteMaxViewComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(MinuteMaxViewComponent);
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

    it('should not have an .dl-abdtp-up-button', () => {
      const upButton = fixture.debugElement.query(By.css('.dl-abdtp-up-button'));
      expect(upButton).toBeFalsy();
    });
  });

  describe('undefined', () => {
    let component: UndefinedMaxViewComponent;
    let fixture: ComponentFixture<UndefinedMaxViewComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(UndefinedMaxViewComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

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
