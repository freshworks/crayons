import { newE2EPage } from '@stencil/core/testing';

describe('fw-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-tabs>
    <fw-tab tab-header ="Tab 1">
      <section>
          <p>Tab 1 Content</P>
      </section>
    </fw-tab>
    <fw-tab tab-header="Tab 2">
          <p>Tab 2 Content</P>
    </fw-tab>
    <fw-tab tab-header="Tab 3" disabled>
      <p>TAB 3 Content</p>
    </fw-tab>
    <fw-tab tab-header="Tab 4">
      <p>TAB 4 Content</p>
    </fw-tab>
  </fw-tabs>`);
    const element = await page.find('fw-tabs');
    expect(element).toHaveClass('hydrated');
  });
  it('renders child content', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-tabs>
    <fw-tab tab-header ="Tab 1">
      <section>
          <p>Tab 1 Content</P>
      </section>
    </fw-tab>
    <fw-tab tab-header="Tab 2">
          <p>Tab 2 Content</P>
    </fw-tab>
    <fw-tab tab-header="Tab 3" disabled>
      <p>TAB 3 Content</p>
    </fw-tab>
    <fw-tab tab-header="Tab 4">
      <p>TAB 4 Content</p>
    </fw-tab>
  </fw-tabs>`);
    const element = await page.find('fw-tabs');

    expect(element.shadowRoot).toEqualHtml(`<div class="tabs"><ul role="tablist" class="tabs__items"><li class="tabs__item contacts-tab_item text--xsmall text--uppercase ember-view"><div id="#tab-0" class="tabs__item__nav active"><span class="tab-title--tab-icon"><span class="tab-title">Tab 1</span></span> </div></li><li class="tabs__item contacts-tab_item text--xsmall text--uppercase ember-view"><div id="#tab-1" class="tabs__item__nav"><span class="tab-title--tab-icon"><span class="tab-title">Tab 2</span></span> </div></li><li class="tabs__item contacts-tab_item text--xsmall text--uppercase ember-view"><div id="#tab-2" class="tabs__item__nav"><span class="tab-title--tab-icon"><span class="tab-title">Tab 3</span></span> </div></li><li class="tabs__item contacts-tab_item text--xsmall text--uppercase ember-view"><div id="#tab-3" class="tabs__item__nav"><span class="tab-title--tab-icon"><span class="tab-title">Tab 4</span></span> </div></li></ul><div class="tabs__content"><div role="tabpanel" id="tab-0" class="tabs__content__pane tabs__content__pane--fade in active"> <section> <p>Tab 1 Content</p> </section> </div><div role="tabpanel" id="tab-1" class="tabs__content__pane tabs__content__pane--fade"> <p>Tab 2 Content</p> </div><div role="tabpanel" id="tab-2" class="tabs__content__pane tabs__content__pane--fade"> <p>TAB 3 Content</p> </div><div role="tabpanel" id="tab-3" class="tabs__content__pane tabs__content__pane--fade"> <p>TAB 4 Content</p> </div></div></div>
    `);
  });
});
