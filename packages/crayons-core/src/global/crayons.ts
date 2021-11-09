export const config = new Map<string, any>();

export const registerIcons = (
  namespace: string,
  iconConfig = { path: '' }
): void => {
  config.set(`icon:${namespace}`, iconConfig);
};

export class ToastController {
  position: string;
  constructor(config: any) {
    this.position = config.position || 'top-center';
  }

  trigger() {
    console.log('trigger');
  }

  addChild() {
    console.log('add Child');
  }

  removeChild() {
    console.log('remove child');
  }

  listen() {
    console.log('listen');
  }
}
