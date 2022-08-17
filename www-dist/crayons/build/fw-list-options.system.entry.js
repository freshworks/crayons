var __awaiter=this&&this.__awaiter||function(t,e,i,n){function s(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,o){function r(t){try{l(n.next(t))}catch(e){o(e)}}function a(t){try{l(n["throw"](t))}catch(e){o(e)}}function l(t){t.done?i(t.value):s(t.value).then(r,a)}l((n=n.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,s,o,r;return r={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(r[Symbol.iterator]=function(){return this}),r;function a(t){return function(e){return l([t,e])}}function l(r){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,s&&(o=r[0]&2?s["return"]:r[0]?s["throw"]||((o=s["return"])&&o.call(s),0):s.next)&&!(o=o.call(s,r[1])).done)return o;if(s=0,o)r=[r[0]&2,o.value];switch(r[0]){case 0:case 1:o=r;break;case 4:i.label++;return{value:r[1],done:false};case 5:i.label++;s=r[1];r=[0];continue;case 7:r=i.ops.pop();i.trys.pop();continue;default:if(!(o=i.trys,o=o.length>0&&o[o.length-1])&&(r[0]===6||r[0]===2)){i=0;continue}if(r[0]===3&&(!o||r[1]>o[0]&&r[1]<o[3])){i.label=r[1];break}if(r[0]===6&&i.label<o[1]){i.label=o[1];o=r;break}if(o&&i.label<o[2]){i.label=o[2];i.ops.push(r);break}if(o[2])i.ops.pop();i.trys.pop();continue}r=e.call(t,i)}catch(a){r=[6,a];s=0}finally{n=o=0}if(r[0]&5)throw r[1];return{value:r[0]?r[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(t,e){for(var i=0,n=e.length,s=t.length;i<n;i++,s++)t[s]=e[i];return t};System.register(["./index-c04bc24f.system.js","./index-8c48a083.system.js","./Translation-23f322dd.system.js"],(function(t){"use strict";var e,i,n,s,o,r,a,l,u;return{setters:[function(t){e=t.r;i=t.h;n=t.i;s=t.j},function(t){o=t.d;r=t.e;a=t.i;l=t.j},function(t){u=t.i}],execute:function(){var h=':host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.container{margin:0px;-webkit-padding-after:8px;padding-block-end:8px;padding-inline:8px;-webkit-padding-before:12px;padding-block-start:12px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}';var c=undefined&&undefined.__decorate||function(t,e,i,n){var s=arguments.length,o=s<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)if(r=t[a])o=(s<3?r(o):s>3?r(e,i,o):r(e,i))||o;return s>3&&o&&Object.defineProperty(e,i,o),o};var p=t("fw_list_options",function(){function t(t){var n=this;e(this,t);this.fwChange=i(this,"fwChange",7);this.fwLoading=i(this,"fwLoading",7);this.isInternalValueChange=false;this.arrowKeyCounter=0;this.optionRefs=[];this.defaultSearchFunction=function(t,e){return new Promise((function(i){var n=t.toLowerCase();var s=n!==""?e.filter((function(t){return t.text.toLowerCase().includes(n.toLowerCase())})):e;i(s)}))};this.filteredOptions=[];this.selectOptions=[];this.selectedOptionsState=[];this.isLoading=false;this.options=[];this.value="";this.max=Number.MAX_VALUE;this.multiple=false;this.searchable=false;this.disabled=false;this.variant="standard";this.checkbox=false;this.notFoundText="";this.search=this.defaultSearchFunction;this.searchText="";this.noDataText="";this.debounceTimer=300;this.selectedOptions=[];this.allowDeselect=true;this.handleSearchWithDebounce=o((function(t){var e;n.isLoading=true;n.fwLoading.emit({isLoading:n.isLoading});if(t){n.search(t,n.selectOptions).then((function(t){n.filteredOptions=(t===null||t===void 0?void 0:t.length)>0?n.serializeData(t):[{text:n.notFoundText,disabled:true}];n.isLoading=false;n.fwLoading.emit({isLoading:n.isLoading})}))}else{n.filteredOptions=((e=n.selectOptions)===null||e===void 0?void 0:e.length)>0?n.selectOptions:[{text:n.noDataText,disabled:true}];n.isLoading=false;n.fwLoading.emit({isLoading:n.isLoading})}}),this,this.debounceTimer)}t.prototype.fwSelectedHandler=function(t){var e=t.detail,i=e.value,n=e.selected;if(n){var s=this.filteredOptions.filter((function(t){return t.value===i}))[0];this.selectedOptionsState=this.multiple?__spreadArray(__spreadArray([],this.selectedOptionsState),[s]):[s]}else{this.selectedOptionsState=this.multiple?this.selectedOptionsState.filter((function(t){return t.value!==i})):[]}this.isInternalValueChange=true;this.setValue(this.selectedOptionsState)};t.prototype.onKeyDown=function(t){switch(t.key){case"ArrowDown":this.arrowKeyCounter=a(this.arrowKeyCounter,this.optionRefs.length-1);this.optionRefs[this.arrowKeyCounter].setFocus();t.preventDefault();t.stopPropagation();break;case"ArrowUp":this.arrowKeyCounter=r(this.arrowKeyCounter,this.optionRefs.length-1);this.optionRefs[this.arrowKeyCounter].setFocus();t.preventDefault();t.stopPropagation();break}};t.prototype.clearFilter=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this.filteredOptions=this.selectOptions;if(this.searchable){this.searchInput.value=""}return[2]}))}))};t.prototype.scrollToLastSelected=function(){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(e){if(this.filteredOptions.length>0&&this.valueExists()){(t=this.container.querySelector("fw-select-option[id='"+this.host.id+"-option-"+this.getLastSelectedValue()+"']"))===null||t===void 0?void 0:t.scrollIntoView({block:"nearest"})}return[2]}))}))};t.prototype.getSelectedOptions=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,this.selectedOptionsState]}))}))};t.prototype.setSelectedValues=function(t){return __awaiter(this,void 0,void 0,(function(){var e=this;return __generator(this,(function(i){if(this.options){this.selectedOptionsState=this.options.filter((function(i){return e.isValueEqual(t,i)}));this.isInternalValueChange=true;this.setValue(this.selectedOptionsState)}return[2]}))}))};t.prototype.setSelectedOptions=function(t){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){this.selectedOptionsState=t;this.isInternalValueChange=true;this.setValue(t);return[2]}))}))};t.prototype.setFocus=function(){return __awaiter(this,void 0,void 0,(function(){var t,e;return __generator(this,(function(i){this.optionRefs=__spreadArray([],this.container.getElementsByTagName("fw-select-option"));t=this.getLastSelectedValue();if(t&&this.optionRefs.length>0){e=this.optionRefs.findIndex((function(e){return e.value===t}));this.arrowKeyCounter=e===-1?0:e}this.optionRefs[this.arrowKeyCounter].setFocus();return[2]}))}))};t.prototype.onOptionsChange=function(t){this.setDataSource(t)};t.prototype.disabledWatcher=function(){var t=this.options;this.options=__spreadArray([],t)};t.prototype.onValueChange=function(t,e){var i=this;if(!l(t,e)){if(t){this.validateValue(t)}else{t=this.multiple?[]:""}this.selectOptions=this.selectOptions.map((function(e){e.selected=i.isValueEqual(t,e);return e}));if(!this.isInternalValueChange){var n=this.options.length>0?this.options:this.selectedOptionsState;this.selectedOptionsState=n.filter((function(e){return i.isValueEqual(t,e)}))}this.fwChange.emit({value:t,meta:{selectedOptions:this.selectedOptionsState}});this.isInternalValueChange=false}};t.prototype.onFilterTextChange=function(t){this.handleSearchWithDebounce(t)};t.prototype.valueExists=function(){return this.multiple?this.value.length>0:!!this.value};t.prototype.validateValue=function(t){if(this.multiple&&!Array.isArray(t)){throw new Error("Value must be a array for multi-select")}if(!this.multiple&&typeof t!=="string"&&typeof t!=="number"&&typeof t!=="bigint"){throw new Error("Value must be a string or number or bigint for single-select")}};t.prototype.getLastSelectedValue=function(){if(this.valueExists()){return this.multiple?this.value.slice(-1)[0]:this.value}};t.prototype.setSelectedOptionsByValue=function(t){var e=this;if(this.options){this.selectedOptionsState=this.options.filter((function(i){return e.isValueEqual(t,i)}))}else{throw new Error("Options must be passed if value is set")}};t.prototype.serializeData=function(t){var e=this;return t.map((function(t){var i;return Object.assign(Object.assign({},t),{checkbox:t.checkbox||e.checkbox,variant:t.variant||e.variant,selected:e.isValueEqual(e.value,t)||t.selected,disabled:t.disabled||e.disabled||e.multiple&&((i=e.value)===null||i===void 0?void 0:i.length)>=e.max,allowDeselect:e.allowDeselect})}))};t.prototype.isValueEqual=function(t,e){return this.multiple?t.includes(e.value):t===e.value};t.prototype.setValue=function(t){if((t===null||t===void 0?void 0:t.length)>0){this.value=this.multiple?t.map((function(t){return t.value})):t[0].value}else{this.value=this.multiple?[]:""}};t.prototype.setDataSource=function(t){if(t.length>0){this.selectOptions=this.serializeData(t)}else{this.selectOptions=[{text:this.noDataText,disabled:true}]}this.filteredOptions=this.selectOptions};t.prototype.renderSelectOptions=function(t){var e=this;return t.map((function(t){return n("fw-select-option",Object.assign({id:e.host.id+"-option-"+t.value,key:t.value},t))}))};t.prototype.renderSearchInput=function(){var t=this;return n("fw-input",{ref:function(e){return t.searchInput=e},placeholder:this.searchText,onInput:function(){return t.handleSearchWithDebounce(t.searchInput.value)}})};t.prototype.componentWillLoad=function(){this.validateValue(this.value);if(this.selectedOptions.length>0){this.selectedOptionsState=this.selectedOptions;this.value=this.multiple?this.selectedOptionsState.map((function(t){return t.value})):this.selectedOptionsState[0].value}else if(this.valueExists()){this.setSelectedOptionsByValue(this.value)}else{this.setValue([])}if(this.multiple&&typeof this.value==="string"){throw Error("value must be a array of string when multiple is true")}this.setDataSource(this.options)};t.prototype.render=function(){var t=this;return n("div",{class:"container",ref:function(e){t.container=e}},this.searchable&&this.renderSearchInput(),this.renderSelectOptions(this.filteredOptions))};Object.defineProperty(t.prototype,"host",{get:function(){return s(this)},enumerable:false,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{options:["onOptionsChange"],disabled:["disabledWatcher"],value:["onValueChange"],filterText:["onFilterTextChange"]}},enumerable:false,configurable:true});return t}());c([u({keyName:"search.noItemsFound"})],p.prototype,"notFoundText",void 0);c([u({keyName:"search.search"})],p.prototype,"searchText",void 0);c([u({keyName:"search.noDataAvailable"})],p.prototype,"noDataText",void 0);p.style=h}}}));