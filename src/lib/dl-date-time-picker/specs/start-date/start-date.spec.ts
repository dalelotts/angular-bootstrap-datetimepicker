/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {DlDateTimePickerComponent} from '../../dl-date-time-picker.component';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {APR, MAY, OCT} from '../month-constants';
import {DlDateTimePickerNumberModule} from '../../dl-date-time-picker.module';
import moment = require('moment');

@Component({
  template: '<dl-date-time-picker [startDate]="startDate" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class StartDateComponent {
  startDate = new Date(1985, OCT, 18).getTime();
  selectedDate: number;
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
}

@Component({
  template: '<dl-date-time-picker [startDate]="startDate" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class UndefinedStartDateComponent {
  startDate: number;   // intentionally did not assign value
  selectedDate: number; // intentionally did not assign value
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
}

describe('DlDateTimePickerComponent startDate', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimePickerNumberModule
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
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(StartDateComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
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
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(UndefinedStartDateComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
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
