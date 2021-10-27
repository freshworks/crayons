import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'fw-tabs',
  styleUrl: 'tabs.scss',
  shadow: true,
})
export class Tabs {
  @Element()
  el!: HTMLElement;
  private mutationO?: MutationObserver;

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
   * Triggered when a the view switches to a new tab.
   */
  @Event() fwChange: EventEmitter;

  init() {
    this.tabs = Array.from(this.el.querySelectorAll('fw-tab')).filter(
      (tab) => !tab.disabled
    );
    this.panels = Array.from(this.el.querySelectorAll('fw-panel'));

    // Assign aria attributes
    this.assignAriaLabels();

    // set active tab
    this.setActiveTab(this.getActiveTab() || this.tabs[0]);
  }

  assignAriaLabels() {
    this.tabs.map((tab) => {
      const panel = this.panels.find(
        (p) => p.name === tab.getAttribute('panel')
      );

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
      this.panels.map(
        (el) => (el.active = el.name === this.activeTab.getAttribute('panel'))
      );

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
    return (
      this.tabs[this.activeTabIndex] ||
      this.tabs.find((tab) => tab.id === this.activeTabName) ||
      this.tabs.find((tab) => tab.active)
    );
  }

  @Listen('click')
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tab = target.closest('fw-tab');

    if (tab) {
      this.setActiveTab(tab);
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
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
        <div class='tabs__items__nav'>
          <div class='tabs__items__tabs' role='tablist' aria-label={this.label}>
            <slot name='tab'></slot>
          </div>
        </div>
        <slot />
      </div>
    );
  }
}
