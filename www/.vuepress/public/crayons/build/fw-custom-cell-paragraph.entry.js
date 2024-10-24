import { r as registerInstance, i as h, k as Host, j as getElement } from './index-44c267ce.js';
import { T as TranslationController } from './Translation-ce9b2559.js';

const customCellParagraphCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.paragraph-container{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.paragraph-container .paragraph-text{overflow:hidden;margin:0px}.paragraph-container .paragraph-text.expanded{display:inline}.paragraph-container .paragraph-toggle{display:inline;text-decoration:none;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center;color:#2c5cc5;white-space:nowrap;font-weight:600}.paragraph-container .paragraph-toggle:hover,.paragraph-container .paragraph-toggle:focus{cursor:pointer}";

let CustomCellParagraph = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * text to display inside the cell
     */
    this.text = '';
    /** max height to restrict trimming. 60px to allow for 3 lines (3 * 20 line-height) */
    this.maxHeight = '60px';
    /**
     * hide and show toggle button state based on how long the text is
     */
    this.showToggle = false;
    /**
     * hide and show text
     */
    this.hide = true;
    /**
     * toggle paragraph button
     */
    this.toggleParaButton = null;
  }
  textChangeHandler() {
    this.showToggleOnTextChange();
  }
  /**
   * componentDidLoad lifecycle event
   */
  componentDidLoad() {
    this.showToggleOnTextChange();
  }
  /** on focusing of the para variant */
  onFocus() {
    if (this.toggleParaButton) {
      this.toggleParaButton.focus();
    }
    else {
      this.el.parentElement.setAttribute('tabindex', '0');
      this.el.parentElement.focus();
    }
  }
  /**
   * showToggleOnTextChange show the button based on number of lines in the paragraph
   */
  showToggleOnTextChange() {
    const paraHeight = this.el.getBoundingClientRect().height;
    if (paraHeight >= parseInt(this.maxHeight)) {
      this.showToggle = true;
    }
    else {
      this.showToggle = false;
    }
  }
  /**
   * toggleParagraph show and hide the longer paragraph text
   */
  toggleParagraph() {
    this.hide = !this.hide;
    if (this.hide) {
      this.maxHeight = '60px';
    }
    else {
      this.maxHeight = 'none';
    }
  }
  /**
   * render method
   */
  render() {
    const para = (h("p", { class: {
        'paragraph-text': true,
        'open': this.showToggle,
        'expanded': !this.hide,
      }, style: {
        maxHeight: this.maxHeight,
      } }, this.text, ' '));
    return (h(Host, { onFocus: () => this.onFocus() }, h("div", { class: 'paragraph-container' }, this.showToggle && this.hide ? (h("fw-tooltip", { content: this.text, hoist: true, placement: 'bottom-start', fallbackPlacements: ['top-start'] }, para)) : (para), this.showToggle && (h("div", { class: 'paragraph-toggle', role: 'button', tabIndex: 0, onKeyUp: (event) => (event.code === 'Space' || event.code === 'Enter') &&
        this.toggleParagraph(), onClick: () => this.toggleParagraph(), ref: (el) => (this.toggleParaButton = el) }, this.hide ? (h("span", null, TranslationController.t('datatable.showMore'))) : (h("span", null, TranslationController.t('datatable.showLess'))))))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "text": ["textChangeHandler"]
  }; }
};
CustomCellParagraph.style = customCellParagraphCss;

export { CustomCellParagraph as fw_custom_cell_paragraph };
