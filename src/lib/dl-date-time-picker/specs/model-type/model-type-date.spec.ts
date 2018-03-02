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
import {DlYearModelComponent} from '../../dl-year-model.component';
import {DlMinuteModelComponent} from '../../dl-minute-model.component';
import {DlMonthModelComponent} from '../../dl-month-model.component';
import {DlDayModelComponent} from '../../dl-day-model.component';
import {DlHourModelComponent} from '../../dl-hour-model.component';

@Component({
  template: '<dl-date-time-picker modelType="Date" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class ModelTypeComponent {
  selectedDate: Date;
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent;
}

@Component({
  template: '<dl-date-time-picker [modelType]="modelType" minView="day"></dl-date-time-picker>'
})
class UndefinedModelTypeComponent {
  modelType: string;  // intentionally did not assign value
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent;
}

describe('DlDateTimePickerComponent maxView', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        DlDateTimePickerComponent,
        ModelTypeComponent,
        UndefinedModelTypeComponent,
      ],
      providers: [
        DlYearModelComponent,
        DlMonthModelComponent,
        DlDayModelComponent,
        DlHourModelComponent,
        DlMinuteModelComponent
      ]
    })
      .compileComponents();
  }));

  describe('undefined', () => {
    let component: UndefinedModelTypeComponent;
    let fixture: ComponentFixture<UndefinedModelTypeComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(UndefinedModelTypeComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should be Number type', () => {
      const nowElement = fixture.debugElement.query(By.css('.dl-abdtp-now'));
      nowElement.nativeElement.click();

      expect(component.picker.value).toEqual(jasmine.any(Number));
    });
  });
});
