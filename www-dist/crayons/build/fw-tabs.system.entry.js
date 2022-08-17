var __awaiter=this&&this.__awaiter||function(t,e,i,a){function n(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,r){function s(t){try{l(a.next(t))}catch(e){r(e)}}function o(t){try{l(a["throw"](t))}catch(e){r(e)}}function l(t){t.done?i(t.value):n(t.value).then(s,o)}l((a=a.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var i={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},a,n,r,s;return s={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function o(t){return function(e){return l([t,e])}}function l(s){if(a)throw new TypeError("Generator is already executing.");while(i)try{if(a=1,n&&(r=s[0]&2?n["return"]:s[0]?n["throw"]||((r=n["return"])&&r.call(n),0):n.next)&&!(r=r.call(n,s[1])).done)return r;if(n=0,r)s=[s[0]&2,r.value];switch(s[0]){case 0:case 1:r=s;break;case 4:i.label++;return{value:s[1],done:false};case 5:i.label++;n=s[1];s=[0];continue;case 7:s=i.ops.pop();i.trys.pop();continue;default:if(!(r=i.trys,r=r.length>0&&r[r.length-1])&&(s[0]===6||s[0]===2)){i=0;continue}if(s[0]===3&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(s[0]===6&&i.label<r[1]){i.label=r[1];r=s;break}if(r&&i.label<r[2]){i.label=r[2];i.ops.push(s);break}if(r[2])i.ops.pop();i.trys.pop();continue}s=e.call(t,i)}catch(o){s=[6,o];n=0}finally{a=r=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};System.register(["./index-c04bc24f.system.js"],(function(t){"use strict";var e,i,a,n;return{setters:[function(t){e=t.r;i=t.h;a=t.i;n=t.j}],execute:function(){var r=':host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--fw-tabs-width, "inherit");height:var(--fw-tabs-height, "inherit")}.tabs__items__nav{padding:0;-webkit-padding-start:var(--fw-tabs-padding-left, 12px);padding-inline-start:var(--fw-tabs-padding-left, 12px);-webkit-padding-end:var(--fw-tabs-padding-right, 12px);padding-inline-end:var(--fw-tabs-padding-right, 12px);-webkit-margin-start:var(--fw-tabs-margin-l, 0);margin-inline-start:var(--fw-tabs-margin-l, 0);-webkit-margin-end:var(--fw-tabs-margin-r, 0);margin-inline-end:var(--fw-tabs-margin-r, 0);display:-ms-flexbox;display:flex;-webkit-border-after:1px solid #ebeff3;border-block-end:1px solid #ebeff3;overflow-x:auto;overflow-y:hidden}.tabs__items__nav__box{background-color:#f5f7f9;border:1px solid #ebeff3;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:4px}.tabs__items__tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative}';var s=t("fw_tabs",function(){function t(t){e(this,t);this.fwChange=i(this,"fwChange",7);this.label="";this.activeTabIndex=0;this.variant="normal"}t.prototype.syncTabsAndPanels=function(){this.tabs=Array.from(this.el.querySelectorAll("fw-tab")).filter((function(t){return!t.disabled}));this.panels=Array.from(this.el.querySelectorAll("fw-tab-panel"))};t.prototype.init=function(){this.syncTabsAndPanels();this.assignAriaLabels();this.setActiveTab(this.getActiveTab()||this.tabs[0],false)};t.prototype.createPanelIfRequired=function(){var t=this;var e=0;this.tabs=Array.from(this.el.querySelectorAll("fw-tab"));this.tabs.map((function(i){if(i.tabHeader){i.setAttribute("panel","panel-"+e++);i.setAttribute("slot","tab");var a=document.createElement("fw-tab-panel");a.innerHTML=i.innerHTML;a.setAttribute("id","fw-tab-panel-"+e++);a.setAttribute("name",i.getAttribute("panel")||i.panel);t.el.appendChild(a)}}))};t.prototype.assignAriaLabels=function(){var t=this;Array.from(this.el.querySelectorAll("fw-tab")).map((function(e){var i=t.panels.find((function(t){return t.name===e.getAttribute("panel")||e.panel}));if(i){e.setAttribute("aria-controls",i.getAttribute("id"));i.setAttribute("aria-labelledby",e.getAttribute("id"))}}))};t.prototype.activateTab=function(t,e){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(i){(t||t===0)&&(this.activeTabIndex=t);e&&(this.activeTabName=e);this.setActiveTab(this.getActiveTab(),false);return[2]}))}))};t.prototype.setActiveTab=function(t,e){var i=this;if(e===void 0){e=true}if(t&&t!==this.activeTab&&!t.disabled){this.activeTab=t;this.activeTabIndex=this.tabs.indexOf(t);this.tabs.map((function(t){return t.active=t===i.activeTab}));var a=this.activeTab.getAttribute("panel")||this.activeTab.panel;this.panels.map((function(t){return t.active=t.name===a}));if(e){this.fwChange.emit({tabIndex:this.activeTabIndex,tabName:this.activeTab.id})}}};t.prototype.componentWillLoad=function(){this.init()};t.prototype.connectedCallback=function(){var t=this;this.createPanelIfRequired();this.tabsMutation=new MutationObserver((function(){t.init()}));this.tabMutation=new MutationObserver((function(e){if(e.some((function(t){return t.attributeName==="disabled"}))){t.syncTabsAndPanels()}}));this.tabsMutation.observe(this.el,{childList:true,attributes:true});Array.from(this.el.querySelectorAll("fw-tab")).forEach((function(e){t.tabMutation.observe(e,{attributes:true})}))};t.prototype.disconnectedCallback=function(){var t,e;(t=this.tabsMutation)===null||t===void 0?void 0:t.disconnect();(e=this.tabMutation)===null||e===void 0?void 0:e.disconnect();this.tabsMutation=undefined;this.tabMutation=undefined};t.prototype.getActiveTab=function(){var t=this;return(this.activeTabIndex||this.activeTabIndex===0)&&this.tabs[this.activeTabIndex]||this.tabs.find((function(e){return e.id===t.activeTabName||e.active}))};t.prototype.handleClick=function(t){var e=t.target;var i=e.closest("fw-tab");var a=i===null||i===void 0?void 0:i.closest("fw-tabs");if(a!==this.el){return}if(i){this.setActiveTab(i)}};t.prototype.handleKeyDown=function(t){var e=t.target;var i=e.closest("fw-tab");var a=i===null||i===void 0?void 0:i.closest("fw-tabs");if(a!==this.el){return}switch(t.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":t.preventDefault();break}};t.prototype.handleKeyUp=function(t){var e=t.target;var i=e.closest("fw-tab");var a=i===null||i===void 0?void 0:i.closest("fw-tabs");if(a!==this.el){return}if(this.activeTabIndex!==undefined){var n=this.activeTabIndex;switch(t.code){case"ArrowLeft":case"ArrowUp":n=(n-1+this.tabs.length)%this.tabs.length;break;case"ArrowRight":case"ArrowDown":n=(n+1)%this.tabs.length;break;default:return}this.tabs[n].focus();this.setActiveTab(this.tabs[n])}};t.prototype.render=function(){return a("div",{class:"tabs"},a("div",{class:"tabs__items__nav"+(this.variant==="box"?"__box":"")},a("div",{class:"tabs__items__tabs",role:"tablist","aria-label":this.label},a("slot",{name:"tab"}))),a("slot",null))};Object.defineProperty(t.prototype,"el",{get:function(){return n(this)},enumerable:false,configurable:true});return t}());s.style=r}}}));