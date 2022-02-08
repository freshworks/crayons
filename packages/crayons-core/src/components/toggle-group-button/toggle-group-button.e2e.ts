import { newE2EPage } from '@stencil/core/testing';

describe('fw-toggle-group-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-toggle-group-button></fw-toggle-group-button>');
    const element = await page.find('fw-toggle-group-button');
    expect(element).not.toBeNull();
  });

  it('it renders a card type with selected state', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toggle-group-button header="Header A" description="This is a sample description of the card component." value="aa" selected="true"></fw-toggle-group-button>'
    );
    const element = await page.find('fw-toggle-group-button');
    const isSelected = await element.getProperty('selected');
    expect(isSelected).toBe(true);
  });

  it('it renders a icon type with selected state', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-toggle-group-button value="aa" type="icon" selected="true"><fw-icon slot="toggle-icon" size={16} name="phone"/></fw-toggle-group-button>'
    );
    const element = await page.find('fw-toggle-group-button');
    const isSelected = await element.getProperty('selected');
    expect(isSelected).toBe(true);
  });

  it('it emits fwToggled when clicked - default value returns selected=true', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-toggle-group-button value="id1">1</fw-toggle-group-button>'
    );
    const element = await page.find('fw-toggle-group-button');
    const fwToggled = await page.spyOnEvent('fwToggled');
    await element.click();
    expect(fwToggled).toHaveReceivedEventDetail({
      selected: true,
      value: 'id1',
      index: -1,
    });
  });

  it('it emits fwToggled when clicked, if isCheckbox property is set to true - returns selected=false', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-toggle-group-button value="id1" is-checkbox="true" selected="true">1</fw-toggle-group-button>'
    );
    const element = await page.find('fw-toggle-group-button');
    const fwToggled = await page.spyOnEvent('fwToggled');
    await element.click();
    expect(fwToggled).toHaveReceivedEventDetail({
      selected: false,
      value: 'id1',
      index: -1,
    });
  });

  it('it should not emit fwChange when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<fw-toggle-group-button value="1" disabled>1</fw-toggle-group-button>'
    );
    const element = await page.find('fw-toggle-group-button');
    const fwToggled = await page.spyOnEvent('fwToggled');
    await element.click();
    expect(fwToggled.events).toEqual([]);
  });

  //   it('it should return html structure with slot when content is passed between opening and closing tag', async () => {
  //     const page = await newE2EPage();

  //     await page.setContent(
  //       '<fw-toggle-group-button description="Yes">Select to Agree</fw-toggle-group-button>'
  //     );
  //     const element = await page.find('fw-toggle-group-button >>> div');
  //     console.log(element);
  //     expect(element).toEqualHtml(`<div class="checkbox-container">
  //     <input type="checkbox">
  //     <label>
  //     <span id="label">
  //       <slot></slot>
  //     </span>
  //     <div id="description">
  //     Yes
  //     </div>
  //     </label>
  //     </div>`);
  //   });
});
