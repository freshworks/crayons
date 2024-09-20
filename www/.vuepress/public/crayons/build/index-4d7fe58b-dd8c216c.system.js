System.register(["./index-dc611d24-4c9389ae.system.js"],(function(e){"use strict";var t,n,a,o;return{setters:[function(e){t=e.b;n=e.a;a=e.c;o=e.d}],execute:function(){var i={lessThanXSeconds:{standalone:{one:"సెకను కన్నా తక్కువ",other:"{{count}} సెకన్ల కన్నా తక్కువ"},withPreposition:{one:"సెకను",other:"{{count}} సెకన్ల"}},xSeconds:{standalone:{one:"ఒక సెకను",other:"{{count}} సెకన్ల"},withPreposition:{one:"ఒక సెకను",other:"{{count}} సెకన్ల"}},halfAMinute:{standalone:"అర నిమిషం",withPreposition:"అర నిమిషం"},lessThanXMinutes:{standalone:{one:"ఒక నిమిషం కన్నా తక్కువ",other:"{{count}} నిమిషాల కన్నా తక్కువ"},withPreposition:{one:"ఒక నిమిషం",other:"{{count}} నిమిషాల"}},xMinutes:{standalone:{one:"ఒక నిమిషం",other:"{{count}} నిమిషాలు"},withPreposition:{one:"ఒక నిమిషం",other:"{{count}} నిమిషాల"}},aboutXHours:{standalone:{one:"సుమారు ఒక గంట",other:"సుమారు {{count}} గంటలు"},withPreposition:{one:"సుమారు ఒక గంట",other:"సుమారు {{count}} గంటల"}},xHours:{standalone:{one:"ఒక గంట",other:"{{count}} గంటలు"},withPreposition:{one:"ఒక గంట",other:"{{count}} గంటల"}},xDays:{standalone:{one:"ఒక రోజు",other:"{{count}} రోజులు"},withPreposition:{one:"ఒక రోజు",other:"{{count}} రోజుల"}},aboutXWeeks:{standalone:{one:"సుమారు ఒక వారం",other:"సుమారు {{count}} వారాలు"},withPreposition:{one:"సుమారు ఒక వారం",other:"సుమారు {{count}} వారాలల"}},xWeeks:{standalone:{one:"ఒక వారం",other:"{{count}} వారాలు"},withPreposition:{one:"ఒక వారం",other:"{{count}} వారాలల"}},aboutXMonths:{standalone:{one:"సుమారు ఒక నెల",other:"సుమారు {{count}} నెలలు"},withPreposition:{one:"సుమారు ఒక నెల",other:"సుమారు {{count}} నెలల"}},xMonths:{standalone:{one:"ఒక నెల",other:"{{count}} నెలలు"},withPreposition:{one:"ఒక నెల",other:"{{count}} నెలల"}},aboutXYears:{standalone:{one:"సుమారు ఒక సంవత్సరం",other:"సుమారు {{count}} సంవత్సరాలు"},withPreposition:{one:"సుమారు ఒక సంవత్సరం",other:"సుమారు {{count}} సంవత్సరాల"}},xYears:{standalone:{one:"ఒక సంవత్సరం",other:"{{count}} సంవత్సరాలు"},withPreposition:{one:"ఒక సంవత్సరం",other:"{{count}} సంవత్సరాల"}},overXYears:{standalone:{one:"ఒక సంవత్సరం పైగా",other:"{{count}} సంవత్సరాలకు పైగా"},withPreposition:{one:"ఒక సంవత్సరం",other:"{{count}} సంవత్సరాల"}},almostXYears:{standalone:{one:"దాదాపు ఒక సంవత్సరం",other:"దాదాపు {{count}} సంవత్సరాలు"},withPreposition:{one:"దాదాపు ఒక సంవత్సరం",other:"దాదాపు {{count}} సంవత్సరాల"}}};function r(e,t,n){n=n||{};var a=n.addSuffix?i[e].withPreposition:i[e].standalone;var o;if(typeof a==="string"){o=a}else if(t===1){o=a.one}else{o=a.other.replace("{{count}}",t)}if(n.addSuffix){if(n.comparison>0){return o+"లో"}else{return o+" క్రితం"}}return o}var d={full:"d, MMMM y, EEEE",long:"d MMMM, y",medium:"d MMM, y",short:"dd-MM-yy"};var s={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"};var h={full:"{{date}} {{time}}'కి'",long:"{{date}} {{time}}'కి'",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"};var u={date:t({formats:d,defaultWidth:"full"}),time:t({formats:s,defaultWidth:"full"}),dateTime:t({formats:h,defaultWidth:"full"})};var l={lastWeek:"'గత' eeee p",yesterday:"'నిన్న' p",today:"'ఈ రోజు' p",tomorrow:"'రేపు' p",nextWeek:"'తదుపరి' eeee p",other:"P"};function m(e,t,n,a){return l[e]}var c={narrow:["క్రీ.పూ.","క్రీ.శ."],abbreviated:["క్రీ.పూ.","క్రీ.శ."],wide:["క్రీస్తు పూర్వం","క్రీస్తుశకం"]};var f={narrow:["1","2","3","4"],abbreviated:["త్రై1","త్రై2","త్రై3","త్రై4"],wide:["1వ త్రైమాసికం","2వ త్రైమాసికం","3వ త్రైమాసికం","4వ త్రైమాసికం"]};var v={narrow:["జ","ఫి","మా","ఏ","మే","జూ","జు","ఆ","సె","అ","న","డి"],abbreviated:["జన","ఫిబ్ర","మార్చి","ఏప్రి","మే","జూన్","జులై","ఆగ","సెప్టెం","అక్టో","నవం","డిసెం"],wide:["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జులై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్"]};var w={narrow:["ఆ","సో","మ","బు","గు","శు","శ"],short:["ఆది","సోమ","మంగళ","బుధ","గురు","శుక్ర","శని"],abbreviated:["ఆది","సోమ","మంగళ","బుధ","గురు","శుక్ర","శని"],wide:["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"]};var p={narrow:{am:"పూర్వాహ్నం",pm:"అపరాహ్నం",midnight:"అర్ధరాత్రి",noon:"మిట్టమధ్యాహ్నం",morning:"ఉదయం",afternoon:"మధ్యాహ్నం",evening:"సాయంత్రం",night:"రాత్రి"},abbreviated:{am:"పూర్వాహ్నం",pm:"అపరాహ్నం",midnight:"అర్ధరాత్రి",noon:"మిట్టమధ్యాహ్నం",morning:"ఉదయం",afternoon:"మధ్యాహ్నం",evening:"సాయంత్రం",night:"రాత్రి"},wide:{am:"పూర్వాహ్నం",pm:"అపరాహ్నం",midnight:"అర్ధరాత్రి",noon:"మిట్టమధ్యాహ్నం",morning:"ఉదయం",afternoon:"మధ్యాహ్నం",evening:"సాయంత్రం",night:"రాత్రి"}};var g={narrow:{am:"పూర్వాహ్నం",pm:"అపరాహ్నం",midnight:"అర్ధరాత్రి",noon:"మిట్టమధ్యాహ్నం",morning:"ఉదయం",afternoon:"మధ్యాహ్నం",evening:"సాయంత్రం",night:"రాత్రి"},abbreviated:{am:"పూర్వాహ్నం",pm:"అపరాహ్నం",midnight:"అర్ధరాత్రి",noon:"మిట్టమధ్యాహ్నం",morning:"ఉదయం",afternoon:"మధ్యాహ్నం",evening:"సాయంత్రం",night:"రాత్రి"},wide:{am:"పూర్వాహ్నం",pm:"అపరాహ్నం",midnight:"అర్ధరాత్రి",noon:"మిట్టమధ్యాహ్నం",morning:"ఉదయం",afternoon:"మధ్యాహ్నం",evening:"సాయంత్రం",night:"రాత్రి"}};function P(e,t){var n=Number(e);return n+"వ"}var b={ordinalNumber:P,era:n({values:c,defaultWidth:"wide"}),quarter:n({values:f,defaultWidth:"wide",argumentCallback:function e(t){return Number(t)-1}}),month:n({values:v,defaultWidth:"wide"}),day:n({values:w,defaultWidth:"wide"}),dayPeriod:n({values:p,defaultWidth:"wide",formattingValues:g,defaultFormattingWidth:"wide"})};var y=/^(\d+)(వ)?/i;var W=/\d+/i;var M={narrow:/^(క్రీ\.పూ\.|క్రీ\.శ\.)/i,abbreviated:/^(క్రీ\.?\s?పూ\.?|ప్ర\.?\s?శ\.?\s?పూ\.?|క్రీ\.?\s?శ\.?|సా\.?\s?శ\.?)/i,wide:/^(క్రీస్తు పూర్వం|ప్రస్తుత శకానికి పూర్వం|క్రీస్తు శకం|ప్రస్తుత శకం)/i};var x={any:[/^(పూ|శ)/i,/^సా/i]};var k={narrow:/^[1234]/i,abbreviated:/^త్రై[1234]/i,wide:/^[1234](వ)? త్రైమాసికం/i};var X={any:[/1/i,/2/i,/3/i,/4/i]};var z={narrow:/^(జూ|జు|జ|ఫి|మా|ఏ|మే|ఆ|సె|అ|న|డి)/i,abbreviated:/^(జన|ఫిబ్ర|మార్చి|ఏప్రి|మే|జూన్|జులై|ఆగ|సెప్|అక్టో|నవ|డిసె)/i,wide:/^(జనవరి|ఫిబ్రవరి|మార్చి|ఏప్రిల్|మే|జూన్|జులై|ఆగస్టు|సెప్టెంబర్|అక్టోబర్|నవంబర్|డిసెంబర్)/i};var S={narrow:[/^జ/i,/^ఫి/i,/^మా/i,/^ఏ/i,/^మే/i,/^జూ/i,/^జు/i,/^ఆ/i,/^సె/i,/^అ/i,/^న/i,/^డి/i],any:[/^జన/i,/^ఫి/i,/^మా/i,/^ఏ/i,/^మే/i,/^జూన్/i,/^జులై/i,/^ఆగ/i,/^సె/i,/^అ/i,/^న/i,/^డి/i]};var C={narrow:/^(ఆ|సో|మ|బు|గు|శు|శ)/i,short:/^(ఆది|సోమ|మం|బుధ|గురు|శుక్ర|శని)/i,abbreviated:/^(ఆది|సోమ|మం|బుధ|గురు|శుక్ర|శని)/i,wide:/^(ఆదివారం|సోమవారం|మంగళవారం|బుధవారం|గురువారం|శుక్రవారం|శనివారం)/i};var E={narrow:[/^ఆ/i,/^సో/i,/^మ/i,/^బు/i,/^గు/i,/^శు/i,/^శ/i],any:[/^ఆది/i,/^సోమ/i,/^మం/i,/^బుధ/i,/^గురు/i,/^శుక్ర/i,/^శని/i]};var N={narrow:/^(పూర్వాహ్నం|అపరాహ్నం|అర్ధరాత్రి|మిట్టమధ్యాహ్నం|ఉదయం|మధ్యాహ్నం|సాయంత్రం|రాత్రి)/i,any:/^(పూర్వాహ్నం|అపరాహ్నం|అర్ధరాత్రి|మిట్టమధ్యాహ్నం|ఉదయం|మధ్యాహ్నం|సాయంత్రం|రాత్రి)/i};var Y={any:{am:/^పూర్వాహ్నం/i,pm:/^అపరాహ్నం/i,midnight:/^అర్ధ/i,noon:/^మిట్ట/i,morning:/ఉదయం/i,afternoon:/మధ్యాహ్నం/i,evening:/సాయంత్రం/i,night:/రాత్రి/i}};var D={ordinalNumber:a({matchPattern:y,parsePattern:W,valueCallback:function e(t){return parseInt(t,10)}}),era:o({matchPatterns:M,defaultMatchWidth:"wide",parsePatterns:x,defaultParseWidth:"any"}),quarter:o({matchPatterns:k,defaultMatchWidth:"wide",parsePatterns:X,defaultParseWidth:"any",valueCallback:function e(t){return t+1}}),month:o({matchPatterns:z,defaultMatchWidth:"wide",parsePatterns:S,defaultParseWidth:"any"}),day:o({matchPatterns:C,defaultMatchWidth:"wide",parsePatterns:E,defaultParseWidth:"any"}),dayPeriod:o({matchPatterns:N,defaultMatchWidth:"any",parsePatterns:Y,defaultParseWidth:"any"})};var T=e("default",{code:"te",formatDistance:r,formatLong:u,formatRelative:m,localize:b,match:D,options:{weekStartsOn:0,firstWeekContainsDate:1}})}}}));