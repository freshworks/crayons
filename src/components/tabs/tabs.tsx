import {
  Component,
  Element,
  Listen,
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
  @State()
  tabs = Array.from(this.el.querySelectorAll('fw-tab'));

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

  /**
   * Event listener to Add active class to current Tab
   */
  @Listen('click')
  toggelLink(event: Event, index: number) {
    event.stopPropagation();
    this.activeTabIndex = index;
  }

  /**
   * Event listener to Change active class for tab container
   */
  @Listen('click')
  addClassToTabContainer(event: Event) {
    event.stopPropagation();
    this.activeChildClass = 'in active';
  }

  render() {

    return (
      <div class="tabs">
        <ul role="tablist" class="tabs__items">
          {this.tabs.map((tab, index) =>
            <li onClick={event => this.toggelLink(event, index)} class="tabs__item contacts-tab_item text--xsmall text--uppercase ember-view">
              <a href={'#tab-' + index} class={'tabs__item__nav ' + (index === this.activeTabIndex ? 'active' : '')}>
                <span class="tab-title--tab-icon">
                  <span class="tab-title">{tab.getAttribute('title')}</span>
                </span> </a></li>
          )}
        </ul>
        <div class="tabs__content">
          {this.tabs.map((tab, index) =>
            <div onClick={event => this.toggelLink(event, index)} innerHTML={tab.innerHTML} role="tabpanel" id={'tab-' + index} class={'tabs__content__pane tabs__content__pane--fade ' + (index === this.activeTabIndex ? 'in active' : '') + this.activeChildClass}>
            </div>
          )}
        </div>
      </div>
    );
  }
}
