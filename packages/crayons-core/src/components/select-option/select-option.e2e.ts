import { newE2EPage } from '@stencil/core/testing';

describe('fw-select-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-select-option></fw-select-option>');
    const element = await page.find('fw-select-option');
    expect(element).toHaveClass('hydrated');
  });

  it('renders checkbox when checkbox property is true only when text is present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-select-option checkbox="true" text="This is a select option"></fw-select-option>'
    );
    const checkbox = await page.find('fw-select-option >>> fw-checkbox');
    expect(checkbox).toBeTruthy();
  });

  it('does not render checkbox when checkbox property is true but text is not present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-select-option checkbox="true"></fw-select-option>'
    );
    const checkbox = await page.find('fw-select-option >>> fw-checkbox');
    expect(checkbox).toBeFalsy();
  });

  it('renders checkbox with padding when checkbox property is true only when text is present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-select-option checkbox="true" text="This is a select option"></fw-select-option>'
    );
    const checkbox = await page.find('fw-select-option >>> .has-checkbox');
    const styles = await checkbox.getComputedStyle();
    expect(styles.paddingInlineStart).toBe('10px');
  });

  it('renders checkbox dynamically when checkbox property is dynamically changed to true after component is initially rendered', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-select-option text="This is a select option"></fw-select-option>'
    );
    let checkbox = await page.find('fw-select-option >>> fw-checkbox');
    expect(checkbox).toBeFalsy();

    await page.$eval('fw-select-option', (elm: any) => {
      elm.checkbox = true;
    });

    await page.waitForChanges();
    checkbox = await page.find('fw-select-option >>> fw-checkbox');
    expect(checkbox).toBeTruthy();
  });

  it('disables the checkbox when disabled property is true', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-select-option text="This is a select option" disabled></fw-select-option>'
    );
    let checkbox = await page.find('fw-select-option >>> fw-checkbox');
    expect(checkbox).toBeFalsy();

    await page.$eval('fw-select-option', (elm: any) => {
      elm.checkbox = true;
    });

    await page.waitForChanges();
    checkbox = await page.find('fw-select-option >>> fw-checkbox');
    expect(checkbox).toBeTruthy();
    expect(await checkbox.getProperty('disabled')).toBeTruthy();
  });

  it('should render text when variant is undefined', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-select-option text="This is a select option"></fw-select-option>'
    );

    await page.$eval('fw-select-option', (elm: any) => {
      elm.variant = 'icon';
    });
    await page.waitForChanges();

    await page.$eval('fw-select-option', (elm: any) => {
      elm.variant = undefined;
    });
    await page.waitForChanges();

    const text = await page.find('fw-select-option >>> .description');
    expect(text).toBeTruthy();
    expect(text.innerText).toBe('This is a select option');
  });

  it('should render fw-select-option with conversation variant and verify attributes', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<fw-select-option 
          text="This is a select option description" 
          subText="This is selected option subtext" 
          data-meta-text='{"name": "Author Name", "email": "author@example.com", "mobile": "123-456-7890"}'>
        </fw-select-option>`
    );

    await page.$eval('fw-select-option', (elm: any) => {
      elm.variant = 'conversation';
    });
    await page.waitForChanges();

    const text = await page.find('fw-select-option >>> .description');
    expect(text).toBeTruthy();
    expect(text.innerText).toBe('This is a select option description');

    const metaText = await page.$eval('fw-select-option', (elm: any) =>
      JSON.parse(elm.getAttribute('data-meta-text'))
    );
    expect(metaText.name).toBe('Author Name');
    expect(metaText.email).toBe('author@example.com');
    expect(metaText.mobile).toBe('123-456-7890');
  });

  it('should render fw-select-option with no variant and verify attributes', async () => {
    const page = await newE2EPage();

    await page.setContent(
      `<fw-select-option 
          text="This is a select option description" 
          subText="This is selected option subtext" 
          data-meta-text='{"name": "Author Name", "email": "author@example.com", "mobile": "123-456-7890"}'>
        </fw-select-option>`
    );

    await page.waitForChanges();

    const text = await page.find('fw-select-option >>> .description');
    expect(text).toBeTruthy();
    expect(text.innerText).toBe('This is a select option description');

    const metaText = await page.$eval('fw-select-option', (elm: any) =>
      JSON.parse(elm.getAttribute('data-meta-text'))
    );
    expect(metaText.name).toBe('Author Name');
    expect(metaText.email).toBe('author@example.com');
    expect(metaText.mobile).toBe('123-456-7890');
  });
});
