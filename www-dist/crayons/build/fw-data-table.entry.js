import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { c as createPopper } from './index-ef8c8619.js';
import { T as TranslationController } from './Translation-c1d22902.js';
import { p as popperModifierRTL } from './index-a4741a9c.js';

const dataTableCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}div.fw-data-table-container{position:relative;width:100%;height:100%;overflow:visible}div.fw-data-table-container div.fw-data-table-scrollable{position:relative;display:block;width:100%;height:100%;overflow:auto}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table{table-layout:fixed;border-collapse:collapse;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:100%;width:-webkit-max-content;width:-moz-max-content;width:max-content}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead{position:-webkit-sticky;position:sticky;inset-block-start:0;width:100%;border-radius:4px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th{color:#475867;font-size:12px;line-height:20px;padding:12px 8px;font-weight:600;letter-spacing:0.2px;text-overflow:ellipsis;text-align:start;z-index:1;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:40px;max-width:1000px;background:#f5f7f9;overflow-wrap:anywhere;word-break:break-word;white-space:normal}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th:first-of-type{-webkit-padding-start:16px;padding-inline-start:16px;border-end-start-radius:0px;border-end-end-radius:0px;border-start-end-radius:0px;border-start-start-radius:4px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th:last-of-type{-webkit-padding-end:16px;padding-inline-end:16px;border-end-start-radius:0px;border-end-end-radius:0px;border-start-end-radius:4px;border-start-start-radius:0px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th.data-grid-sm{padding:4px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th.data-grid-md{padding:12px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th.data-grid-lg{padding:16px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table thead tr th.hidden{display:none}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody{width:100%;background:#fff}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr{width:100%;-webkit-border-after:1px solid #ebeff3;border-block-end:1px solid #ebeff3}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr:hover,div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr:focus{background:#f5f7f9}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr.active{background:#e5f2fd}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr:last-child{-webkit-border-after:0px;border-block-end:0px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td{color:#12344d;font-size:14px;line-height:20px;padding:12px 8px;text-overflow:ellipsis;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:0;height:64px;overflow-wrap:anywhere;word-break:break-word;white-space:normal}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.data-grid-checkbox{text-align:center;width:20px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.data-grid-sm{padding:4px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.data-grid-md{padding:12px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.data-grid-lg{padding:16px 8px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td:first-child{-webkit-padding-start:16px;padding-inline-start:16px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td:last-child{-webkit-padding-end:16px;padding-inline-end:16px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.row-actions{width:1px;white-space:nowrap}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.row-actions fw-button{-webkit-margin-end:5px;margin-inline-end:5px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.row-actions fw-tooltip:last-child fw-button{-webkit-margin-end:0px;margin-inline-end:0px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr td.hidden{display:none}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr.loading{cursor:not-allowed}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr.loading td{position:relative;opacity:0.65}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody tr.loading td::after{content:\"\";position:absolute;inset-block-start:0px;inset-inline-start:0px;inset-block-end:0px;inset-inline-end:0px}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table tbody fw-skeleton{display:block;height:10px;padding-inline:0px;padding-block:4px;-webkit-box-sizing:content-box;box-sizing:content-box}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table.is-selectable td:first-child,div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table.is-selectable th:first-child{text-align:center}div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table.is-selectable td:first-child fw-checkbox,div.fw-data-table-container div.fw-data-table-scrollable table.fw-data-table.is-selectable th:first-child fw-checkbox{display:block;width:16px;height:20px}div.fw-data-table-container div.fw-data-table-scrollable.loading{opacity:0.65}div.fw-data-table-container div.fw-data-table-scrollable.shimmer{overflow:hidden}div.fw-data-table-container .fw-data-table--loading{position:absolute;inset-block-start:0px;inset-inline-start:0px;width:100%;height:100%}div.fw-data-table-container .table-settings{position:absolute;inset-inline-end:0px;inset-block-start:0px}div.fw-data-table-container .table-settings .table-settings-container{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:end;align-items:flex-end}div.fw-data-table-container .table-settings .table-settings-container .table-settings-button{width:40px;min-height:44px;background:#fff;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid #ebeff3;border-end-start-radius:0px;border-end-end-radius:0px;border-start-end-radius:4px;border-start-start-radius:0px;margin:0px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-button:focus,div.fw-data-table-container .table-settings .table-settings-container .table-settings-button:hover{cursor:pointer}div.fw-data-table-container .table-settings .table-settings-container .table-settings-button:disabled{cursor:default;opacity:0.65}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options{z-index:99;width:500px;-webkit-box-sizing:border-box;box-sizing:border-box;background:#fff;border:1px solid #ebeff3;border-radius:4px;-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-after:0px;padding-block-end:0px;-webkit-padding-end:0px;padding-inline-end:0px;-webkit-padding-before:22px;padding-block-start:22px;display:none;-webkit-animation:appear 0.3s;animation:appear 0.3s}:host(:not([dir=\"rtl\"])) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options,:host([dir=\"ltr\"]) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options{-webkit-box-shadow:-15px 20px 40px rgba(0, 0, 0, 0.04);box-shadow:-15px 20px 40px rgba(0, 0, 0, 0.04)}:host([dir=\"rtl\"]) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options{-webkit-box-shadow:15px 20px 40px rgba(0, 0, 0, 0.04);box-shadow:15px 20px 40px rgba(0, 0, 0, 0.04)}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options.show{display:block}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header{display:-ms-flexbox;display:flex;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-weight:600;-ms-flex-align:end;align-items:flex-end;padding-inline:22px;padding-block:0px;-webkit-margin-after:16px;margin-block-end:16px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header span.title{-ms-flex-positive:1;flex-grow:1;font-size:16px;line-height:24px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header button.reset{-ms-flex-positive:0;flex-grow:0;color:#2c5cc5;font-size:14px;font-weight:600;text-decoration:none;line-height:17px;-webkit-padding-end:4px;padding-inline-end:4px;margin:0px;background:#fff;border:0px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header button.reset:focus,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-header button.reset:hover{cursor:pointer}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content{display:-ms-flexbox;display:flex;width:100%;height:342px;-webkit-box-sizing:border-box;box-sizing:border-box;padding-inline:22px;padding-block:0px;gap:14px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-positive:1;flex-grow:1;width:220px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-title{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-padding-after:5px;padding-block-end:5px;-webkit-padding-start:5px;padding-inline-start:5px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-search{position:relative;inset-block-start:-3px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-positive:1;flex-grow:1;-webkit-margin-before:14px;margin-block-start:14px;overflow-y:hidden;width:calc(100% + 5px)}:host(:not([dir=\"rtl\"])) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose,:host([dir=\"ltr\"]) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose{-webkit-transform:translateX(-3px);transform:translateX(-3px)}:host([dir=\"rtl\"]) div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose{-webkit-transform:translateX(3px);transform:translateX(3px)}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose .table-settings-content-checkboxes{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow-y:auto;-webkit-padding-start:5px;padding-inline-start:5px;-webkit-padding-end:5px;padding-inline-end:5px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose .table-settings-content-checkboxes div{margin-inline:0px;margin-block:5px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-left .table-settings-content-choose .table-settings-content-checkboxes div fw-checkbox{width:100%;overflow-wrap:break-word}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:220px;-webkit-box-sizing:border-box;box-sizing:border-box;background:#ebeff3;border-end-start-radius:0px;border-end-end-radius:0px;border-start-end-radius:4px;border-start-start-radius:4px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-title{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-padding-after:3px;padding-block-end:3px;padding-inline:12px;-webkit-padding-before:8px;padding-block-start:8px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable{width:100%;-ms-flex-positive:1;flex-grow:1;padding-inline:12px;padding-block:0px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow-y:auto}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item{display:-ms-flexbox;display:flex;background:#fff;border-radius:4px;-webkit-box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06);box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06);border:1px solid #ebeff3;-webkit-padding-start:14px;padding-inline-start:14px;-webkit-padding-after:7px;padding-block-end:7px;-webkit-padding-end:8px;padding-inline-end:8px;-webkit-padding-before:7px;padding-block-start:7px;margin-inline:0px;margin-block:8px;font-size:14px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-close{width:16px;-ms-flex-positive:0;flex-grow:0;text-align:center}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon:focus,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon:hover,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-close:focus,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-close:hover{cursor:pointer}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon.non-drag:hover,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon.non-drag:focus{cursor:default}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-icon{width:9px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-close{background:#fff;border:0px;padding:0px;margin:0px}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-text{-ms-flex-positive:1;flex-grow:1;color:#12344d;padding-inline:11px;padding-block:0px;-webkit-box-sizing:border-box;box-sizing:border-box;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-text:hover,div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-right .table-settings-content-draggable .table-settings-drag-item .table-settings-drag-item-text:focus{cursor:default}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-content .table-settings-content-title{font-size:14px;line-height:20px;color:#475867;font-weight:600}div.fw-data-table-container .table-settings .table-settings-container .table-settings-options .table-settings-footer{display:-ms-flexbox;display:flex;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background:#f5f7f9;padding-inline:16px;padding-block:12px;gap:12px;-ms-flex-pack:end;justify-content:flex-end}@media (prefers-reduced-motion){div.fw-data-table-container .table-settings .table-settings-container .table-settings-options{-webkit-animation:none;animation:none}}div.fw-data-table-container .table-settings .table-settings-overlay{position:fixed;width:100vw;height:100vh;inset-block-start:0px;inset-inline-start:0px;z-index:95}@-webkit-keyframes appear{from{opacity:0}to{opacity:1}}@keyframes appear{from{opacity:0}to{opacity:1}}";

const PREDEFINED_VARIANTS_META = {
  anchor: {
    componentName: 'fw-custom-cell-anchor',
    isFocusable: true,
  },
  user: {
    componentName: 'fw-custom-cell-user',
    isFocusable: false,
    skipTextAlign: true,
  },
  icon: {
    componentName: 'fw-custom-cell-icon',
    isFocusable: false,
  },
  paragraph: {
    componentName: 'fw-custom-cell-paragraph',
    isFocusable: true,
  },
};
const TABLE_POPPER_CONFIG = {
  strategy: 'fixed',
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 2],
      },
    },
    popperModifierRTL,
  ],
};
let localStorage = null;
try {
  if (window.localStorage) {
    localStorage = window.localStorage;
  }
}
catch (error) {
  console.warn('Cannot save table settings to localStorage');
}
let DataTable = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwSelectionChange = createEvent(this, "fwSelectionChange", 7);
    this.fwSelectAllChange = createEvent(this, "fwSelectAllChange", 7);
    /**
     * Label attribute is not visible on screen. There for accessibility purposes.
     */
    this.label = '';
    /**
     * To enable bulk actions on the table.
     */
    this.rowActions = [];
    /**
     * Rows Array of objects to be displayed in the table.
     */
    this.rows = [];
    /**
     * Columns Array of objects that provides information regarding the columns in the table.
     */
    this.columns = [];
    /**
     * isSelectable Boolean based on which selectable options appears for rows in the table.
     */
    this.isSelectable = false;
    /**
     * isAllSelectable Boolean based on which select all option appears in the table header
     */
    this.isAllSelectable = false;
    /**
     * showSettings is used to show the settings button on the table.
     */
    this.showSettings = false;
    /**
     * autoSaveSettings to enable auto saving of table settings to `localstorage`.
     * If set to `true`, make sure `id` attribute is also set to the `data-table`
     */
    this.autoSaveSettings = false;
    /**
     * To disable table during async operations
     */
    this.isLoading = false;
    /**
     * shimmerCount number of shimmer rows to show during initial loading
     */
    this.shimmerCount = 4;
    /**
     * orderedColumns Maintains a collection of ordered columns.
     */
    this.orderedColumns = [];
    /**
     * selected Array of selected row id.
     */
    this.selected = [];
    /**
     * Collection of rows loading
     */
    this.rowsLoading = {};
    /**
     * Temporary setting for table column drag/drop configuration
     */
    this.columnsDragSetting = [];
    /**
     * Temporary settings for table column hide/show configuration
     */
    this.columnsHideSetting = [];
    /**
     * isSettingsOpen when true shows table settings container.
     */
    this.isSettingsOpen = false;
    /**
     * text to search for columns in settings.
     */
    this.settingSearchText = '';
    /**
     * disable column hide options when only one column is visible.
     */
    this.disabledColumnHide = false;
    /**
     * show shimmer on set to false after intial table load.
     */
    this.showShimmer = true;
    /**
     * width of the columns is auto calculated as table width is lesser than container width.
     */
    this.ifAutoCalculatedWidth = false;
    /**
     * Private
     * To perform actions after a render
     * WorkAround for stencil wait for next render
     * https://github.com/ionic-team/stencil/issues/2744
     */
    this.renderPromiseResolve = null;
    this.popperInstance = null;
    this.settingsButton = null;
    this.settingsUpdateButton = null;
    this.settingsResetButton = null;
    this.settingsInput = null;
    this.settingsDragContainer = null;
    this.settings = null;
    this.tableContainer = null;
    this.selectColumnHeader = null;
    this.lastColumnHeader = null;
  }
  /**
   * componentWillLoad lifecycle event
   */
  componentWillLoad() {
    this.columnOrdering(this.columns);
    if (localStorage && this.autoSaveSettings) {
      const tableId = this.el.id ? `-${this.el.id}` : '';
      const tableSettings = localStorage.getItem(`fw-table${tableId}`);
      tableSettings && this.setTableSettings(JSON.parse(tableSettings));
    }
    this.rows.length && this.hideShimmer();
  }
  /**
   * componentDidLoad lifecycle event
   */
  componentDidLoad() {
    if (this.showSettings) {
      if (this.settingsButton) {
        this.settingsButton.style.height =
          this.el.shadowRoot.querySelector('thead').offsetHeight + 'px';
      }
      this.popperInstance = createPopper(this.settingsButton, this.settings, TABLE_POPPER_CONFIG);
    }
  }
  /**
   * componentDidRender lifecycle event
   */
  componentDidRender() {
    if (this.renderPromiseResolve) {
      this.renderPromiseResolve();
      this.renderPromiseResolve = null;
    }
    /**
     * Hack to override table behaviour of expanding columns when total column with lesser than container width.
     * Idea is to remove the width on the last column so that it occupies the rest of the space.
     */
    if (this.selectColumnHeader) {
      if (parseInt(window.getComputedStyle(this.selectColumnHeader).width) > 40 &&
        !this.ifAutoCalculatedWidth) {
        this.ifAutoCalculatedWidth = true;
      }
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.popperInstance) === null || _a === void 0 ? void 0 : _a.destroy();
  }
  /**
   * keyDownHandler
   * @param event
   */
  keyDownHandler(event) {
    if (event.key === 'Escape') {
      this.toggleSettings(false);
    }
    else {
      this.arrowNavigate(event);
    }
  }
  /**
   * showSettingsHandler
   * @param showSettings
   */
  showSettingsHandler(showSettings) {
    if (showSettings) {
      this.waitForNextRender().then(() => {
        this.settingsButton.style.height =
          this.el.shadowRoot.querySelector('thead').offsetHeight + 'px';
        if (!this.popperInstance) {
          this.popperInstance = createPopper(this.settingsButton, this.settings, TABLE_POPPER_CONFIG);
        }
      });
    }
  }
  /**
   * columnsChangeHandler
   * @param newColumns recent datatable columns value
   */
  columnsChangeHandler(newColumns) {
    this.columnOrdering(newColumns);
  }
  /**
   * watchChangeHandler
   * @param newRows recent datatable columns value
   */
  rowsChangeHandler(newRows) {
    newRows.length && this.hideShimmer();
  }
  loadingHandler() {
    if (this.isSettingsOpen) {
      this.toggleSettings(false);
    }
  }
  /**
   * Private
   * selectRow
   * @param rowId Id of row to select/unselect in the table
   * @param checked option to select/unselct
   * @returns currently selected rows
   */
  selectRow(rowId, checked = true) {
    if (checked) {
      if (this.selected.indexOf(rowId) < 0) {
        this.selected = [...this.selected, rowId];
      }
    }
    else {
      const selected = this.selected.filter((selected) => selected !== rowId);
      this.selected = [...selected];
    }
    this.fwSelectionChange.emit({
      rowId: rowId,
      checked: checked,
      selected: this.selected,
    });
    return this.selected;
  }
  /**
   * selectAllRows method we can use to select/unselect rows in the table
   * @param checked denotes if we want to check or uncheck the rows
   */
  async selectAllRows(checked = true) {
    if (checked === true) {
      let selectedRowCount = 0;
      const newlySelected = this.rows
        .filter((row) => !this.selected.includes(row.id))
        .map((filteredRow) => {
        selectedRowCount = selectedRowCount + 1;
        return filteredRow.id;
      });
      this.selected = [...this.selected, ...newlySelected];
    }
    else {
      this.selected = [];
    }
    this.fwSelectAllChange.emit({
      checked: checked,
      selected: this.selected,
    });
    return this.selected;
  }
  /**
   * getSelectedRows
   * @returns selected rows from the data table
   */
  async getSelectedRows() {
    return this.rows.filter((row) => this.selected.includes(row.id));
  }
  /**
   * getSelectedIds
   * @returns an array of selected row IDs
   */
  async getSelectedIds() {
    return this.selected;
  }
  /**
   * getTableSettings
   * @returns columnConfig object
   */
  async getTableSettings() {
    const columnConfig = {};
    this.orderedColumns.map((column) => {
      if (!columnConfig[column.key]) {
        columnConfig[column.key] = {};
      }
      columnConfig[column.key].position = column.position;
      columnConfig[column.key].hide = column.hide || false;
      columnConfig[column.key].lock = column.lock || false;
    });
    return columnConfig;
  }
  /**
   * setTableSettings
   * @param columnConfig columnConfig object
   */
  async setTableSettings(columnConfig) {
    try {
      let orderedColumns = [...this.orderedColumns];
      for (const key in columnConfig) {
        if (Object.prototype.hasOwnProperty.call(columnConfig, key)) {
          const config = columnConfig[key];
          const modifiedOrderColumn = this.getColumnsState(orderedColumns, key, config);
          orderedColumns = modifiedOrderColumn;
        }
      }
      this.orderedColumns = [...orderedColumns];
    }
    catch (error) {
      console.warn('Save table settings was not applied');
    }
    return this.orderedColumns;
  }
  /**
   * loadTable - Method to call when we want to change table loading state
   * @param state to load table or not
   * @returns isLoading current state
   */
  async loadTable(state = true) {
    this.isLoading = state;
    return this.isLoading;
  }
  /**
   * hideShimmer
   */
  hideShimmer() {
    if (this.showShimmer) {
      this.showShimmer = false;
    }
  }
  /**
   * Private
   * getColumnsState function to call when updating a column state.
   * Updating state using this function can help update the UI easily.
   * @param state current state to modify
   * @param stateKey key that can help identify what object in state to identify
   * @param keyValuePairs key value pair to modify the object
   * @returns modifies state object
   */
  getColumnsState(state, stateKey, keyValuePairs) {
    const currentElementIndex = state.findIndex((stateElement) => stateElement.key === stateKey);
    const currentElement = state[currentElementIndex];
    const modifiedCurrentElement = Object.assign(Object.assign({}, currentElement), keyValuePairs);
    const otherElements = state.filter((stateElement) => stateElement.key !== stateKey);
    const preElements = otherElements.slice(0, currentElementIndex);
    const postElements = otherElements.slice(currentElementIndex, otherElements.length);
    if (modifiedCurrentElement.position !== currentElement.position) {
      for (let index = 0; index < preElements.length; index++) {
        const preElement = preElements[index];
        if (preElement.position >= modifiedCurrentElement.position &&
          preElement.position <= currentElement.position) {
          preElement.position = preElement.position + 1;
        }
      }
      for (let index = 0; index < postElements.length; index++) {
        const postElement = postElements[index];
        if (postElement.position <= modifiedCurrentElement.position &&
          postElement.position >= currentElement.position) {
          postElement.position = postElement.position - 1;
        }
      }
    }
    const newStateOrder = [
      ...preElements,
      modifiedCurrentElement,
      ...postElements,
    ].sort((a, b) => a.position - b.position);
    return newStateOrder;
  }
  /**
   * Private
   * lockFocusInside lock the focus inside modal overlay
   */
  lockFocusInsideSettings() {
    const resetFocus = (event) => {
      event.stopPropagation();
      if (event.shiftKey === false && event.key === 'Tab') {
        this.settingsResetButton.focus();
      }
    };
    const updateFocus = (event) => {
      event.stopPropagation();
      if (event.shiftKey === true && event.key === 'Tab') {
        this.settingsUpdateButton.setFocus();
      }
    };
    this.settingsUpdateButton.addEventListener('keydown', resetFocus);
    this.settingsResetButton.addEventListener('keydown', updateFocus);
  }
  /**
   * Private
   * toggleSettings
   * @param isOpen opens/closes the table
   * @return isOpen current open/close state
   */
  async toggleSettings(isOpen = true) {
    await this.resetSettings();
    this.isSettingsOpen = isOpen;
    await this.waitForNextRender();
    this.popperInstance.update();
    if (isOpen) {
      this.settingsInput.setFocus();
      this.lockFocusInsideSettings();
    }
    return isOpen;
  }
  /**
   * resetSettings function to reset the temporary column state in settings using table column state.
   */
  async resetSettings() {
    this.settingSearchText = '';
    this.settingsInput.value = '';
    this.columnsDragSetting = [];
    this.columnsHideSetting = [];
    const modifiedColumnsDragSettings = this.orderedColumns.map((column) => {
      const columnInfo = {};
      columnInfo.key = column.key;
      columnInfo.text = column.text;
      columnInfo.position = column.position;
      columnInfo.hide = column.hide || false;
      columnInfo.lock = column.lock;
      return columnInfo;
    });
    this.columnsDragSetting = modifiedColumnsDragSettings;
    const modifiedColumnsHideSettings = this.columns.map((column) => {
      const columnInfo = {};
      const orderedColumn = this.orderedColumns.filter((orderedColumn) => orderedColumn.key === column.key)[0];
      columnInfo.key = column.key;
      columnInfo.text = column.text;
      columnInfo.hide = orderedColumn.hide;
      columnInfo.lock = orderedColumn.lock;
      return columnInfo;
    });
    this.columnsHideSetting = modifiedColumnsHideSettings;
  }
  /**
   * applySettings function to apply temporary column state in settings to tables column state
   */
  async applySettings() {
    this.columnsDragSetting.forEach((currentSetting) => {
      const newColumnState = this.getColumnsState(this.orderedColumns, currentSetting.key, {
        hide: currentSetting.hide,
        position: currentSetting.position,
      });
      this.orderedColumns = [...newColumnState];
    });
    if (localStorage && this.autoSaveSettings) {
      try {
        const tableId = this.el.id ? `-${this.el.id}` : null;
        if (tableId) {
          const columnConfig = await this.getTableSettings();
          localStorage.setItem(`fw-table${tableId}`, JSON.stringify(columnConfig));
        }
        else {
          throw new Error("Table must have an 'id' attribute to autosave settings");
        }
      }
      catch (error) {
        console.log(error.message);
      }
    }
    this.toggleSettings(false);
    this.ifAutoCalculatedWidth = false;
  }
  /**
   * arrowNavigation function that helps with table navigation
   * @param event event that triggers navigation inside table
   */
  arrowNavigate(event) {
    const currentElement = this.getEventPath(event)[0];
    const currentCell = this.closestTableCell(this.getEventPath(event));
    if (currentCell) {
      let cellFocusChange = false;
      // Switch focus between components inside a cell
      if (currentElement !== currentCell) {
        cellFocusChange = this.arrowNavigateCellComponents(event.code, currentElement);
      }
      else {
        cellFocusChange = true;
      }
      // Switch focus between cells
      if (cellFocusChange) {
        this.arrowNavigateCell(event.code, currentCell);
      }
    }
  }
  /**
   * arrowNavigateCellComponents Navigate between components in a cell
   * @param eventCode code for the keyboard event
   * @param currentElement current element the focus is on
   * @returns cellFocusChange boolean tells if this a navigation between cells
   */
  arrowNavigateCellComponents(eventCode, currentElement) {
    var _a, _b, _c, _d, _e;
    let cellFocusChange = false;
    let nextFocusElement = null;
    switch (eventCode) {
      case 'ArrowRight':
        if (currentElement.parentElement.nodeName === 'FW-TOOLTIP') {
          if (currentElement.parentElement.nextElementSibling) {
            if ((_a = currentElement.parentElement.nextElementSibling.children[0]) === null || _a === void 0 ? void 0 : _a.getAttribute('tabindex')) {
              nextFocusElement =
                currentElement.parentElement.nextElementSibling.children[0];
            }
          }
          else {
            cellFocusChange = true;
          }
        }
        else if ((_b = currentElement.nextElementSibling) === null || _b === void 0 ? void 0 : _b.getAttribute('tabIndex')) {
          nextFocusElement = currentElement.nextElementSibling;
        }
        else {
          cellFocusChange = true;
        }
        break;
      case 'ArrowLeft':
        if (currentElement.parentElement.nodeName === 'FW-TOOLTIP') {
          if ((_c = currentElement.parentElement.previousElementSibling) === null || _c === void 0 ? void 0 : _c.getAttribute('tabIndex')) {
            if ((_d = currentElement.parentElement.previousElementSibling.children[0]) === null || _d === void 0 ? void 0 : _d.getAttribute('tabindex')) {
              nextFocusElement =
                currentElement.parentElement.previousElementSibling.children[0];
            }
          }
          else {
            cellFocusChange = true;
          }
        }
        else if ((_e = currentElement.previousElementSibling) === null || _e === void 0 ? void 0 : _e.getAttribute('tabIndex')) {
          nextFocusElement = currentElement.previousElementSibling;
        }
        else {
          cellFocusChange = true;
        }
        break;
      default:
        cellFocusChange = true;
        break;
    }
    if (nextFocusElement) {
      nextFocusElement.setAttribute('tabIndex', '0');
      nextFocusElement.focus();
    }
    return cellFocusChange;
  }
  /**
   * arrowNavigateCell navigate between table cells
   * @param eventCode code for the keyboard event
   * @param currentCell current cell the focus is on
   */
  arrowNavigateCell(eventCode, currentCell) {
    let currentRowIndex = +currentCell.parentElement.getAttribute('aria-rowIndex');
    let currentColIndex = +currentCell.getAttribute('aria-colIndex');
    let nextRowIndex;
    let nextColIndex;
    let columnLength = this.orderedColumns.length;
    columnLength = this.isSelectable ? columnLength + 1 : columnLength;
    columnLength = this.rowActions.length ? columnLength + 1 : columnLength;
    switch (eventCode) {
      case 'ArrowDown':
        nextRowIndex = currentRowIndex + 1;
        nextColIndex = currentColIndex;
        break;
      case 'ArrowUp':
        nextRowIndex = currentRowIndex - 1;
        nextColIndex = currentColIndex;
        break;
      case 'ArrowRight':
        {
          const getNextCellIndex = (currentRowIndex, currentColIndex) => {
            if (currentColIndex !== columnLength) {
              nextRowIndex = currentRowIndex;
              nextColIndex = currentColIndex + 1;
            }
            else {
              nextRowIndex = currentRowIndex + 1;
              nextColIndex = 1;
            }
            return { nextRowIndex, nextColIndex };
          };
          let currentColumnHidden = false;
          do {
            const nextCellIndex = getNextCellIndex(currentRowIndex, currentColIndex);
            const currentColumn = this.tableContainer.querySelector(`th[aria-colIndex="${nextColIndex}"]`);
            currentColumnHidden = currentColumn.classList.contains('hidden');
            if (currentColumnHidden) {
              currentRowIndex = nextCellIndex.nextRowIndex;
              currentColIndex = nextCellIndex.nextColIndex;
            }
            else {
              nextRowIndex = nextCellIndex.nextRowIndex;
              nextColIndex = nextCellIndex.nextColIndex;
            }
          } while (currentColumnHidden); // Loop till next visible column
        }
        break;
      case 'ArrowLeft':
        {
          const getPreviousCellIndex = (currentRowIndex, currentColIndex) => {
            if (currentColIndex !== 1) {
              nextRowIndex = currentRowIndex;
              nextColIndex = currentColIndex - 1;
            }
            else {
              nextRowIndex = currentRowIndex - 1;
              nextColIndex = columnLength;
            }
            return { nextRowIndex, nextColIndex };
          };
          let currentColumnHidden = false;
          do {
            const previousCellIndex = getPreviousCellIndex(currentRowIndex, currentColIndex);
            const currentColumn = this.tableContainer.querySelector(`th[aria-colIndex="${nextColIndex}"]`);
            currentColumnHidden = currentColumn.classList.contains('hidden');
            if (currentColumnHidden) {
              currentRowIndex = previousCellIndex.nextRowIndex;
              currentColIndex = previousCellIndex.nextColIndex;
            }
            else {
              nextRowIndex = previousCellIndex.nextRowIndex;
              nextColIndex = previousCellIndex.nextColIndex;
            }
          } while (currentColumnHidden); // Loop till next visible column
        }
        break;
      default:
        break;
    }
    const nextCell = this.tableContainer.querySelector(`[aria-rowIndex="${nextRowIndex}"] > [aria-colIndex="${nextColIndex}"]`);
    if (nextCell) {
      this.removeFocusCell(currentCell);
      this.focusCell(nextCell, eventCode);
    }
  }
  /**
   * get event's path which is an array of the objects
   * event.path unsupported in safari
   */
  getEventPath(event) {
    return event.path ? event.path : event.composedPath();
  }
  /**
   * WorkAround for wait until next render in stenciljs
   * https://github.com/ionic-team/stencil/issues/2744
   */
  waitForNextRender() {
    return new Promise((resolve) => (this.renderPromiseResolve = resolve));
  }
  /**
   * Function to call when removing the focus of a table cell
   * @param cell table cell
   */
  removeFocusCell(cell) {
    cell.setAttribute('tabIndex', '-1');
  }
  /**
   * Function to call when focusing a table cell
   * @param cell table cell
   * @param direction key direction when focus comes into cell
   */
  focusCell(cell, direction = 'ArrowRight') {
    if (cell.dataset.hasFocusableChild &&
      cell.dataset.hasFocusableChild === 'true') {
      cell.removeAttribute('tabIndex');
      let childElement = null;
      switch (direction) {
        case 'ArrowLeft':
          childElement = cell.children[cell.children.length - 1];
          break;
        default:
          childElement = cell.children[0];
          break;
      }
      if (childElement.nodeName === 'FW-TOOLTIP') {
        childElement = childElement.children[0];
      }
      childElement.setAttribute('tabIndex', '0');
      childElement.focus();
    }
    else {
      cell.setAttribute('tabIndex', '0');
      cell.focus();
    }
  }
  /**
   * hasFocusableComponent - determines if a cell has focusable component
   * @param column column information
   * @returns {boolean} hasFocusableComponent
   */
  hasFocusableComponent(column) {
    let hasFocusableComponent = false;
    if (column.hasFocusableComponent) {
      hasFocusableComponent = true;
    }
    else if (column.variant &&
      PREDEFINED_VARIANTS_META[column.variant].isFocusable) {
      hasFocusableComponent = true;
    }
    return hasFocusableComponent;
  }
  /**
   * private
   * closestTableCell Find the closest table cell from the path of the event
   * @param eventPath Event path from the emitted event
   * @returns closest table cell
   */
  closestTableCell(eventPath) {
    let closestCell;
    for (let i = 0; i < eventPath.length; i++) {
      const element = eventPath[i];
      if (element.nodeName === 'TD') {
        closestCell = element;
        break;
      }
    }
    return closestCell;
  }
  /**
   * columnOrdering Sorting columns based on position to show columns in the right order visually.
   * @param columns
   */
  columnOrdering(columns) {
    this.orderedColumns = [...columns].sort((column1, column2) => {
      let result = 0;
      if (column1.lock && !column2.lock) {
        result = -1;
      }
      else if (!column1.lock && column2.lock) {
        result = 1;
      }
      else if ((!column1.lock && !column2.lock) ||
        (column1.lock && column2.lock)) {
        if (column1.position && column2.position) {
          result = column1.position - column2.position;
        }
        else if (column1.position && !column2.position) {
          result = -1;
        }
        else if (!column1.position && column2.position) {
          result = 1;
        }
      }
      return result;
    });
    // To add correct position to ordered columns array
    this.orderedColumns.map((column, index) => {
      column.position = index + 1;
    });
  }
  /**
   * performRowAction
   * @param action action object - has information related to the action to be performed
   * @param rowData rowData - complete data of the current row
   */
  async performRowAction(action, rowData) {
    const selectAll = this.el.shadowRoot.querySelector('fw-checkbox#select-all');
    if (selectAll && !selectAll.disabled) {
      selectAll.disabled = true;
    }
    this.rowsLoading = Object.assign(Object.assign({}, this.rowsLoading), { [rowData.id]: true });
    try {
      await action.handler(rowData);
    }
    catch (error) {
      console.log(error.message);
    }
    delete this.rowsLoading[rowData.id];
    this.rowsLoading = Object.assign({}, this.rowsLoading);
    if (selectAll && Object.keys(this.rowsLoading).length === 0) {
      selectAll.disabled = false;
    }
  }
  /**
   * Settings search handler
   * @param searchText text to search for in columns list
   */
  settingsSearch(searchText) {
    this.settingSearchText = searchText.toLowerCase();
  }
  /**
   * Settings checkbox handler
   * @param columnKey table column key
   * @param checked value for checked
   * @param event event that is triggering this action
   */
  async settingsColumnToggle(columnKey, checked, event) {
    let changePair;
    if (checked) {
      let lastCheckedPosition = 1;
      this.columnsDragSetting.forEach((column, columnIndex) => !column.hide && (lastCheckedPosition = columnIndex + 1));
      changePair = { hide: !checked, position: lastCheckedPosition + 1 };
    }
    else {
      if (this.disabledColumnHide) {
        if (event) {
          event.currentTarget.checked = true;
        }
        return;
      }
      const position = this.columnsDragSetting.length;
      changePair = { hide: !checked, position: position };
    }
    const newColumnDragState = this.getColumnsState(this.columnsDragSetting, columnKey, changePair);
    const newColumnHideState = this.getColumnsState(this.columnsHideSetting, columnKey, { hide: !checked });
    this.columnsDragSetting = [...newColumnDragState];
    this.columnsHideSetting = [...newColumnHideState];
    if (event) {
      if (event.currentTarget.classList.contains('table-settings-drag-item-close') &&
        event.key === 'Enter') {
        const previousDragItem = event.currentTarget
          .parentElement.previousSibling;
        const nextDragItem = event.currentTarget.parentElement
          .nextSibling;
        await this.waitForNextRender();
        if (previousDragItem || nextDragItem) {
          const focusItem = (previousDragItem || nextDragItem).querySelector('.table-settings-drag-item-close');
          focusItem.focus();
        }
        else {
          const focusItem = this.tableContainer.querySelector('.table-settings-content-checkboxes div:last-child fw-checkbox');
          focusItem.focus();
        }
      }
    }
    this.disabledColumnHide =
      this.columnsHideSetting.filter((column) => !column.hide).length === 1;
    return this.columnsDragSetting;
  }
  /**
   * settingsColumnDrop
   * @param columnKey table column key
   * @param droppedIndex value for position
   */
  async settingsColumnDrop(columnKey, droppedIndex) {
    const lockedColumnsLength = this.columnsDragSetting.filter((column) => column.lock).length;
    const newColumnState = this.getColumnsState(this.columnsDragSetting, columnKey, {
      position: droppedIndex + 1 + lockedColumnsLength,
    });
    this.columnsDragSetting = [...newColumnState];
    return newColumnState;
  }
  /**
   * private
   * @returns {JSX.Element} returns jsx for a webcomponent
   */
  renderWebComponent(componentName, props) {
    let template;
    if (window.customElements.get(componentName)) {
      const WebComponentTag = `${componentName}`;
      let slotText;
      if (props.slotText) {
        slotText = props.slotText;
        delete props.slotText;
      }
      template = h(WebComponentTag, Object.assign({}, props), slotText);
    }
    else {
      template = null;
    }
    return template;
  }
  /**
   * private
   * @returns {JSX.Element} returns jsx for a custom HTML template
   */
  renderCustomTemplate(customTemplate, cellValue) {
    return customTemplate(h, cellValue);
  }
  /**
   * private
   * @returns {JSX.Element} returns jsx from a predefined set of components
   */
  renderPredefinedVariant(columnVariant, cellValue) {
    let template;
    if (columnVariant === 'anchor') {
      template = h("fw-custom-cell-anchor", Object.assign({}, cellValue));
    }
    else if (columnVariant === 'user') {
      template = h("fw-custom-cell-user", Object.assign({}, cellValue));
    }
    else if (columnVariant === 'icon') {
      template = h("fw-custom-cell-icon", Object.assign({}, cellValue));
    }
    else if (columnVariant === 'paragraph') {
      template = (h("fw-custom-cell-paragraph", Object.assign({}, cellValue)));
    }
    else {
      template = null;
    }
    return template;
  }
  /**
   * private
   * @returns {JSX.Element} table body cell
   */
  renderTableCell(column, cellValue) {
    let template;
    if (column.variant) {
      template = this.renderPredefinedVariant(column.variant, cellValue);
    }
    else if (column.customTemplate) {
      template = this.renderCustomTemplate(column.customTemplate, cellValue);
    }
    else {
      template = column.formatData ? column.formatData(cellValue) : cellValue;
    }
    return template;
  }
  /**
   * private
   * @returns {JSX.Element} table header row
   */
  renderTableHeader() {
    var _a;
    const selectAllChecked = this.rows.length &&
      this.rows.every((row) => this.selected.includes(row.id));
    const visibleColumns = this.orderedColumns.filter((column) => !column.hide && column.variant !== 'paragraph');
    const lastVisibleColumnKey = (_a = visibleColumns[visibleColumns.length - 1]) === null || _a === void 0 ? void 0 : _a.key;
    return this.orderedColumns.filter((column) => !column.hide).length ? (h("tr", { role: 'row' }, this.orderedColumns.length && this.isSelectable && (h("th", { ref: (el) => (this.selectColumnHeader = el), key: 'isSelectable', "aria-colindex": 1, style: { width: '40px' } }, this.isAllSelectable && (h("fw-checkbox", { id: 'select-all', value: 'select-all', checked: selectAllChecked, onFwChange: (event) => { var _a, _b; return this.selectAllRows((_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.checked); } })))), this.orderedColumns.map((column, columnIndex) => {
      let textAlign = null;
      if (column.textAlign &&
        !(column.variant &&
          PREDEFINED_VARIANTS_META[column.variant].skipTextAlign)) {
        textAlign = column.textAlign;
      }
      const headerStyles = Object.assign({}, column.widthProperties &&
        !(column.key === lastVisibleColumnKey &&
          this.ifAutoCalculatedWidth)
        ? column.widthProperties
        : {}, textAlign ? { textAlign } : {});
      const optionalAttrs = {};
      if (column.key === lastVisibleColumnKey) {
        optionalAttrs.ref = (el) => (this.lastColumnHeader = el);
      }
      return (h("th", Object.assign({ role: 'columnheader', key: column.key, "aria-colindex": this.isSelectable ? columnIndex + 2 : columnIndex + 1, class: { hidden: column.hide }, style: headerStyles }, optionalAttrs), column.customHeader
        ? this.renderCustomTemplate(column.customHeader, column.text)
        : column.text));
    }), this.rowActions.length !== 0 && (h("th", { class: 'row-actions', role: 'columnheader', "aria-colindex": this.isSelectable
        ? this.orderedColumns.length + 2
        : this.orderedColumns.length + 1 }, TranslationController.t('datatable.actions'))))) : null;
  }
  /**
   * private
   * @returns table body rows
   */
  renderTableBody() {
    return this.orderedColumns.filter((column) => !column.hide).length
      ? this.rows.map((row, rowIndex) => {
        return (h("tr", { key: row.id, role: 'row', class: {
            active: this.selected.includes(row.id),
            loading: this.rowsLoading[row.id] ? true : false,
          }, "aria-rowindex": rowIndex + 1 }, this.orderedColumns.length && this.isSelectable && (h("td", { class: 'data-table-checkbox', "aria-colindex": 1, "data-has-focusable-child": 'true' }, h("fw-checkbox", { value: row.id ? row.id : '', checked: this.selected.includes(row.id), onFwChange: (event) => {
            var _a, _b;
            return this.selectRow(event.detail.value, (_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.checked);
          } }))), this.orderedColumns.map((orderedColumn, columnIndex) => {
          const attrs = {};
          const isFocusable = this.hasFocusableComponent(orderedColumn)
            ? true
            : false;
          if (!isFocusable) {
            attrs.tabindex =
              !this.isSelectable && rowIndex === 0 && columnIndex === 0
                ? '0'
                : '-2';
          }
          attrs['aria-colindex'] = this.isSelectable
            ? columnIndex + 2
            : columnIndex + 1;
          attrs['data-has-focusable-child'] = isFocusable
            ? 'true'
            : 'false';
          let textAlign = null;
          if (orderedColumn.textAlign &&
            !(orderedColumn.variant &&
              PREDEFINED_VARIANTS_META[orderedColumn.variant]
                .skipTextAlign)) {
            textAlign = orderedColumn.textAlign;
          }
          const cellStyle = Object.assign({}, textAlign ? { textAlign } : {});
          return (h("td", Object.assign({ role: 'gridcell', class: { hidden: orderedColumn.hide }, style: cellStyle }, attrs), this.renderTableCell(orderedColumn, row[orderedColumn.key])));
        }), this.rowActions.length !== 0 && (h("td", { class: 'row-actions', "data-has-focusable-child": 'true', "aria-colindex": this.isSelectable
            ? this.orderedColumns.length + 2
            : this.orderedColumns.length + 1 }, this.rowActions.map((action) => {
          let actionTemplate = null;
          if (!action.hideForRowIds ||
            (action.hideForRowIds &&
              !action.hideForRowIds.includes(row.id))) {
            const buttonSize = action.iconName
              ? 'icon-small'
              : 'small';
            actionTemplate = (h("fw-tooltip", { content: action.name, distance: '5' }, h("fw-button", { tabIndex: 0, size: buttonSize, color: 'secondary', onKeyUp: (event) => (event.code === 'Space' ||
                event.code === 'Enter') &&
                this.performRowAction(action, row), onClick: () => this.performRowAction(action, row), "aria-label": action.name }, action.iconName ? (h("fw-icon", { name: action.iconName, library: action.iconLibrary
                ? action.iconLibrary
                : 'crayons', size: 10 })) : (action.name))));
          }
          return actionTemplate;
        })))));
      })
      : null;
  }
  /**
   * renderTableSettings
   * @returns table settings
   */
  renderTableSettings() {
    return (h("div", { class: 'table-settings' }, h("div", { class: 'table-settings-container' }, h("button", { class: 'table-settings-button', tabIndex: 0, ref: (el) => (this.settingsButton = el), onClick: () => this.toggleSettings(!this.isSettingsOpen), onKeyDown: (ev) => ev.key === 'Enter' && this.toggleSettings(!this.isSettingsOpen), disabled: this.isLoading }, h("fw-icon", { name: 'settings', library: 'system', size: 16 })), h("div", { ref: (el) => (this.settings = el), class: {
        'table-settings-options': true,
        'show': this.isSettingsOpen,
      } }, h("div", { class: 'table-settings-header' }, h("span", { class: 'title' }, "Customize columns"), h("button", { class: 'reset', tabIndex: 0, ref: (el) => (this.settingsResetButton = el), onClick: () => {
        this.resetSettings();
      } }, "Reset")), h("div", { class: 'table-settings-content' }, h("div", { class: 'table-settings-content-left' }, h("div", { class: 'table-settings-content-search' }, h("fw-input", { "icon-left": 'search', placeholder: 'Search', ref: (el) => (this.settingsInput = el), onFwInput: (event) => this.settingsSearch(event.detail.value), onFwInputClear: (event) => this.settingsSearch(event.detail.value), "clear-input": true })), h("div", { class: 'table-settings-content-choose' }, h("div", { class: 'table-settings-content-title' }, TranslationController.t('datatable.chooseColumns')), h("div", { class: 'table-settings-content-checkboxes' }, this.columnsHideSetting.map((column) => {
      let dragItemTemplate = null;
      let showColumn = true;
      if (this.settingSearchText.trim() !== '') {
        showColumn = column.text
          .toLowerCase()
          .includes(this.settingSearchText);
      }
      if (showColumn) {
        dragItemTemplate = (h("div", { key: column.key }, h("fw-checkbox", { value: column.key, onFwChange: (event) => {
            var _a, _b;
            return this.settingsColumnToggle(column.key, (_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.checked, event);
          }, checked: !column.hide, disabled: column.lock }, column.text)));
      }
      return dragItemTemplate;
    })))), h("div", { class: 'table-settings-content-right' }, h("div", { class: 'table-settings-content-title' }, h("span", null, "Selected columns "), h("span", null, "(", this.columnsDragSetting.filter((setting) => !setting.hide)
      .length, ")")), h("div", { class: 'table-settings-content-draggable' }, this.columnsDragSetting
      .filter((column) => column.lock)
      .map((column) => {
      let lockTemplate = null;
      lockTemplate = (h("div", { key: column.key, class: 'table-settings-drag-item', "data-column-key": column.key }, h("div", { class: 'table-settings-drag-item-icon non-drag' }, h("fw-icon", { name: 'lock', size: 11 })), h("div", { class: 'table-settings-drag-item-text', title: column.text }, column.text)));
      return lockTemplate;
    }), h("fw-drag-container", { ref: (el) => (this.settingsDragContainer = el), onFwDrop: (event) => this.settingsColumnDrop(event.detail.droppedElement.dataset.columnKey, event.detail.droppedIndex) }, this.columnsDragSetting
      .filter((column) => !column.lock)
      .map((column) => {
      let dragTemplate = null;
      if (!column.hide) {
        dragTemplate = (h("div", { key: column.key, class: 'table-settings-drag-item', "data-column-key": column.key, draggable: true }, h("div", { class: 'table-settings-drag-item-icon' }, h("fw-icon", { library: 'system', name: 'drag', size: 11 })), h("div", { class: 'table-settings-drag-item-text', title: column.text }, column.text), h("button", { class: 'table-settings-drag-item-close', tabIndex: 0, onKeyDown: (event) => event.key === 'Enter' &&
            this.settingsColumnToggle(column.key, false, event), onClick: () => this.settingsColumnToggle(column.key, false) }, h("fw-icon", { library: 'system', name: 'cross-big', size: 7 }))));
      }
      return dragTemplate;
    }))))), h("div", { class: 'table-settings-footer' }, h("fw-button", { color: 'secondary', tabIndex: 0, id: 'close-settings', onClick: () => {
        this.resetSettings();
        this.toggleSettings(false);
      } }, "Cancel"), h("fw-button", { color: 'primary', tabIndex: 0, id: 'apply-settings', ref: (el) => (this.settingsUpdateButton = el), onClick: () => this.applySettings() }, "Update")))), this.isSettingsOpen && (h("div", { role: 'presentation', class: 'table-settings-overlay', onClick: () => this.toggleSettings(false) }))));
  }
  /**
   * private
   * @returns table shimmer
   */
  renderTableShimmer() {
    const shimmerTemplate = [];
    const shimmerCount = this.rows.length || this.shimmerCount;
    let columnsLength = this.orderedColumns.filter((column) => !column.hide).length;
    if (columnsLength) {
      columnsLength = this.isSelectable ? columnsLength + 1 : columnsLength;
      if (this.rowActions && this.rowActions.length) {
        columnsLength = columnsLength + 1;
      }
      for (let index = 1; index <= shimmerCount; index++) {
        shimmerTemplate.push(h("tr", null, Array(columnsLength)
          .fill(1)
          .map(() => {
          return (h("td", null, h("fw-skeleton", { height: '12px' })));
        })));
      }
    }
    return shimmerTemplate;
  }
  /**
   * render method
   */
  render() {
    return (h("div", { class: 'fw-data-table-container' }, h("div", { class: {
        'fw-data-table-scrollable': true,
        'loading': this.isLoading || this.showShimmer,
        'shimmer': this.showShimmer,
      }, ref: (el) => (this.tableContainer = el) }, h("table", { class: {
        'fw-data-table': true,
        'is-selectable': this.isSelectable,
      }, role: 'grid', "aria-colcount": this.orderedColumns.length, "aria-label": this.label }, h("thead", null, this.renderTableHeader()), h("tbody", null, this.showShimmer
      ? this.renderTableShimmer()
      : this.renderTableBody()))), this.showSettings && this.renderTableSettings(), (this.isLoading || this.showShimmer) && (h("div", { class: 'fw-data-table--loading' }))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "showSettings": ["showSettingsHandler"],
    "columns": ["columnsChangeHandler"],
    "rows": ["rowsChangeHandler"],
    "isLoading": ["loadingHandler"]
  }; }
};
DataTable.style = dataTableCss;

export { DataTable as fw_data_table };
