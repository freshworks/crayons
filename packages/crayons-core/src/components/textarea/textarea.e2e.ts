import { newE2EPage } from '@stencil/core/testing';

describe('fw-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-textarea></fw-textarea>');
    const element = await page.find('fw-textarea');
    expect(element).toHaveClass('hydrated');
  });

  it('it checks if the input value can be read', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-textarea value="tyrion lannister"></fw-textarea>'
    );
    const element = await page.find('fw-textarea');
    const value = await element.getProperty('value');
    expect(value).toBe('tyrion lannister');
  });

  it('It checks if the input value can be set', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-textarea></fw-textarea>');
    const element = await page.find('fw-textarea');
    element.setProperty('value', 'tyrion lannister');

    await page.waitForChanges();

    const value = await element.getProperty('value');
    expect(value).toBe('tyrion lannister');
  });

  it('it checks if the input has label', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-textarea label="Name"> </fw-textarea>');
    const element = await page.find('fw-textarea');
    const label = element.getAttribute('label');

    expect(label).toBe('Name');
  });

  it('it checks if the input has label', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-input label="Name"> </fw-input>');
    const element = await page.find('fw-input');
    const label = element.getAttribute('label');

    expect(label).toBe('Name');
  });

  it('it emits fwBlur when the focus is changed away from the component', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-textarea value="1">1</fw-textarea>');
    const fwBlur = await page.spyOnEvent('fwBlur');
    const element = await page.find('fw-textarea');

    await element.click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.waitForChanges();
    expect(fwBlur).toHaveReceivedEvent();
  });

  it('it should not emit fwChange when the value is changed in the component', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-textarea value="1"> </fw-textarea>');
    const fwChange = await page.spyOnEvent('fwChange');
    const element = await page.find('fw-textarea');

    element.setProperty('value', '2');

    await page.waitForChanges();

    expect(fwChange).not.toHaveReceivedEvent();
  });

  it('it does not increase row size more than max-rows when content lines are greater than max-rows', async () => {
    const page = await newE2EPage();
    await page.setContent('<fw-textarea rows="4" max-rows="5"> </fw-textarea>');
    const element = await page.find('fw-textarea');
    await element.click();
    page.keyboard.type('1\n2\n3\n4\n5\n6\n7');
    await page.waitFor(2000);
    await page.waitForChanges();
    const value = await element.getProperty('value');
    const nativeElement = await page.find('fw-textarea >>> textarea');
    const nativeRows = await nativeElement.getAttribute('rows');
    expect(value).toBe('1\n2\n3\n4\n5\n6\n7');
    expect(nativeRows).toBe('5');
  });

  it('it does not call addListeners function if maxRows props not added', async () => {
    const addListeners = jest.fn();
    const page = await newE2EPage();
    await page.exposeFunction('addListeners', () => {
      addListeners();
    });
    await page.setContent('<fw-textarea rows="4"> </fw-textarea>');
    const element = await page.find('fw-textarea');
    element.setProperty('value', '1\n2\n3\n4\n5\n6');
    await page.waitForChanges();
    expect(addListeners).not.toHaveBeenCalled();
  });
});
