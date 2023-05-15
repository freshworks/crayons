import { r as registerInstance, h, e as Host } from './index-4996832f.js';

const spinnerCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (prefers-reduced-motion: reduce){.spinner{-webkit-animation:none;animation:none}}@media screen and (prefers-reduced-motion: reduce) and (prefers-reduced-motion: reduce){.spinner .path{-webkit-animation:none;animation:none}}.spinner{-webkit-animation:rotate 2s linear infinite;animation:rotate 2s linear infinite;z-index:2}@media screen and (prefers-reduced-motion: reduce){.spinner .path{stroke:var(--spinner-color, #2c5cc5);stroke-linecap:round;-webkit-animation:none;animation:none}}.spinner .path{stroke:var(--spinner-color, #2c5cc5);stroke-linecap:round;-webkit-animation:dash 1s ease-in-out infinite;animation:dash 1s ease-in-out infinite}@-webkit-keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes dash{0%{stroke-dasharray:1, 150;stroke-dashoffset:0}50%{stroke-dasharray:90, 150;stroke-dashoffset:-35}100%{stroke-dasharray:90, 150;stroke-dashoffset:-124}}@keyframes dash{0%{stroke-dasharray:1, 150;stroke-dashoffset:0}50%{stroke-dasharray:90, 150;stroke-dashoffset:-35}100%{stroke-dasharray:90, 150;stroke-dashoffset:-124}}";

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
        '--spinner-color': `${this.color}`,
      }, viewBox: `0 0 50 50` }, h("circle", { class: 'path', cx: '25', cy: '25', r: '18', fill: 'none', "stroke-width": '8' }))));
  }
};
Spinner.style = spinnerCss;

export { Spinner as fw_spinner };
