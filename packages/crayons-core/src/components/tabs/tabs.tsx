import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  Method,
} from '@stencil/core';

@Component({
  tag: 'fw-tabs',
  styleUrl: 'tabs.scss',
  shadow: true,
})
export class Tabs {
  @Element()
  el!: HTMLElement;
  private tabsMutation?: MutationObserver;
  private tabMutation?: MutationObserver;

  private activeTab;

  private tabs: any[];

  private panels: any[];

  /**
   * Describes the purpose of set of tabs.
   */
  @Prop() label = '';
  /**
   * The index of the activated Tab(Starts from 0)
   */
  @Prop({ mutable: true, reflect: true })
  activeTabIndex = 0;

  /**
   * The name of the tab to be activated.
   */
  @Prop({ reflect: true })
  activeTabName?: string;

  /**
   * The style of tab headers that needs to be displayed, box will display headers in a container.
   */
  @Prop() variant: 'box' | 'normal' = 'normal';
  /**
   * Triggered when a the view switches to a new tab.
   */
  @Event() fwChange: EventEmitter;

  private syncTabsAndPanels() {
    this.tabs = Array.from(this.el.querySelectorAll('fw-tab')).filter(
      (tab) => !tab.disabled
    );
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
      const panel = this.panels.find(
        (p) => p.name === tab.getAttribute('panel') || tab.panel
      );

      if (panel) {
        tab.setAttribute('aria-controls', panel.getAttribute('id'));
        panel.setAttribute('aria-labelledby', tab.getAttribute('id'));
      }
    });
  }

  /**
   * Activates the tab based based on tabindex or name.
   */
  @Method()
  async activateTab(index?: number, name?: string) {
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
      const activePanel =
        this.activeTab.getAttribute('panel') || this.activeTab.panel;
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
    this.tabsMutation?.disconnect();
    this.tabMutation?.disconnect();
    this.tabsMutation = undefined;
    this.tabMutation = undefined;
  }

  getActiveTab() {
    return (
      (this.activeTabIndex && this.tabs[this.activeTabIndex]) ||
      this.tabs.find((tab) => tab.id === this.activeTabName || tab.active)
    );
  }

  @Listen('click')
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('fw-tab');
    const tabs = tab?.closest('fw-tabs');

    if (tabs !== this.el) {
      return;
    }

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('fw-tab');
    const tabs = tab?.closest('fw-tabs');

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

  @Listen('keyup')
  handleKeyUp(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const tab = target.closest('fw-tab');
    const tabs = tab?.closest('fw-tabs');

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
    return (
      <div class='tabs'>
        <div
          class={'tabs__items__nav' + (this.variant === 'box' ? '__box' : '')}
        >
          <div class='tabs__items__tabs' role='tablist' aria-label={this.label}>
            <slot name='tab'></slot>
          </div>
        </div>
        <slot />
      </div>
    );
  }
}
