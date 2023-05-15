import { r as registerInstance, i as h, k as Host } from './index-44c267ce.js';

const skeletonCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.skeleton{-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;overflow:hidden;position:relative;background:var(--fw-skeleton-background, #cfd7df);border-radius:var(--fw-skeleton-border-radius, 999px);width:var(--fw-skeleton-width, 100%);height:var(--fw-skeleton-height, 16px);display:block;margin-bottom:var(--fw-skeleton-margin-bottom, 8px);will-change:auto}.skeleton:after,.skeleton:before{-webkit-box-sizing:border-box;box-sizing:border-box}.skeleton.circle{width:var(--fw-skeleton-width, 32px);height:var(--fw-skeleton-height, 32px);margin-bottom:var(--fw-skeleton-margin-bottom, 8px);border-radius:var(--fw-skeleton-border-radius, 50%)}.skeleton.rect{border-radius:var(--fw-skeleton-border-radius, 0px)}.skeleton.only{margin-bottom:var(--fw-skeleton-margin-bottom, 0px)}@media (prefers-reduced-motion: reduce){.skeleton.pulse,.skeleton.sheen{-webkit-animation:none;animation:none}}.skeleton.pulse{-webkit-animation:pulse 2s ease-in-out 0.5s infinite;animation:pulse 2s ease-in-out 0.5s infinite}.skeleton.sheen{background:-webkit-gradient(linear, right top, left top, from(var(--fw-skeleton-sheen-color, #b1bdc8)), color-stop(var(--fw-skeleton-background, #cfd7df)), color-stop(var(--fw-skeleton-background, #cfd7df)), to(var(--fw-skeleton-sheen-color, #b1bdc8)));background:linear-gradient(270deg, var(--fw-skeleton-sheen-color, #b1bdc8), var(--fw-skeleton-background, #cfd7df), var(--fw-skeleton-background, #cfd7df), var(--fw-skeleton-sheen-color, #b1bdc8));-webkit-animation:sheen 8s ease-in-out infinite;animation:sheen 8s ease-in-out infinite}@-webkit-keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}@-webkit-keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}@keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}";

let Skeleton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** Effect the skeleton will use. */
    this.effect = 'pulse';
    /**
     * Variant of the skeleton - circle or rectangle or text
     */
    this.variant = 'text';
    /**
     * Width of the skeleton ex. 100px, 100%, auto etc.
     */
    this.width = null;
    /**
     * Height of the skeleton ex. 100px, 100%, auto etc.
     */
    this.height = null;
    /**
     * MarginBottom of the skeleton ex. 10px, 0 etc.
     */
    this.marginBottom = null;
    /**
     * Number of rows of current skeleton type
     */
    this.count = 1;
    /**
     * Custom css styles (background/margins/width/height etc.)
     *
     * @type {({[k: string]: string} | string)}
     */
    this.customStyles = {};
    this.items = [];
  }
  componentWillLoad() {
    this.init();
  }
  componentWillUpdate() {
    this.init();
  }
  init() {
    this.items.length = this.count;
    this.items.fill(1);
    if (this.customStyles && typeof this.customStyles === 'string') {
      try {
        this.customStyles = JSON.parse(this.customStyles);
      }
      catch (error) {
        console.warn(`can't parse styles`, this.customStyles);
      }
    }
  }
  get style() {
    const dimensionsStyles = {
      width: null,
      height: null,
      marginBottom: null,
    };
    if (this.width) {
      dimensionsStyles.width = this.width;
    }
    if (this.height) {
      dimensionsStyles.height = this.height;
    }
    if (this.marginBottom) {
      dimensionsStyles.marginBottom = this.marginBottom;
    }
    const styles = typeof this.customStyles === 'object' ? this.customStyles : {};
    return Object.assign(Object.assign({}, dimensionsStyles), styles);
  }
  render() {
    return (h(Host, null, this.items.map((_, index) => {
      return (h("div", { part: 'base', key: index, class: {
          circle: this.variant === 'circle',
          rect: this.variant === 'rect',
          skeleton: true,
          pulse: this.effect === 'pulse',
          sheen: this.effect === 'sheen',
          only: this.count === 1,
        }, "aria-busy": 'true', "aria-live": 'polite', style: this.style }));
    })));
  }
};
Skeleton.style = skeletonCss;

export { Skeleton as fw_skeleton };
