import { newE2EPage } from '@stencil/core/testing';

describe('fw-form-builder', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-builder></fw-form-builder>');
    const element = await page.find('fw-form-builder');
    expect(element).toHaveClass('hydrated');
  });

  it('renders field menu items in left panel', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-form-builder></fw-form-builder>');
    const leftPanel = await page.find(
      'fw-form-builder >>> .form-builder-left-panel'
    );
    const fieldItems = await leftPanel.findAll(
      '.form-builder-left-panel-field-types-list > fw-field-type-menu-item'
    );
    expect(fieldItems.length).toBe(9);
  });
});
