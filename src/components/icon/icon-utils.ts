import { getAssetPath } from '@stencil/core';
const iconCache = {};
const requestCache = {};
export async function fetchIcon(icon, path) {

  if (iconCache[icon]) {
    return iconCache[icon];
  }
  const fecth_asset_path = path ? `${path}/${icon}.svg` : `icon-assets/icons/${icon}.svg`;
  if (!requestCache[icon]) {
    requestCache[icon] = fetch(getAssetPath(fecth_asset_path))
     .then(resp => resp.text())
     .then(text => {return text})
     .catch(() => {
        // console.error(`"${icon}" is not a valid name`);
        return '';
      });
  }

  iconCache[icon] = await requestCache[icon];

  return iconCache[icon];
}