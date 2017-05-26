import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KrcDateTimePickerModule } from '../src';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, KrcDateTimePickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
