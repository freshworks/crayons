(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{"./packages/crayons-core/dist/esm-es5/fw-tabs.entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"fw_tabs",(function(){return Tabs}));__webpack_require__("./node_modules/core-js/modules/es.promise.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.description.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.array.from.js"),__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),__webpack_require__("./node_modules/core-js/modules/es.array.find.js"),__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("./node_modules/core-js/modules/es.array.some.js"),__webpack_require__("./node_modules/core-js/modules/es.array.for-each.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js");var _index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__("./packages/crayons-core/dist/esm-es5/index-25bc21e4.js"),__awaiter=function(t,e,i,a){function n(t){return t instanceof i?t:new i((function(e){e(t)}))}return new(i||(i=Promise))((function(i,r){function s(t){try{l(a.next(t))}catch(e){r(e)}}function o(t){try{l(a.throw(t))}catch(e){r(e)}}function l(t){t.done?i(t.value):n(t.value).then(s,o)}l((a=a.apply(t,e||[])).next())}))},__generator=function(t,e){var a,n,r,s,i={label:0,sent:function sent(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(t){return function(e){return l([t,e])}}function l(s){if(a)throw new TypeError("Generator is already executing.");for(;i;)try{if(a=1,n&&(r=2&s[0]?n.return:s[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,s[1])).done)return r;switch(n=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){i.label=s[1];break}if(6===s[0]&&i.label<r[1]){i.label=r[1],r=s;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(s);break}r[2]&&i.ops.pop(),i.trys.pop();continue}s=e.call(t,i)}catch(o){s=[6,o],n=0}finally{a=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}},Tabs=function(){function t(t){Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__.l)(this,t),this.fwChange=Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__.e)(this,"fwChange",7),this.label="",this.activeTabIndex=0,this.variant="normal"}return t.prototype.syncTabsAndPanels=function(){this.tabs=Array.from(this.el.querySelectorAll("fw-tab")).filter((function(t){return!t.disabled})),this.panels=Array.from(this.el.querySelectorAll("fw-tab-panel"))},t.prototype.init=function(){this.syncTabsAndPanels(),this.assignAriaLabels(),this.setActiveTab(this.getActiveTab()||this.tabs[0],!1)},t.prototype.createPanelIfRequired=function(){var t=this,e=0;this.tabs=Array.from(this.el.querySelectorAll("fw-tab")),this.tabs.map((function(i){if(i.tabHeader){i.setAttribute("panel","panel-"+e++),i.setAttribute("slot","tab");var a=document.createElement("fw-tab-panel");a.innerHTML=i.innerHTML,a.setAttribute("id","fw-tab-panel-"+e++),a.setAttribute("name",i.getAttribute("panel")||i.panel),t.el.appendChild(a)}}))},t.prototype.assignAriaLabels=function(){var t=this;Array.from(this.el.querySelectorAll("fw-tab")).map((function(e){var i=t.panels.find((function(t){return t.name===e.getAttribute("panel")||e.panel}));i&&(e.setAttribute("aria-controls",i.getAttribute("id")),i.setAttribute("aria-labelledby",e.getAttribute("id")))}))},t.prototype.activateTab=function(t,e){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(i){return t&&(this.activeTabIndex=t),e&&(this.activeTabName=e),this.setActiveTab(this.getActiveTab(),!1),[2]}))}))},t.prototype.setActiveTab=function(t,e){var i=this;if(void 0===e&&(e=!0),t&&t!==this.activeTab&&!t.disabled){this.activeTab=t,this.activeTabIndex=this.tabs.indexOf(t),this.tabs.map((function(t){return t.active=t===i.activeTab}));var a=this.activeTab.getAttribute("panel")||this.activeTab.panel;this.panels.map((function(t){return t.active=t.name===a})),e&&this.fwChange.emit({tabIndex:this.activeTabIndex,tabName:this.activeTab.id})}},t.prototype.componentWillLoad=function(){this.init()},t.prototype.connectedCallback=function(){var t=this;this.createPanelIfRequired(),this.tabsMutation=new MutationObserver((function(){t.init()})),this.tabMutation=new MutationObserver((function(e){e.some((function(t){return"disabled"===t.attributeName}))&&t.syncTabsAndPanels()})),this.tabsMutation.observe(this.el,{childList:!0,attributes:!0}),Array.from(this.el.querySelectorAll("fw-tab")).forEach((function(e){t.tabMutation.observe(e,{attributes:!0})}))},t.prototype.disconnectedCallback=function(){var t,e;null===(t=this.tabsMutation)||void 0===t||t.disconnect(),null===(e=this.tabMutation)||void 0===e||e.disconnect(),this.tabsMutation=void 0,this.tabMutation=void 0},t.prototype.getActiveTab=function(){var t=this;return this.activeTabIndex&&this.tabs[this.activeTabIndex]||this.tabs.find((function(e){return e.id===t.activeTabName||e.active}))},t.prototype.handleClick=function(t){var i=t.target.closest("fw-tab");(null==i?void 0:i.closest("fw-tabs"))===this.el&&i&&this.setActiveTab(i)},t.prototype.handleKeyDown=function(t){var i=t.target.closest("fw-tab");if((null==i?void 0:i.closest("fw-tabs"))===this.el)switch(t.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":t.preventDefault()}},t.prototype.handleKeyUp=function(t){var i=t.target.closest("fw-tab");if((null==i?void 0:i.closest("fw-tabs"))===this.el&&void 0!==this.activeTabIndex){var n=this.activeTabIndex;switch(t.code){case"ArrowLeft":case"ArrowUp":n=(n-1+this.tabs.length)%this.tabs.length;break;case"ArrowRight":case"ArrowDown":n=(n+1)%this.tabs.length;break;default:return}this.tabs[n].focus(),this.setActiveTab(this.tabs[n])}},t.prototype.render=function(){return Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__.i)("div",{class:"tabs"},Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__.i)("div",{class:"tabs__items__nav"+("box"===this.variant?"__box":"")},Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__.i)("div",{class:"tabs__items__tabs",role:"tablist","aria-label":this.label},Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__.i)("slot",{name:"tab"}))),Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__.i)("slot",null))},Object.defineProperty(t.prototype,"el",{get:function get(){return Object(_index_25bc21e4_js__WEBPACK_IMPORTED_MODULE_18__.j)(this)},enumerable:!1,configurable:!0}),t}();Tabs.style=':host{font-family:-apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--fw-tabs-width, "inherit");height:var(--fw-tabs-height, "inherit")}.tabs__items__nav{padding:0;padding-left:var(--fw-tabs-padding-left, 12px);padding-right:var(--fw-tabs-padding-right, 12px);margin-left:var(--fw-tabs-margin-l, 0);margin-right:var(--fw-tabs-margin-r, 0);display:-ms-flexbox;display:flex;border-bottom:1px solid #ebeff3;overflow-x:auto;overflow-y:hidden}.tabs__items__nav__box{background-color:#f5f7f9;border:1px solid #ebeff3;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:4px}.tabs__items__tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative}'}}]);