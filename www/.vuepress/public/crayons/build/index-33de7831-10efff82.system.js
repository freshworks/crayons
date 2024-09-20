System.register(["./index-dc611d24-4c9389ae.system.js"],(function(e){"use strict";var t,a,i,r;return{setters:[function(e){t=e.a;a=e.b;i=e.c;r=e.d}],execute:function(){var n={locale:{1:"১",2:"২",3:"৩",4:"৪",5:"৫",6:"৬",7:"৭",8:"৮",9:"৯",0:"০"},number:{"১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","০":"0"}};var o={narrow:["খ্রিঃপূঃ","খ্রিঃ"],abbreviated:["খ্রিঃপূর্ব","খ্রিঃ"],wide:["খ্রিস্টপূর্ব","খ্রিস্টাব্দ"]};var d={narrow:["১","২","৩","৪"],abbreviated:["১ত্রৈ","২ত্রৈ","৩ত্রৈ","৪ত্রৈ"],wide:["১ম ত্রৈমাসিক","২য় ত্রৈমাসিক","৩য় ত্রৈমাসিক","৪র্থ ত্রৈমাসিক"]};var u={narrow:["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্ট","অক্টো","নভে","ডিসে"],abbreviated:["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্ট","অক্টো","নভে","ডিসে"],wide:["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"]};var s={narrow:["র","সো","ম","বু","বৃ","শু","শ"],short:["রবি","সোম","মঙ্গল","বুধ","বৃহ","শুক্র","শনি"],abbreviated:["রবি","সোম","মঙ্গল","বুধ","বৃহ","শুক্র","শনি"],wide:["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার ","শুক্রবার","শনিবার"]};var h={narrow:{am:"পূ",pm:"অপ",midnight:"মধ্যরাত",noon:"মধ্যাহ্ন",morning:"সকাল",afternoon:"বিকাল",evening:"সন্ধ্যা",night:"রাত"},abbreviated:{am:"পূর্বাহ্ন",pm:"অপরাহ্ন",midnight:"মধ্যরাত",noon:"মধ্যাহ্ন",morning:"সকাল",afternoon:"বিকাল",evening:"সন্ধ্যা",night:"রাত"},wide:{am:"পূর্বাহ্ন",pm:"অপরাহ্ন",midnight:"মধ্যরাত",noon:"মধ্যাহ্ন",morning:"সকাল",afternoon:"বিকাল",evening:"সন্ধ্যা",night:"রাত"}};var m={narrow:{am:"পূ",pm:"অপ",midnight:"মধ্যরাত",noon:"মধ্যাহ্ন",morning:"সকাল",afternoon:"বিকাল",evening:"সন্ধ্যা",night:"রাত"},abbreviated:{am:"পূর্বাহ্ন",pm:"অপরাহ্ন",midnight:"মধ্যরাত",noon:"মধ্যাহ্ন",morning:"সকাল",afternoon:"বিকাল",evening:"সন্ধ্যা",night:"রাত"},wide:{am:"পূর্বাহ্ন",pm:"অপরাহ্ন",midnight:"মধ্যরাত",noon:"মধ্যাহ্ন",morning:"সকাল",afternoon:"বিকাল",evening:"সন্ধ্যা",night:"রাত"}};function l(e,t){if(e>18&&e<=31){return t+"শে"}else{switch(e){case 1:return t+"লা";case 2:case 3:return t+"রা";case 4:return t+"ঠা";default:return t+"ই"}}}var v=function e(t,a){var i=Number(t);var r=c(i);var n=a===null||a===void 0?void 0:a.unit;if(n==="date"){return l(i,r)}if(i>10||i===0)return r+"তম";var o=i%10;switch(o){case 2:case 3:return r+"য়";case 4:return r+"র্থ";case 6:return r+"ষ্ঠ";default:return r+"ম"}};function c(e){return e.toString().replace(/\d/g,(function(e){return n.locale[e]}))}var f={ordinalNumber:v,era:t({values:o,defaultWidth:"wide"}),quarter:t({values:d,defaultWidth:"wide",argumentCallback:function e(t){return t-1}}),month:t({values:u,defaultWidth:"wide"}),day:t({values:s,defaultWidth:"wide"}),dayPeriod:t({values:h,defaultWidth:"wide",formattingValues:m,defaultFormattingWidth:"wide"})};var w={lessThanXSeconds:{one:"প্রায় ১ সেকেন্ড",other:"প্রায় {{count}} সেকেন্ড"},xSeconds:{one:"১ সেকেন্ড",other:"{{count}} সেকেন্ড"},halfAMinute:"আধ মিনিট",lessThanXMinutes:{one:"প্রায় ১ মিনিট",other:"প্রায় {{count}} মিনিট"},xMinutes:{one:"১ মিনিট",other:"{{count}} মিনিট"},aboutXHours:{one:"প্রায় ১ ঘন্টা",other:"প্রায় {{count}} ঘন্টা"},xHours:{one:"১ ঘন্টা",other:"{{count}} ঘন্টা"},xDays:{one:"১ দিন",other:"{{count}} দিন"},aboutXWeeks:{one:"প্রায় ১ সপ্তাহ",other:"প্রায় {{count}} সপ্তাহ"},xWeeks:{one:"১ সপ্তাহ",other:"{{count}} সপ্তাহ"},aboutXMonths:{one:"প্রায় ১ মাস",other:"প্রায় {{count}} মাস"},xMonths:{one:"১ মাস",other:"{{count}} মাস"},aboutXYears:{one:"প্রায় ১ বছর",other:"প্রায় {{count}} বছর"},xYears:{one:"১ বছর",other:"{{count}} বছর"},overXYears:{one:"১ বছরের বেশি",other:"{{count}} বছরের বেশি"},almostXYears:{one:"প্রায় ১ বছর",other:"প্রায় {{count}} বছর"}};var b=function e(t,a,i){var r;var n=w[t];if(typeof n==="string"){r=n}else if(a===1){r=n.one}else{r=n.other.replace("{{count}}",c(a))}if(i!==null&&i!==void 0&&i.addSuffix){if(i.comparison&&i.comparison>0){return r+" এর মধ্যে"}else{return r+" আগে"}}return r};var g={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"};var p={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"};var y={full:"{{date}} {{time}} 'সময়'",long:"{{date}} {{time}} 'সময়'",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var W={date:a({formats:g,defaultWidth:"full"}),time:a({formats:p,defaultWidth:"full"}),dateTime:a({formats:y,defaultWidth:"full"})};var M={lastWeek:"'গত' eeee 'সময়' p",yesterday:"'গতকাল' 'সময়' p",today:"'আজ' 'সময়' p",tomorrow:"'আগামীকাল' 'সময়' p",nextWeek:"eeee 'সময়' p",other:"P"};var P=function e(t,a,i,r){return M[t]};var x=/^(\d+)(ম|য়|র্থ|ষ্ঠ|শে|ই|তম)?/i;var k=/\d+/i;var X={narrow:/^(খ্রিঃপূঃ|খ্রিঃ)/i,abbreviated:/^(খ্রিঃপূর্ব|খ্রিঃ)/i,wide:/^(খ্রিস্টপূর্ব|খ্রিস্টাব্দ)/i};var z={narrow:[/^খ্রিঃপূঃ/i,/^খ্রিঃ/i],abbreviated:[/^খ্রিঃপূর্ব/i,/^খ্রিঃ/i],wide:[/^খ্রিস্টপূর্ব/i,/^খ্রিস্টাব্দ/i]};var S={narrow:/^[১২৩৪]/i,abbreviated:/^[১২৩৪]ত্রৈ/i,wide:/^[১২৩৪](ম|য়|র্থ)? ত্রৈমাসিক/i};var C={any:[/১/i,/২/i,/৩/i,/৪/i]};var E={narrow:/^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,abbreviated:/^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,wide:/^(জানুয়ারি|ফেব্রুয়ারি|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্টেম্বর|অক্টোবর|নভেম্বর|ডিসেম্বর)/i};var Y={any:[/^জানু/i,/^ফেব্রু/i,/^মার্চ/i,/^এপ্রিল/i,/^মে/i,/^জুন/i,/^জুলাই/i,/^আগস্ট/i,/^সেপ্ট/i,/^অক্টো/i,/^নভে/i,/^ডিসে/i]};var D={narrow:/^(র|সো|ম|বু|বৃ|শু|শ)+/i,short:/^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,abbreviated:/^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,wide:/^(রবিবার|সোমবার|মঙ্গলবার|বুধবার|বৃহস্পতিবার |শুক্রবার|শনিবার)+/i};var N={narrow:[/^র/i,/^সো/i,/^ম/i,/^বু/i,/^বৃ/i,/^শু/i,/^শ/i],short:[/^রবি/i,/^সোম/i,/^মঙ্গল/i,/^বুধ/i,/^বৃহ/i,/^শুক্র/i,/^শনি/i],abbreviated:[/^রবি/i,/^সোম/i,/^মঙ্গল/i,/^বুধ/i,/^বৃহ/i,/^শুক্র/i,/^শনি/i],wide:[/^রবিবার/i,/^সোমবার/i,/^মঙ্গলবার/i,/^বুধবার/i,/^বৃহস্পতিবার /i,/^শুক্রবার/i,/^শনিবার/i]};var T={narrow:/^(পূ|অপ|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,abbreviated:/^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,wide:/^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i};var q={any:{am:/^পূ/i,pm:/^অপ/i,midnight:/^মধ্যরাত/i,noon:/^মধ্যাহ্ন/i,morning:/সকাল/i,afternoon:/বিকাল/i,evening:/সন্ধ্যা/i,night:/রাত/i}};var H={ordinalNumber:i({matchPattern:x,parsePattern:k,valueCallback:function e(t){return parseInt(t,10)}}),era:r({matchPatterns:X,defaultMatchWidth:"wide",parsePatterns:z,defaultParseWidth:"wide"}),quarter:r({matchPatterns:S,defaultMatchWidth:"wide",parsePatterns:C,defaultParseWidth:"any",valueCallback:function e(t){return t+1}}),month:r({matchPatterns:E,defaultMatchWidth:"wide",parsePatterns:Y,defaultParseWidth:"any"}),day:r({matchPatterns:D,defaultMatchWidth:"wide",parsePatterns:N,defaultParseWidth:"wide"}),dayPeriod:r({matchPatterns:T,defaultMatchWidth:"wide",parsePatterns:q,defaultParseWidth:"any"})};var j=e("default",{code:"bn",formatDistance:b,formatLong:W,formatRelative:P,localize:f,match:H,options:{weekStartsOn:0,firstWeekContainsDate:1}})}}}));