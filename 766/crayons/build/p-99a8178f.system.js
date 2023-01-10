System.register(["./p-6fb516eb.system.js"],(function(e){"use strict";var t,n,a,i;return{setters:[function(e){t=e.b;n=e.a;a=e.c;i=e.d}],execute:function(){var r={lessThanXSeconds:{one:"أقل من ثانية واحدة",two:"أقل من ثانتين",threeToTen:"أقل من {{count}} ثواني",other:"أقل من {{count}} ثانية"},xSeconds:{one:"ثانية واحدة",two:"ثانتين",threeToTen:"{{count}} ثواني",other:"{{count}} ثانية"},halfAMinute:"نصف دقيقة",lessThanXMinutes:{one:"أقل من دقيقة",two:"أقل من دقيقتين",threeToTen:"أقل من {{count}} دقائق",other:"أقل من {{count}} دقيقة"},xMinutes:{one:"دقيقة واحدة",two:"دقيقتين",threeToTen:"{{count}} دقائق",other:"{{count}} دقيقة"},aboutXHours:{one:"ساعة واحدة تقريباً",two:"ساعتين تقريباً",threeToTen:"{{count}} ساعات تقريباً",other:"{{count}} ساعة تقريباً"},xHours:{one:"ساعة واحدة",two:"ساعتين",threeToTen:"{{count}} ساعات",other:"{{count}} ساعة"},xDays:{one:"يوم واحد",two:"يومين",threeToTen:"{{count}} أيام",other:"{{count}} يوم"},aboutXWeeks:{one:"أسبوع واحد تقريباً",two:"أسبوعين تقريباً",threeToTen:"{{count}} أسابيع تقريباً",other:"{{count}} أسبوع تقريباً"},xWeeks:{one:"أسبوع واحد",two:"أسبوعين",threeToTen:"{{count}} أسابيع",other:"{{count}} أسبوع"},aboutXMonths:{one:"شهر واحد تقريباً",two:"شهرين تقريباً",threeToTen:"{{count}} أشهر تقريباً",other:"{{count}} شهر تقريباً"},xMonths:{one:"شهر واحد",two:"شهرين",threeToTen:"{{count}} أشهر",other:"{{count}} شهر"},aboutXYears:{one:"عام واحد تقريباً",two:"عامين تقريباً",threeToTen:"{{count}} أعوام تقريباً",other:"{{count}} عام تقريباً"},xYears:{one:"عام واحد",two:"عامين",threeToTen:"{{count}} أعوام",other:"{{count}} عام"},overXYears:{one:"أكثر من عام",two:"أكثر من عامين",threeToTen:"أكثر من {{count}} أعوام",other:"أكثر من {{count}} عام"},almostXYears:{one:"عام واحد تقريباً",two:"عامين تقريباً",threeToTen:"{{count}} أعوام تقريباً",other:"{{count}} عام تقريباً"}};var o=function e(t,n,a){a=a||{};var i=r[t];var o;if(typeof i==="string"){o=i}else if(n===1){o=i.one}else if(n===2){o=i.two}else if(n<=10){o=i.threeToTen.replace("{{count}}",String(n))}else{o=i.other.replace("{{count}}",String(n))}if(a.addSuffix){if(a.comparison&&a.comparison>0){return"في خلال "+o}else{return"منذ "+o}}return o};var d={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"};var u={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"};var h={full:"{{date}} 'عند' {{time}}",long:"{{date}} 'عند' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"};var s={date:t({formats:d,defaultWidth:"full"}),time:t({formats:u,defaultWidth:"full"}),dateTime:t({formats:h,defaultWidth:"full"})};var m={lastWeek:"'أخر' eeee 'عند' p",yesterday:"'أمس عند' p",today:"'اليوم عند' p",tomorrow:"'غداً عند' p",nextWeek:"eeee 'عند' p",other:"P"};var c=function e(t,n,a,i){return m[t]};var l={narrow:["ق","ب"],abbreviated:["ق.م.","ب.م."],wide:["قبل الميلاد","بعد الميلاد"]};var f={narrow:["1","2","3","4"],abbreviated:["ر1","ر2","ر3","ر4"],wide:["الربع الأول","الربع الثاني","الربع الثالث","الربع الرابع"]};var v={narrow:["ج","ف","م","أ","م","ج","ج","أ","س","أ","ن","د"],abbreviated:["جانـ","فيفـ","مارس","أفريل","مايـ","جوانـ","جويـ","أوت","سبتـ","أكتـ","نوفـ","ديسـ"],wide:["جانفي","فيفري","مارس","أفريل","ماي","جوان","جويلية","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]};var w={narrow:["ح","ن","ث","ر","خ","ج","س"],short:["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"],abbreviated:["أحد","اثنـ","ثلا","أربـ","خميـ","جمعة","سبت"],wide:["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"]};var g={narrow:{am:"ص",pm:"م",midnight:"ن",noon:"ظ",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"},abbreviated:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"},wide:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظهر",evening:"مساءاً",night:"ليلاً"}};var T={narrow:{am:"ص",pm:"م",midnight:"ن",noon:"ظ",morning:"في الصباح",afternoon:"بعد الظـهر",evening:"في المساء",night:"في الليل"},abbreviated:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"في الصباح",afternoon:"بعد الظهر",evening:"في المساء",night:"في الليل"},wide:{am:"ص",pm:"م",midnight:"نصف الليل",noon:"ظهر",morning:"صباحاً",afternoon:"بعد الظـهر",evening:"في المساء",night:"في الليل"}};var b=function e(t){return String(t)};var y={ordinalNumber:b,era:n({values:l,defaultWidth:"wide"}),quarter:n({values:f,defaultWidth:"wide",argumentCallback:function e(t){return Number(t)-1}}),month:n({values:v,defaultWidth:"wide"}),day:n({values:w,defaultWidth:"wide"}),dayPeriod:n({values:g,defaultWidth:"wide",formattingValues:T,defaultFormattingWidth:"wide"})};var p=/^(\d+)(th|st|nd|rd)?/i;var W=/\d+/i;var M={narrow:/^(ق|ب)/i,abbreviated:/^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,wide:/^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i};var P={any:[/^قبل/i,/^بعد/i]};var x={narrow:/^[1234]/i,abbreviated:/^ر[1234]/i,wide:/^الربع [1234]/i};var k={any:[/1/i,/2/i,/3/i,/4/i]};var S={narrow:/^[جفمأسند]/i,abbreviated:/^(جان|فيف|مار|أفر|ماي|جوا|جوي|أوت|سبت|أكت|نوف|ديس)/i,wide:/^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/i};var X={narrow:[/^ج/i,/^ف/i,/^م/i,/^أ/i,/^م/i,/^ج/i,/^ج/i,/^أ/i,/^س/i,/^أ/i,/^ن/i,/^د/i],any:[/^جان/i,/^فيف/i,/^مار/i,/^أفر/i,/^ماي/i,/^جوا/i,/^جوي/i,/^أوت/i,/^سبت/i,/^أكت/i,/^نوف/i,/^ديس/i]};var z={narrow:/^[حنثرخجس]/i,short:/^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,abbreviated:/^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,wide:/^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i};var C={narrow:[/^ح/i,/^ن/i,/^ث/i,/^ر/i,/^خ/i,/^ج/i,/^س/i],wide:[/^الأحد/i,/^الاثنين/i,/^الثلاثاء/i,/^الأربعاء/i,/^الخميس/i,/^الجمعة/i,/^السبت/i],any:[/^أح/i,/^اث/i,/^ث/i,/^أر/i,/^خ/i,/^ج/i,/^س/i]};var D={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i};var E={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}};var N={ordinalNumber:a({matchPattern:p,parsePattern:W,valueCallback:function e(t){return parseInt(t,10)}}),era:i({matchPatterns:M,defaultMatchWidth:"wide",parsePatterns:P,defaultParseWidth:"any"}),quarter:i({matchPatterns:x,defaultMatchWidth:"wide",parsePatterns:k,defaultParseWidth:"any",valueCallback:function e(t){return Number(t)+1}}),month:i({matchPatterns:S,defaultMatchWidth:"wide",parsePatterns:X,defaultParseWidth:"any"}),day:i({matchPatterns:z,defaultMatchWidth:"wide",parsePatterns:C,defaultParseWidth:"any"}),dayPeriod:i({matchPatterns:D,defaultMatchWidth:"any",parsePatterns:E,defaultParseWidth:"any"})};var Y=e("default",{code:"ar-DZ",formatDistance:o,formatLong:s,formatRelative:c,localize:y,match:N,options:{weekStartsOn:0,firstWeekContainsDate:1}})}}}));