import { B as BUILD, c as consoleDevInfo, p as plt, w as win, H, d as doc, N as NAMESPACE, a as promiseResolve, b as bootstrapLazy } from './index-4996832f.js';
import { g as globalScripts } from './app-globals-9db02350.js';
import './toast-util-96968d8c.js';

/*
 Stencil Client Patch Browser v2.9.0 | MIT Licensed | https://stenciljs.com
 */
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find((s) => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = "";
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return __sc_import_crayons_datatable(/* webpackChunkName: "polyfills-dom" */ './dom-db0073f0.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], {
                    type: 'application/javascript',
                }));
                mod = new Promise((resolve) => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["fw-datepicker",[[1,"fw-datepicker",{"mode":[1],"minDate":[1,"min-date"],"maxDate":[1,"max-date"],"fromDate":[1025,"from-date"],"toDate":[1025,"to-date"],"dateFormat":[1,"date-format"],"value":[1025],"name":[1],"placeholder":[1],"showDatePicker":[32],"year":[32],"toYear":[32],"monthDetails":[32],"nextMonthDetails":[32],"month":[32],"todayTimestamp":[32],"selectedDay":[32],"startDate":[32],"endDate":[32],"startDateFormatted":[32],"endDateFormatted":[32],"dateHovered":[32],"supportedYears":[32],"toMonth":[32]},[[0,"fwFocus","displayDatePicker"],[0,"fwClick","handleButtonClick"],[0,"fwChange","handleMonthYearDropDownSelection"]]]]],["fw-timepicker",[[1,"fw-timepicker",{"format":[1],"disabled":[4],"value":[1025],"name":[1],"interval":[2],"minTime":[1,"min-time"],"maxTime":[1,"max-time"],"timeValues":[32],"isMeridianFormat":[32],"isDefaultEndTime":[32]}]]],["fw-dropdown-button",[[1,"fw-dropdown-button",{"label":[1],"color":[1],"split":[4],"disabled":[4],"searchable":[4],"value":[1032],"placeholder":[1],"options":[1040],"optionInput":[32],"filteredOptions":[32],"isDropdownOpen":[32]}]]],["fw-modal",[[1,"fw-modal",{"titleText":[1,"title-text"],"description":[1],"icon":[1],"size":[1],"submitText":[1,"submit-text"],"cancelText":[1,"cancel-text"],"submitDisabled":[4,"submit-disabled"],"submitColor":[1,"submit-color"],"hideFooter":[4,"hide-footer"],"isOpen":[1540,"is-open"],"modalTitle":[32],"modalFooter":[32],"modalContent":[32],"firstFocusElement":[32],"lastFocusElement":[32],"close":[64],"open":[64]}]]],["fw-toast-message",[[1,"fw-toast-message",{"open":[1540],"type":[1],"timeout":[2],"content":[1],"actionLinkText":[1,"action-link-text"],"sticky":[4],"pauseOnHover":[4,"pause-on-hover"],"isMouseHovered":[32],"isTimedOut":[32],"timerId":[32],"fadeOut":[32],"iconSize":[32]}]]],["fw-button1",[[1,"fw-button1",{"type":[1],"color":[1],"disabled":[516],"expand":[4],"size":[1],"modalTriggerId":[1,"modal-trigger-id"]}]]],["fw-inline-message",[[1,"fw-inline-message",{"closable":[4],"type":[1],"duration":[2],"open":[1540],"show":[64],"hide":[64]}]]],["fw-tabs",[[1,"fw-tabs",{"label":[1],"activeTabIndex":[1538,"active-tab-index"],"activeTabName":[513,"active-tab-name"]},[[0,"click","handleClick"],[0,"keydown","handleKeyDown"],[0,"keyup","handleKeyUp"]]]]],["fw-toggle",[[1,"fw-toggle",{"checked":[1028],"size":[1],"name":[1],"disabled":[4],"showIcon":[4,"show-icon"],"label":[1]},[[0,"keyup","handleKeyUp"],[0,"keydown","handleKeyDown"]]]]],["fw-avatar",[[1,"fw-avatar",{"image":[1],"alt":[1],"initials":[1],"shape":[1],"size":[1],"mode":[1]}]]],["fw-button-group",[[1,"fw-button-group",{"label":[1025]}]]],["fw-modal-content",[[1,"fw-modal-content"]]],["fw-radio",[[1,"fw-radio",{"checked":[1540],"disabled":[1540],"label":[1],"value":[1],"name":[1]}]]],["fw-radio-group",[[0,"fw-radio-group",{"allowEmpty":[4,"allow-empty"],"label":[1],"name":[1],"orientation":[1],"value":[1032]},[[0,"keydown","handleKeydown"],[0,"keyup","handleKeyup"]]]]],["fw-tab",[[1,"fw-tab",{"tabName":[1,"tab-name"],"tabHeader":[1,"tab-header"],"disabled":[4],"active":[4]}]]],["fw-textarea",[[1,"fw-textarea",{"label":[1],"value":[1025],"cols":[2],"rows":[2],"maxlength":[2],"minlength":[2],"name":[1],"placeholder":[1],"state":[1],"wrap":[1],"stateText":[1,"state-text"],"readonly":[4],"required":[4],"disabled":[4],"hasFocus":[32],"setFocus":[64]}]]],["fw-toast",[[1,"fw-toast",{"position":[1],"timeout":[2],"type":[1],"content":[1],"actionLinkText":[1,"action-link-text"],"sticky":[4],"pauseOnHover":[4,"pause-on-hover"],"trigger":[64]}]]],["fw-modal-footer",[[1,"fw-modal-footer",{"submitText":[1,"submit-text"],"cancelText":[1,"cancel-text"],"submitDisabled":[4,"submit-disabled"],"submitColor":[1,"submit-color"],"submit":[8],"close":[8]}]]],["fw-modal-title",[[1,"fw-modal-title",{"titleText":[1,"title-text"],"description":[1],"icon":[1],"close":[8]}]]],["fw-label",[[1,"fw-label",{"color":[1],"value":[1]}]]],["fw-tab-panel",[[1,"fw-tab-panel",{"name":[1],"active":[516]}]]],["fw-checkbox",[[1,"fw-checkbox",{"checked":[1540],"disabled":[1540],"label":[1],"name":[1],"value":[1]},[[0,"keydown","handleKeydown"],[0,"keyup","handleKeyup"]]]]],["fw-list-options",[[1,"fw-list-options",{"options":[16],"value":[1040],"max":[2],"multiple":[4],"searchable":[4],"variant":[1],"filterText":[8,"filter-text"],"isCheckbox":[4,"is-checkbox"],"notFoundText":[1,"not-found-text"],"searchText":[1,"search-text"],"filteredOptions":[32],"selectOptions":[32],"getSelectedOptions":[64],"setSelectedValues":[64]},[[0,"fwSelected","fwSelectedHandler"]]]]],["fw-popover",[[1,"fw-popover",{"placement":[1],"fallbackPlacements":[16],"boundary":[16],"skidding":[1],"distance":[1],"variant":[1],"sameWidth":[4,"same-width"],"trigger":[1],"popperInstance":[32],"isOpen":[32],"popperOptions":[32],"show":[64],"hide":[64]}]]],["fw-tag",[[1,"fw-tag",{"text":[513],"disabled":[516],"value":[513]}]]],["fw-icon",[[1,"fw-icon",{"name":[1],"size":[2],"color":[1],"svgHTML":[32]}]]],["fw-input",[[1,"fw-input",{"label":[1],"value":[1025],"type":[1],"autocomplete":[1],"clearInput":[4,"clear-input"],"maxlength":[2],"minlength":[2],"name":[1],"placeholder":[1],"state":[1],"stateText":[1,"state-text"],"readonly":[4],"required":[4],"disabled":[4],"iconLeft":[1,"icon-left"],"iconRight":[1,"icon-right"],"hasFocus":[32],"setFocus":[64]}]]],["fw-select",[[1,"fw-select",{"label":[1],"value":[1544],"name":[1],"type":[1],"placeholder":[1],"state":[1],"stateText":[1,"state-text"],"readonly":[4],"required":[4],"forceSelect":[4,"force-select"],"disabled":[4],"multiple":[4],"max":[2],"variant":[1],"searchable":[4],"options":[520],"isCheckbox":[4,"is-checkbox"],"isExpanded":[32],"hasFocus":[32],"didInit":[32],"searchValue":[32],"listOptions":[32],"getSelectedItem":[64],"setSelectedValues":[64]},[[0,"fwChange","fwSelectedHandler"],[0,"fwClosed","fwCloseHandler"],[0,"keydown","onKeyDonw"]]]]],["fw-button",[[1,"fw-button",{"type":[1],"color":[1],"size":[1],"disabled":[516],"loading":[4],"showCaretIcon":[4,"show-caret-icon"],"modalTriggerId":[1,"modal-trigger-id"],"throttleDelay":[2,"throttle-delay"],"hasLabel":[32],"hasBeforeLabel":[32],"hasAfterLabel":[32]}]]],["fw-select-option",[[1,"fw-select-option",{"value":[513],"selected":[1540],"disabled":[1540],"html":[1540],"optionText":[513,"option-text"],"htmlContent":[1,"html-content"],"variant":[1],"text":[1],"subText":[513,"sub-text"],"groupName":[1,"group-name"],"graphicsProps":[8,"graphics-props"],"isCheckbox":[4,"is-checkbox"],"setFocus":[64]},[[0,"keydown","onKeyDown"]]]]],["fw-spinner",[[1,"fw-spinner",{"size":[1],"color":[1]}]]]], options);
});
