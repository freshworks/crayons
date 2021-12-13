export type IconLibraryResolver = () => string;
export type IconLibraryMutator = (svg: SVGElement, name: string) => void;
export interface IconLibrary {
  name: string;
  resolver: IconLibraryResolver;
  mutator?: IconLibraryMutator;
}

let registry: IconLibrary[] = [];

export function getIconLibrary(name?: string) {
  return registry.filter((lib) => lib.name === name)[0];
}

export function registerIconLibrary(
  name: string,
  options: { resolver: IconLibraryResolver; mutator?: IconLibraryMutator }
) {
  unregisterIconLibrary(name);
  registry.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator,
  });
}

export function unregisterIconLibrary(name: string) {
  registry = registry.filter((lib) => lib.name !== name);
}
