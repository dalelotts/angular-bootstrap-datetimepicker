import { TestBed, async } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {DlDateTimeDateModule} from '../lib/core';
import {DlDateTimePickerModule} from '../lib/dl-date-time-picker';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DlDateTimeDateModule,
        DlDateTimePickerModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-bootstrap-datetimepicker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Dale Lotts\' angular bootstrap date & time picker');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Dale Lotts\' angular bootstrap date & time picker!');
  });
});
