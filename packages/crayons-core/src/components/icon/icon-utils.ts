export function registerIconlibrary(items): any {
  if (
    Object.keys(items).includes('crayons') ||
    Object.keys(items).includes('system')
  ) {
    console.error("IconLib 'crayons'|'system' cannot be registered from App.");
    delete items['crayons'];
    delete items['system'];
  }

  const iconlibListElem = document.createElement('fw-icon');
  iconlibListElem.setAttribute('type', 'registry');
  iconlibListElem.setAttribute('data-register-libs', JSON.stringify(items));
  iconlibListElem.style.display = 'none';

  const firstBodyEle = document.body.firstChild;
  firstBodyEle.parentNode.insertBefore(iconlibListElem, firstBodyEle);
}

export const iconRegistry = (function () {
  let iconlibs = {};

  return {
    addLib(items) {
      iconlibs = { ...iconlibs, ...items };
    },

    get fetchIconlibUrl() {
      return iconlibs;
    },
  };
})();

// Adding Intersection-Observer : fw-icon
export const waitUntilVisible = (
  intersectionObserver: IntersectionObserver,
  xRootMargin: string,
  el: HTMLElement,
  callback: () => void
): void => {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectionObserver.disconnect();
          intersectionObserver = undefined;
          callback();
        }
      });
    },
    { rootMargin: xRootMargin }
  );

  intersectionObserver.observe(el);
};

// Icon fetch-api with memoization
import { CRAYONS_ICONS_ASSET_PATH } from '@freshworks/crayons-icon';
const iconCache = {};
const requestCache = {};

export async function fetchIcon(icon, lib, lib_path) {
  const icon_key = `${lib}-${icon}`;
  if (iconCache[icon_key]) {
    return iconCache[icon_key];
  }
  lib === 'custom'
    ? (lib_path = `${window.location.origin}/${lib_path}`)
    : true;
  const fetch_asset_path =
    lib !== 'crayons'
      ? `${lib_path}/${icon}.svg`
      : `${CRAYONS_ICONS_ASSET_PATH}/${icon}.svg`;
  if (!requestCache[icon_key]) {
    requestCache[icon_key] = fetch(fetch_asset_path)
      .then((resp) => resp.text())
      .then((text) => {
        return text;
      })
      .catch((err) => {
        console.error(
          `Some exception occured while loading the Assets.${icon_key} from ${fetch_asset_path}`,
          err
        );
        return '';
      });
  }

  iconCache[icon_key] = await requestCache[icon_key];

  return iconCache[icon_key];
}
