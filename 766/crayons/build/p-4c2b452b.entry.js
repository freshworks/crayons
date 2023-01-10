import{r as t,c as i,h as e,e as s}from"./p-c5706edf.js";import{T as n,i as a}from"./p-30848d13.js";var o=function(t,i,e,s){var n,a=arguments.length,o=a<3?i:null===s?s=Object.getOwnPropertyDescriptor(i,e):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,i,e,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(a<3?n(o):a>3?n(i,e,o):n(i,e))||o);return a>3&&o&&Object.defineProperty(i,e,o),o};let r=class{constructor(e){t(this,e),this.fwChange=i(this,"fwChange",7),this.page=1,this.perPage=10,this.buttonGroupLabel="",this.previousButtonLabel="",this.nextButtonLabel="",this.isLoading=!1}async previousPage(){this.goToPrevious()}async nextPage(){this.goToNext()}getLastPage(){return Math.ceil(this.total/this.perPage)}getStartRecord(){return Math.max((this.page-1)*this.perPage+1,1)}getEndRecord(){return Math.min(this.start+this.perPage-1,this.total)}handlePage(t){t>this.getLastPage()||(this.start=this.getStartRecord(),this.end=this.getEndRecord())}handleTotal(){this.end=this.getEndRecord()}componentWillLoad(){this.page=Math.min(this.page,this.getLastPage()),this.start=this.getStartRecord(),this.end=this.getEndRecord()}goToPrevious(){this.page=Math.max(1,this.page-1),this.fwChange.emit({page:this.page})}goToNext(){this.page=Math.min(this.getLastPage(),this.page+1),this.fwChange.emit({page:this.page})}render(){return e(s,null,e("div",{class:"current-record",innerHTML:n.t("pagination.content",{start:this.start,end:this.end,total:this.total})}),e("fw-button-group",{label:this.buttonGroupLabel},e("fw-button",{disabled:1===this.start||this.isLoading,color:"secondary",size:"icon","aria-label":this.previousButtonLabel,onFwClick:()=>this.goToPrevious()},e("fw-icon",{name:"chevron-left"})),e("fw-button",{disabled:this.end===this.total||this.isLoading,color:"secondary",size:"icon","aria-label":this.nextButtonLabel,onFwClick:()=>this.goToNext()},e("fw-icon",{name:"chevron-right"}))))}static get watchers(){return{page:["handlePage"],total:["handleTotal"]}}};o([a({keyName:"pagination.buttonGroupLabel"})],r.prototype,"buttonGroupLabel",void 0),o([a({keyName:"pagination.previousButtonLabel"})],r.prototype,"previousButtonLabel",void 0),o([a({keyName:"pagination.nextButtonLabel"})],r.prototype,"nextButtonLabel",void 0),r.style=':host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.current-record{color:#6f7c87;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:14px;margin-inline-end:14px;line-height:20px;font-size:14px}.current-record .record{font-weight:700}';export{r as fw_pagination}