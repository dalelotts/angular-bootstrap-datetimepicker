import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DlDateTimeDateModule} from '../lib/core';
import {DlDateTimeInputModule} from '../lib/dl-date-time-input';
import {DlDateTimePickerModule} from '../lib/dl-date-time-picker';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    DlDateTimeInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
