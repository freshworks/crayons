import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';

const tabsCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--fw-tabs-width, \"inherit\");height:var(--fw-tabs-height, \"inherit\")}.tabs__items__nav{padding:0;-webkit-padding-start:var(--fw-tabs-padding-inline-start, 12px);padding-inline-start:var(--fw-tabs-padding-inline-start, 12px);-webkit-padding-end:var(--fw-tabs-padding-inline-end, 12px);padding-inline-end:var(--fw-tabs-padding-inline-end, 12px);-webkit-margin-start:var(--fw-tabs-margin-l, 0);margin-inline-start:var(--fw-tabs-margin-l, 0);-webkit-margin-end:var(--fw-tabs-margin-r, 0);margin-inline-end:var(--fw-tabs-margin-r, 0);display:-ms-flexbox;display:flex;border-bottom:1px solid #ebeff3;overflow-x:auto;overflow-y:hidden}.tabs__items__nav__box{background-color:#f5f7f9;border:1px solid #ebeff3;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:4px}.tabs__items__tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative}";

let Tabs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    /**
     * Describes the purpose of set of tabs.
     */
    this.label = '';
    /**
     * The index of the activated Tab(Starts from 0)
     */
    this.activeTabIndex = 0;
    /**
     * The style of tab headers that needs to be displayed, box will display headers in a container.
     */
    this.variant = 'normal';
  }
  syncTabsAndPanels() {
    this.tabs = Array.from(this.el.querySelectorAll('fw-tab')).filter((tab) => !tab.disabled);
    this.panels = Array.from(this.el.querySelectorAll('fw-tab-panel'));
  }
  init() {
    this.syncTabsAndPanels();
    // Assign aria attributes
    this.assignAriaLabels();
    // set active tab
    this.setActiveTab(this.getActiveTab() || this.tabs[0], false);
  }
  createPanelIfRequired() {
    let counter = 0;
    this.tabs = Array.from(this.el.querySelectorAll('fw-tab'));
    this.tabs.map((tab) => {
      if (tab.tabHeader) {
        tab.setAttribute('panel', `panel-${counter++}`);
        tab.setAttribute('slot', 'tab');
        const panel = document.createElement('fw-tab-panel');
        panel.innerHTML = tab.innerHTML;
        panel.setAttribute('id', `fw-tab-panel-${counter++}`);
        panel.setAttribute('name', tab.getAttribute('panel') || tab.panel);
        this.el.appendChild(panel);
      }
    });
  }
  assignAriaLabels() {
    Array.from(this.el.querySelectorAll('fw-tab')).map((tab) => {
      const panel = this.panels.find((p) => p.name === tab.getAttribute('panel') || tab.panel);
      if (panel) {
        tab.setAttribute('aria-controls', panel.getAttribute('id'));
        panel.setAttribute('aria-labelledby', tab.getAttribute('id'));
      }
    });
  }
  /**
   * Activates the tab based based on tabindex or name.
   */
  async activateTab(index, name) {
    index && (this.activeTabIndex = index);
    name && (this.activeTabName = name);
    this.setActiveTab(this.getActiveTab(), false);
  }
  setActiveTab(tab, shouldEmit = true) {
    if (tab && tab !== this.activeTab && !tab.disabled) {
      this.activeTab = tab;
      this.activeTabIndex = this.tabs.indexOf(tab);
      // Sync active tab and panel
      this.tabs.map((el) => (el.active = el === this.activeTab));
      const activePanel = this.activeTab.getAttribute('panel') || this.activeTab.panel;
      this.panels.map((el) => (el.active = el.name === activePanel));
      // Emit events
      if (shouldEmit) {
        this.fwChange.emit({
          tabIndex: this.activeTabIndex,
          tabName: this.activeTab.id,
        });
      }
    }
  }
  componentWillLoad() {
    this.init();
  }
  connectedCallback() {
    // Create fw-tab-panel component explictly if tab-header attribute is present.
    this.createPanelIfRequired();
    this.tabsMutation = new MutationObserver(() => {
      this.init();
    });
    this.tabMutation = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === 'disabled')) {
        this.syncTabsAndPanels();
      }
    });
    this.tabsMutation.observe(this.el, {
      childList: true,
      attributes: true,
    });
    Array.from(this.el.querySelectorAll('fw-tab')).forEach((tab) => {
      this.tabMutation.observe(tab, {
        attributes: true,
      });
    });
  }
  disconnectedCallback() {
    var _a, _b;
    (_a = this.tabsMutation) === null || _a === void 0 ? void 0 : _a.disconnect();
    (_b = this.tabMutation) === null || _b === void 0 ? void 0 : _b.disconnect();
    this.tabsMutation = undefined;
    this.tabMutation = undefined;
  }
  getActiveTab() {
    return ((this.activeTabIndex && this.tabs[this.activeTabIndex]) ||
      this.tabs.find((tab) => tab.id === this.activeTabName || tab.active));
  }
  handleClick(event) {
    const target = event.target;
    const tab = target.closest('fw-tab');
    const tabs = tab === null || tab === void 0 ? void 0 : tab.closest('fw-tabs');
    if (tabs !== this.el) {
      return;
    }
    if (tab) {
      this.setActiveTab(tab);
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const tab = target.closest('fw-tab');
    const tabs = tab === null || tab === void 0 ? void 0 : tab.closest('fw-tabs');
    if (tabs !== this.el) {
      return;
    }
    switch (event.code) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault();
        break;
    }
  }
  handleKeyUp(e) {
    const target = e.target;
    const tab = target.closest('fw-tab');
    const tabs = tab === null || tab === void 0 ? void 0 : tab.closest('fw-tabs');
    if (tabs !== this.el) {
      return;
    }
    if (this.activeTabIndex !== undefined) {
      let index = this.activeTabIndex;
      switch (e.code) {
        case 'ArrowLeft':
        case 'ArrowUp':
          index = (index - 1 + this.tabs.length) % this.tabs.length;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          index = (index + 1) % this.tabs.length;
          break;
        default:
          return;
      }
      this.tabs[index].focus();
      this.setActiveTab(this.tabs[index]);
    }
  }
  render() {
    return (h("div", { class: 'tabs' }, h("div", { class: 'tabs__items__nav' + (this.variant === 'box' ? '__box' : '') }, h("div", { class: 'tabs__items__tabs', role: 'tablist', "aria-label": this.label }, h("slot", { name: 'tab' }))), h("slot", null)));
  }
  get el() { return getElement(this); }
};
Tabs.style = tabsCss;

export { Tabs as fw_tabs };
