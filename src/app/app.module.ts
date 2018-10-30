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
    DlDateTimeDateModule,
    DlDateTimeInputModule,
    DlDateTimePickerModule,
    BrowserModule,
    FormsModule
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {
}
