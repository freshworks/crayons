import { AppConfig } from './config';

export class AppConfigService {
  private static instance: AppConfigService;
  private m: Map<keyof AppConfig, any>;

  private constructor() {
    // Private constructor, singleton
    this.init();
  }

  static getInstance() {
    if (!AppConfigService.instance) {
      AppConfigService.instance = new AppConfigService();
    }
    return AppConfigService.instance;
  }

  private init() {
    if (!window) {
      return;
    }

    const win = window as any;
    const appConfig = win.appConfig;
    this.m = new Map<keyof AppConfig, any>(
      Object.entries(appConfig?.config || new Map()) as any
    );
  }

  get(key: keyof AppConfig): any {
    const value = this.m.get(key);
    return value;
  }
}
