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
import {By} from '@angular/platform-browser';
import {DlDateTimeStringModule} from '../../../core';
import {DlDateTimePickerComponent} from '../../dl-date-time-picker.component';
import {DlDateTimePickerModule} from '../../index';


@Component({
  template: '<dl-date-time-picker minView="day"></dl-date-time-picker>'
})
class ModelTypeComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<string>;
}

describe('DlDateTimePickerComponent modelType', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        DlDateTimeStringModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        ModelTypeComponent,
      ]
    })
      .compileComponents();
  }));

  describe('string formatted Date', () => {
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

    it('should be string type', () => {
      const nowElement = fixture.debugElement.query(By.css('.dl-abdtp-now'));
      nowElement.nativeElement.click();

      expect(component.picker.value).toEqual(jasmine.any(String));
    });
  });
});
