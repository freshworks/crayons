import { newE2EPage } from '@stencil/core/testing';

describe('fw-kebab-menu', () => {
  const props = {
    options: [
      {
        value: 'move_up',
        text: 'Move Up',
        graphicsProps: { name: 'chevron-up' },
      },
      {
        value: 'move_down',
        text: 'Move Down',
        graphicsProps: { name: 'chevron-down' },
      },
      {
        value: 'remove',
        text: 'Remove',
        graphicsProps: { name: 'delete' },
      },
    ],
  };

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-kebab-menu></fw-kebab-menu>');
    const element = await page.find('fw-kebab-menu');
    expect(element).toHaveClass('hydrated');
  });

  it('does not render kebab icon when there are no options passed', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-kebab-menu></fw-kebab-menu>');
    const element = await page.find('fw-kebab-menu >>> fw-icon');
    expect(element).toBeFalsy();
  });

  it('renders kebab icon only when there are options passed', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-kebab-menu></fw-kebab-menu>');
    await page.$eval(
      'fw-kebab-menu',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    await page.waitForChanges();
    const element = await page.find('fw-kebab-menu >>> fw-icon');
    expect(element.getAttribute('name')).toBe('more-vertical');
  });

  it('renders options when passed as prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-kebab-menu></fw-kebab-menu>');
    await page.$eval(
      'fw-kebab-menu',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    await page.waitForChanges();
    await page.waitForChanges();
    const button = await page.find('fw-kebab-menu >>> fw-button');
    await button.click();
    await page.waitForChanges();
    const popover = await page.find('fw-kebab-menu >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    expect(options.length).toBe(3);
  });

  it('emits fwSelect event when an option is clicked', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-kebab-menu></fw-kebab-menu>');
    await page.$eval(
      'fw-kebab-menu',
      (elm: any, { options }) => {
        elm.options = options;
      },
      props
    );
    const fwSelect = await page.spyOnEvent('fwSelect');
    await page.waitForChanges();
    await page.waitForChanges();
    const button = await page.find('fw-kebab-menu >>> fw-button');
    await button.click();
    await page.waitForChanges();
    const popover = await page.find('fw-kebab-menu >>> fw-popover');
    const options = await popover.findAll(
      'fw-list-options >>> fw-select-option'
    );
    expect(options.length).toBe(3);
    await options[0].click();
    await page.waitForChanges();
    expect(fwSelect).toHaveReceivedEventDetail({
      value: props.options[0].value,
    });
  });
});
