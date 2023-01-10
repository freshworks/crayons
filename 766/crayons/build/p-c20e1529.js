import{b as e,a as t,c as i,d as a}from"./p-1e4f6cab.js";var n={lessThanXSeconds:{one:"ավելի քիչ քան 1 վայրկյան",other:"ավելի քիչ քան {{count}} վայրկյան"},xSeconds:{one:"1 վայրկյան",other:"{{count}} վայրկյան"},halfAMinute:"կես րոպե",lessThanXMinutes:{one:"ավելի քիչ քան 1 րոպե",other:"ավելի քիչ քան {{count}} րոպե"},xMinutes:{one:"1 րոպե",other:"{{count}} րոպե"},aboutXHours:{one:"մոտ 1 ժամ",other:"մոտ {{count}} ժամ"},xHours:{one:"1 ժամ",other:"{{count}} ժամ"},xDays:{one:"1 օր",other:"{{count}} օր"},aboutXWeeks:{one:"մոտ 1 շաբաթ",other:"մոտ {{count}} շաբաթ"},xWeeks:{one:"1 շաբաթ",other:"{{count}} շաբաթ"},aboutXMonths:{one:"մոտ 1 ամիս",other:"մոտ {{count}} ամիս"},xMonths:{one:"1 ամիս",other:"{{count}} ամիս"},aboutXYears:{one:"մոտ 1 տարի",other:"մոտ {{count}} տարի"},xYears:{one:"1 տարի",other:"{{count}} տարի"},overXYears:{one:"ավելի քան 1 տարի",other:"ավելի քան {{count}} տարի"},almostXYears:{one:"համարյա 1 տարի",other:"համարյա {{count}} տարի"}},r={date:e({formats:{full:"d MMMM, y, EEEE",long:"d MMMM, y",medium:"d MMM, y",short:"dd.MM.yyyy"},defaultWidth:"full"}),time:e({formats:{full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:e({formats:{full:"{{date}} 'ժ․'{{time}}",long:"{{date}} 'ժ․'{{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},o={lastWeek:"'նախորդ' eeee p'֊ին'",yesterday:"'երեկ' p'֊ին'",today:"'այսօր' p'֊ին'",tomorrow:"'վաղը' p'֊ին'",nextWeek:"'հաջորդ' eeee p'֊ին'",other:"P"},d={code:"hy",formatDistance:function(e,t,i){var a;return i=i||{},a="string"==typeof n[e]?n[e]:1===t?n[e].one:n[e].other.replace("{{count}}",t),i.addSuffix?i.comparison>0?a+" հետո":a+" առաջ":a},formatLong:r,formatRelative:function(e){return o[e]},localize:{ordinalNumber:function(e){var t=Number(e),i=t%100;return i<10&&i%10==1?t+"֊ին":t+"֊րդ"},era:t({values:{narrow:["Ք","Մ"],abbreviated:["ՔԱ","ՄԹ"],wide:["Քրիստոսից առաջ","Մեր թվարկության"]},defaultWidth:"wide"}),quarter:t({values:{narrow:["1","2","3","4"],abbreviated:["Ք1","Ք2","Ք3","Ք4"],wide:["1֊ին քառորդ","2֊րդ քառորդ","3֊րդ քառորդ","4֊րդ քառորդ"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:t({values:{narrow:["Հ","Փ","Մ","Ա","Մ","Հ","Հ","Օ","Ս","Հ","Ն","Դ"],abbreviated:["հուն","փետ","մար","ապր","մայ","հուն","հուլ","օգս","սեպ","հոկ","նոյ","դեկ"],wide:["հունվար","փետրվար","մարտ","ապրիլ","մայիս","հունիս","հուլիս","օգոստոս","սեպտեմբեր","հոկտեմբեր","նոյեմբեր","դեկտեմբեր"]},defaultWidth:"wide"}),day:t({values:{narrow:["Կ","Ե","Ե","Չ","Հ","Ո","Շ"],short:["կր","եր","եք","չք","հգ","ուր","շբ"],abbreviated:["կիր","երկ","երք","չոր","հնգ","ուրբ","շաբ"],wide:["կիրակի","երկուշաբթի","երեքշաբթի","չորեքշաբթի","հինգշաբթի","ուրբաթ","շաբաթ"]},defaultWidth:"wide"}),dayPeriod:t({values:{narrow:{am:"a",pm:"p",midnight:"կեսգշ",noon:"կեսօր",morning:"առավոտ",afternoon:"ցերեկ",evening:"երեկո",night:"գիշեր"},abbreviated:{am:"AM",pm:"PM",midnight:"կեսգիշեր",noon:"կեսօր",morning:"առավոտ",afternoon:"ցերեկ",evening:"երեկո",night:"գիշեր"},wide:{am:"a.m.",pm:"p.m.",midnight:"կեսգիշեր",noon:"կեսօր",morning:"առավոտ",afternoon:"ցերեկ",evening:"երեկո",night:"գիշեր"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"կեսգշ",noon:"կեսօր",morning:"առավոտը",afternoon:"ցերեկը",evening:"երեկոյան",night:"գիշերը"},abbreviated:{am:"AM",pm:"PM",midnight:"կեսգիշերին",noon:"կեսօրին",morning:"առավոտը",afternoon:"ցերեկը",evening:"երեկոյան",night:"գիշերը"},wide:{am:"a.m.",pm:"p.m.",midnight:"կեսգիշերին",noon:"կեսօրին",morning:"առավոտը",afternoon:"ցերեկը",evening:"երեկոյան",night:"գիշերը"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:i({matchPattern:/^(\d+)((-|֊)?(ին|րդ))?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:a({matchPatterns:{narrow:/^(Ք|Մ)/i,abbreviated:/^(Ք\.?\s?Ա\.?|Մ\.?\s?Թ\.?\s?Ա\.?|Մ\.?\s?Թ\.?|Ք\.?\s?Հ\.?)/i,wide:/^(քրիստոսից առաջ|մեր թվարկությունից առաջ|մեր թվարկության|քրիստոսից հետո)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^(ք|մ)/i]},defaultParseWidth:"any"}),quarter:a({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^ք[1234]/i,wide:/^[1234]((-|֊)?(ին|րդ)) քառորդ/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:a({matchPatterns:{narrow:/^[հփմաօսնդ]/i,abbreviated:/^(հուն|փետ|մար|ապր|մայ|հուն|հուլ|օգս|սեպ|հոկ|նոյ|դեկ)/i,wide:/^(հունվար|փետրվար|մարտ|ապրիլ|մայիս|հունիս|հուլիս|օգոստոս|սեպտեմբեր|հոկտեմբեր|նոյեմբեր|դեկտեմբեր)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^հ/i,/^փ/i,/^մ/i,/^ա/i,/^մ/i,/^հ/i,/^հ/i,/^օ/i,/^ս/i,/^հ/i,/^ն/i,/^դ/i],any:[/^հու/i,/^փ/i,/^մար/i,/^ա/i,/^մայ/i,/^հուն/i,/^հուլ/i,/^օ/i,/^ս/i,/^հոկ/i,/^ն/i,/^դ/i]},defaultParseWidth:"any"}),day:a({matchPatterns:{narrow:/^[եչհոշկ]/i,short:/^(կր|եր|եք|չք|հգ|ուր|շբ)/i,abbreviated:/^(կիր|երկ|երք|չոր|հնգ|ուրբ|շաբ)/i,wide:/^(կիրակի|երկուշաբթի|երեքշաբթի|չորեքշաբթի|հինգշաբթի|ուրբաթ|շաբաթ)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^կ/i,/^ե/i,/^ե/i,/^չ/i,/^հ/i,/^(ո|Ո)/,/^շ/i],short:[/^կ/i,/^եր/i,/^եք/i,/^չ/i,/^հ/i,/^(ո|Ո)/,/^շ/i],abbreviated:[/^կ/i,/^երկ/i,/^երք/i,/^չ/i,/^հ/i,/^(ո|Ո)/,/^շ/i],wide:[/^կ/i,/^երկ/i,/^երե/i,/^չ/i,/^հ/i,/^(ո|Ո)/,/^շ/i]},defaultParseWidth:"any"}),dayPeriod:a({matchPatterns:{narrow:/^([ap]|կեսգշ|կեսօր|(առավոտը?|ցերեկը?|երեկո(յան)?|գիշերը?))/i,any:/^([ap]\.?\s?m\.?|կեսգիշեր(ին)?|կեսօր(ին)?|(առավոտը?|ցերեկը?|երեկո(յան)?|գիշերը?))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/կեսգիշեր/i,noon:/կեսօր/i,morning:/առավոտ/i,afternoon:/ցերեկ/i,evening:/երեկո/i,night:/գիշեր/i}},defaultParseWidth:"any"})},options:{weekStartsOn:1,firstWeekContainsDate:1}};export default d;