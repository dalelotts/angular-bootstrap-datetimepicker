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
import * as _moment from 'moment';
import {DlDateTimeInputDirective, DlDateTimeInputModule, DlDateTimeMomentModule} from '../../../public-api';

let moment = _moment;
if ('default' in _moment) {
  moment = _moment['default'];
}

@Component({
  template: `<input id="dateInput"
                    name="dateValue"
                    type="text"
                    dlDateTimeInput
                    [dlDateTimeInputFilter]="dateTimeFilter"
                    [(ngModel)]="dateValue"/> `
})
class ModelTypeComponent {
  @ViewChild(DlDateTimeInputDirective, {static: false}) input: DlDateTimeInputDirective<number>;
}

describe('DlDateTimeInputDirective modelType', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeMomentModule,
        DlDateTimeInputModule,
      ],
      declarations: [
        ModelTypeComponent,
      ]
    })
      .compileComponents();
  }));

  describe('moment', () => {
    let component: ModelTypeComponent;
    let fixture: ComponentFixture<ModelTypeComponent>;
    let debugElement: DebugElement;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ModelTypeComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
    }));

    it('should be moment type', () => {
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      inputElement.value = '2003-10-01';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.input.value).toEqual(jasmine.any(moment));
    });
  });
});
