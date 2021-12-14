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

// Icon fetch-api with memoization :  fw-icon
const iconCache = {};
const requestCache = {};

export async function fetchIcon(fetch_asset_path) {
  if (iconCache[fetch_asset_path]) {
    return iconCache[fetch_asset_path];
  }

  if (!requestCache[fetch_asset_path]) {
    requestCache[fetch_asset_path] = fetch(fetch_asset_path)
      .then((resp) => resp.text())
      .then((text) => {
        return text;
      })
      .catch((err) => {
        console.error(
          `Some exception occured while loading the Assets.${fetch_asset_path}`,
          err
        );
        return '';
      });
  }

  iconCache[fetch_asset_path] = await requestCache[fetch_asset_path];

  return iconCache[fetch_asset_path];
}
