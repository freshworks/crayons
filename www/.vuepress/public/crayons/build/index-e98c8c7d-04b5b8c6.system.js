System.register(["./index-dc611d24-4c9389ae.system.js","./index-d2a6c100-e71a69ec.system.js","./_rollupPluginBabelHelpers-ef57da83-3e4652f5.system.js"],(function(e){"use strict";var t,a,n,r,i;return{setters:[function(e){t=e.b;a=e.a;n=e.c;r=e.d},function(e){i=e.i},function(){}],execute:function(){var o={lessThanXSeconds:{one:"不到 1 秒",other:"不到 {{count}} 秒"},xSeconds:{one:"1 秒",other:"{{count}} 秒"},halfAMinute:"半分钟",lessThanXMinutes:{one:"不到 1 分钟",other:"不到 {{count}} 分钟"},xMinutes:{one:"1 分钟",other:"{{count}} 分钟"},xHours:{one:"1 小时",other:"{{count}} 小时"},aboutXHours:{one:"大约 1 小时",other:"大约 {{count}} 小时"},xDays:{one:"1 天",other:"{{count}} 天"},aboutXWeeks:{one:"大约 1 个星期",other:"大约 {{count}} 个星期"},xWeeks:{one:"1 个星期",other:"{{count}} 个星期"},aboutXMonths:{one:"大约 1 个月",other:"大约 {{count}} 个月"},xMonths:{one:"1 个月",other:"{{count}} 个月"},aboutXYears:{one:"大约 1 年",other:"大约 {{count}} 年"},xYears:{one:"1 年",other:"{{count}} 年"},overXYears:{one:"超过 1 年",other:"超过 {{count}} 年"},almostXYears:{one:"将近 1 年",other:"将近 {{count}} 年"}};function d(e,t,a){a=a||{};var n;if(typeof o[e]==="string"){n=o[e]}else if(t===1){n=o[e].one}else{n=o[e].other.replace("{{count}}",t)}if(a.addSuffix){if(a.comparison>0){return n+"内"}else{return n+"前"}}return n}var u={full:"y'年'M'月'd'日' EEEE",long:"y'年'M'月'd'日'",medium:"yyyy-MM-dd",short:"yy-MM-dd"};var s={full:"zzzz a h:mm:ss",long:"z a h:mm:ss",medium:"a h:mm:ss",short:"a h:mm"};var h={full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"};var m={date:t({formats:u,defaultWidth:"full"}),time:t({formats:s,defaultWidth:"full"}),dateTime:t({formats:h,defaultWidth:"full"})};function l(e,t,a,n){if(i(e,t,a)){return n}else if(e.getTime()>t.getTime()){return"'下个'"+n}return"'上个'"+n}var f={lastWeek:l,yesterday:"'昨天' p",today:"'今天' p",tomorrow:"'明天' p",nextWeek:l,other:"PP p"};function c(e,t,a,n){var r=f[e];if(typeof r==="function"){return r(t,a,n,"eeee p")}return r}var v={narrow:["前","公元"],abbreviated:["前","公元"],wide:["公元前","公元"]};var g={narrow:["1","2","3","4"],abbreviated:["第一季","第二季","第三季","第四季"],wide:["第一季度","第二季度","第三季度","第四季度"]};var w={narrow:["一","二","三","四","五","六","七","八","九","十","十一","十二"],abbreviated:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],wide:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]};var y={narrow:["日","一","二","三","四","五","六"],short:["日","一","二","三","四","五","六"],abbreviated:["周日","周一","周二","周三","周四","周五","周六"],wide:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]};var b={narrow:{am:"上",pm:"下",midnight:"凌晨",noon:"午",morning:"早",afternoon:"下午",evening:"晚",night:"夜"},abbreviated:{am:"上午",pm:"下午",midnight:"凌晨",noon:"中午",morning:"早晨",afternoon:"中午",evening:"晚上",night:"夜间"},wide:{am:"上午",pm:"下午",midnight:"凌晨",noon:"中午",morning:"早晨",afternoon:"中午",evening:"晚上",night:"夜间"}};var p={narrow:{am:"上",pm:"下",midnight:"凌晨",noon:"午",morning:"早",afternoon:"下午",evening:"晚",night:"夜"},abbreviated:{am:"上午",pm:"下午",midnight:"凌晨",noon:"中午",morning:"早晨",afternoon:"中午",evening:"晚上",night:"夜间"},wide:{am:"上午",pm:"下午",midnight:"凌晨",noon:"中午",morning:"早晨",afternoon:"中午",evening:"晚上",night:"夜间"}};function W(e,t){var a=Number(e);var n=t||{};var r=String(n.unit);switch(r){case"date":return a.toString()+"日";case"hour":return a.toString()+"时";case"minute":return a.toString()+"分";case"second":return a.toString()+"秒";default:return"第 "+a.toString()}}var P={ordinalNumber:W,era:a({values:v,defaultWidth:"wide"}),quarter:a({values:g,defaultWidth:"wide",argumentCallback:function e(t){return Number(t)-1}}),month:a({values:w,defaultWidth:"wide"}),day:a({values:y,defaultWidth:"wide"}),dayPeriod:a({values:b,defaultWidth:"wide",formattingValues:p,defaultFormattingWidth:"wide"})};var M=/^(第\s*)?\d+(日|时|分|秒)?/i;var x=/\d+/i;var S={narrow:/^(前)/i,abbreviated:/^(前)/i,wide:/^(公元前|公元)/i};var k={any:[/^(前)/i,/^(公元)/i]};var X={narrow:/^[1234]/i,abbreviated:/^第[一二三四]刻/i,wide:/^第[一二三四]刻钟/i};var z={any:[/(1|一)/i,/(2|二)/i,/(3|三)/i,/(4|四)/i]};var C={narrow:/^(一|二|三|四|五|六|七|八|九|十[二一])/i,abbreviated:/^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,wide:/^(一|二|三|四|五|六|七|八|九|十[二一])月/i};var N={narrow:[/^一/i,/^二/i,/^三/i,/^四/i,/^五/i,/^六/i,/^七/i,/^八/i,/^九/i,/^十(?!(一|二))/i,/^十一/i,/^十二/i],any:[/^一|1/i,/^二|2/i,/^三|3/i,/^四|4/i,/^五|5/i,/^六|6/i,/^七|7/i,/^八|8/i,/^九|9/i,/^十(?!(一|二))|10/i,/^十一|11/i,/^十二|12/i]};var T={narrow:/^[一二三四五六日]/i,short:/^[一二三四五六日]/i,abbreviated:/^周[一二三四五六日]/i,wide:/^星期[一二三四五六日]/i};var E={any:[/日/i,/一/i,/二/i,/三/i,/四/i,/五/i,/六/i]};var Y={any:/^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i};var j={any:{am:/^上午?/i,pm:/^下午?/i,midnight:/^午夜/i,noon:/^[中正]午/i,morning:/^早上/i,afternoon:/^下午/i,evening:/^晚上?/i,night:/^凌晨/i}};var D={ordinalNumber:n({matchPattern:M,parsePattern:x,valueCallback:function e(t){return parseInt(t,10)}}),era:r({matchPatterns:S,defaultMatchWidth:"wide",parsePatterns:k,defaultParseWidth:"any"}),quarter:r({matchPatterns:X,defaultMatchWidth:"wide",parsePatterns:z,defaultParseWidth:"any",valueCallback:function e(t){return t+1}}),month:r({matchPatterns:C,defaultMatchWidth:"wide",parsePatterns:N,defaultParseWidth:"any"}),day:r({matchPatterns:T,defaultMatchWidth:"wide",parsePatterns:E,defaultParseWidth:"any"}),dayPeriod:r({matchPatterns:Y,defaultMatchWidth:"any",parsePatterns:j,defaultParseWidth:"any"})};var H=e("default",{code:"zh-CN",formatDistance:d,formatLong:m,formatRelative:c,localize:P,match:D,options:{weekStartsOn:1,firstWeekContainsDate:4}})}}}));