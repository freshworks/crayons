import { f as formatDistance } from './index-f5fe0470-a83f394e.js';
import { f as formatRelative, l as localize, m as match } from './index-3a85bc08-78fc322b.js';
import { f as formatLong } from './index-2847d9a8-33e85dd6.js';
import './index-dc611d24-9b65abdc.js';

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United Kingdom).
 * @language English
 * @iso-639-2 eng
 * @author Alex [@glintik]{@link https://github.com/glintik}
 */

var locale = {
  code: 'en-GB',
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
