export const config = new Map<string, any>();

export const registerIcons = (
  namespace: string,
  iconConfig = { path: '' }
): void => {
  config.set(`icon:${namespace}`, iconConfig);
};
