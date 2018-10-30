import {InjectionToken} from '@angular/core';

import * as _moment from 'moment';

/**
 * @internal
 */
let moment = _moment;
/* istanbul ignore if */
if ('default' in _moment) {
  moment = _moment['default'];
}

/**
 * InjectionToken for string dates that can be used to override default model format.
 **/
export const DL_DATE_TIME_DISPLAY_FORMAT = new InjectionToken<string>('DL_DATE_TIME_DISPLAY_FORMAT');

/**
 * `Moment`'s long date format `lll` used as the default output format
 * for string date's
 */
export const DL_DATE_TIME_DISPLAY_FORMAT_DEFAULT = moment.localeData().longDateFormat('lll');

/**
 * InjectionToken for string dates that can be used to override default input formats.
 **/
export const DL_DATE_TIME_INPUT_FORMATS = new InjectionToken<string[]>('DL_DATE__TIME_INPUT_FORMATS');

/**
 *  Default input format's used by `DlDateAdapterString`
 */
export const DL_DATE_TIME_INPUT_FORMATS_DEFAULT = [
  'YYYY-MM-DDTHH:mm',
  'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHH:mm:ss.SSS',
  'YYYY-MM-DD',
  'M/D/YYYY h:m:s A',
  'M/D/YYYY h:m A',
  'M/D/YYYY h:m A',
  'M/D/YYYY',
  'M/D/YY h:m:s A',
  'M/D/YY h:m A',
  'M/D/YY h A',
  'M/D/YY',
  DL_DATE_TIME_DISPLAY_FORMAT_DEFAULT,
  moment.ISO_8601,
];

/**
 * InjectionToken for string dates that can be used to override default model format.
 **/
export const DL_DATE_TIME_MODEL_FORMAT = new InjectionToken<string>('DL_DATE_TIME_MODEL_FORMAT');

/**
 *  Default model format (ISO 8601)`
 */
export const DL_DATE_TIME_MODEL_FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
