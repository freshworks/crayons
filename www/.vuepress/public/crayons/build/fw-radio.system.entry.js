var __awaiter=this&&this.__awaiter||function(e,t,i,o){function r(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,n){function a(e){try{l(o.next(e))}catch(t){n(t)}}function s(e){try{l(o["throw"](e))}catch(t){n(t)}}function l(e){e.done?i(e.value):r(e.value).then(a,s)}l((o=o.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},o,r,n,a;return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(e){return function(t){return l([e,t])}}function l(a){if(o)throw new TypeError("Generator is already executing.");while(i)try{if(o=1,r&&(n=a[0]&2?r["return"]:a[0]?r["throw"]||((n=r["return"])&&n.call(r),0):r.next)&&!(n=n.call(r,a[1])).done)return n;if(r=0,n)a=[a[0]&2,n.value];switch(a[0]){case 0:case 1:n=a;break;case 4:i.label++;return{value:a[1],done:false};case 5:i.label++;r=a[1];a=[0];continue;case 7:a=i.ops.pop();i.trys.pop();continue;default:if(!(n=i.trys,n=n.length>0&&n[n.length-1])&&(a[0]===6||a[0]===2)){i=0;continue}if(a[0]===3&&(!n||a[1]>n[0]&&a[1]<n[3])){i.label=a[1];break}if(a[0]===6&&i.label<n[1]){i.label=n[1];n=a;break}if(n&&i.label<n[2]){i.label=n[2];i.ops.push(a);break}if(n[2])i.ops.pop();i.trys.pop();continue}a=t.call(e,i)}catch(s){a=[6,s];r=0}finally{o=n=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};System.register(["./index-c04bc24f.system.js"],(function(e){"use strict";var t,i,o,r,n;return{setters:[function(e){t=e.r;i=e.h;o=e.i;r=e.k;n=e.j}],execute:function(){var a=':host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.radio-container{display:inline-block;position:relative;-webkit-padding-start:22px;padding-inline-start:22px;-webkit-margin-end:10px;margin-inline-end:10px;max-width:80ch;word-wrap:break-word}:host(:focus) input[type=radio]+label::before{border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5;border-color:#081824}:host(:focus) input[type=radio][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}:host(:hover) input[type=radio]+label::before{-webkit-box-shadow:0 0 0 5px #ebeff3;box-shadow:0 0 0 5px #ebeff3;border-color:#081824}:host(:hover) input[type=radio][disabled]+label{cursor:not-allowed}:host(:hover) input[type=radio][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}#description{font-size:12px;color:#475867;letter-spacing:0;line-height:20px;position:relative;font-weight:400}input[type=radio]{display:none}input[type=radio]+label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;-webkit-margin-after:4px;margin-block-end:4px;vertical-align:middle;font-size:14px;line-height:20px;font-weight:400;color:#12344d}input[type=radio]+label .with-description{font-weight:600}input[type=radio]+label::before,input[type=radio]+label::after{content:"";display:block;position:absolute;inset-block-start:0;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (prefers-reduced-motion: reduce){input[type=radio]+label::before{-webkit-transition:none;transition:none}}input[type=radio]+label::before{inset-inline-start:0;border:1px solid #cfd7df;border-radius:50px;inset-block-start:4px;width:14px;height:14px;background:#fff;-webkit-transition:all 0.3s ease;transition:all 0.3s ease}@media screen and (prefers-reduced-motion: reduce){input[type=radio]+label.error::before{-webkit-transition:none;transition:none}}input[type=radio]+label.error::before{inset-inline-start:0;border:1px solid #d72d30;border-radius:50px;inset-block-start:4px;width:14px;height:14px;background:#fff;-webkit-transition:all 0.3s ease;transition:all 0.3s ease}@media screen and (prefers-reduced-motion: reduce){input[type=radio]+label::after{-webkit-transition:none;transition:none}}input[type=radio]+label::after{inset-inline-start:3px;border-radius:100%;width:8px;height:8px;opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box}input[type=radio]:checked+label::before{background:#fff;border-color:#2c5cc5;-webkit-box-shadow:none;box-shadow:none}input[type=radio]:checked+label::after{border-radius:50%;background-color:#2c5cc5;opacity:1;inset-block-start:7px}input[type=radio]:checked:focus+label::before{border-color:#3868d3;-webkit-box-shadow:0 0 4px 1px rgba(44, 92, 197, 0.6);box-shadow:0 0 4px 1px rgba(44, 92, 197, 0.6)}input[type=radio]:checked:focus+label::after{background-color:#3868d3}input[type=radio][disabled]+label{color:#92a2b1}input[type=radio][disabled]+label .label-field{color:#92a2b1}input[type=radio][disabled]+label::before{border-color:#dadfe3;background-color:#ebeff3}input[type=radio][disabled]+label::after{border-color:#ebeff3;background-color:#dadfe3}input[type=radio][disabled]:checked+label{color:#92a2b1}:host(.fw-radio-group__radio){-webkit-margin-after:8px;margin-block-end:8px}:host(.fw-radio-group__radio--last){-webkit-margin-after:0px;margin-block-end:0px}';var s=e("fw_radio",function(){function e(e){t(this,e);this.fwSelect=i(this,"fwSelect",7);this.fwDeselect=i(this,"fwDeselect",7);this.fwFocus=i(this,"fwFocus",7);this.fwBlur=i(this,"fwBlur",7);this.fwChange=i(this,"fwChange",7);this.checked=false;this.disabled=false;this.description="";this.label="";this.value="";this.name="";this.state="normal"}e.prototype.componentDidLoad=function(){this.radio.checked=this.checked;this.radio.disabled=this.disabled};e.prototype.checkChanged=function(e){if(!this.disabled){if(e){this.fwSelect.emit({value:this.value,checked:true})}else{this.fwDeselect.emit({value:this.value,checked:false})}}this.radio.checked=e};e.prototype.disabledChanged=function(e){this.radio.disabled=e};e.prototype.onFocus=function(){this.fwFocus.emit()};e.prototype.onBlur=function(e){this.fwBlur.emit({event:e,name:this.name})};e.prototype.toggle=function(e){if(!this.disabled){this.checked=!this.checked}this.fwChange.emit({event:e,name:this.name,value:this.checked?this.value:undefined})};e.prototype.setFocus=function(){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(t){(e=this.host)===null||e===void 0?void 0:e.focus();return[2]}))}))};e.prototype.render=function(){var e=this;return o(r,{onClick:function(t){return e.toggle(t)},role:"radio",tabIndex:"-1","aria-labelledby":"label","aria-describedby":"description","aria-disabled":this.disabled?"true":"false","aria-checked":this.checked?"true":"false",onFocus:function(){return e.onFocus()},onBlur:function(t){return e.onBlur(t)},"aria-invalid":this.state==="error"},o("div",{class:"radio-container"},o("input",{type:"radio",ref:function(t){return e.radio=t},name:this.name}),o("label",{class:{error:this.state==="error"}},o("span",{id:"label",class:{"with-description":this.description!==""}},o("slot",null)),this.description!==""||this.label!==""?o("div",{id:"description"},this.description?this.description:this.label):"")))};Object.defineProperty(e.prototype,"host",{get:function(){return n(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{checked:["checkChanged"],disabled:["disabledChanged"]}},enumerable:false,configurable:true});return e}());s.style=a}}}));