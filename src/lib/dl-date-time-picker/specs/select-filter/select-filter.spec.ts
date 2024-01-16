/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */

import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {DateButton, DlDateTimeNumberModule, DlDateTimePickerComponent, DlDateTimePickerModule} from '../../../public-api';

@Component({
  template: '<dl-date-time-picker [selectFilter]="selectFilter" [(ngModel)]="selectedDate" maxView="day"></dl-date-time-picker>'
})
class SelectFilterComponent {
  now = Date.now();
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectedDate: number;
  selectFilter = (dateButton: DateButton) => dateButton.value > this.now;
}

@Component({
  template: '<dl-date-time-picker [selectFilter]="selectFilter" [(ngModel)]="selectedDate"></dl-date-time-picker>'
})
class UndefinedSelectFilterComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<number>;
  selectFilter: (dateButton: DateButton, viewName: string) => boolean;   // intentionally did not assign value
  selectedDate: number; // intentionally did not assign value
}

describe('DlDateTimePickerComponent startDate', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeNumberModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        SelectFilterComponent,
        UndefinedSelectFilterComponent,
      ]
    }).compileComponents();
  });

  describe('year', () => {
    let component: SelectFilterComponent;
    let fixture: ComponentFixture<SelectFilterComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(SelectFilterComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
    });

    it('should disable .dl-abdtp-now element', () => {
      const nowElement = debugElement.query(By.css('.dl-abdtp-now'));
      expect(nowElement.nativeElement.classList).toContain('dl-abdtp-disabled');
      expect(nowElement.attributes['aria-disabled']).toBe('true');
    });

    it('should ignore click on disabled element', () => {
      const changeSpy = jasmine.createSpy('change listener');
      component.picker.change.subscribe(changeSpy);
      const disabledElement = debugElement.query(By.css('.dl-abdtp-disabled'));
      disabledElement.nativeElement.click();
      expect(component.picker.value).toBeUndefined();
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('undefined', () => {
    let fixture: ComponentFixture<UndefinedSelectFilterComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(UndefinedSelectFilterComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        debugElement = fixture.debugElement;
      });
    });

    it('should not disable any elements', () => {
      const dateButtons = debugElement.queryAll(By.css('.dl-abdtp-date-button'));
      dateButtons.forEach((dateButton) => {
        expect(dateButton.nativeElement.classList).not.toContain('disabled');
      });
    });
  });
});
