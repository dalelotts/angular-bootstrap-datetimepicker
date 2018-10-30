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
import {DlDateTimeDateModule} from '../../../core';
import {DlDateTimePickerComponent} from '../../dl-date-time-picker.component';
import {DlDateTimePickerModule} from '../../dl-date-time-picker.module';

@Component({
  template: '<dl-date-time-picker minView="day"></dl-date-time-picker>'
})
class ModelTypeComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<Date>;
}

describe('DlDateTimePickerComponent modelType', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeDateModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        ModelTypeComponent,
      ]
    })
      .compileComponents();
  }));

  describe('native Date', () => {
    let component: ModelTypeComponent;
    let fixture: ComponentFixture<ModelTypeComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ModelTypeComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should be Date type', () => {
      const nowElement = fixture.debugElement.query(By.css('.dl-abdtp-now'));
      nowElement.nativeElement.click();

      expect(component.picker.value).toEqual(jasmine.any(Date));
    });
  });
});
