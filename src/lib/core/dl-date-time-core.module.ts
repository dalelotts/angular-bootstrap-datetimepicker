import {NgModule} from '@angular/core';
import {DlDateAdapter} from './dl-date-adapter';
import {DlDateAdapterMoment} from './dl-date-adapter-moment';
import {DlDateAdapterNative} from './dl-date-adapter-native';
import {DlDateAdapterNumber} from './dl-date-adapter-number';
import {DlDateAdapterString} from './dl-date-adapter-string';
import {
  DL_DATE_TIME_DISPLAY_FORMAT,
  DL_DATE_TIME_DISPLAY_FORMAT_DEFAULT,
  DL_DATE_TIME_INPUT_FORMATS,
  DL_DATE_TIME_INPUT_FORMATS_DEFAULT,
  DL_DATE_TIME_MODEL_FORMAT,
  DL_DATE_TIME_MODEL_FORMAT_DEFAULT
} from './dl-date-time-string-format';

/**
 * Import this module to supply your own `DateAdapter` provider.
 * @internal
 **/
@NgModule({
  providers: [
    {provide: DL_DATE_TIME_DISPLAY_FORMAT, useValue: DL_DATE_TIME_DISPLAY_FORMAT_DEFAULT},
    {provide: DL_DATE_TIME_INPUT_FORMATS, useValue: DL_DATE_TIME_INPUT_FORMATS_DEFAULT},
    {provide: DL_DATE_TIME_MODEL_FORMAT, useValue: DL_DATE_TIME_MODEL_FORMAT_DEFAULT}
  ]
})
export class DlDateTimeCoreModule {
}

/**
 * Import this module to store `milliseconds` in the model.
 * @internal
 */
@NgModule({
  imports: [DlDateTimeCoreModule],
  providers: [
    {provide: DlDateAdapter, useClass: DlDateAdapterNumber}
  ],
  exports: [DlDateTimeCoreModule]
})
export class DlDateTimeNumberModule {
}

/**
 * Import this module to store a native JavaScript `Date` in the model.
 * @internal
 */
@NgModule({
  imports: [DlDateTimeCoreModule],
  providers: [
    {provide: DlDateAdapter, useClass: DlDateAdapterNative}
  ],
})
export class DlDateTimeDateModule {
}

/**
 * Import this module to store a `moment` in the model.
 * @internal
 */
@NgModule({
  imports: [DlDateTimeCoreModule],
  providers: [
    {provide: DlDateAdapter, useClass: DlDateAdapterMoment}
  ],
})
export class DlDateTimeMomentModule {
}

/**
 * Import this module to store a `string` in the model.
 * @internal
 */
@NgModule({
  imports: [DlDateTimeCoreModule],
  providers: [
    {provide: DL_DATE_TIME_INPUT_FORMATS, useValue: DL_DATE_TIME_INPUT_FORMATS_DEFAULT},
    {provide: DL_DATE_TIME_MODEL_FORMAT, useValue: DL_DATE_TIME_DISPLAY_FORMAT_DEFAULT},
    {provide: DlDateAdapter, useClass: DlDateAdapterString}
  ],
})
export class DlDateTimeStringModule {
}

