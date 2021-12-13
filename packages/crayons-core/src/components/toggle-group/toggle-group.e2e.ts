import { newE2EPage } from '@stencil/core/testing';

describe('fw-toggle-group', () => {
  it('renders icon button toggle group with only one item to be selected', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-toggle-group>
        <fw-toggle-group-button
            icon-name="phone"
            value="aa"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="agent"
            value="bb"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="delete"
            value="cc"
            type="icon"></fw-toggle-group-button>
    </fw-toggle-group>`);

    const element = await page.find('fw-toggle-group');
    expect(element).toHaveClass('hydrated');
  });

  it('renders card button toggle group with multiple selections possible', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-toggle-group multiple="true">
        <fw-toggle-group-button
            header="Header A"
            description="This is a sample description of the card component. Test sentence for longer texts exceeding the given height"
            value="aa"></fw-toggle-group-button>
        <fw-toggle-group-button
            header="Header B"
            description="This is a sample description of the card component."
            value="bb"></fw-toggle-group-button>
        <fw-toggle-group-button
            header="Header c"
            description="This is a sample description of the card component."
            value="cc"></fw-toggle-group-button>
    </fw-toggle-group>`);

    const element = await page.find('fw-toggle-group');
    expect(element).toHaveClass('hydrated');
  });

  it('emits value if the option is selected', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-toggle-group>
        <fw-toggle-group-button
            icon-name="phone"
            value="aa"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="agent"
            value="bb"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="delete"
            value="cc"
            type="icon"></fw-toggle-group-button>
    </fw-toggle-group>`);

    const el = await page.find('fw-toggle-group');
    const fwToggled = await page.spyOnEvent('fwToggled');

    const arrToggleButtons = await page.findAll('fw-toggle-group-button');
    await arrToggleButtons[0].click();
    await page.waitForChanges();

    expect(fwToggled).toHaveReceivedEvent();
    const val = await el.getProperty('value');
    expect(val).toEqual('aa');
  });

  it('selects multiple options', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-toggle-group multiple="true">
        <fw-toggle-group-button
            icon-name="phone"
            value="aa"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="agent"
            value="bb"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="delete"
            value="cc"
            type="icon"></fw-toggle-group-button>
    </fw-toggle-group>`);

    const el = await page.find('fw-toggle-group');
    const fwToggled = await page.spyOnEvent('fwToggled');

    const arrToggleButtons = await page.findAll('fw-toggle-group-button');
    await arrToggleButtons[0].click();
    await page.waitForChanges();

    await arrToggleButtons[1].click();
    await page.waitForChanges();

    expect(fwToggled).toHaveReceivedEvent();
    const val = await el.getProperty('value');
    expect(val).toEqual('aa,bb');
  });

  it('deselects a button if multiple true and if an item is selected', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-toggle-group multiple="true" value="aa,bb">
        <fw-toggle-group-button
            icon-name="phone"
            value="aa"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="agent"
            value="bb"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="delete"
            value="cc"
            type="icon"></fw-toggle-group-button>
    </fw-toggle-group>`);

    const el = await page.find('fw-toggle-group');
    const fwToggled = await page.spyOnEvent('fwToggled');

    const arrToggleButtons = await page.findAll('fw-toggle-group-button');
    await arrToggleButtons[0].click();
    await page.waitForChanges();

    expect(fwToggled).toHaveReceivedEvent();
    const val = await el.getProperty('value');
    expect(val).toEqual('bb');
  });

  it('change selection and emit event if space/enter key is pressed', async () => {
    const page = await newE2EPage();

    await page.setContent(`<fw-toggle-group multiple="true" value="">
        <fw-toggle-group-button
            icon-name="phone"
            value="aa"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="agent"
            value="bb"
            type="icon"></fw-toggle-group-button>
        <fw-toggle-group-button
            icon-name="delete"
            value="cc"
            type="icon"></fw-toggle-group-button>
    </fw-toggle-group>`);

    const fwChange = await page.spyOnEvent('fwChange');
    const el = await page.find('fw-toggle-group');
    const arrToggleButtons = await page.findAll('fw-toggle-group-button');

    await arrToggleButtons[0].focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();

    expect(fwChange).toHaveReceivedEvent();
    const val2 = await el.getProperty('value');
    expect(val2).toEqual('aa');
  });
});
