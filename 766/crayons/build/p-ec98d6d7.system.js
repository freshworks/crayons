System.register(["./p-6fb516eb.system.js","./p-60d4b4d4.system.js","./p-287d763c.system.js"],(function(i){"use strict";var e,n,t,a,r;return{setters:[function(i){e=i.b;n=i.a;t=i.c;a=i.d},function(i){r=i.i},function(){}],execute:function(){function u(i,e){if(i.one!==undefined&&e===1){return i.one}var n=e%10;var t=e%100;if(n===1&&t!==11){return i.singularNominative.replace("{{count}}",e)}else if(n>=2&&n<=4&&(t<10||t>20)){return i.singularGenitive.replace("{{count}}",e)}else{return i.pluralGenitive.replace("{{count}}",e)}}function o(i){return function(e,n){if(n.addSuffix){if(n.comparison>0){if(i.future){return u(i.future,e)}else{return"за "+u(i.regular,e)}}else{if(i.past){return u(i.past,e)}else{return u(i.regular,e)+" тому"}}}else{return u(i.regular,e)}}}var l={lessThanXSeconds:o({regular:{one:"менше секунди",singularNominative:"менше {{count}} секунди",singularGenitive:"менше {{count}} секунд",pluralGenitive:"менше {{count}} секунд"},future:{one:"менше, ніж за секунду",singularNominative:"менше, ніж за {{count}} секунду",singularGenitive:"менше, ніж за {{count}} секунди",pluralGenitive:"менше, ніж за {{count}} секунд"}}),xSeconds:o({regular:{singularNominative:"{{count}} секунда",singularGenitive:"{{count}} секунди",pluralGenitive:"{{count}} секунд"},past:{singularNominative:"{{count}} секунду тому",singularGenitive:"{{count}} секунди тому",pluralGenitive:"{{count}} секунд тому"},future:{singularNominative:"за {{count}} секунду",singularGenitive:"за {{count}} секунди",pluralGenitive:"за {{count}} секунд"}}),halfAMinute:function i(e,n){if(n.addSuffix){if(n.comparison>0){return"за півхвилини"}else{return"півхвилини тому"}}return"півхвилини"},lessThanXMinutes:o({regular:{one:"менше хвилини",singularNominative:"менше {{count}} хвилини",singularGenitive:"менше {{count}} хвилин",pluralGenitive:"менше {{count}} хвилин"},future:{one:"менше, ніж за хвилину",singularNominative:"менше, ніж за {{count}} хвилину",singularGenitive:"менше, ніж за {{count}} хвилини",pluralGenitive:"менше, ніж за {{count}} хвилин"}}),xMinutes:o({regular:{singularNominative:"{{count}} хвилина",singularGenitive:"{{count}} хвилини",pluralGenitive:"{{count}} хвилин"},past:{singularNominative:"{{count}} хвилину тому",singularGenitive:"{{count}} хвилини тому",pluralGenitive:"{{count}} хвилин тому"},future:{singularNominative:"за {{count}} хвилину",singularGenitive:"за {{count}} хвилини",pluralGenitive:"за {{count}} хвилин"}}),aboutXHours:o({regular:{singularNominative:"близько {{count}} години",singularGenitive:"близько {{count}} годин",pluralGenitive:"близько {{count}} годин"},future:{singularNominative:"приблизно за {{count}} годину",singularGenitive:"приблизно за {{count}} години",pluralGenitive:"приблизно за {{count}} годин"}}),xHours:o({regular:{singularNominative:"{{count}} годину",singularGenitive:"{{count}} години",pluralGenitive:"{{count}} годин"}}),xDays:o({regular:{singularNominative:"{{count}} день",singularGenitive:"{{count}} дня",pluralGenitive:"{{count}} днів"}}),aboutXWeeks:o({regular:{singularNominative:"близько {{count}} тижня",singularGenitive:"близько {{count}} тижнів",pluralGenitive:"близько {{count}} тижнів"},future:{singularNominative:"приблизно за {{count}} тиждень",singularGenitive:"приблизно за {{count}} тижні",pluralGenitive:"приблизно за {{count}} тижні"}}),xWeeks:o({regular:{singularNominative:"{{count}} тиждень",singularGenitive:"{{count}} тижня",pluralGenitive:"{{count}} тижні"}}),aboutXMonths:o({regular:{singularNominative:"близько {{count}} місяця",singularGenitive:"близько {{count}} місяців",pluralGenitive:"близько {{count}} місяців"},future:{singularNominative:"приблизно за {{count}} місяць",singularGenitive:"приблизно за {{count}} місяця",pluralGenitive:"приблизно за {{count}} місяців"}}),xMonths:o({regular:{singularNominative:"{{count}} місяць",singularGenitive:"{{count}} місяця",pluralGenitive:"{{count}} місяців"}}),aboutXYears:o({regular:{singularNominative:"близько {{count}} року",singularGenitive:"близько {{count}} років",pluralGenitive:"близько {{count}} років"},future:{singularNominative:"приблизно за {{count}} рік",singularGenitive:"приблизно за {{count}} роки",pluralGenitive:"приблизно за {{count}} років"}}),xYears:o({regular:{singularNominative:"{{count}} рік",singularGenitive:"{{count}} роки",pluralGenitive:"{{count}} років"}}),overXYears:o({regular:{singularNominative:"більше {{count}} року",singularGenitive:"більше {{count}} років",pluralGenitive:"більше {{count}} років"},future:{singularNominative:"більше, ніж за {{count}} рік",singularGenitive:"більше, ніж за {{count}} роки",pluralGenitive:"більше, ніж за {{count}} років"}}),almostXYears:o({regular:{singularNominative:"майже {{count}} рік",singularGenitive:"майже {{count}} роки",pluralGenitive:"майже {{count}} років"},future:{singularNominative:"майже за {{count}} рік",singularGenitive:"майже за {{count}} роки",pluralGenitive:"майже за {{count}} років"}})};function s(i,e,n){n=n||{};return l[i](e,n)}var v={full:"EEEE, do MMMM y 'р.'",long:"do MMMM y 'р.'",medium:"d MMM y 'р.'",short:"dd.MM.y"};var c={full:"H:mm:ss zzzz",long:"H:mm:ss z",medium:"H:mm:ss",short:"H:mm"};var d={full:"{{date}} 'о' {{time}}",long:"{{date}} 'о' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var g={date:e({formats:v,defaultWidth:"full"}),time:e({formats:c,defaultWidth:"full"}),dateTime:e({formats:d,defaultWidth:"full"})};var m=["неділю","понеділок","вівторок","середу","четвер","п’ятницю","суботу"];function f(i){var e=m[i];switch(i){case 0:case 3:case 5:case 6:return"'у минулу "+e+" о' p";case 1:case 2:case 4:return"'у минулий "+e+" о' p"}}function p(i){var e=m[i];return"'у "+e+" о' p"}function h(i){var e=m[i];switch(i){case 0:case 3:case 5:case 6:return"'у наступну "+e+" о' p";case 1:case 2:case 4:return"'у наступний "+e+" о' p"}}var G={lastWeek:function i(e,n,t){var a=e.getUTCDay();if(r(e,n,t)){return p(a)}else{return f(a)}},yesterday:"'вчора о' p",today:"'сьогодні о' p",tomorrow:"'завтра о' p",nextWeek:function i(e,n,t){var a=e.getUTCDay();if(r(e,n,t)){return p(a)}else{return h(a)}},other:"P"};function w(i,e,n,t){var a=G[i];if(typeof a==="function"){return a(e,n,t)}return a}var b={narrow:["до н.е.","н.е."],abbreviated:["до н. е.","н. е."],wide:["до нашої ери","нашої ери"]};var N={narrow:["1","2","3","4"],abbreviated:["1-й кв.","2-й кв.","3-й кв.","4-й кв."],wide:["1-й квартал","2-й квартал","3-й квартал","4-й квартал"]};var y={narrow:["С","Л","Б","К","Т","Ч","Л","С","В","Ж","Л","Г"],abbreviated:["січ.","лют.","берез.","квіт.","трав.","черв.","лип.","серп.","верес.","жовт.","листоп.","груд."],wide:["січень","лютий","березень","квітень","травень","червень","липень","серпень","вересень","жовтень","листопад","грудень"]};var W={narrow:["С","Л","Б","К","Т","Ч","Л","С","В","Ж","Л","Г"],abbreviated:["січ.","лют.","берез.","квіт.","трав.","черв.","лип.","серп.","верес.","жовт.","листоп.","груд."],wide:["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"]};var M={narrow:["Н","П","В","С","Ч","П","С"],short:["нд","пн","вт","ср","чт","пт","сб"],abbreviated:["нед","пон","вів","сер","чтв","птн","суб"],wide:["неділя","понеділок","вівторок","середа","четвер","п’ятниця","субота"]};var P={narrow:{am:"ДП",pm:"ПП",midnight:"півн.",noon:"пол.",morning:"ранок",afternoon:"день",evening:"веч.",night:"ніч"},abbreviated:{am:"ДП",pm:"ПП",midnight:"півн.",noon:"пол.",morning:"ранок",afternoon:"день",evening:"веч.",night:"ніч"},wide:{am:"ДП",pm:"ПП",midnight:"північ",noon:"полудень",morning:"ранок",afternoon:"день",evening:"вечір",night:"ніч"}};var x={narrow:{am:"ДП",pm:"ПП",midnight:"півн.",noon:"пол.",morning:"ранку",afternoon:"дня",evening:"веч.",night:"ночі"},abbreviated:{am:"ДП",pm:"ПП",midnight:"півн.",noon:"пол.",morning:"ранку",afternoon:"дня",evening:"веч.",night:"ночі"},wide:{am:"ДП",pm:"ПП",midnight:"північ",noon:"полудень",morning:"ранку",afternoon:"дня",evening:"веч.",night:"ночі"}};function k(i,e){var n=e||{};var t=String(n.unit);var a;if(t==="date"){if(i===3||i===23){a="-є"}else{a="-е"}}else if(t==="minute"||t==="second"||t==="hour"){a="-а"}else{a="-й"}return i+a}var X={ordinalNumber:k,era:n({values:b,defaultWidth:"wide"}),quarter:n({values:N,defaultWidth:"wide",argumentCallback:function i(e){return Number(e)-1}}),month:n({values:y,defaultWidth:"wide",formattingValues:W,defaultFormattingWidth:"wide"}),day:n({values:M,defaultWidth:"wide"}),dayPeriod:n({values:P,defaultWidth:"any",formattingValues:x,defaultFormattingWidth:"wide"})};var S=/^(\d+)(-?(е|й|є|а|я))?/i;var z=/\d+/i;var C={narrow:/^((до )?н\.?\s?е\.?)/i,abbreviated:/^((до )?н\.?\s?е\.?)/i,wide:/^(до нашої ери|нашої ери|наша ера)/i};var H={any:[/^д/i,/^н/i]};var D={narrow:/^[1234]/i,abbreviated:/^[1234](-?[иі]?й?)? кв.?/i,wide:/^[1234](-?[иі]?й?)? квартал/i};var T={any:[/1/i,/2/i,/3/i,/4/i]};var E={narrow:/^[слбктчвжг]/i,abbreviated:/^(січ|лют|бер|берез|кві|трав?|чер|лип|сер|вер|жов|лис(топ)?|груд)\.?/i,wide:/^(січень|січня|лютий|лютого|березень|березня|квітень|квітня|травень|травня|липень|липня|серпень|серпня|вересень|вересня|жовтень|жовтня|листопада?|грудень|грудня)/i};var Y={narrow:[/^с/i,/^л/i,/^б/i,/^к/i,/^т/i,/^ч/i,/^л/i,/^с/i,/^в/i,/^ж/i,/^л/i,/^г/i],any:[/^сі/i,/^лю/i,/^б/i,/^к/i,/^т/i,/^ч/i,/^лип/i,/^се/i,/^в/i,/^ж/i,/^лис/i,/^г/i]};var j={narrow:/^[нпвсч]/i,short:/^(нд|пн|вт|ср|чт|пт|сб)\.?/i,abbreviated:/^(нед|пон|вів|сер|че?тв|птн?|суб)\.?/i,wide:/^(неділ[яі]|понеділ[ок][ка]|вівтор[ок][ка]|серед[аи]|четвер(га)?|п\W*?ятниц[яі]|субот[аи])/i};var q={narrow:[/^н/i,/^п/i,/^в/i,/^с/i,/^ч/i,/^п/i,/^с/i],any:[/^н/i,/^п[он]/i,/^в/i,/^с[ер]/i,/^ч/i,/^п\W*?[ят]/i,/^с[уб]/i]};var F={narrow:/^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,abbreviated:/^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,wide:/^([дп]п|північ|полудень|ранок|ранку|день|дня|вечір|вечора|ніч|ночі)/i};var U={any:{am:/^дп/i,pm:/^пп/i,midnight:/^півн/i,noon:/^пол/i,morning:/^р/i,afternoon:/^д[ен]/i,evening:/^в/i,night:/^н/i}};var V={ordinalNumber:t({matchPattern:S,parsePattern:z,valueCallback:function i(e){return parseInt(e,10)}}),era:a({matchPatterns:C,defaultMatchWidth:"wide",parsePatterns:H,defaultParseWidth:"any"}),quarter:a({matchPatterns:D,defaultMatchWidth:"wide",parsePatterns:T,defaultParseWidth:"any",valueCallback:function i(e){return e+1}}),month:a({matchPatterns:E,defaultMatchWidth:"wide",parsePatterns:Y,defaultParseWidth:"any"}),day:a({matchPatterns:j,defaultMatchWidth:"wide",parsePatterns:q,defaultParseWidth:"any"}),dayPeriod:a({matchPatterns:F,defaultMatchWidth:"wide",parsePatterns:U,defaultParseWidth:"any"})};var A=i("default",{code:"uk",formatDistance:s,formatLong:g,formatRelative:w,localize:X,match:V,options:{weekStartsOn:1,firstWeekContainsDate:1}})}}}));