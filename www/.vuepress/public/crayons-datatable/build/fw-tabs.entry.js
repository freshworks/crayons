import { r as registerInstance, f as createEvent, h, g as getElement } from './index-4996832f.js';

const tabsCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.tabs__items__nav{padding:0px 12px;display:-ms-flexbox;display:flex;border-bottom:1px solid #ebeff3;overflow-x:auto}.tabs__items__tabs{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;position:relative}";

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
  }
  init() {
    this.tabs = Array.from(this.el.querySelectorAll('fw-tab')).filter((tab) => !tab.disabled);
    this.panels = Array.from(this.el.querySelectorAll('fw-tab-panel'));
    // Assign aria attributes
    this.assignAriaLabels();
    // set active tab
    this.setActiveTab(this.getActiveTab() || this.tabs[0]);
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
        panel.setAttribute('name', tab.getAttribute('panel'));
        this.el.appendChild(panel);
      }
    });
  }
  assignAriaLabels() {
    this.tabs.map((tab) => {
      const panel = this.panels.find((p) => p.name === tab.getAttribute('panel'));
      if (panel) {
        tab.setAttribute('aria-controls', panel.getAttribute('id'));
        panel.setAttribute('aria-labelledby', tab.getAttribute('id'));
      }
    });
  }
  setActiveTab(tab) {
    if (tab && tab !== this.activeTab && !tab.disabled) {
      this.activeTab = tab;
      this.activeTabIndex = this.tabs.indexOf(tab);
      // Sync active tab and panel
      this.tabs.map((el) => (el.active = el === this.activeTab));
      this.panels.map((el) => (el.active = el.name === this.activeTab.getAttribute('panel')));
      // Emit events
      this.fwChange.emit({
        tabIndex: this.activeTabIndex,
        tabName: this.activeTab.id,
      });
    }
  }
  componentWillLoad() {
    this.init();
  }
  connectedCallback() {
    // Create fw-tab-panel component explictly if tab-header attribute is present.
    this.createPanelIfRequired();
    this.mutationO = new MutationObserver(() => {
      this.init();
    });
    this.mutationO.observe(this.el, {
      childList: true,
    });
  }
  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect();
      this.mutationO = undefined;
    }
  }
  getActiveTab() {
    return ((this.activeTabIndex && this.tabs[this.activeTabIndex]) ||
      this.tabs.find((tab) => tab.id === this.activeTabName || tab.active));
  }
  handleClick(event) {
    const target = event.target;
    const tab = target.closest('fw-tab');
    if (tab) {
      this.setActiveTab(tab);
    }
  }
  handleKeyDown(event) {
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
    return (h("div", { class: 'tabs' }, h("div", { class: 'tabs__items__nav' }, h("div", { class: 'tabs__items__tabs', role: 'tablist', "aria-label": this.label }, h("slot", { name: 'tab' }))), h("slot", null)));
  }
  get el() { return getElement(this); }
};
Tabs.style = tabsCss;

export { Tabs as fw_tabs };
