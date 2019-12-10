import {
  Component,
  Element,
  EventEmitter,
  Event,
  h,
  Listen,
  State
} from '@stencil/core';

@Component({
  tag: 'fw-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs {

  @Element()
  el!: HTMLElement;

  @State()
  tabs = Array.from(this.el.children);

  @State()
  activeTabIndex = 0;

  @Event({ eventName: 'change' })
  onChange: EventEmitter;

  @Listen('click')
  toggelLink(event: Event, index: number) {

    event.stopPropagation();
    this.activeTabIndex = index;

  }

  render() {

    return (

      <div class="tabs">
        <ul role="tablist" class="tabs__items">
          {this.tabs.map((tab, index) =>
            <li onClick={(event) => this.toggelLink(event, index)} class="tabs__item contacts-tab_item text--xsmall text--uppercase ember-view">
              <a href={'#tab-' + index} class={'tabs__item__nav ' + (index === this.activeTabIndex ? 'active' : '')}>
                <span class="tab-title--tab-icon">
                  <span class="tab-title">{tab.getAttribute('title')}</span>
                </span> </a></li>
          )}
        </ul>
        <div class="tabs__content">
          {this.tabs.map((tab, index) =>
            <div role="tabpanel" id={'tab-' + index} class={'tabs__content__pane tabs__content__pane--fade ' + (index === this.activeTabIndex ? 'in active' : '')}>
              <div innerHTML={tab.innerHTML}>

              </div>
            </div>
          )}
        </div>
      </div>
      
    );
  }
}
