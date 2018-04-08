import {DlDateAdapterString} from '../../dl-date-adapter-string';
import {DlDateAdapter} from '../../dl-date-adapter';

import * as _moment from 'moment';
import {Moment} from 'moment';

/**
 * Work around for moment namespace conflict when used with webpack and rollup.
 * See https://github.com/dherges/ng-packagr/issues/163
 *
 * Depending on whether rollup is used, moment needs to be imported differently.
 * Since Moment.js doesn't have a default export, we normally need to import using
 * the `* as`syntax.
 *
 * rollup creates a synthetic default module and we thus need to import it using
 * the `default as` syntax.
 *
 * @internal
 *
 **/
const moment = _moment;

/**
 * @license
 * Copyright 2013-present Dale Lotts All Rights Reserved.
 * http://www.dalelotts.com
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/dalelotts/angular-bootstrap-datetimepicker/blob/master/LICENSE
 */



describe('DlDateAdapterString', () => {

  describe('default configuration', () => {
    let dateAdapter: DlDateAdapterString;
    let testMoment: Moment;
    beforeEach(() => {
      testMoment = moment(1523077200000);
      dateAdapter = new DlDateAdapterString([
          moment.localeData().longDateFormat('lll'),
          'YYYY-MM-DDTHH:mm',
          'YYYY-MM-DDTHH:mm:ss',
          'YYYY-MM-DDTHH:mm:ss.SSS',
          'YYYY-MM-DD',
          'YYYY-MM-DDTHH:mm:ss.SSS[Z]' // ISO_8601
        ],
        moment.localeData().longDateFormat('lll')
      );
    });

    describe('fromMilliseconds', () => {
      it('should return "lll" moment format', () => {
        expect(dateAdapter.fromMilliseconds(1523077200000)).toEqual(testMoment.format('lll'));
      });
    });

    describe('toMilliseconds', () => {
      it('should accept "lll" moment format', () => {
        expect(dateAdapter.toMilliseconds(testMoment.format('lll'))).toEqual(1523077200000);
      });
      it('should return undefined for invalid date value', () => {
        expect(dateAdapter.toMilliseconds('Aor 7, 2018 12:00 AM')).toBeUndefined();
      });
    });
  });
});
