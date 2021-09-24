import { newE2EPage } from '@stencil/core/testing';

describe('fw-dropdown-button', () => {
  it('renders simple dropdown button', async () => {
    const simpleDropdown = `
      <fw-dropdown-button label="Click me">
        <div slot="dropdown-options">
          <option id="1" value="Ullu">Ullu</option>
          <option id="2" value="Hotstar">Hotstar</option>
          <option id="3" value="Amazon">Amazon</option>
          <option id="4" value="Netflix">Netflix</option>
          <option id="5" value="Mx player">Mx Player</option>
          <option id="6" value="Share it">Share it</option>
          <option id="7" value="Prime">Amazon Prime</option>
          <option id="8" value="Watch32">Watch32</option>
          <option id="9" value="YTS Movies">YTS Movies</option>
          <option id="10" value="Telegram">Telegram</option>
          <option id="11" value="Solar Movies">Solar Movies</option>
          <option id="12" value="Yifi torrents">Yifi torrents</option>
        </div>
      </fw-dropdown-button>
    `;
    const expectedOutput = `
    <div class="dropdown-container">
      <div class="btn-container">
      <fw-button class="hydrated">
        Click me
        <span class="down-arrow">
          <fw-icon class="hydrated"></fw-icon>
        </span>
      </fw-button>
      </div>
      <ul class="dropdown-menu">
      <div>
        <li class="dropdown-item">
          Ullu
        </li>
        <li class="dropdown-item">
          Hotstar
        </li>
        <li class="dropdown-item">
          Amazon
        </li>
        <li class="dropdown-item">
          Netflix
        </li>
        <li class="dropdown-item">
          Mx Player
        </li>
        <li class="dropdown-item">
          Share it
        </li>
        <li class="dropdown-item">
          Amazon Prime
        </li>
        <li class="dropdown-item">
          Watch32
        </li>
        <li class="dropdown-item">
          YTS Movies
        </li>
        <li class="dropdown-item">
          Telegram
        </li>
        <li class="dropdown-item">
          Solar Movies
        </li>
        <li class="dropdown-item">
          Yifi torrents
        </li>
        </div>
      </ul>
    </div>
    `;
    const page = await newE2EPage();

    await page.setContent(simpleDropdown);
    const element = await page.find('fw-dropdown-button');
    expect(element.shadowRoot).toEqualHtml(expectedOutput);
  });

  it('renders split dropdown button', async () => {
    const splitDropdown = `
      <fw-dropdown-button label="Click me" split>
        <div slot="dropdown-options">
          <option id="1" value="Ullu">Ullu</option>
          <option id="2" value="Hotstar">Hotstar</option>
          <option id="3" value="Amazon">Amazon</option>
          <option id="4" value="Netflix">Netflix</option>
        </div>
      </fw-dropdown-button>
    `;

    const page = await newE2EPage();

    await page.setContent(splitDropdown);
    const element = await page.find('fw-dropdown-button');
    expect(element.shadowRoot)
      .toString()
      .includes('<div class="dropdown-state">');
  });

  it('emits value if the option is selected', async () => {
    const dropdown = `
      <fw-dropdown-button label="Click me">
        <div slot="dropdown-options">
          <option id="1" value="Ullu">Ullu</option>
          <option id="2" value="Hotstar">Hotstar</option>
          <option id="3" value="Amazon">Amazon</option>
          <option id="4" value="Netflix">Netflix</option>
        </div>
      </fw-dropdown-button>
    `;

    const page = await newE2EPage();

    await page.setContent(dropdown);
    const el = await page.find('fw-dropdown-button');
    const fwOptionClick = await page.spyOnEvent('fwOptionClick');

    const dropdownEl = await page.find('fw-dropdown-button');
    await dropdownEl.click();
    await page.waitForChanges();

    const dropdownOptions = await page.findAll('fw-dropdown-button >>> li');
    await dropdownOptions[0].click();
    await page.waitForChanges();

    expect(fwOptionClick).toHaveReceivedEvent();
    const val = await el.getProperty('value');
    expect(val).toEqual('Ullu');
  });

  it('emits value if the options are selected for search dropdown', async () => {
    const dropdown = `
      <fw-dropdown-button label="Click me" searchable>
        <div slot="dropdown-options">
          <option id="1" value="Ullu">Ullu</option>
          <option id="2" value="Hotstar">Hotstar</option>
          <option id="3" value="Amazon">Amazon</option>
          <option id="4" value="Netflix">Netflix</option>
        </div>
      </fw-dropdown-button>
    `;

    const page = await newE2EPage();

    await page.setContent(dropdown);
    const el = await page.find('fw-dropdown-button');
    const fwOptionsAdd = await page.spyOnEvent('fwOptionsAdd');

    const dropdownEl = await page.find('fw-dropdown-button');
    await dropdownEl.click();
    await page.waitForChanges();

    const addButton = await page.find('fw-dropdown-button >>> #addBtn');

    // Check 1st and 3rd option
    const dropdownCheckboxes = await page.findAll(
      'fw-dropdown-button >>> fw-checkbox'
    );
    dropdownCheckboxes[0].setProperty('checked', true);
    dropdownCheckboxes[2].setProperty('checked', true);

    await addButton.click();

    await page.waitForChanges();

    expect(fwOptionsAdd).toHaveReceivedEvent();
    const val = await el.getProperty('value');
    expect(val).toEqual(['Ullu', 'Amazon']);
  });
});
