import{r as t,h as s,e as r}from"./p-c5706edf.js";import{c as i,a as o}from"./p-53467aff.js";import"./p-79178ffe.js";let e=class{constructor(s){t(this,s),this.position="top-center",this.timeout=4e3,this.type="warning",this.actionLinkText="",this.sticky=!1}componentWillLoad(){this.toastContainer=i(this)}async trigger(t){o(t,this.toastContainer,this)}render(){return s(r,null,s("slot",null))}};export{e as fw_toast}