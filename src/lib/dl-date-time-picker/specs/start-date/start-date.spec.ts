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
import {DlDateTimeNumberModule, DlDateTimePickerComponent, DlDateTimePickerModule} from '../../../public-api';
import {APR, MAY, OCT} from '../month-constants';
import * as _moment from 'moment';

/**
 * @internal
 */
let moment = _moment;
/* istanbul ignore if */
if ('default' in _moment) {
  moment = _moment['default'];
}

@Component({
  template: '<dl-date-time-picker [startDate]="startDate" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class StartDateComponent {
  @ViewChild(DlDateTimePickerComponent, { static: false }) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
  startDate = new Date(1985, OCT, 18).getTime();
}

@Component({
  template: '<dl-date-time-picker [startDate]="startDate" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class UndefinedStartDateComponent {
  @ViewChild(DlDateTimePickerComponent, { static: false }) picker: DlDateTimePickerComponent<number>;
  selectedDate: number; // intentionally did not assign value
  startDate: number;   // intentionally did not assign value
}

describe('DlDateTimePickerComponent startDate', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeNumberModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        StartDateComponent,
        UndefinedStartDateComponent,
      ]
    })
      .compileComponents();
  }));

  describe('year', () => {
    let component: StartDateComponent;
    let fixture: ComponentFixture<StartDateComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(StartDateComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
    }));

    it('should start on the startDate', () => {
      expect(debugElement.query(By.css('.dl-abdtp-view-label')).nativeElement.textContent.trim()).toBe('Oct 1985');
    });

    it('should change to the selected date after value is set', () => {
      component.picker.value = new Date(1995, APR, 18).getTime();
      fixture.detectChanges();
      expect(debugElement.query(By.css('.dl-abdtp-view-label')).nativeElement.textContent.trim()).toBe('Apr 1995');
    });
  });

  describe('undefined', () => {
    let component: UndefinedStartDateComponent;
    let fixture: ComponentFixture<UndefinedStartDateComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(UndefinedStartDateComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
    }));

    it('should start the current date', () => {
      expect(debugElement.query(By.css('.dl-abdtp-view-label')).nativeElement.textContent.trim()).toBe(moment().format('MMM YYYY'));
    });

    it('should change to the selected date after value is set', () => {
      component.picker.value = new Date(1966, MAY, 6).getTime();
      fixture.detectChanges();
      expect(debugElement.query(By.css('.dl-abdtp-view-label')).nativeElement.textContent.trim()).toBe('May 1966');
    });

  });
});
