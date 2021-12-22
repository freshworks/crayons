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
  try {
    const div = document.createElement('div');
    div.innerHTML = await fetchIcon(url);
    if (div.innerHTML.indexOf('</svg>') === -1)
      throw new Error(`Asset not found or Network Issue`);
    const svgEle = div.firstElementChild;
    const svg =
      svgEle && svgEle.tagName.toLowerCase() === 'svg' ? svgEle.outerHTML : '';
    const doc = parser.parseFromString(svg, 'text/html');
    return doc.body.querySelector('svg');
  } catch (e) {
    throw new Error(
      `Error while creating SVG Element. It can be due to corrupt/missing SVG Source. : ${e.message}`
    );
  }
}

export function registerIconLibrary(
  name: string,
  options: { resolver: IconLibraryResolver; mutator?: SVGMutator }
) {
  try {
    if (name !== 'crayons' && name !== 'system') {
      unregisterIconLibrary(name);
      registry.push({
        name,
        resolver: options.resolver,
        mutator: options.mutator,
      });
      // Re-render watched icons
      watchedIcons.map((icon) => {
        if (icon.library === name) {
          icon.redrawIcon();
        }
      });
    } else {
      throw new Error(
        'You cannot register libraries with name "crayons" | "system". Please register with different name.'
      );
    }
  } catch (e) {
    console.error(e.message);
    return;
  }
}

export function unregisterIconLibrary(name: string) {
  registry = registry.filter((lib) => lib.name !== name);
}
