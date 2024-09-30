System.register(["./index-dc611d24-4c9389ae.system.js"],(function(i){"use strict";var e,a,t,r;return{setters:[function(i){e=i.b;a=i.a;t=i.c;r=i.d}],execute:function(){var n={lessThanXSeconds:{one:o,other:v},xSeconds:{one:o,other:v},halfAMinute:"pusė minutės",lessThanXMinutes:{one:d,other:v},xMinutes:{one:d,other:v},aboutXHours:{one:d,other:v},xHours:{one:d,other:v},xDays:{one:d,other:v},aboutWeeks:{one:d,other:v},xWeeks:{one:d,other:v},aboutXMonths:{one:d,other:v},xMonths:{one:d,other:v},aboutXYears:{one:d,other:v},xYears:{one:d,other:v},overXYears:{one:d,other:v},almostXYears:{one:d,other:v}};var s={xseconds_other:"sekundė_sekundžių_sekundes",xminutes_one:"minutė_minutės_minutę",xminutes_other:"minutės_minučių_minutes",xhours_one:"valanda_valandos_valandą",xhours_other:"valandos_valandų_valandas",xdays_one:"diena_dienos_dieną",xdays_other:"dienos_dienų_dienas",xweeks_one:"savaitė_savaitės_savaitę",xweeks_other:"savaitės_savaičių_savaites",xmonths_one:"mėnuo_mėnesio_mėnesį",xmonths_other:"mėnesiai_mėnesių_mėnesius",xyears_one:"metai_metų_metus",xyears_other:"metai_metų_metus",about:"apie",over:"daugiau nei",almost:"beveik",lessthan:"mažiau nei"};function o(i,e,a,t){if(!e){return"kelios sekundės"}else{return t?"kelių sekundžių":"kelias sekundes"}}function d(i,e,a,t){return!e?p(a)[0]:t?p(a)[1]:p(a)[2]}function u(i){return i%10===0||i>10&&i<20}function p(i){return s[i].split("_")}function v(i,e,a,t){var r=i+" ";if(i===1){return r+d(i,e,a[0],t)}else if(!e){return r+(u(i)?p(a)[1]:p(a)[0])}else{if(t){return r+p(a)[1]}else{return r+(u(i)?p(a)[1]:p(a)[2])}}}function m(i,e,a){a=a||{};var t=i.match(/about|over|almost|lessthan/i);var r=i.replace(t,"");var o;if(typeof n[i]==="string"){o=n[i]}else if(e===1){o=n[i].one(e,a.addSuffix,r.toLowerCase()+"_one")}else{o=n[i].other(e,a.addSuffix,r.toLowerCase()+"_other")}if(t){o=s[t[0].toLowerCase()]+" "+o}if(a.addSuffix){if(a.comparison>0){return"po "+o}else{return"prieš "+o}}return o}var l={full:"y 'm'. MMMM d 'd'., EEEE",long:"y 'm'. MMMM d 'd'.",medium:"y-MM-dd",short:"y-MM-dd"};var k={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"};var h={full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"};var g={date:e({formats:l,defaultWidth:"full"}),time:e({formats:k,defaultWidth:"full"}),dateTime:e({formats:h,defaultWidth:"full"})};var f={lastWeek:"'Praėjusį' eeee p",yesterday:"'Vakar' p",today:"'Šiandien' p",tomorrow:"'Rytoj' p",nextWeek:"eeee p",other:"P"};function b(i,e,a,t){return f[i]}var w={narrow:["pr. Kr.","po Kr."],abbreviated:["pr. Kr.","po Kr."],wide:["prieš Kristų","po Kristaus"]};var I={narrow:["1","2","3","4"],abbreviated:["I ketv.","II ketv.","III ketv.","IV ketv."],wide:["I ketvirtis","II ketvirtis","III ketvirtis","IV ketvirtis"]};var c={narrow:["1","2","3","4"],abbreviated:["I k.","II k.","III k.","IV k."],wide:["I ketvirtis","II ketvirtis","III ketvirtis","IV ketvirtis"]};var y={narrow:["S","V","K","B","G","B","L","R","R","S","L","G"],abbreviated:["saus.","vas.","kov.","bal.","geg.","birž.","liep.","rugp.","rugs.","spal.","lapkr.","gruod."],wide:["sausis","vasaris","kovas","balandis","gegužė","birželis","liepa","rugpjūtis","rugsėjis","spalis","lapkritis","gruodis"]};var _={narrow:["S","V","K","B","G","B","L","R","R","S","L","G"],abbreviated:["saus.","vas.","kov.","bal.","geg.","birž.","liep.","rugp.","rugs.","spal.","lapkr.","gruod."],wide:["sausio","vasario","kovo","balandžio","gegužės","birželio","liepos","rugpjūčio","rugsėjo","spalio","lapkričio","gruodžio"]};var P={narrow:["S","P","A","T","K","P","Š"],short:["Sk","Pr","An","Tr","Kt","Pn","Št"],abbreviated:["sk","pr","an","tr","kt","pn","št"],wide:["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"]};var W={narrow:["S","P","A","T","K","P","Š"],short:["Sk","Pr","An","Tr","Kt","Pn","Št"],abbreviated:["sk","pr","an","tr","kt","pn","št"],wide:["sekmadienį","pirmadienį","antradienį","trečiadienį","ketvirtadienį","penktadienį","šeštadienį"]};var x={narrow:{am:"pr. p.",pm:"pop.",midnight:"vidurnaktis",noon:"vidurdienis",morning:"rytas",afternoon:"diena",evening:"vakaras",night:"naktis"},abbreviated:{am:"priešpiet",pm:"popiet",midnight:"vidurnaktis",noon:"vidurdienis",morning:"rytas",afternoon:"diena",evening:"vakaras",night:"naktis"},wide:{am:"priešpiet",pm:"popiet",midnight:"vidurnaktis",noon:"vidurdienis",morning:"rytas",afternoon:"diena",evening:"vakaras",night:"naktis"}};var M={narrow:{am:"pr. p.",pm:"pop.",midnight:"vidurnaktis",noon:"perpiet",morning:"rytas",afternoon:"popietė",evening:"vakaras",night:"naktis"},abbreviated:{am:"priešpiet",pm:"popiet",midnight:"vidurnaktis",noon:"perpiet",morning:"rytas",afternoon:"popietė",evening:"vakaras",night:"naktis"},wide:{am:"priešpiet",pm:"popiet",midnight:"vidurnaktis",noon:"perpiet",morning:"rytas",afternoon:"popietė",evening:"vakaras",night:"naktis"}};function S(i,e){var a=Number(i);return a+"-oji"}var K={ordinalNumber:S,era:a({values:w,defaultWidth:"wide"}),quarter:a({values:I,defaultWidth:"wide",formattingValues:c,defaultFormattingWidth:"wide",argumentCallback:function i(e){return Number(e)-1}}),month:a({values:y,defaultWidth:"wide",formattingValues:_,defaultFormattingWidth:"wide"}),day:a({values:P,defaultWidth:"wide",formattingValues:W,defaultFormattingWidth:"wide"}),dayPeriod:a({values:x,defaultWidth:"wide",formattingValues:M,defaultFormattingWidth:"wide"})};var V=/^(\d+)(-oji)?/i;var j=/\d+/i;var H={narrow:/^p(r|o)\.?\s?(kr\.?|me)/i,abbreviated:/^(pr\.\s?(kr\.|m\.\s?e\.)|po\s?kr\.|mūsų eroje)/i,wide:/^(prieš Kristų|prieš mūsų erą|po Kristaus|mūsų eroje)/i};var L={wide:[/prieš/i,/(po|mūsų)/i],any:[/^pr/i,/^(po|m)/i]};var C={narrow:/^([1234])/i,abbreviated:/^(I|II|III|IV)\s?ketv?\.?/i,wide:/^(I|II|III|IV)\s?ketvirtis/i};var T={narrow:[/1/i,/2/i,/3/i,/4/i],any:[/I$/i,/II$/i,/III/i,/IV/i]};var X={narrow:/^[svkbglr]/i,abbreviated:/^(saus\.|vas\.|kov\.|bal\.|geg\.|birž\.|liep\.|rugp\.|rugs\.|spal\.|lapkr\.|gruod\.)/i,wide:/^(sausi(s|o)|vasari(s|o)|kov(a|o)s|balandž?i(s|o)|gegužės?|birželi(s|o)|liep(a|os)|rugpjū(t|č)i(s|o)|rugsėj(is|o)|spali(s|o)|lapkri(t|č)i(s|o)|gruodž?i(s|o))/i};var z={narrow:[/^s/i,/^v/i,/^k/i,/^b/i,/^g/i,/^b/i,/^l/i,/^r/i,/^r/i,/^s/i,/^l/i,/^g/i],any:[/^saus/i,/^vas/i,/^kov/i,/^bal/i,/^geg/i,/^birž/i,/^liep/i,/^rugp/i,/^rugs/i,/^spal/i,/^lapkr/i,/^gruod/i]};var R={narrow:/^[spatkš]/i,short:/^(sk|pr|an|tr|kt|pn|št)/i,abbreviated:/^(sk|pr|an|tr|kt|pn|št)/i,wide:/^(sekmadien(is|į)|pirmadien(is|į)|antradien(is|į)|trečiadien(is|į)|ketvirtadien(is|į)|penktadien(is|į)|šeštadien(is|į))/i};var A={narrow:[/^s/i,/^p/i,/^a/i,/^t/i,/^k/i,/^p/i,/^š/i],wide:[/^se/i,/^pi/i,/^an/i,/^tr/i,/^ke/i,/^pe/i,/^še/i],any:[/^sk/i,/^pr/i,/^an/i,/^tr/i,/^kt/i,/^pn/i,/^št/i]};var B={narrow:/^(pr.\s?p.|pop.|vidurnaktis|(vidurdienis|perpiet)|rytas|(diena|popietė)|vakaras|naktis)/i,any:/^(priešpiet|popiet$|vidurnaktis|(vidurdienis|perpiet)|rytas|(diena|popietė)|vakaras|naktis)/i};var E={narrow:{am:/^pr/i,pm:/^pop./i,midnight:/^vidurnaktis/i,noon:/^(vidurdienis|perp)/i,morning:/rytas/i,afternoon:/(die|popietė)/i,evening:/vakaras/i,night:/naktis/i},any:{am:/^pr/i,pm:/^popiet$/i,midnight:/^vidurnaktis/i,noon:/^(vidurdienis|perp)/i,morning:/rytas/i,afternoon:/(die|popietė)/i,evening:/vakaras/i,night:/naktis/i}};var F={ordinalNumber:t({matchPattern:V,parsePattern:j,valueCallback:function i(e){return parseInt(e,10)}}),era:r({matchPatterns:H,defaultMatchWidth:"wide",parsePatterns:L,defaultParseWidth:"any"}),quarter:r({matchPatterns:C,defaultMatchWidth:"wide",parsePatterns:T,defaultParseWidth:"any",valueCallback:function i(e){return e+1}}),month:r({matchPatterns:X,defaultMatchWidth:"wide",parsePatterns:z,defaultParseWidth:"any"}),day:r({matchPatterns:R,defaultMatchWidth:"wide",parsePatterns:A,defaultParseWidth:"any"}),dayPeriod:r({matchPatterns:B,defaultMatchWidth:"any",parsePatterns:E,defaultParseWidth:"any"})};var G=i("default",{code:"lt",formatDistance:m,formatLong:g,formatRelative:b,localize:K,match:F,options:{weekStartsOn:1,firstWeekContainsDate:4}})}}}));