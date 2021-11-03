import { newE2EPage } from '@stencil/core/testing';

describe('fw-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-tabs>
    <fw-tab slot="tab" panel="one">Tab 1</fw-tab>
    <fw-tab slot="tab" panel="two">Tab 2</fw-tab>
    <fw-tab slot="tab" panel="three" disabled>TAB 3 </fw-tab>
    <fw-tab slot="tab" panel="four">TAB 4 </fw-tab>

    <fw-tab-panel name="one">Tab 1 content</fw-tab-panel>
    <fw-tab-panel name="two">Tab 2 content</fw-tab-panel>
    <fw-tab-panel name="three">Tab 3 content</fw-tab-panel>
    <fw-tab-panel name="four">Tab 4 content</fw-tab-panel>
  </fw-tabs>`);
    const element = await page.find('fw-tabs');
    expect(element).toHaveClass('hydrated');
  });
  it('renders child content', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-tabs>
    <fw-tab slot="tab" panel="one">Tab 1</fw-tab>
    <fw-tab slot="tab" panel="two">Tab 2</fw-tab>
    <fw-tab slot="tab" panel="three" disabled>TAB 3 </fw-tab>
    <fw-tab slot="tab" panel="four">TAB 4 </fw-tab>

    <fw-tab-panel name="one">Tab 1 content</fw-tab-panel>
    <fw-tab-panel name="two">Tab 2 content</fw-tab-panel>
    <fw-tab-panel name="three">Tab 3 content</fw-tab-panel>
    <fw-tab-panel name="four">Tab 4 content</fw-tab-panel>
  </fw-tabs>`);
    const element = await page.find('fw-tabs');

    expect(element.shadowRoot).toEqualHtml(`
    <div class="tabs">
      <div class="tabs__items__nav">
        <div class="tabs__items__tabs" role="tablist" aria-label=''>
          <slot name="tab"></slot>
        </div>
      </div>
      <slot />
    </div>`);
  });
  it('emits fwChange', async () => {
    const page = await newE2EPage();
    await page.setContent(`<fw-tabs>
    <fw-tab slot="tab" panel="one" tab-name="tab1">Tab 1</fw-tab>
    <fw-tab slot="tab" panel="two" tab-name="tab2">Tab 2</fw-tab>

    <fw-tab-panel name="one">Tab 1 content</fw-tab-panel>
    <fw-tab-panel name="two">Tab 2 content</fw-tab-panel>
  </fw-tabs>`);
    const element = await page.find('fw-tabs');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.press('Tab');
    await element.press('ArrowRight');
    expect(fwChange).toHaveReceivedEventDetail({
      tabIndex: 1,
      tabName: 'tab2',
    });
  });
  it('does not emits fwChange when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<fw-tabs>
    <fw-tab slot="tab" panel="one" tab-name="tab1">Tab 1</fw-tab>
    <fw-tab slot="tab" panel="two" tab-name="tab2" disabled>Tab 2</fw-tab>

    <fw-tab-panel name="one">Tab 1 content</fw-tab-panel>
    <fw-tab-panel name="two">Tab 2 content</fw-tab-panel>
  </fw-tabs>`);
    const element = await page.find('fw-tabs');
    const fwChange = await page.spyOnEvent('fwChange');
    await element.press('Tab');
    await element.press('ArrowRight');
    expect(fwChange.events).toEqual([]);
  });
});
