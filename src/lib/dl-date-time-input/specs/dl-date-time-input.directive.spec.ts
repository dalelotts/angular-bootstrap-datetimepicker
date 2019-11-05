import {Component, DebugElement, ViewChild} from '@angular/core';
import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {FormsModule, NgForm} from '@angular/forms';
import {By} from '@angular/platform-browser';
import * as _moment from 'moment';
import {
  DL_DATE_TIME_DISPLAY_FORMAT_DEFAULT,
  DlDateTimeInputDirective,
  DlDateTimeInputModule,
  DlDateTimeNumberModule
} from '../../public-api';
import {OCT} from '../../dl-date-time-picker/specs/month-constants';

let moment = _moment;
if ('default' in _moment) {
  moment = _moment['default'];
}

@Component({
  template: `
      <form>
          <input id="dateInput" name="dateValue" type="text" dlDateTimeInput [dlDateTimeInputFilter]="dateTimeFilter"
                 [(ngModel)]="dateValue"/>
      </form>`
})
class DateModelComponent {
  dateValue: any;
  @ViewChild(DlDateTimeInputDirective) input: DlDateTimeInputDirective<number>;
  dateTimeFilter: (value: (number | null)) => boolean = () => true;
}

describe('DlDateTimeInputDirective', () => {

  beforeEach(async(() => {
    return TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeNumberModule,
        DlDateTimeInputModule
      ],
      declarations: [
        DateModelComponent,
      ]
    })
      .compileComponents();
  }));

  describe('numeric model', () => {
    let component: DateModelComponent;
    let fixture: ComponentFixture<DateModelComponent>;
    let debugElement: DebugElement;
    let nativeElement: any;

    beforeEach(async(() => {
      fixture = TestBed.createComponent(DateModelComponent);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = debugElement.nativeElement;
      });
    }));

    it('should be input as text and stored as a number', () => {
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      inputElement.value = '2018-10-01';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.dateValue).toEqual(moment('2018-10-01').valueOf());
    });

    it('should be displayed using default format', fakeAsync(() => {
      const octoberFirst = moment('2018-10-01');
      const expectedValue = octoberFirst.format(DL_DATE_TIME_DISPLAY_FORMAT_DEFAULT);
      component.dateValue = octoberFirst.toDate();
      fixture.detectChanges();
      flush();
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      expect(inputElement.value).toEqual(expectedValue);
    }));

    it('should remove model value when text value is empty string', fakeAsync(() => {
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      inputElement.value = '2018-10-01';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();


      inputElement.value = '';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.dateValue).toBeUndefined();
    }));

    it('should mark input touched on blur', () => {
      const inputElement = fixture.debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;

      expect(inputElement.classList).toContain('ng-untouched');

      inputElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();

      expect(inputElement.classList).toContain('ng-untouched');

      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(inputElement.classList).toContain('ng-touched');
    });

    it('should reformat the input value on blur', () => {
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;

      inputElement.value = '1/1/2001';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputElement.value).toBe('1/1/2001');

      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(inputElement.value).toBe(moment('2001-01-01').format(DL_DATE_TIME_DISPLAY_FORMAT_DEFAULT));
    });

    it('should not reformat invalid dates on blur', () => {
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;

      inputElement.value = 'very-valid-date';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      expect(inputElement.value).toBe('very-valid-date');
    });

    it('should consider empty input to be valid (for non-required inputs)', () => {
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;

      expect(inputElement.classList).toContain('ng-valid');
    });

    it('should add ng-invalid on invalid input', fakeAsync(() => {
      const novemberFirst = moment('2018-11-01');
      component.dateValue = novemberFirst.toDate();
      fixture.detectChanges();
      flush();

      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;

      expect(inputElement.classList).toContain('ng-valid');

      inputElement.value = 'very-valid-date';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputElement.classList).toContain('ng-invalid');

      const control = debugElement.children[0].injector.get(NgForm).control.get('dateValue');
      expect(control.hasError('dlDateTimeInputParse')).toBe(true);
      expect(control.errors.dlDateTimeInputParse.text).toBe('very-valid-date');
    }));

    it('should not error if dateTimeFilter is undefined', () => {
      component.dateTimeFilter = undefined;
      fixture.detectChanges();

      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      inputElement.value = '10/29/2018 05:00 PM';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputElement.classList).toContain('ng-valid');
    });

    it('should not error if dateTimeFilter is null', () => {
      component.dateTimeFilter = null;
      fixture.detectChanges();

      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      inputElement.value = '10/29/2018 05:00 PM';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputElement.classList).toContain('ng-valid');
    });

    it('should add ng-invalid for valid input of filtered date', () => {
      const filteredValue = moment('2018-10-29T17:00').valueOf();
      spyOn(component, 'dateTimeFilter').and.callFake((date: number) => {
        return date !== filteredValue;
      });

      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      inputElement.value = '10/29/2018 05:00 PM';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputElement.classList).toContain('ng-invalid');

      const control = debugElement.children[0].injector.get(NgForm).control.get('dateValue');
      expect(control.hasError('dlDateTimeInputFilter')).toBe(true);
      expect(control.errors.dlDateTimeInputFilter.value).toBe(filteredValue.valueOf());
    });

    it('should disable input when setDisabled is called', () => {
      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      expect(inputElement.disabled).toBe(false);
      component.input.setDisabledState(true);
      expect(inputElement.disabled).toBe(true);
    });

    it('should emit a change event when a valid value is entered.', function () {
      const changeSpy = jasmine.createSpy('change listener');
      component.input.dateChange.subscribe(changeSpy);

      const inputElement = debugElement.query(By.directive(DlDateTimeInputDirective)).nativeElement;
      inputElement.value = '2018-10-01';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      inputElement.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      inputElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      const expected = new Date(2018, OCT, 1).getTime();

      expect(changeSpy).toHaveBeenCalled();
      expect(changeSpy.calls.first().args[0].value).toBe(expected);
    });
  });
});
