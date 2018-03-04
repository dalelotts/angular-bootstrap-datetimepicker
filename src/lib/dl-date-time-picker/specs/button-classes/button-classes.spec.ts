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
import {DlDateTimePickerNumberModule} from '../../dl-date-time-picker.module';

@Component({
  template: '<dl-date-time-picker></dl-date-time-picker>'
})
class DefaultButtonClassComponent {
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
}

@Component({
  template: `
    <dl-date-time-picker
      [leftIconClass]="leftIconClass"
      [rightIconClass]="rightIconClass"
      [upIconClass]="upIconClass"
    ></dl-date-time-picker>`
})
class ConfigurableButtonClassComponent {
  leftIconClass: string | string[] | Set<string> | {};
  rightIconClass: string | string[] | Set<string> | {};
  upIconClass: string | string[] | Set<string> | {};
  @ViewChild(DlDateTimePickerComponent) picker: DlDateTimePickerComponent<number>;
}

describe('DlDateTimePickerComponent button-classes', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimePickerNumberModule
      ],
      declarations: [
        DefaultButtonClassComponent,
        ConfigurableButtonClassComponent,
      ],
    })
      .compileComponents();
  }));

  describe('default', () => {
    let component: DefaultButtonClassComponent;
    let fixture: ComponentFixture<DefaultButtonClassComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(DefaultButtonClassComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should have left button with open iconic chevron left', () => {
      const leftButton = fixture.debugElement.query(By.css('.left-icon'));
      expect(leftButton.nativeElement.classList).toContain('oi');
      expect(leftButton.nativeElement.classList).toContain('oi-chevron-left');
    });

    it('should have right button with open iconic chevron right', () => {
      const leftButton = fixture.debugElement.query(By.css('.right-icon'));
      expect(leftButton.nativeElement.classList).toContain('oi');
      expect(leftButton.nativeElement.classList).toContain('oi-chevron-right');
    });

    it('should have up button with open iconic chevron top', () => {
      const leftButton = fixture.debugElement.query(By.css('.up-icon'));
      expect(leftButton.nativeElement.classList).toContain('oi');
      expect(leftButton.nativeElement.classList).toContain('oi-chevron-top');
    });
  });

  describe('custom icons', () => {
    let component: ConfigurableButtonClassComponent;
    let fixture: ComponentFixture<ConfigurableButtonClassComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(ConfigurableButtonClassComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should omit left icon classes if undefined', () => {
      const leftButton = fixture.debugElement.query(By.css('.left-icon'));
      expect(leftButton.nativeElement.classList).not.toContain('octicon');
      expect(leftButton.nativeElement.classList).not.toContain('octicon-chevron-left');
    });

    it('should omit right icon classes if undefined', () => {
      const leftButton = fixture.debugElement.query(By.css('.right-icon'));
      expect(leftButton.nativeElement.classList).not.toContain('octicon');
      expect(leftButton.nativeElement.classList).not.toContain('octicon-chevron-right');
    });

    it('should omit up icon classes if undefined', () => {
      const leftButton = fixture.debugElement.query(By.css('.up-icon'));
      expect(leftButton.nativeElement.classList).not.toContain('octicon');
      expect(leftButton.nativeElement.classList).not.toContain('octicon-chevron-top');
    });

    it('should override left button icon class', () => {
      component.leftIconClass = ['octicon', 'octicon-chevron-left'];
      fixture.detectChanges();

      const leftButton = fixture.debugElement.query(By.css('.left-icon'));
      expect(leftButton.nativeElement.classList).toContain('octicon');
      expect(leftButton.nativeElement.classList).toContain('octicon-chevron-left');
    });

    it('should override right button class', () => {
      component.rightIconClass = ['octicon', 'octicon-chevron-right'];
      fixture.detectChanges();

      const leftButton = fixture.debugElement.query(By.css('.right-icon'));
      expect(leftButton.nativeElement.classList).toContain('octicon');
      expect(leftButton.nativeElement.classList).toContain('octicon-chevron-right');
    });

    it('should override up button class', () => {
      component.upIconClass = ['octicon', 'octicon-chevron-top'];
      fixture.detectChanges();

      const leftButton = fixture.debugElement.query(By.css('.up-icon'));
      expect(leftButton.nativeElement.classList).toContain('octicon');
      expect(leftButton.nativeElement.classList).toContain('octicon-chevron-top');
    });
  });
});
