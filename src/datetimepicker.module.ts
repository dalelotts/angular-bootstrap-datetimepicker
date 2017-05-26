import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateTimePickerComponent } from './datetimepicker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateTimePickerComponent,
  ],
  exports: [
    DateTimePickerComponent,
  ]
})
export class KrcDateTimePickerModule {
}
