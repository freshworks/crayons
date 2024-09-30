var __awaiter=this&&this.__awaiter||function(e,t,i,n){function o(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,r){function s(e){try{c(n.next(e))}catch(t){r(t)}}function a(e){try{c(n["throw"](e))}catch(t){r(t)}}function c(e){e.done?i(e.value):o(e.value).then(s,a)}c((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},n,o,r,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(e){return function(t){return c([e,t])}}function c(s){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,o&&(r=s[0]&2?o["return"]:s[0]?o["throw"]||((r=o["return"])&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;if(o=0,r)s=[s[0]&2,r.value];switch(s[0]){case 0:case 1:r=s;break;case 4:i.label++;return{value:s[1],done:false};case 5:i.label++;o=s[1];s=[0];continue;case 7:s=i.ops.pop();i.trys.pop();continue;default:if(!(r=i.trys,r=r.length>0&&r[r.length-1])&&(s[0]===6||s[0]===2)){i=0;continue}if(s[0]===3&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(s[0]===6&&i.label<r[1]){i.label=r[1];r=s;break}if(r&&i.label<r[2]){i.label=r[2];i.ops.push(s);break}if(r[2])i.ops.pop();i.trys.pop();continue}s=t.call(e,i)}catch(a){s=[6,a];o=0}finally{n=r=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};System.register(["./index-c04bc24f.system.js","./index-d10c7ade.system.js"],(function(e){"use strict";var t,i,n,o,r,s;return{setters:[function(e){t=e.r;i=e.h;n=e.i;o=e.k;r=e.j},function(e){s=e.h}],execute:function(){var a=':host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (prefers-reduced-motion: reduce){.toast.is-open{-webkit-animation:none;animation:none}}.toast.is-open{display:block;-webkit-animation-duration:0.5s;animation-duration:0.5s;-webkit-animation-name:fadeIn;animation-name:fadeIn;z-index:999}.toast{display:none;position:relative;inset-block-start:10px;width:400px;-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-after:16px;padding-block-end:16px;-webkit-padding-end:0px;padding-inline-end:0px;-webkit-padding-before:0px;padding-block-start:0px;border:1px solid #ebeff3;border-radius:4px;background-color:#fff;-webkit-margin-after:16px;margin-block-end:16px;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06), 0px 2px 16px rgba(18, 52, 77, 0.16);box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06), 0px 2px 16px rgba(18, 52, 77, 0.16);overflow-wrap:anywhere;word-break:break-word;white-space:normal}.toast.success{-webkit-border-before:5px solid #00a886;border-block-start:5px solid #00a886}.toast.error{-webkit-border-before:5px solid #e43538;border-block-start:5px solid #e43538}.toast.warning{-webkit-border-before:5px solid #f48928;border-block-start:5px solid #f48928}.toast.inprogress{-webkit-border-before:5px solid #2c5cc5;border-block-start:5px solid #2c5cc5}.toast-container{-webkit-margin-before:16px;margin-block-start:16px;display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;place-content:center}.toast-container .content{color:#12344d;line-height:20px;-ms-flex:1 1 auto;flex:1 1 auto;font-size:14px;font-weight:500;vertical-align:top}.toast-container .icon{display:-ms-flexbox;display:flex;height:20px;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;margin-inline:16px;margin-block:0}.toast-container .remove{display:-ms-flexbox;display:flex;height:20px;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;margin-inline:12px;margin-block:0}.action-link{color:#2c5cc5;line-height:14px;cursor:pointer;font-size:12px;font-weight:600;padding-inline:0px;padding-block:8px}@-webkit-keyframes fadeOut{100%{inset-block-start:-600px}}@keyframes fadeOut{100%{inset-block-start:-600px}}@-webkit-keyframes fadeIn{0%{inset-block-start:-600px}100%{inset-block-start:10px}}@keyframes fadeIn{0%{inset-block-start:-600px}100%{inset-block-start:10px}}@media screen and (prefers-reduced-motion: reduce){.toast.fade-out{-webkit-animation:none;animation:none}}.toast.fade-out{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-name:fadeOut;animation-name:fadeOut}';var c={error:"#e43538",warning:"#f48928",info:"#2c5cc5",success:"#00a886"};var l=e("fw_toast_message",function(){function e(e){t(this,e);this.fwLinkClick=i(this,"fwLinkClick",7);this.fwRemoveToast=i(this,"fwRemoveToast",7);this.open=false;this.isTimedOut=false;this.fadeOut=false;this.iconSize=16;this.type="warning";this.timeout=4e3;this.actionLinkText="";this.sticky=false}e.prototype.openChanged=function(e){if(e)this.setUpToast()};e.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){if(this.open)this.setUpToast();return[2]}))}))};e.prototype.setUpToast=function(){return __awaiter(this,void 0,void 0,(function(){var e=this;return __generator(this,(function(t){this.fadeOut=false;this.isTimedOut=false;this.timerId=setTimeout((function(){return __awaiter(e,void 0,void 0,(function(){return __generator(this,(function(e){switch(e.label){case 0:if(!!this.sticky)return[3,3];if(!(!this.pauseOnHover||this.pauseOnHover&&!this.isMouseHovered))return[3,2];return[4,this.closeToast()];case 1:e.sent();e.label=2;case 2:this.isTimedOut=true;e.label=3;case 3:return[2]}}))}))}),this.timeout);return[2]}))}))};e.prototype.mouseHover=function(e){if(e===void 0){e=false}return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){switch(t.label){case 0:this.isMouseHovered=e;if(!(this.isTimedOut&&!this.isMouseHovered))return[3,2];return[4,this.closeToast()];case 1:t.sent();t.label=2;case 2:return[2]}}))}))};e.prototype.closingAnimation=function(){var e=this;this.fadeOut=true;return new Promise((function(t){return setTimeout((function(){e.open=false;e.fwRemoveToast.emit(e.controllerEl);t()}),500)}))};e.prototype.closeToast=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){switch(e.label){case 0:if(this.timerId){clearTimeout(this.timerId)}return[4,this.closingAnimation()];case 1:e.sent();return[2]}}))}))};e.prototype.disconnectedCallback=function(){this.fwRemoveToast.emit(this.controllerEl);if(this.timerId)clearTimeout(this.timerId)};e.prototype.render=function(){var e=this;return n(o,{onmouseover:function(){return e.mouseHover(true)},onmouseout:function(){return e.mouseHover(false)},"aria-hidden":this.open?"false":"true"},n("div",{class:"toast "+this.type+" "+(this.open?"is-open":"")+" "+(this.fadeOut?"fade-out":""),"aria-hidden":this.open?"false":"true"},n("div",{class:"toast-container"},this.type==="inprogress"?n("fw-spinner",{class:"icon"}):n("fw-icon",{class:"icon",size:this.iconSize,name:this.type,color:c[this.type]}),n("div",{class:"content"},n("slot",null),this.content,this.actionLinkText.length>0?n("div",{class:"action-link",role:"button",tabindex:"0",onClick:function(){return e.fwLinkClick.emit()},onKeyDown:s((function(){return e.fwLinkClick.emit()}))},this.actionLinkText):""),n("fw-icon",{size:10,name:"cross",class:"remove",color:"#183247",onClick:function(){return e.closeToast()},library:"system"}))))};Object.defineProperty(e.prototype,"controllerEl",{get:function(){return r(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{open:["openChanged"]}},enumerable:false,configurable:true});return e}());l.style=a}}}));