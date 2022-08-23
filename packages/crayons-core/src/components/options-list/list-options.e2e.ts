import { newE2EPage } from '@stencil/core/testing';
describe('fw-list-options', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-list-options></fw-list-options>');
    const element = await page.find('fw-list-options');
    expect(element).toHaveClass('hydrated');
  });

  it('renders first list option as creatable option when isCreatable is true', async () => {
    jest.useFakeTimers();
    const page = await newE2EPage();
    await page.setContent('<fw-list-options></fw-list-options>');
    await page.waitForChanges();
    await page.$eval('fw-list-options', (elm: any) => {
      elm.isCreatable = true;
      elm.search = () => {
        return new Promise((resolve) => {
          resolve([]);
        });
      };
      elm.filterText = 'text';
      elm.debounceTimer = 0;
    });
    await page.waitForChanges();
    await page.waitForChanges();
    jest.runAllTimers();
    await page.waitForChanges();
    const selectOptions = await page.findAll(
      'fw-list-options >>> fw-select-option'
    );
    const creatableOption = await selectOptions[0].shadowRoot.querySelector(
      '.select-option'
    );
    expect(creatableOption.innerText).toBe('text');
    jest.useRealTimers();
  });

  it('renders first list option as creatable option and formats the text based on formatCreateLabel prop when isCreatable is true', async () => {
    jest.useFakeTimers();
    const page = await newE2EPage();
    await page.setContent('<fw-list-options></fw-list-options>');
    await page.waitForChanges();
    await page.$eval('fw-list-options', (elm: any) => {
      elm.isCreatable = true;
      elm.search = () => {
        return new Promise((resolve) => {
          resolve([]);
        });
      };
      elm.filterText = 'text';
      elm.debounceTimer = 0;
      elm.formatCreateLabel = (label) => `Add "${label}" as a recipient`;
    });
    await page.waitForChanges();
    await page.waitForChanges();
    jest.runAllTimers();
    await page.waitForChanges();
    const selectOptions = await page.findAll(
      'fw-list-options >>> fw-select-option'
    );
    const creatableOption = await selectOptions[0].shadowRoot.querySelector(
      '.select-option'
    );
    expect(creatableOption.innerText).toBe('Add "text" as a recipient');
    jest.useRealTimers();
  });
});
