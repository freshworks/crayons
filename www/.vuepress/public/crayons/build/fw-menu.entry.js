import { r as registerInstance, i as h } from './index-44c267ce.js';

const menuCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.menu{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:var(--fw-menu-min-width);max-width:var(--fw-menu-max-width);min-height:var(--fw-menu-min-height, 10px);max-height:var(--fw-menu-max-height, 400px);border:var(--fw-menu-border, 1px solid #ebeff3);border-radius:var(--fw-menu-border-radius);-webkit-box-shadow:var(--fw-menu-box-shadow);box-shadow:var(--fw-menu-box-shadow)}";

let Menu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", { class: 'menu', role: 'menu' }, h("slot", null)));
  }
};
Menu.style = menuCss;

export { Menu as fw_menu };
