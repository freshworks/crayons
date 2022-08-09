import { newSpecPage } from '@stencil/core/testing';
import { EmailHeader } from '../email-header';

describe('email-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EmailHeader],
      html: `<email-header></email-header>`,
    });
    expect(page.root).toEqualHtml(`
      <email-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </email-header>
    `);
  });
});
