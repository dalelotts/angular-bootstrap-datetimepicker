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
import {DlDateTimeNumberModule, DlDateTimePickerComponent, DlDateTimePickerModule} from '../../../public-api';
import {dispatchKeyboardEvent, ENTER, SPACE} from '../dispatch-events';
import {JAN} from '../month-constants';
import * as moment from 'moment';

@Component({
  template: '<dl-date-time-picker [(ngModel)]="selectedDate" startView="year" minView="year"></dl-date-time-picker>'
})
class YearSelectorComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
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
        YearSelectorComponent
      ]
    })
      .compileComponents();
  }));

  describe('startView=year', () => {
    let component: YearSelectorComponent;
    let fixture: ComponentFixture<YearSelectorComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(YearSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be touched when clicking .dl-abdtp-left-button', () => {
      // ng-untouched/ng-touched requires ngModel
      const pickerElement = fixture.debugElement.query(By.css('dl-date-time-picker')).nativeElement;
      expect(pickerElement.classList).toContain('ng-untouched');

      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-left-button'));
      leftButton.nativeElement.click();
      fixture.detectChanges();

      expect(pickerElement.classList).toContain('ng-touched');
    });

    it('should be touched when clicking .dl-abdtp-right-button', () => {
      // ng-untouched/ng-touched requires ngModel
      const pickerElement = fixture.debugElement.query(By.css('dl-date-time-picker')).nativeElement;
      expect(pickerElement.classList).toContain('ng-untouched');

      const leftButton = fixture.debugElement.query(By.css('.dl-abdtp-right-button'));
      leftButton.nativeElement.click();
      fixture.detectChanges();

      expect(pickerElement.classList).toContain('ng-touched');
    });

    it('should be touched when clicking .dl-abdtp-year', () => {
      // ng-untouched/ng-touched requires ngModel
      const pickerElement = fixture.debugElement.query(By.css('dl-date-time-picker')).nativeElement;
      expect(pickerElement.classList).toContain('ng-untouched');

      const yearElement = fixture.debugElement.query(By.css('.dl-abdtp-year'));
      yearElement.nativeElement.click();
      fixture.detectChanges();

      expect(pickerElement.classList).toContain('ng-touched');
    });

    it('should be dirty when clicking .dl-abdtp-year', () => {
      const pickerElement = fixture.debugElement.query(By.css('dl-date-time-picker')).nativeElement;
      expect(pickerElement.classList).toContain('ng-untouched');
      expect(pickerElement.classList).toContain('ng-pristine');

      const yearElement = fixture.debugElement.query(By.css('.dl-abdtp-year'));
      yearElement.nativeElement.click();
      fixture.detectChanges();

      expect(pickerElement.classList).toContain('ng-touched');
      expect(pickerElement.classList).toContain('ng-dirty');
    });

    it('should store the value in ngModel when clicking a .dl-abdtp-year', () => {
      const startYear = (Math.trunc(moment().year() / 10) * 10);
      const yearElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));
      yearElements[9].nativeElement.click(); // 2019-01-01
      fixture.detectChanges();

      expect(component.selectedDate).toBe(new Date(startYear + 9, JAN, 1).getTime());
    });

    it('should store the value internally when clicking a .dl-abdtp-year', function () {
      const startYear = (Math.trunc(moment().year() / 10) * 10);
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      const yearElements = fixture.debugElement.queryAll(By.css('.dl-abdtp-year'));
      yearElements[8].nativeElement.click();  // 2018-01-01
      fixture.detectChanges();

      const expected = new Date(startYear + 8, JAN, 1).getTime();
      expect(component.picker.value).toBe(expected);
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.calls.first().args[0].value).toBe(expected);
    });

    it('should store the value in ngModel when hitting ENTER', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      expect(component.picker.value).toBeNull();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();

      expect(component.picker.value).not.toBeNull();
      expect(component.picker.value).not.toBeUndefined();
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.calls.first().args[0].value).toBe(component.picker.value);
      expect(component.selectedDate).toBe(component.picker.value);
    });

    it('should store the value in ngModel when hitting SPACE', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      expect(component.picker.value).toBeNull();

      const activeElement = fixture.debugElement.query(By.css('.dl-abdtp-active'));

      dispatchKeyboardEvent(activeElement.nativeElement, 'keydown', SPACE);
      fixture.detectChanges();

      expect(component.picker.value).not.toBeNull();
      expect(component.picker.value).not.toBeUndefined();
      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.calls.first().args[0].value).toBe(component.picker.value);
      expect(component.selectedDate).toBe(component.picker.value);
    });

    it('should not emit change event if value does not change', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);

      component.picker.value = 1293840000000;
      fixture.detectChanges();

      component.picker.value = 1293840000000;
      fixture.detectChanges();

      expect(component.picker.value).toBe(1293840000000);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.calls.first().args[0].value).toBe(1293840000000);
      expect(component.selectedDate).toBe(1293840000000);
    });
  });
  // ng-pristine, ng-touched - when should these change?
});
