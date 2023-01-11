import{r as e,h as t,c as i,e as o,i as s}from"./p-c5706edf.js";import{h as a,r as n,p as r}from"./p-79178ffe.js";import{c as l}from"./p-d4599615.js";let h=class{constructor(t){e(this,t),this.shape="circle",this.name="",this.size="large",this.mode="dark"}getInitials(){let e="";if(this.initials)e=this.initials;else if(this.name.trim().length>0){const t=this.name.trim().split(" ");1===t.length?e=t.shift().charAt(0):t.length>1&&(e=t.shift().charAt(0)+t.pop().charAt(0))}return e}render(){let e=`avatar \n    avatar--${this.shape}\n    avatar--${this.size}\n    avatar--${this.mode}\n    `;return this.image||(e+=` avatar--${this.mode}--initials`),t("div",{class:e,"aria-label":this.alt},this.image?t("img",{part:"image",class:"avatar__image",src:this.image,alt:this.alt}):t("div",{part:"initials",class:"avatar__initials"},this.getInitials()))}};h.style=':host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:inline-block;--size:3rem}.avatar{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:calc(var(--size) * 0.5);font-weight:400;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle}.avatar__initials{line-height:1;font-weight:600;font-size:32px;text-align:center;text-transform:uppercase}.avatar__image{position:absolute;inset-block-start:0;inset-inline-start:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.avatar--dark{background-color:#527fa5;color:#fff}.avatar--dark--initials{border:2px solid rgba(18, 52, 77, 0.16)}.avatar--light{background-color:#dff0ff;color:#12344d}.avatar--light--initials{border:2px solid #bedbf5}.avatar--circle{border-radius:50%}.avatar--rounded{border-radius:4px}.avatar--square{border-radius:0}.avatar--xxlarge{width:96px;height:96px}.avatar--xxlarge .avatar__initials{font-size:32px}.avatar--xlarge{width:72px;height:72px}.avatar--xlarge .avatar__initials{font-size:24px}.avatar--large{width:56px;height:56px}.avatar--large .avatar__initials{font-size:20px}.avatar--medium{width:40px;height:40px}.avatar--medium .avatar__initials{font-size:16px}.avatar--small{width:32px;height:32px}.avatar--small .avatar__initials{font-size:14px}.avatar--xsmall{width:24px;height:24px}.avatar--xsmall .avatar__initials{font-size:12px}.avatar--xxsmall{width:20px;height:20px}.avatar--xxsmall .avatar__initials{font-size:10px}';let c=class{constructor(t){e(this,t),this.fwChange=i(this,"fwChange",7),this.fwFocus=i(this,"fwFocus",7),this.fwBlur=i(this,"fwBlur",7),this.checked=!1,this.disabled=!1,this.description="",this.label="",this.name="",this.value="",this.required=!1,this.state="normal",this.hintText="",this.warningText="",this.errorText="",this.hasHintTextSlot=!1,this.hasWarningTextSlot=!1,this.hasErrorTextSlot=!1,this.onFocus=()=>{this.fwFocus.emit()},this.onBlur=e=>{this.fwBlur.emit({event:e,name:this.name})},this.toggle=e=>{this.disabled||(this.checked=!this.checked,this.fwChange.emit({event:e,value:this.value,name:this.name,meta:{checked:this.checked}}))}}componentDidLoad(){this.checkbox.checked=this.checked,this.checkbox.disabled=this.disabled}checkChanged(e){this.checkbox.checked=e}componentWillLoad(){this.checkSlotContent()}checkSlotContent(){this.hasHintTextSlot=a(this.host,"hint-text"),this.hasWarningTextSlot=a(this.host,"warning-text"),this.hasErrorTextSlot=a(this.host,"error-text")}async setFocus(){var e;null===(e=this.host)||void 0===e||e.focus()}disabledChanged(e){this.checkbox.disabled=e}handleKeydown(e){"Space"===e.code&&e.preventDefault()}handleKeyup(e){"Space"===e.code&&this.toggle(e)}getAriaDescribedBy(){return"normal"===this.state?`hint-${this.name}`:"error"===this.state?`error-${this.name}`:"warning"===this.state?`warning-${this.name}`:null}render(){const{host:e,name:i,value:s}=this;this.checked&&n(e,i,s);const a=!!this.hintText||this.hasHintTextSlot,r=!!this.errorText||this.hasErrorTextSlot,l=!!this.warningText||this.hasWarningTextSlot,h="normal"===this.state,c="error"===this.state,b="warning"===this.state,d=`hint-${this.name}`,p=`warning-${this.name}`,x=`error-${this.name}`;return t(o,{role:"checkbox",tabIndex:"0","aria-disabled":this.disabled?"true":"false","aria-checked":this.checked?"true":"false","aria-labelledby":"label","aria-describedby":`description ${this.getAriaDescribedBy()}`,onClick:this.toggle,onFocus:this.onFocus,onBlur:this.onBlur,"aria-invalid":"error"===this.state},t("div",{class:{"checkbox-container":!0,disabled:this.disabled}},t("input",{type:"checkbox",ref:e=>this.checkbox=e,required:this.required,name:this.name,id:this.name}),t("label",{class:{error:"error"===this.state}},t("span",{id:"label",class:{"with-description":""!==this.description,required:this.required}},t("slot",null)),""!==this.description||""!==this.label?t("div",{id:"description"},this.description?this.description:this.label):"",this.checked&&t("span",{class:"after"},t("fw-icon",{name:"check",color:this.disabled?"#92A2B1":"#ffffff",size:8})))),h&&a&&t("div",{id:d,class:"field-control-hint-text","aria-hidden":a?"false":"true"},t("slot",{name:"hint-text"},this.hintText)),c&&r&&t("div",{id:x,class:"field-control-error-text","aria-hidden":r?"false":"true"},t("slot",{name:"error-text"},this.errorText)),b&&l&&t("div",{id:p,class:"field-control-warning-text","aria-hidden":l?"false":"true"},t("slot",{name:"warning-text"},this.warningText)))}get host(){return s(this)}static get watchers(){return{checked:["checkChanged"],disabled:["disabledChanged"]}}};c.style=':host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.field-control{position:relative}.field-control-label{display:block;font-size:12px;color:var(--fw-label-color, #475867);font-weight:600;-webkit-margin-after:4px;margin-block-end:4px;-webkit-padding-start:2px;padding-inline-start:2px;line-height:20px}.field-control-label.required::after{content:"*";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}.field-control-hint-text{font-family:-apple-system, blinkmacsystemfont, "Segoe UI", "Roboto", "Helvetica Neue", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-hint-color, #acb6be);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-error-text{font-family:-apple-system, blinkmacsystemfont, "Segoe UI", "Roboto", "Helvetica Neue", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-error-color, #d72d30);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-warning-text{font-family:-apple-system, blinkmacsystemfont, "Segoe UI", "Roboto", "Helvetica Neue", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-warning-color, #f8ab59);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}:host{display:inline-block;position:relative}:host(:focus){outline:none}:host(:focus) input[type=checkbox]+label::before{border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}:host(:focus) input[type=checkbox]:checked+label::before{border:1px solid #ffffff}:host(:focus) input[type=checkbox][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}:host(:hover) input[type=checkbox]+label::before{border-color:#cfd7df;-webkit-box-shadow:0 0 0 5px #ebeff3;box-shadow:0 0 0 5px #ebeff3}:host(:hover) input[type=checkbox]:checked+label::before{border-color:#2c5cc5}:host(:hover) input[type=checkbox][disabled]+label{cursor:not-allowed}:host(:hover) input[type=checkbox][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}.checkbox-container{cursor:pointer}.checkbox-container.disabled{cursor:not-allowed}#description{font-size:12px;color:#475867;letter-spacing:0;line-height:20px;position:relative;font-weight:400;word-wrap:break-word;-webkit-padding-start:22px;padding-inline-start:22px}input[type=checkbox]{display:none}input[type=checkbox]+label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-margin-after:0;margin-block-end:0;vertical-align:middle;font-size:14px;color:#12344d;line-height:20px;font-weight:400;cursor:inherit}input[type=checkbox]+label .with-description{font-weight:600}input[type=checkbox]+label #label{-webkit-padding-start:22px;padding-inline-start:22px;box-decoration-break:clone;-webkit-box-decoration-break:clone}input[type=checkbox]+label #label.required::after{content:"*";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}@media screen and (prefers-reduced-motion: reduce){input[type=checkbox]+label::before{-webkit-transition:none;transition:none}}input[type=checkbox]+label::before{position:absolute;inset-inline-start:0;inset-block-start:4px;display:block;content:"";border:1px solid #475867;height:14px;width:14px;background-color:#fff;-webkit-transition:all 0.2s ease;transition:all 0.2s ease;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px}@media screen and (prefers-reduced-motion: reduce){input[type=checkbox]+label.error::before{-webkit-transition:none;transition:none}}input[type=checkbox]+label.error::before{position:absolute;inset-inline-start:0;inset-block-start:4px;display:block;content:"";border:1px solid #d72d30;height:14px;width:14px;background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px;-webkit-transition:all 0.2s ease;transition:all 0.2s ease}@media screen and (prefers-reduced-motion: reduce){input[type=checkbox]+label .after{-webkit-transition:none;transition:none}}input[type=checkbox]+label .after{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;content:"";inset-inline-start:3px;inset-block-start:7px;width:8px;height:8px;opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box}input[type=checkbox]:checked+label::before{background:#2c5cc5;border-color:#2c5cc5;-webkit-box-shadow:none;box-shadow:none}input[type=checkbox]:checked+label .after{opacity:1}input[type=checkbox]:checked:hover+label::before{border-color:#2c5cc5;-webkit-box-shadow:0 0 0 5px #ebeff3;box-shadow:0 0 0 5px #ebeff3}input[type=checkbox]:checked:hover+label .after{opacity:1}input[type=checkbox]:checked:focus+label::before{background:#2c5cc5;border-color:#fff;-webkit-box-shadow:0 0 0 1px #2c5cc5;box-shadow:0 0 0 1px #2c5cc5}input[type=checkbox]:checked:focus+label .after{opacity:1}input[type=checkbox][disabled]+label{color:#92a2b1}input[type=checkbox][disabled]+label .label-field{color:#92a2b1}input[type=checkbox][disabled]+label::before{border-color:#dadfe3;background-color:#ebeff3}input[type=checkbox][disabled]:checked+label{color:#92a2b1}input[type=checkbox][disabled]:checked+label::before{background-color:#ebeff3;border-color:#dadfe3}';let b=class{constructor(t){e(this,t),this.fwShow=i(this,"fwShow",7),this.fwHide=i(this,"fwHide",7),this.triggerRefSlot=null,this.isOpen=!1,this.placement="bottom",this.fallbackPlacements=["top"],this.skidding="0",this.distance="0",this.variant="select",this.sameWidth=!0,this.trigger="click",this.hasBorder=!0,this.hoist=!1,this.disableTransition=!1,this.autoFocusOnContent=!1,this.hideOnTab=!0}onKeyDown(e){switch(e.key){case"Tab":this.hideOnTab&&this.hide();break;case"Escape":this.hide()}}async show(){var e,t,i;this.isOpen||(this.sameWidth&&(this.popperDiv.style.width=String(this.triggerRef.getBoundingClientRect().width)+"px"),!this.popperInstance&&this.createPopperInstance(),this.popperDiv.setAttribute("data-show",""),this.popperInstance.setOptions((e=>Object.assign(Object.assign({},e),{modifiers:[...e.modifiers,{name:"eventListeners",enabled:!0}]}))),this.popperInstance.update(),"hover"!==this.trigger&&(this.overlay.style.display="block"),this.isOpen=!this.isOpen,"FW-LIST-OPTIONS"===(null===(e=this.contentRef)||void 0===e?void 0:e.tagName)&&this.contentRef.scrollToLastSelected(),this.autoFocusOnContent&&(this.contentRef.setFocus?this.contentRef.setFocus():null===(i=(t=this.contentRef).focus)||void 0===i||i.call(t)),this.fwShow.emit())}async hide(){var e,t,i;this.isOpen&&(this.popperDiv.removeAttribute("data-show"),this.popperInstance.setOptions((e=>Object.assign(Object.assign({},e),{modifiers:[...e.modifiers,{name:"eventListeners",enabled:!1}]}))),"hover"!==this.trigger&&(this.overlay.style.display="none"),this.isOpen=!this.isOpen,"FW-LIST-OPTIONS"===(null===(e=this.contentRef)||void 0===e?void 0:e.tagName)&&this.contentRef.clearFilter(),this.autoFocusOnContent&&(this.triggerRef.setFocus?this.triggerRef.setFocus():null===(i=(t=this.triggerRef).focus)||void 0===i||i.call(t)),this.fwHide.emit())}componentWillLoad(){if(this.contentRef=this.host.querySelector('[slot="popover-content"]'),this.triggerRef=this.host.querySelector('[slot="popover-trigger"]'),"SLOT"===this.triggerRef.nodeName){const e=this.triggerRef.assignedElements();e.length&&(this.triggerRefSlot=e[0])}if("click"===this.trigger)this.triggerRef.addEventListener(this.trigger,(()=>{this.isOpen?this.hide():this.show()}));else if("hover"===this.trigger){const e=this.triggerRefSlot||this.triggerRef;e.addEventListener("focus",this.show.bind(this)),e.addEventListener("blur",this.hide.bind(this)),e.addEventListener("mouseenter",this.show.bind(this)),this.host.addEventListener("mouseleave",(e=>{const t=(e.path?e.path:e.composedPath()).filter((e=>"FW-TOOLTIP"===e.nodeName))[0];if(t){const e=(()=>{const e=document.querySelectorAll(":hover");[].indexOf.call(e,t)<0&&this.hide()}).bind(this);setTimeout(e,200)}else this.hide()}))}this.popperOptions={placement:this.placement,strategy:this.hoist?"fixed":"absolute",modifiers:[{name:"flip",options:{fallbackPlacements:this.fallbackPlacements}},{name:"preventOverflow",options:{boundary:this.boundary||"clippingParents"}},{name:"offset",options:{offset:[Number(this.skidding),Number(this.distance)]}},r]}}disconnectedCallback(){var e;null===(e=this.popperInstance)||void 0===e||e.destroy()}createPopperInstance(){this.popperInstance=l(this.triggerRefSlot||this.triggerRef,this.popperDiv,this.popperOptions)}render(){return[t("slot",{name:"popover-trigger"}),t("div",{class:{"popper-content":!0,"no-border":!this.hasBorder,"no-transition":this.disableTransition},ref:e=>this.popperDiv=e},t("slot",{name:"popover-content"})),"hover"!==this.trigger&&t("div",{"aria-hidden":"true",class:"overlay",ref:e=>this.overlay=e,onClick:()=>this.hide()})]}get host(){return s(this)}};b.style=':host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.popper-content{display:none;z-index:99;min-width:var(--fw-popover-min-width);max-width:var(--fw-popover-max-width);min-height:var(--fw-popover-min-height, 10px);max-height:var(--fw-popover-max-height, 400px);overflow-y:auto;overflow-x:hidden;overscroll-behavior-y:contain;margin:0px;border-radius:var(--fw-popover-border-radius, 8px);border:1px solid #ebeff3;position:absolute;background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-transform:scale(0.01);transform:scale(0.01);-webkit-transition:150ms color, 150ms border, 150ms -webkit-box-shadow;transition:150ms color, 150ms border, 150ms -webkit-box-shadow;transition:150ms color, 150ms border, 150ms box-shadow;transition:150ms color, 150ms border, 150ms box-shadow, 150ms -webkit-box-shadow;will-change:auto}:host(:not([dir="rtl"])) .popper-content,:host([dir="ltr"]) .popper-content{-webkit-box-shadow:-15px 20px 40px rgba(0, 0, 0, 0.04);box-shadow:-15px 20px 40px rgba(0, 0, 0, 0.04)}:host([dir="rtl"]) .popper-content{-webkit-box-shadow:15px 20px 40px rgba(0, 0, 0, 0.04);box-shadow:15px 20px 40px rgba(0, 0, 0, 0.04)}.popper-content.no-border{border:0px}.popper-content.no-transition{-webkit-transition:none;transition:none}.popper-content[data-show]{display:block}.overlay{width:100%;height:100%;display:none;position:fixed;inset-block-start:0;inset-inline-start:0;z-index:95;background-color:transparent}@media screen and (prefers-reduced-motion: reduce){.popper-content{-webkit-transition:none;transition:none}}';export{h as fw_avatar,c as fw_checkbox,b as fw_popover}