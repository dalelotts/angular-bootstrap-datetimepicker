import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {DlDateTimePickerModule} from '../lib/dl-date-time-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DlDateTimePickerModule,
    BrowserModule,
    FormsModule
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent],
  exports: [DlDateTimePickerModule]
})
export class AppModule {
}
