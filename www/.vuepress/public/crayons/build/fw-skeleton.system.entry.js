System.register(["./index-c04bc24f.system.js"],(function(e){"use strict";var t,o,n;return{setters:[function(e){t=e.r;o=e.i;n=e.k}],execute:function(){var i=':host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.skeleton{-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;overflow:hidden;position:relative;background:var(--fw-skeleton-background, #cfd7df);border-radius:var(--fw-skeleton-border-radius, 999px);width:var(--fw-skeleton-width, 100%);height:var(--fw-skeleton-height, 16px);display:block;-webkit-margin-after:var(--fw-skeleton-margin-bottom, 8px);margin-block-end:var(--fw-skeleton-margin-bottom, 8px);will-change:auto}.skeleton:after,.skeleton:before{-webkit-box-sizing:border-box;box-sizing:border-box}.skeleton.circle{width:var(--fw-skeleton-width, 32px);height:var(--fw-skeleton-height, 32px);-webkit-margin-after:var(--fw-skeleton-margin-bottom, 8px);margin-block-end:var(--fw-skeleton-margin-bottom, 8px);border-radius:var(--fw-skeleton-border-radius, 50%)}.skeleton.rect{border-radius:var(--fw-skeleton-border-radius, 0px)}.skeleton.only{-webkit-margin-after:var(--fw-skeleton-margin-bottom, 0px);margin-block-end:var(--fw-skeleton-margin-bottom, 0px)}@media (prefers-reduced-motion: reduce){.skeleton.pulse,.skeleton.sheen{-webkit-animation:none;animation:none}}.skeleton.pulse{-webkit-animation:pulse 2s ease-in-out 0.5s infinite;animation:pulse 2s ease-in-out 0.5s infinite}:host(:not([dir="rtl"])) .skeleton.sheen,:host([dir="ltr"]) .skeleton.sheen{background:-webkit-gradient(linear, right top, left top, from(var(--fw-skeleton-sheen-color, #b1bdc8)), color-stop(var(--fw-skeleton-background, #cfd7df)), color-stop(var(--fw-skeleton-background, #cfd7df)), to(var(--fw-skeleton-sheen-color, #b1bdc8)));background:linear-gradient(270deg, var(--fw-skeleton-sheen-color, #b1bdc8), var(--fw-skeleton-background, #cfd7df), var(--fw-skeleton-background, #cfd7df), var(--fw-skeleton-sheen-color, #b1bdc8));-webkit-animation:sheen-ltr 8s ease-in-out infinite;animation:sheen-ltr 8s ease-in-out infinite}:host([dir="rtl"]) .skeleton.sheen{background:-webkit-gradient(linear, left top, right top, from(var(--fw-skeleton-sheen-color, #b1bdc8)), color-stop(var(--fw-skeleton-background, #cfd7df)), color-stop(var(--fw-skeleton-background, #cfd7df)), to(var(--fw-skeleton-sheen-color, #b1bdc8)));background:linear-gradient(-270deg, var(--fw-skeleton-sheen-color, #b1bdc8), var(--fw-skeleton-background, #cfd7df), var(--fw-skeleton-background, #cfd7df), var(--fw-skeleton-sheen-color, #b1bdc8));-webkit-animation:sheen-rtl 8s ease-in-out infinite;animation:sheen-rtl 8s ease-in-out infinite}@-webkit-keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}@-webkit-keyframes sheen-ltr{0%{background-position:200% 0}to{background-position:-200% 0}}@keyframes sheen-ltr{0%{background-position:200% 0}to{background-position:-200% 0}}@-webkit-keyframes sheen-rtl{0%{background-position:-100% 0}to{background-position:300% 0}}@keyframes sheen-rtl{0%{background-position:-100% 0}to{background-position:300% 0}}';var s=e("fw_skeleton",function(){function e(e){t(this,e);this.effect="pulse";this.variant="text";this.width=null;this.height=null;this.marginBottom=null;this.count=1;this.customStyles={};this.items=[]}e.prototype.componentWillLoad=function(){this.init()};e.prototype.componentWillUpdate=function(){this.init()};e.prototype.init=function(){this.items.length=this.count;this.items.fill(1);if(this.customStyles&&typeof this.customStyles==="string"){try{this.customStyles=JSON.parse(this.customStyles)}catch(e){console.warn("can't parse styles",this.customStyles)}}};Object.defineProperty(e.prototype,"style",{get:function(){var e={width:null,height:null,marginBottom:null};if(this.width){e.width=this.width}if(this.height){e.height=this.height}if(this.marginBottom){e.marginBottom=this.marginBottom}var t=typeof this.customStyles==="object"?this.customStyles:{};return Object.assign(Object.assign({},e),t)},enumerable:false,configurable:true});e.prototype.render=function(){var e=this;return o(n,null,this.items.map((function(t,n){return o("div",{part:"base",key:n,class:{circle:e.variant==="circle",rect:e.variant==="rect",skeleton:true,pulse:e.effect==="pulse",sheen:e.effect==="sheen",only:e.count===1},"aria-busy":"true","aria-live":"polite",style:e.style})})))};return e}());s.style=i}}}));