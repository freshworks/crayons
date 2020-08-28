import { newE2EPage } from '@stencil/core/testing';

describe('fw-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button></fw-button>');
    const element = await page.find('fw-button');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit fwClick when it is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button></fw-button>');
    const fwClick = await page.spyOnEvent('fwClick');
    const element = await page.find('fw-button');
    await element.click();
    expect(fwClick).toHaveReceivedEvent();
  });

  it('should set button as primary when color is not supplied', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button></fw-button>');
    const element = await page.find('fw-button');
    expect(element.shadowRoot).toEqualHtml(`<div class="btn-container"><button class="fw-btn fw-btn--normal fw-btn--primary" type="button">
        <slot></slot>
      </button></div>`);
  });

  it('should set button as secondary when color is secondary', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button color="secondary"</fw-button>');
    const element = await page.find('fw-button');
    expect(element.shadowRoot).toEqualHtml(`<div class="btn-container"><button class="fw-btn fw-btn--normal fw-btn--secondary" type="button"><slot></slot></button></div>`);
  });

  it('should render plain dropdown button', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button dropdown>OTT <span id="1" value="amazon">Amazon</span> <span id="2" value="netflix">Netflix</span></fw-button>');
    const fwBtn = await page.find('fw-button');
    const options = await page.findAll('fw-button >>> ul > li');

    await fwBtn.click();

    expect(options.length).toBe(2);
    expect(options.map(option => option.textContent.trim())).toEqual(['Amazon', 'Netflix']);
  });

  it('should render split dropdown button', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button dropdown split>OTT <span id="1" value="amazon">Amazon</span> <span id="2" value="netflix">Netflix</span></fw-button>');
    const fwBtn = await page.find('fw-button');
    expect(fwBtn.shadowRoot).toString().includes('div class="dropdown-state">');
  });

  it('should render searchable dropdown button', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button dropdown searchable placeholder="Select OTT">OTT <span id="1" value="amazon">Amazon</span> <span id="2" value="netflix">Netflix</span></fw-button>');
    const checkboxes = await page.findAll('fw-button >>> fw-checkbox');
    expect(checkboxes.length).toBe(2);

    const element = await page.find('fw-button');

    expect(element.shadowRoot).toEqualHtml('<div class="btn-container"><button class="fw-btn fw-btn--normal fw-btn--primary" type="button">OTT<span><fw-icon class="hydrated"></fw-icon></span></button><ul class="dropdown-menu"><fw-input class="hydrated" icon-left="search"></fw-input><div class="searchable-item"><fw-checkbox aria-checked="false" aria-disabled="false" class="checkbox-container hydrated" id="amazon" role="checkbox" tabindex="0"></fw-checkbox><li class="dropdown-item">Amazon</li></div><div class="searchable-item"><fw-checkbox aria-checked="false" aria-disabled="false" class="checkbox-container hydrated" id="netflix" role="checkbox" tabindex="0"></fw-checkbox><li class="dropdown-item">Netflix</li></div><div class="search-btn-grp"><fw-button class="hydrated">Add</fw-button><fw-button class="hydrated">Cancel</fw-button></div></ul></div>');
  });

});
