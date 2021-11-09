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
    expect(
      element.shadowRoot
        .querySelector('button')
        .classList.contains('fw-btn--primary')
    ).toBeTruthy();
  });

  it('should set button as secondary when color is secondary', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button color="secondary"></fw-button>');
    const element = await page.find('fw-button');
    expect(
      element.shadowRoot
        .querySelector('button')
        .classList.contains('fw-btn--secondary')
    ).toBeTruthy();
  });

  // Move to a visual diffing testing model
  it('should show spinner when loading is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-button loading></fw-button>');
    const element = await page.find('fw-button');

    expect(
      element.shadowRoot
        .querySelector('button')
        .classList.contains('fw-btn--loading')
    ).toBeTruthy();
  });
});
