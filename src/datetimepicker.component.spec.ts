import { async, TestBed } from '@angular/core/testing';
import { KrcDateTimePickerModule } from './datetimepicker.module';
describe('DateTimePicker component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KrcDateTimePickerModule]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  it('It Works', () => {

  });
});
