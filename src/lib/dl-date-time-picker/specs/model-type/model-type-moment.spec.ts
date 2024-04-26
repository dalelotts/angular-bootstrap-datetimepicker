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
import {By} from '@angular/platform-browser';

import moment, {Moment} from 'moment';
import {DlDateTimeMomentModule, DlDateTimePickerComponent, DlDateTimePickerModule} from '../../../public-api';
import {expect, it} from '@jest/globals';

@Component({
  template: '<dl-date-time-picker minView="day"></dl-date-time-picker>'
})
class ModelTypeComponent {
  @ViewChild(DlDateTimePickerComponent, {static: false}) picker: DlDateTimePickerComponent<Moment>;
}

describe('DlDateTimePickerComponent modelType', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DlDateTimeMomentModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        ModelTypeComponent,
      ]
    }).compileComponents();
  });

  describe('moment Date', () => {
    let component: ModelTypeComponent;
    let fixture: ComponentFixture<ModelTypeComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ModelTypeComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
      });
    });

    it('should be Date type', () => {
      const nowElement = fixture.debugElement.query(By.css('.dl-abdtp-now'));
      nowElement.nativeElement.click();

      expect(component.picker.value).toEqual(expect.any(moment));
    });
  });
});
