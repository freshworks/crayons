import { r as registerInstance, e as Build, i as h, j as getElement } from './index-44c267ce.js';
import { w as watchIcon, a as waitUntilVisible, b as unwatchIcon, g as getSVGElement, f as fetchIcon, c as getIconLibrary } from './crayons-70284c72.js';
import './toast-util-1470a081.js';
import './index-9d2a65d7.js';
import './progress-loader-util-2abfc50e.js';
import './_commonjsHelpers-2088bffa.js';
import './format-date-util-cbbbafe3.js';

const iconCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:inline-block}.icon{display:block;color:var(--fw-icon-color, #12344d);height:var(--fw-icon-size, 12px);width:var(--fw-icon-size, 12px)}.icon svg{display:block;width:100%;height:100%}";

let Icon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Identifier of the icon. The attribute’s value must be a valid JS Import Name of the svg in the named export from @freshworks/crayons-icon.
     */
    this.dataSvg = '';
    /**
     * Root Margin in px or percentage for Intersection-Observer. This means from ref to bottom of loaded view , the item loads when it crosses above the negative y margin.
     */
    this.xRootMargin = '50px';
    /**
     * Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.
     */
    this.color = '';
    /**
     * Name of External Library to be used
     */
    this.library = 'crayons';
    /**
     * Enable Intersection Observer. Default is false.
     */
    this.lazy = false;
    this.setElVisible = false;
    this.visible = false;
  }
  async componentWillLoad() {
    if (!this.lazy)
      this.visible = true;
    else
      this.visible = this.setElVisible;
    if (!Build.isBrowser || !this.visible) {
      return;
    }
    this.applyIconPropstoState();
  }
  connectedCallback() {
    watchIcon(this);
    this.lazy &&
      waitUntilVisible(this.intersectionObserver, this.xRootMargin, this.el, () => {
        this.setElVisible = true;
        this.applyIconPropstoState();
      });
  }
  nameChangeHandler() {
    this.applyIconPropstoState();
  }
  disconnectedCallback() {
    unwatchIcon(this);
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }
  }
  async applyIconPropstoState() {
    const { name, dataSvg, library } = this;
    try {
      if (!name && dataSvg) {
        this.svg = dataSvg;
      }
      else if (name) {
        const url = this.getIconUrl(name, library);
        this.svg = await this.drawIcon(url);
      }
      else {
        console.error("Please provide valid props either 'name' or 'data-svg'.Check the usage docs.");
        throw '-invalid props-';
      }
    }
    catch (e) {
      console.error(e.message);
      this.loadFallbackImage();
    }
  }
  async drawIcon(url) {
    const { name, library } = this;
    try {
      const svgEl = await getSVGElement(url);
      this.applySVGMutation(library, name, svgEl);
      return svgEl.outerHTML;
    }
    catch (ex) {
      throw new Error(`Exception occured while drawing Icon- ${name} : ${ex.message}`);
    }
  }
  /** Fetches the icon and redraws it. Used to handle library registrations. */
  redrawIcon() {
    this.applyIconPropstoState();
  }
  async loadFallbackImage() {
    this.svg = await fetchIcon(this.getIconUrlfromlib('image', 'system'));
  }
  getIconUrl(icon, lib) {
    let url = '';
    if (!this.src) {
      url = this.getIconUrlfromlib(icon, lib);
      if (url === undefined) {
        console.error(`Error while resolving url for ${this.name}|${this.library}. Please check the lib registration/resolver function.`);
        return;
      }
    }
    else
      url = `${this.src}/${this.name}.svg`;
    return url;
  }
  getIconUrlfromlib(icon, lib) {
    const library = getIconLibrary(lib);
    if (icon && library) {
      return library.resolver(icon);
    }
    else {
      console.error(`Icon ${icon}/${lib} not registered.Check the Implementation.`);
      return;
    }
  }
  applySVGMutation(library, icon, svgEl) {
    const iconlibrary = getIconLibrary(library);
    if (iconlibrary && iconlibrary.mutator) {
      iconlibrary.mutator(svgEl, icon);
    }
  }
  render() {
    const style = {};
    const accessibilityProps = { 'aria-hidden': true };
    const hasLabel = typeof this.label === 'string' && this.label.length > 0;
    if (hasLabel) {
      accessibilityProps['role'] = 'img';
      accessibilityProps['aria-label'] = this.label;
    }
    if (this.size !== undefined)
      style['--fw-icon-size'] = `${this.size}px`;
    if (this.color !== undefined)
      style['--fw-icon-color'] = this.color;
    return (h("div", Object.assign({ class: 'icon' }, accessibilityProps, { style: Object.assign({ height: ` ${this.height}px`, width: `${this.width}px` }, style), innerHTML: this.svg })));
  }
  static get assetsDirs() { return ["icon-assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "name": ["nameChangeHandler"]
  }; }
};
Icon.style = iconCss;

export { Icon as fw_icon };
