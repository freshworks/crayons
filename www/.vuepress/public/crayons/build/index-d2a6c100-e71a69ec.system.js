System.register(["./_rollupPluginBabelHelpers-ef57da83-3e4652f5.system.js"],(function(e){"use strict";var t;return{setters:[function(e){t=e._}],execute:function(){e({i:o,t:n});function r(e,t){if(t.length<e){throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}}function n(e){r(1,arguments);var n=Object.prototype.toString.call(e);if(e instanceof Date||t(e)==="object"&&n==="[object Date]"){return new Date(e.getTime())}else if(typeof e==="number"||n==="[object Number]"){return new Date(e)}else{if((typeof e==="string"||n==="[object String]")&&typeof console!=="undefined"){console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");console.warn((new Error).stack)}return new Date(NaN)}}function a(e){if(e===null||e===true||e===false){return NaN}var t=Number(e);if(isNaN(t)){return t}return t<0?Math.ceil(t):Math.floor(t)}function s(e,t){r(1,arguments);var s=t||{};var o=s.locale;var i=o&&o.options&&o.options.weekStartsOn;var u=i==null?0:a(i);var l=s.weekStartsOn==null?u:a(s.weekStartsOn);if(!(l>=0&&l<=6)){throw new RangeError("weekStartsOn must be between 0 and 6 inclusively")}var c=n(e);var f=c.getUTCDay();var g=(f<l?7:0)+f-l;c.setUTCDate(c.getUTCDate()-g);c.setUTCHours(0,0,0,0);return c}function o(e,t,n){r(2,arguments);var a=s(e,n);var o=s(t,n);return a.getTime()===o.getTime()}}}}));