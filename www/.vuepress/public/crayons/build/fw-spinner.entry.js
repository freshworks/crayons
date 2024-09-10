import { r as registerInstance, i as h, k as Host } from './index-44c267ce.js';

const spinnerCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (prefers-reduced-motion: reduce){.spinner{-webkit-animation:none;animation:none}}@media screen and (prefers-reduced-motion: reduce) and (prefers-reduced-motion: reduce){.spinner .path{-webkit-animation:none;animation:none}}.spinner{z-index:2}:host(:not([dir=\"rtl\"])) .spinner,:host([dir=\"ltr\"]) .spinner{-webkit-animation:rotate-ltr 2s linear infinite;animation:rotate-ltr 2s linear infinite}:host([dir=\"rtl\"]) .spinner{-webkit-animation:rotate-rtl 2s linear infinite;animation:rotate-rtl 2s linear infinite}@media screen and (prefers-reduced-motion: reduce){.spinner .path{stroke:var(--fw-spinner-color, #2c5cc5);stroke-linecap:round;-webkit-animation:none;animation:none}}.spinner .path{stroke:var(--fw-spinner-color, #2c5cc5);stroke-linecap:round;-webkit-animation:dash 1s ease-in-out infinite;animation:dash 1s ease-in-out infinite}@-webkit-keyframes rotate-ltr{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate-ltr{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes rotate-rtl{100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes rotate-rtl{100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@-webkit-keyframes dash{0%{stroke-dasharray:1, 150;stroke-dashoffset:0}50%{stroke-dasharray:90, 150;stroke-dashoffset:-35}100%{stroke-dasharray:90, 150;stroke-dashoffset:-124}}@keyframes dash{0%{stroke-dasharray:1, 150;stroke-dashoffset:0}50%{stroke-dasharray:90, 150;stroke-dashoffset:-35}100%{stroke-dasharray:90, 150;stroke-dashoffset:-124}}";

let Spinner = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Size of the loader.
     */
    this.size = 'default';
    /**
     * Color in which the loader is displayed, specified as a standard CSS color.
     */
    this.color = '';
    this.sizeMap = {
      small: 12,
      default: 16,
      medium: 24,
      large: 32,
    };
  }
  getSize() {
    return this.sizeMap[this.size] || 16;
  }
  render() {
    const diameter = this.getSize();
    return (h(Host, null, h("svg", { class: `spinner ${this.size}`, style: {
        'width': `${diameter}px`,
        'height': `${diameter}px`,
        '--fw-spinner-color': `${this.color}`,
      }, viewBox: `0 0 50 50` }, h("circle", { class: 'path', cx: '25', cy: '25', r: '18', fill: 'none', "stroke-width": '8' }))));
  }
};
Spinner.style = spinnerCss;

export { Spinner as fw_spinner };
