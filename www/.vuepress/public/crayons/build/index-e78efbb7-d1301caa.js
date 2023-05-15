import { f as formatDistance } from './index-f5fe0470-a83f394e.js';
import { f as formatRelative, l as localize, m as match } from './index-3a85bc08-78fc322b.js';
import { f as formatLong } from './index-2847d9a8-33e85dd6.js';
import './index-dc611d24-9b65abdc.js';

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (Ireland).
 * @language English
 * @iso-639-2 eng
 * @author Tetiana [@tan75]{@link https://github.com/tan75}
 */

var locale = {
  code: 'en-IE',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

export default locale;
