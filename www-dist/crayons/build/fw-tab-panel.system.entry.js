System.register(["./index-c04bc24f.system.js"],(function(e){"use strict";var t,i,n,a;return{setters:[function(e){t=e.r;i=e.i;n=e.k;a=e.j}],execute:function(){var o=':host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block;padding:0;width:var(--fw-tab-panel-width, "inherit");height:var(--fw-tab-panel-height, "inherit")}';var r=0;var s=e("fw_tab_panel",function(){function e(e){t(this,e);this.name="";this.active=false}e.prototype.connectedCallback=function(){if(!this.el.id){this.el.id="fw-tab-panel-"+r++}};e.prototype.render=function(){this.el.style.display=this.active?"block":"none";return i(n,{role:"tabpanel","aria-hidden":this.active?"false":"true"},i("slot",null))};Object.defineProperty(e.prototype,"el",{get:function(){return a(this)},enumerable:false,configurable:true});return e}());s.style=o}}}));