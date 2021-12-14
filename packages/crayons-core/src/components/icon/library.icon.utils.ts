import defaultLibrary from './library.crayons';
import systemLibrary from './library.system';
import type { Icon } from './icon';
import { fetchIcon } from './icon.utils';
const parser = new DOMParser();

export type IconLibraryResolver = (name: string) => string;
export type SVGMutator = (svg: SVGElement, name: string) => void;

export interface FwIconLibrary {
  name: string;
  resolver: IconLibraryResolver;
  mutator?: SVGMutator;
}

let registry: FwIconLibrary[] = [defaultLibrary, systemLibrary];
let watchedIcons: Icon[] = [];

export function watchIcon(icon: Icon) {
  watchedIcons.push(icon);
}

export function unwatchIcon(icon: Icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}

export function getIconLibrary(name?: string) {
  return registry.find((lib) => lib.name === name);
}

export async function getSVGElement(url: string): Promise<SVGElement> {
  const div = document.createElement('div');
  div.innerHTML = await fetchIcon(url);
  const svgEle = div.firstElementChild;
  const svg =
    svgEle && svgEle.tagName.toLowerCase() === 'svg' ? svgEle.outerHTML : '';
  const doc = parser.parseFromString(svg, 'text/html');
  return doc.body.querySelector('svg');
}

export function registerIconLibrary(
  name: string,
  options: { resolver: IconLibraryResolver; mutator?: SVGMutator }
) {
  unregisterIconLibrary(name);
  registry.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator,
  });
  // Re-render watched icons
  watchedIcons.map((icon) => {
    if (icon.library === name) {
      icon.redraw();
    }
  });
}

export function unregisterIconLibrary(name: string) {
  registry = registry.filter((lib) => lib.name !== name);
}
