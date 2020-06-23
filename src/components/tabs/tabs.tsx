import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  State,
  Watch,
  h
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

  /**
   * Child Elements/Tab Items
   */
  @State() tabs: any[];
  /**
   * The index of the activated Tab(Starts from 0)
   */
  @Prop({ mutable: true, reflect: true })
  activeTabIndex = 0;

  /**
   * Active class for tab container
   */
  @State()
  activeChildClass = '';

  /**
   * Triggered when a the view switches to a new tab.
   */
  @Event() fwChange: EventEmitter;

  @Watch('activeTabIndex')
  changeIndex(newValue, oldValue) {
    if (this.tabs[newValue]?.disabled || newValue >= this.tabs.length) {
      this.activeTabIndex = 0;
    } else if (newValue !== oldValue) {
      this.displayTab(newValue);
    }
  }

  @Listen('propChanged')
  init() {
    this.tabs = Array.from(this.el.querySelectorAll('fw-tab'));
    this.displayTab(this.activeTabIndex);
  }

  displayTab(index: number) {
    this.fwChange.emit({ tabIndex: this.activeTabIndex });
    this.activeTabIndex = index;
    this.tabs = this.tabs?.map((tab, i) => {
      tab.style.display = index === i ? 'block' : 'none';
      return tab;
    });
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

  render() {

    return (
      <div class="tabs">
        <ul role="tablist" class="tabs__items">
          {this.tabs.map((tab, index) =>
            <li onClick={() => tab.disabled ? '' : this.displayTab(index)} class="tabs__item">
              <div id={'#tab-' + index} class={'tabs__item__nav ' + (index === this.activeTabIndex ? 'active' : '') + (tab.disabled ? 'disabled' : '')}>
                <span class="tab-title--tab-icon">
                  {
                    tab.tabHeaderHtml
                    ? <span innerHTML={tab.tabHeaderHtml}></span>
                    : <span class="tab-title">{tab.tabHeader}</span>
                  }
                </span>
              </div>
            </li>
          )}
        </ul>
        <div class="tabs__content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
