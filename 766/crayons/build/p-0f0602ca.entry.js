import{r as t,c as e,h as a,i}from"./p-c5706edf.js";import{T as n}from"./p-30848d13.js";import{p as s}from"./p-79178ffe.js";import{c as l}from"./p-d4599615.js";const o={anchor:{componentName:"fw-custom-cell-anchor",isFocusable:!0},user:{componentName:"fw-custom-cell-user",isFocusable:!1,skipTextAlign:!0},icon:{componentName:"fw-custom-cell-icon",isFocusable:!1},paragraph:{componentName:"fw-custom-cell-paragraph",isFocusable:!0}},d={strategy:"fixed",placement:"bottom-end",modifiers:[{name:"offset",options:{offset:[0,2]}},s]};let r=null;try{window.localStorage&&(r=window.localStorage)}catch(c){console.warn("Cannot save table settings to localStorage")}let b=class{constructor(a){t(this,a),this.fwSelectionChange=e(this,"fwSelectionChange",7),this.fwSelectAllChange=e(this,"fwSelectAllChange",7),this.label="",this.rowActions=[],this.rows=[],this.columns=[],this.isSelectable=!1,this.isAllSelectable=!1,this.showSettings=!1,this.autoSaveSettings=!1,this.isLoading=!1,this.shimmerCount=4,this.orderedColumns=[],this.selected=[],this.rowsLoading={},this.columnsDragSetting=[],this.columnsHideSetting=[],this.isSettingsOpen=!1,this.settingSearchText="",this.disabledColumnHide=!1,this.showShimmer=!0,this.ifAutoCalculatedWidth=!1,this.renderPromiseResolve=null,this.popperInstance=null,this.settingsButton=null,this.settingsUpdateButton=null,this.settingsResetButton=null,this.settingsInput=null,this.settingsDragContainer=null,this.settings=null,this.tableContainer=null,this.selectColumnHeader=null,this.lastColumnHeader=null}componentWillLoad(){if(this.columnOrdering(this.columns),r&&this.autoSaveSettings){const t=r.getItem("fw-table"+(this.el.id?`-${this.el.id}`:""));t&&this.setTableSettings(JSON.parse(t))}this.rows.length&&this.hideShimmer()}componentDidLoad(){this.showSettings&&(this.settingsButton&&(this.settingsButton.style.height=this.el.shadowRoot.querySelector("thead").offsetHeight+"px"),this.popperInstance=l(this.settingsButton,this.settings,d))}componentDidRender(){this.renderPromiseResolve&&(this.renderPromiseResolve(),this.renderPromiseResolve=null),this.selectColumnHeader&&parseInt(window.getComputedStyle(this.selectColumnHeader).width)>40&&!this.ifAutoCalculatedWidth&&(this.ifAutoCalculatedWidth=!0)}disconnectedCallback(){var t;null===(t=this.popperInstance)||void 0===t||t.destroy()}keyDownHandler(t){"Escape"===t.key?this.toggleSettings(!1):this.arrowNavigate(t)}showSettingsHandler(t){t&&this.waitForNextRender().then((()=>{this.settingsButton.style.height=this.el.shadowRoot.querySelector("thead").offsetHeight+"px",this.popperInstance||(this.popperInstance=l(this.settingsButton,this.settings,d))}))}columnsChangeHandler(t){this.columnOrdering(t)}rowsChangeHandler(t){t.length&&this.hideShimmer()}loadingHandler(){this.isSettingsOpen&&this.toggleSettings(!1)}selectRow(t,e=!0){if(e)this.selected.indexOf(t)<0&&(this.selected=[...this.selected,t]);else{const e=this.selected.filter((e=>e!==t));this.selected=[...e]}return this.fwSelectionChange.emit({rowId:t,checked:e,selected:this.selected}),this.selected}async selectAllRows(t=!0){if(!0===t){const t=this.rows.filter((t=>!this.selected.includes(t.id))).map((t=>t.id));this.selected=[...this.selected,...t]}else this.selected=[];return this.fwSelectAllChange.emit({checked:t,selected:this.selected}),this.selected}async getSelectedRows(){return this.rows.filter((t=>this.selected.includes(t.id)))}async getSelectedIds(){return this.selected}async getTableSettings(){const t={};return this.orderedColumns.map((e=>{t[e.key]||(t[e.key]={}),t[e.key].position=e.position,t[e.key].hide=e.hide||!1,t[e.key].lock=e.lock||!1})),t}async setTableSettings(t){try{let e=[...this.orderedColumns];for(const a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e=this.getColumnsState(e,a,t[a]));this.orderedColumns=[...e]}catch(c){console.warn("Save table settings was not applied")}return this.orderedColumns}async loadTable(t=!0){return this.isLoading=t,this.isLoading}hideShimmer(){this.showShimmer&&(this.showShimmer=!1)}getColumnsState(t,e,a){const i=t.findIndex((t=>t.key===e)),n=t[i],s=Object.assign(Object.assign({},n),a),l=t.filter((t=>t.key!==e)),o=l.slice(0,i),d=l.slice(i,l.length);if(s.position!==n.position){for(let t=0;t<o.length;t++){const e=o[t];e.position>=s.position&&e.position<=n.position&&(e.position=e.position+1)}for(let t=0;t<d.length;t++){const e=d[t];e.position<=s.position&&e.position>=n.position&&(e.position=e.position-1)}}return[...o,s,...d].sort(((t,e)=>t.position-e.position))}lockFocusInsideSettings(){this.settingsUpdateButton.addEventListener("keydown",(t=>{t.stopPropagation(),!1===t.shiftKey&&"Tab"===t.key&&this.settingsResetButton.focus()})),this.settingsResetButton.addEventListener("keydown",(t=>{t.stopPropagation(),!0===t.shiftKey&&"Tab"===t.key&&this.settingsUpdateButton.setFocus()}))}async toggleSettings(t=!0){return await this.resetSettings(),this.isSettingsOpen=t,await this.waitForNextRender(),this.popperInstance.update(),t&&(this.settingsInput.setFocus(),this.lockFocusInsideSettings()),t}async resetSettings(){this.settingSearchText="",this.settingsInput.value="",this.columnsDragSetting=[],this.columnsHideSetting=[];const t=this.orderedColumns.map((t=>{const e={};return e.key=t.key,e.text=t.text,e.position=t.position,e.hide=t.hide||!1,e.lock=t.lock,e}));this.columnsDragSetting=t;const e=this.columns.map((t=>{const e={},a=this.orderedColumns.filter((e=>e.key===t.key))[0];return e.key=t.key,e.text=t.text,e.hide=a.hide,e.lock=a.lock,e}));this.columnsHideSetting=e}async applySettings(){if(this.columnsDragSetting.forEach((t=>{const e=this.getColumnsState(this.orderedColumns,t.key,{hide:t.hide,position:t.position});this.orderedColumns=[...e]})),r&&this.autoSaveSettings)try{const t=this.el.id?`-${this.el.id}`:null;if(!t)throw new Error("Table must have an 'id' attribute to autosave settings");{const e=await this.getTableSettings();r.setItem(`fw-table${t}`,JSON.stringify(e))}}catch(c){console.log(c.message)}this.toggleSettings(!1),this.ifAutoCalculatedWidth=!1}arrowNavigate(t){const e=this.getEventPath(t)[0],a=this.closestTableCell(this.getEventPath(t));if(a){let i=!1;i=e===a||this.arrowNavigateCellComponents(t.code,e),i&&this.arrowNavigateCell(t.code,a)}}arrowNavigateCellComponents(t,e){var a,i,n,s,l;let o=!1,d=null;switch(t){case"ArrowRight":"FW-TOOLTIP"===e.parentElement.nodeName?e.parentElement.nextElementSibling?(null===(a=e.parentElement.nextElementSibling.children[0])||void 0===a?void 0:a.getAttribute("tabindex"))&&(d=e.parentElement.nextElementSibling.children[0]):o=!0:(null===(i=e.nextElementSibling)||void 0===i?void 0:i.getAttribute("tabIndex"))?d=e.nextElementSibling:o=!0;break;case"ArrowLeft":"FW-TOOLTIP"===e.parentElement.nodeName?(null===(n=e.parentElement.previousElementSibling)||void 0===n?void 0:n.getAttribute("tabIndex"))?(null===(s=e.parentElement.previousElementSibling.children[0])||void 0===s?void 0:s.getAttribute("tabindex"))&&(d=e.parentElement.previousElementSibling.children[0]):o=!0:(null===(l=e.previousElementSibling)||void 0===l?void 0:l.getAttribute("tabIndex"))?d=e.previousElementSibling:o=!0;break;default:o=!0}return d&&(d.setAttribute("tabIndex","0"),d.focus()),o}arrowNavigateCell(t,e){let a,i,n=+e.parentElement.getAttribute("aria-rowIndex"),s=+e.getAttribute("aria-colIndex"),l=this.orderedColumns.length;switch(l=this.isSelectable?l+1:l,l=this.rowActions.length?l+1:l,t){case"ArrowDown":a=n+1,i=s;break;case"ArrowUp":a=n-1,i=s;break;case"ArrowRight":{const t=(t,e)=>(e!==l?(a=t,i=e+1):(a=t+1,i=1),{nextRowIndex:a,nextColIndex:i});let e=!1;do{const l=t(n,s);e=this.tableContainer.querySelector(`th[aria-colIndex="${i}"]`).classList.contains("hidden"),e?(n=l.nextRowIndex,s=l.nextColIndex):(a=l.nextRowIndex,i=l.nextColIndex)}while(e)}break;case"ArrowLeft":{const t=(t,e)=>(1!==e?(a=t,i=e-1):(a=t-1,i=l),{nextRowIndex:a,nextColIndex:i});let e=!1;do{const l=t(n,s);e=this.tableContainer.querySelector(`th[aria-colIndex="${i}"]`).classList.contains("hidden"),e?(n=l.nextRowIndex,s=l.nextColIndex):(a=l.nextRowIndex,i=l.nextColIndex)}while(e)}}const o=this.tableContainer.querySelector(`[aria-rowIndex="${a}"] > [aria-colIndex="${i}"]`);o&&(this.removeFocusCell(e),this.focusCell(o,t))}getEventPath(t){return t.path?t.path:t.composedPath()}waitForNextRender(){return new Promise((t=>this.renderPromiseResolve=t))}removeFocusCell(t){t.setAttribute("tabIndex","-1")}focusCell(t,e="ArrowRight"){if(t.dataset.hasFocusableChild&&"true"===t.dataset.hasFocusableChild){t.removeAttribute("tabIndex");let a=null;switch(e){case"ArrowLeft":a=t.children[t.children.length-1];break;default:a=t.children[0]}"FW-TOOLTIP"===a.nodeName&&(a=a.children[0]),a.setAttribute("tabIndex","0"),a.focus()}else t.setAttribute("tabIndex","0"),t.focus()}hasFocusableComponent(t){let e=!1;return(t.hasFocusableComponent||t.variant&&o[t.variant].isFocusable)&&(e=!0),e}closestTableCell(t){let e;for(let a=0;a<t.length;a++){const i=t[a];if("TD"===i.nodeName){e=i;break}}return e}columnOrdering(t){this.orderedColumns=[...t].sort(((t,e)=>{let a=0;return t.lock&&!e.lock?a=-1:!t.lock&&e.lock?a=1:(!t.lock&&!e.lock||t.lock&&e.lock)&&(t.position&&e.position?a=t.position-e.position:t.position&&!e.position?a=-1:!t.position&&e.position&&(a=1)),a})),this.orderedColumns.map(((t,e)=>{t.position=e+1}))}async performRowAction(t,e){const a=this.el.shadowRoot.querySelector("fw-checkbox#select-all");a&&!a.disabled&&(a.disabled=!0),this.rowsLoading=Object.assign(Object.assign({},this.rowsLoading),{[e.id]:!0});try{await t.handler(e)}catch(c){console.log(c.message)}delete this.rowsLoading[e.id],this.rowsLoading=Object.assign({},this.rowsLoading),a&&0===Object.keys(this.rowsLoading).length&&(a.disabled=!1)}settingsSearch(t){this.settingSearchText=t.toLowerCase()}async settingsColumnToggle(t,e,a){let i;if(e){let t=1;this.columnsDragSetting.forEach(((e,a)=>!e.hide&&(t=a+1))),i={hide:!e,position:t+1}}else{if(this.disabledColumnHide)return void(a&&(a.currentTarget.checked=!0));i={hide:!e,position:this.columnsDragSetting.length}}const n=this.getColumnsState(this.columnsDragSetting,t,i),s=this.getColumnsState(this.columnsHideSetting,t,{hide:!e});if(this.columnsDragSetting=[...n],this.columnsHideSetting=[...s],a&&a.currentTarget.classList.contains("table-settings-drag-item-close")&&"Enter"===a.key){const t=a.currentTarget.parentElement.previousSibling,e=a.currentTarget.parentElement.nextSibling;await this.waitForNextRender(),t||e?(t||e).querySelector(".table-settings-drag-item-close").focus():this.tableContainer.querySelector(".table-settings-content-checkboxes div:last-child fw-checkbox").focus()}return this.disabledColumnHide=1===this.columnsHideSetting.filter((t=>!t.hide)).length,this.columnsDragSetting}async settingsColumnDrop(t,e){const a=this.columnsDragSetting.filter((t=>t.lock)).length,i=this.getColumnsState(this.columnsDragSetting,t,{position:e+1+a});return this.columnsDragSetting=[...i],i}renderWebComponent(t,e){let i;if(window.customElements.get(t)){const n=`${t}`;let s;e.slotText&&(s=e.slotText,delete e.slotText),i=a(n,Object.assign({},e),s)}else i=null;return i}renderCustomTemplate(t,e){return t(a,e)}renderPredefinedVariant(t,e){let i;return i="anchor"===t?a("fw-custom-cell-anchor",Object.assign({},e)):"user"===t?a("fw-custom-cell-user",Object.assign({},e)):"icon"===t?a("fw-custom-cell-icon",Object.assign({},e)):"paragraph"===t?a("fw-custom-cell-paragraph",Object.assign({},e)):null,i}renderTableCell(t,e){let a;return a=t.variant?this.renderPredefinedVariant(t.variant,e):t.customTemplate?this.renderCustomTemplate(t.customTemplate,e):t.formatData?t.formatData(e):e,a}renderTableHeader(){var t;const e=this.rows.length&&this.rows.every((t=>this.selected.includes(t.id))),i=this.orderedColumns.filter((t=>!t.hide&&"paragraph"!==t.variant)),s=null===(t=i[i.length-1])||void 0===t?void 0:t.key;return this.orderedColumns.filter((t=>!t.hide)).length?a("tr",{role:"row"},this.orderedColumns.length&&this.isSelectable&&a("th",{ref:t=>this.selectColumnHeader=t,key:"isSelectable","aria-colindex":1,style:{width:"40px"}},this.isAllSelectable&&a("fw-checkbox",{id:"select-all",value:"select-all",checked:e,onFwChange:t=>{var e,a;return this.selectAllRows(null===(a=null===(e=t.detail)||void 0===e?void 0:e.meta)||void 0===a?void 0:a.checked)}})),this.orderedColumns.map(((t,e)=>{let i=null;!t.textAlign||t.variant&&o[t.variant].skipTextAlign||(i=t.textAlign);const n=Object.assign({},!t.widthProperties||t.key===s&&this.ifAutoCalculatedWidth?{}:t.widthProperties,i?{textAlign:i}:{}),l={};return t.key===s&&(l.ref=t=>this.lastColumnHeader=t),a("th",Object.assign({role:"columnheader",key:t.key,"aria-colindex":this.isSelectable?e+2:e+1,class:{hidden:t.hide},style:n},l),t.customHeader?this.renderCustomTemplate(t.customHeader,t.text):t.text)})),0!==this.rowActions.length&&a("th",{class:"row-actions",role:"columnheader","aria-colindex":this.isSelectable?this.orderedColumns.length+2:this.orderedColumns.length+1},n.t("datatable.actions"))):null}renderTableBody(){return this.orderedColumns.filter((t=>!t.hide)).length?this.rows.map(((t,e)=>a("tr",{key:t.id,role:"row",class:{active:this.selected.includes(t.id),loading:!!this.rowsLoading[t.id]},"aria-rowindex":e+1},this.orderedColumns.length&&this.isSelectable&&a("td",{class:"data-table-checkbox","aria-colindex":1,"data-has-focusable-child":"true"},a("fw-checkbox",{value:t.id?t.id:"",checked:this.selected.includes(t.id),onFwChange:t=>{var e,a;return this.selectRow(t.detail.value,null===(a=null===(e=t.detail)||void 0===e?void 0:e.meta)||void 0===a?void 0:a.checked)}})),this.orderedColumns.map(((i,n)=>{const s={},l=!!this.hasFocusableComponent(i);l||(s.tabindex=this.isSelectable||0!==e||0!==n?"-2":"0"),s["aria-colindex"]=this.isSelectable?n+2:n+1,s["data-has-focusable-child"]=l?"true":"false";let d=null;!i.textAlign||i.variant&&o[i.variant].skipTextAlign||(d=i.textAlign);const r=Object.assign({},d?{textAlign:d}:{});return a("td",Object.assign({role:"gridcell",class:{hidden:i.hide},style:r},s),this.renderTableCell(i,t[i.key]))})),0!==this.rowActions.length&&a("td",{class:"row-actions","data-has-focusable-child":"true","aria-colindex":this.isSelectable?this.orderedColumns.length+2:this.orderedColumns.length+1},this.rowActions.map((e=>{let i=null;return(!e.hideForRowIds||e.hideForRowIds&&!e.hideForRowIds.includes(t.id))&&(i=a("fw-tooltip",{content:e.name,distance:"5"},a("fw-button",{tabIndex:0,size:e.iconName?"icon-small":"small",color:"secondary",onKeyUp:a=>("Space"===a.code||"Enter"===a.code)&&this.performRowAction(e,t),onClick:()=>this.performRowAction(e,t),"aria-label":e.name},e.iconName?a("fw-icon",{name:e.iconName,library:e.iconLibrary?e.iconLibrary:"crayons",size:10}):e.name))),i})))))):null}renderTableSettings(){return a("div",{class:"table-settings"},a("div",{class:"table-settings-container"},a("button",{class:"table-settings-button",tabIndex:0,ref:t=>this.settingsButton=t,onClick:()=>this.toggleSettings(!this.isSettingsOpen),onKeyDown:t=>"Enter"===t.key&&this.toggleSettings(!this.isSettingsOpen),disabled:this.isLoading},a("fw-icon",{name:"settings",library:"system",size:16})),a("div",{ref:t=>this.settings=t,class:{"table-settings-options":!0,show:this.isSettingsOpen}},a("div",{class:"table-settings-header"},a("span",{class:"title"},"Customize columns"),a("button",{class:"reset",tabIndex:0,ref:t=>this.settingsResetButton=t,onClick:()=>{this.resetSettings()}},"Reset")),a("div",{class:"table-settings-content"},a("div",{class:"table-settings-content-left"},a("div",{class:"table-settings-content-search"},a("fw-input",{"icon-left":"search",placeholder:"Search",ref:t=>this.settingsInput=t,onFwInput:t=>this.settingsSearch(t.detail.value),onFwInputClear:t=>this.settingsSearch(t.detail.value),"clear-input":!0})),a("div",{class:"table-settings-content-choose"},a("div",{class:"table-settings-content-title"},n.t("datatable.chooseColumns")),a("div",{class:"table-settings-content-checkboxes"},this.columnsHideSetting.map((t=>{let e=null,i=!0;return""!==this.settingSearchText.trim()&&(i=t.text.toLowerCase().includes(this.settingSearchText)),i&&(e=a("div",{key:t.key},a("fw-checkbox",{value:t.key,onFwChange:e=>{var a,i;return this.settingsColumnToggle(t.key,null===(i=null===(a=e.detail)||void 0===a?void 0:a.meta)||void 0===i?void 0:i.checked,e)},checked:!t.hide,disabled:t.lock},t.text))),e}))))),a("div",{class:"table-settings-content-right"},a("div",{class:"table-settings-content-title"},a("span",null,"Selected columns "),a("span",null,"(",this.columnsDragSetting.filter((t=>!t.hide)).length,")")),a("div",{class:"table-settings-content-draggable"},this.columnsDragSetting.filter((t=>t.lock)).map((t=>{let e=null;return e=a("div",{key:t.key,class:"table-settings-drag-item","data-column-key":t.key},a("div",{class:"table-settings-drag-item-icon non-drag"},a("fw-icon",{name:"lock",size:11})),a("div",{class:"table-settings-drag-item-text",title:t.text},t.text)),e})),a("fw-drag-container",{ref:t=>this.settingsDragContainer=t,onFwDrop:t=>this.settingsColumnDrop(t.detail.droppedElement.dataset.columnKey,t.detail.droppedIndex)},this.columnsDragSetting.filter((t=>!t.lock)).map((t=>{let e=null;return t.hide||(e=a("div",{key:t.key,class:"table-settings-drag-item","data-column-key":t.key,draggable:!0},a("div",{class:"table-settings-drag-item-icon"},a("fw-icon",{library:"system",name:"drag",size:11})),a("div",{class:"table-settings-drag-item-text",title:t.text},t.text),a("button",{class:"table-settings-drag-item-close",tabIndex:0,onKeyDown:e=>"Enter"===e.key&&this.settingsColumnToggle(t.key,!1,e),onClick:()=>this.settingsColumnToggle(t.key,!1)},a("fw-icon",{library:"system",name:"cross-big",size:7})))),e})))))),a("div",{class:"table-settings-footer"},a("fw-button",{color:"secondary",tabIndex:0,id:"close-settings",onClick:()=>{this.resetSettings(),this.toggleSettings(!1)}},"Cancel"),a("fw-button",{color:"primary",tabIndex:0,id:"apply-settings",ref:t=>this.settingsUpdateButton=t,onClick:()=>this.applySettings()},"Update")))),this.isSettingsOpen&&a("div",{role:"presentation",class:"table-settings-overlay",onClick:()=>this.toggleSettings(!1)}))}renderTableShimmer(){const t=[],e=this.rows.length||this.shimmerCount;let i=this.orderedColumns.filter((t=>!t.hide)).length;if(i){i=this.isSelectable?i+1:i,this.rowActions&&this.rowActions.length&&(i+=1);for(let n=1;n<=e;n++)t.push(a("tr",null,Array(i).fill(1).map((()=>a("td",null,a("fw-skeleton",{height:"12px"}))))))}return t}render(){return a("div",{class:"fw-data-table-container"},a("div",{class:{"fw-data-table-scrollable":!0,loading:this.isLoading||this.showShimmer,shimmer:this.showShimmer},ref:t=>this.tableContainer=t},a("table",{class:{"fw-data-table":!0,"is-selectable":this.isSelectable},role:"grid","aria-colcount":this.orderedColumns.length,"aria-label":this.label},a("thead",null,this.renderTableHeader()),a("tbody",null,this.showShimmer?this.renderTableShimmer():this.renderTableBody()))),this.showSettings&&this.renderTableSettings(),(this.isLoading||this.showShimmer)&&a("div",{class:"fw-data-table--loading"}))}get el(){return i(this)}static get watchers(){return{showSettings:["showSettingsHandler"],columns:["columnsChangeHandler"],rows:["rowsChangeHandler"],isLoading:["loadingHandler"]}}};b.style=':host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}div.fw-data-table-container{position:relative;width:100%;height:100%;overflow:visible}div.fw-data-table-container div.fw-data-table-scrollable{position:relative;display:block;width:100%;height:100%;overflow:auto}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table{table-layout:fixed;border-collapse:collapse;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:100%;width:-webkit-max-content;width:-moz-max-content;width:max-content}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead{position:-webkit-sticky;position:sticky;inset-block-start:0;width:100%;border-radius:4px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th{color:#475867;font-size:12px;line-height:20px;padding:12px 8px;font-weight:600;letter-spacing:0.2px;text-overflow:ellipsis;text-align:start;z-index:1;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:40px;max-width:1000px;background:#f5f7f9;overflow-wrap:anywhere;word-break:break-word;white-space:normal}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th:first-of-type{-webkit-padding-start:16px;padding-inline-start:16px;border-end-start-radius:0px;border-end-end-radius:0px;border-start-end-radius:0px;border-start-start-radius:4px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th:last-of-type{-webkit-padding-end:16px;padding-inline-end:16px;border-end-start-radius:0px;border-end-end-radius:0px;border-start-end-radius:4px;border-start-start-radius:0px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th.data-grid-sm{padding:4px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th.data-grid-md{padding:12px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th.data-grid-lg{padding:16px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th.hidden{display:none}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody{width:100%;background:#fff}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr{width:100%;-webkit-border-after:1px solid #ebeff3;border-block-end:1px solid #ebeff3}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr:hover,div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr:focus{background:#f5f7f9}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr.active{background:#e5f2fd}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr:last-child{-webkit-border-after:0px;border-block-end:0px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td{color:#12344d;font-size:14px;line-height:20px;padding:12px 8px;text-overflow:ellipsis;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:0;height:64px;overflow-wrap:anywhere;word-break:break-word;white-space:normal}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.data-grid-checkbox{text-align:center;width:20px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.data-grid-sm{padding:4px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.data-grid-md{padding:12px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.data-grid-lg{padding:16px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td:first-child{-webkit-padding-start:16px;padding-inline-start:16px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td:last-child{-webkit-padding-end:16px;padding-inline-end:16px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.row-actions{width:1px;white-space:nowrap}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.row-actions fw-button{-webkit-margin-end:5px;margin-inline-end:5px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.row-actions fw-tooltip:last-child fw-button{-webkit-margin-end:0px;margin-inline-end:0px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.hidden{display:none}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr.loading{cursor:not-allowed}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr.loading td{position:relative;opacity:0.65}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr.loading td::after{content:"";position:absolute;inset-block-start:0px;inset-inline-start:0px;inset-block-end:0px;inset-inline-end:0px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody fw-skeleton{display:block;height:10px;padding-inline:0px;padding-block:4px;-webkit-box-sizing:content-box;box-sizing:content-box}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table.is-selectable td:first-child,div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table.is-selectable th:first-child{text-align:center}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table.is-selectable td:first-child fw-checkbox,div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table.is-selectable th:first-child fw-checkbox{display:block;width:16px;height:20px}div.fw-data-table-container div.fw-data-table-scrollable.loading{opacity:0.65}div.fw-data-table-container div.fw-data-table-scrollable.shimmer{overflow:hidden}div.fw-data-table-container .fw-data-table--loading{position:absolute;inset-block-start:0px;inset-inline-start:0px;width:100%;height:100%}div.fw-data-table-container .table-settings{position:absolute;inset-inline-end:0px;inset-block-start:0px}div.fw-data-table-container .table-settings .table-settings-container{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:end;align-items:flex-end}div.fw-data-table-container .table-settings .table-settings-container .table-settings-button{width:40px;min-height:44px;background:#fff;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #ebeff3;border-end-start-radius:0px;border-end-end-radius:0px;border-start-end-radius:4px;border-start-start-radius:0px;margin:0px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-button:focus,div.fw-data-table-container .table-settings .table-settings-container .table-settings-button:hover{cursor:pointer}div.fw-data-table-container .table-settings .table-settings-container .table-settings-button:disabled{cursor:default;opacity:0.65}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options{z-index:99;width:500px;-webkit-box-sizing:border-box;box-sizing:border-box;background:#fff;border:1px solid #ebeff3;border-radius:4px;-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-after:0px;padding-block-end:0px;-webkit-padding-end:0px;padding-inline-end:0px;-webkit-padding-before:22px;padding-block-start:22px;display:none;-webkit-animation:appear 0.3s;animation:appear 0.3s}:host(:not([dir="rtl"])) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options,:host([dir="ltr"]) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options{-webkit-box-shadow:-15px 20px 40px rgba(0, 0, 0, 0.04);box-shadow:-15px 20px 40px rgba(0, 0, 0, 0.04)}:host([dir="rtl"]) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options{-webkit-box-shadow:15px 20px 40px rgba(0, 0, 0, 0.04);box-shadow:15px 20px 40px rgba(0, 0, 0, 0.04)}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options.show{display:block}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header{display:-ms-flexbox;display:flex;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:600;-ms-flex-align:end;align-items:flex-end;padding-inline:22px;padding-block:0px;-webkit-margin-after:16px;margin-block-end:16px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header span.title{-ms-flex-positive:1;flex-grow:1;font-size:16px;line-height:24px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header button.reset{-ms-flex-positive:0;flex-grow:0;color:#2c5cc5;font-size:14px;font-weight:600;text-decoration:none;line-height:17px;-webkit-padding-end:4px;padding-inline-end:4px;margin:0px;background:#fff;border:0px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header button.reset:focus,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header button.reset:hover{cursor:pointer}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content{display:-ms-flexbox;display:flex;width:100%;height:342px;-webkit-box-sizing:border-box;box-sizing:border-box;padding-inline:22px;padding-block:0px;gap:14px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-positive:1;flex-grow:1;width:220px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-title{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-padding-after:5px;padding-block-end:5px;-webkit-padding-start:5px;padding-inline-start:5px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-search{position:relative;inset-block-start:-3px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-positive:1;flex-grow:1;-webkit-margin-before:14px;margin-block-start:14px;overflow-y:hidden;width:calc(100% + 5px)}:host(:not([dir="rtl"])) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose,:host([dir="ltr"]) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose{-webkit-transform:translateX(-3px);transform:translateX(-3px)}:host([dir="rtl"]) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose{-webkit-transform:translateX(3px);transform:translateX(3px)}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose .table-settings-content-checkboxes{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow-y:auto;-webkit-padding-start:5px;padding-inline-start:5px;-webkit-padding-end:5px;padding-inline-end:5px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose .table-settings-content-checkboxes div{margin-inline:0px;margin-block:5px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose .table-settings-content-checkboxes div fw-checkbox{width:100%;overflow-wrap:break-word}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:220px;-webkit-box-sizing:border-box;box-sizing:border-box;background:#ebeff3;border-end-start-radius:0px;border-end-end-radius:0px;border-start-end-radius:4px;border-start-start-radius:4px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-title{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-padding-after:3px;padding-block-end:3px;padding-inline:12px;-webkit-padding-before:8px;padding-block-start:8px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable{width:100%;-ms-flex-positive:1;flex-grow:1;padding-inline:12px;padding-block:0px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow-y:auto}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item{display:-ms-flexbox;display:flex;background:#fff;border-radius:4px;-webkit-box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06);box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06);border:1px solid #ebeff3;-webkit-padding-start:14px;padding-inline-start:14px;-webkit-padding-after:7px;padding-block-end:7px;-webkit-padding-end:8px;padding-inline-end:8px;-webkit-padding-before:7px;padding-block-start:7px;margin-inline:0px;margin-block:8px;font-size:14px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-close{width:16px;-ms-flex-positive:0;flex-grow:0;text-align:center}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon:focus,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon:hover,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-close:focus,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-close:hover{cursor:pointer}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon.non-drag:hover,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon.non-drag:focus{cursor:default}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon{width:9px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-close{background:#fff;border:0px;padding:0px;margin:0px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-text{-ms-flex-positive:1;flex-grow:1;color:#12344d;padding-inline:11px;padding-block:0px;-webkit-box-sizing:border-box;box-sizing:border-box;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-text:hover,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-text:focus{cursor:default}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-title{font-size:14px;line-height:20px;color:#475867;font-weight:600}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-footer{display:-ms-flexbox;display:flex;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background:#f5f7f9;padding-inline:16px;padding-block:12px;gap:12px;-ms-flex-pack:end;justify-content:flex-end}@media (prefers-reduced-motion){div.fw-data-table-container .table-settings .table-settings-container .table-settings-options{-webkit-animation:none;animation:none}}div.fw-data-table-container .table-settings .table-settings-overlay{position:fixed;width:100vw;height:100vh;inset-block-start:0px;inset-inline-start:0px;z-index:95}@-webkit-keyframes appear{from{opacity:0}to{opacity:1}}@keyframes appear{from{opacity:0}to{opacity:1}}';export{b as fw_data_table}