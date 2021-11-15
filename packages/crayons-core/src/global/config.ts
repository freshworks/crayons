// The interface which define the list of variables
export interface AppConfig {
  [key: string]: any;
}

export function setupConfig(config: AppConfig) {
  if (!window) {
    return;
  }

  const win = window as any;
  const appConfig = win.appConfig;

  if (
    appConfig &&
    appConfig.config &&
    appConfig.config.constructor.name !== 'Object'
  ) {
    console.error('appConfig config was already initialized');
    return;
  }

  win.appConfig = win.appConfig || {};
  win.appConfig.config = {
    ...win.appConfig.config,
    ...config,
  };

  return win.appConfig.config;
}
