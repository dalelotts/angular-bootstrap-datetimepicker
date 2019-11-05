import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DlDateTimeDateModule} from '../lib';
import {DlDateTimeInputModule} from '../lib';
import {DlDateTimePickerModule} from '../lib';

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
