import {
  Component,
  Element,
  State,
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

  /**
   * Child Elements/Tab Items
   */
  @State() tabs: any[];
  /**
   * Active tab indec
   */
  @State()
  activeTabIndex = 0;

  /**
   * Active class for tab container
   */
  @State()
  activeChildClass = '';

  displayTab(index: number) {
    this.activeTabIndex = index;
    this.tabs = this.tabs?.map((tab, i) => {
      tab.style.display = index === i ? 'block' : 'none';
      return tab;
    });
  }

  componentWillLoad() {
    this.tabs = Array.from(this.el.querySelectorAll('fw-tab'));
    this.displayTab(0);
  }

  render() {

    return (
      <div class="tabs">
        <ul role="tablist" class="tabs__items">
          {this.tabs.map((tab, index) =>
            <li onClick={() => this.displayTab(index)} class="tabs__item">
              <div id={'#tab-' + index} class={'tabs__item__nav ' + (index === this.activeTabIndex ? 'active' : '')}>
                <span class="tab-title--tab-icon">
                  <span class="tab-title">{tab.tabHeader}</span>
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
