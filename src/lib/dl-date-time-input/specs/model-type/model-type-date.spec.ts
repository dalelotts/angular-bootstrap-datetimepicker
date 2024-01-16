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
import {DlDateTimeDateModule, DlDateTimeInputDirective, DlDateTimeInputModule} from '../../../public-api';

@Component({
  template: `<input id="dateInput"
                    name="dateValue"
                    type="text"
                    dlDateTimeInput
                    [dlDateTimeInputFilter]="dateTimeFilter"
                    [(ngModel)]="dateValue"/>`
})
class ModelTypeComponent {
  @ViewChild(DlDateTimeInputDirective, {static: false}) input: DlDateTimeInputDirective<number>;
}

describe('DlDateTimeInputDirective modelType', () => {

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeDateModule,
        DlDateTimeInputModule,
      ],
      declarations: [
        ModelTypeComponent,
      ]
    }).compileComponents();
  });

  describe('Date', () => {
    let component: ModelTypeComponent;
    let fixture: ComponentFixture<ModelTypeComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ModelTypeComponent);
      fixture.detectChanges();
      await fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
      });
    });

    it('should be Date type', () => {
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      inputElement.value = '2004-10-01';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.input.value).toEqual(jasmine.any(Date));
    });
  });
});
