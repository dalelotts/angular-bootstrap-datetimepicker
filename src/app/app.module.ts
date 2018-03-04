import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {DlDateTimePickerDateModule} from '../lib/dl-date-time-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DlDateTimePickerDateModule,
    BrowserModule,
    FormsModule
  ],
  providers: [FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {
}
