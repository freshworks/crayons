import { newE2EPage } from '@stencil/core/testing';

describe('fw-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-avatar></fw-avatar>');
    const element = await page.find('fw-avatar');
    expect(element).toHaveClass('hydrated');
  });

  it('renders image if image prop is present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-avatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" initials="PT"></fw-avatar>'
    );
    const avatarImg = await page.find('fw-avatar >>> img.avatar__image');
    const avatarText = await page.find('fw-avatar >>> div.avatar__initials');
    expect(avatarImg).toBeTruthy();
    expect(avatarText).toBeFalsy();
  });

  it('renders initials if image prop is not present', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-avatar initials="PT"></fw-avatar>');
    const avatarText = await page.find('fw-avatar >>> div.avatar__initials');
    expect(avatarText).toEqualText('PT');
  });

  it('renders name if image and initials props are not present', async () => {
    const page = await newE2EPage();

    await page.setContent('<fw-avatar name="Alexander Goodwin"></fw-avatar>');
    const avatarText = await page.find('fw-avatar >>> div.avatar__initials');
    expect(avatarText).toEqualText('AG');
  });

  it('renders with priority to initials even if name is present', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<fw-avatar initials="AB" name="Cathy Goodman"></fw-avatar>'
    );
    const avatarText = await page.find('fw-avatar >>> div.avatar__initials');
    expect(avatarText).toEqualText('AB');
  });
});
