import { r as registerInstance, f as createEvent, h, F as Fragment } from './index-4996832f.js';

const selectOptionCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.select-center{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.select-option{cursor:pointer;color:#12344d;font-size:14px;border-radius:4px;list-style:none;line-height:1.45;word-break:break-word;word-wrap:break-word;position:relative;margin-bottom:4px}.select-option.single-line{padding-top:6px;padding-bottom:6px}.select-option.multi-line{padding-top:8px;padding-bottom:8px}.select-option.standard{padding-left:0px;padding-right:12px}.select-option.icon{padding-left:10px;padding-right:10px}.select-option.avatar{padding-left:4px;padding-right:4px}.select-option.selected{position:relative;font-weight:600;background-color:#e5f2fd}.select-option:hover,.select-option:focus{background-color:#ebeff3}.select-option.disabled{color:#92a2b1;position:relative;cursor:not-allowed;background-color:#f3f5f7}.select-option::after{display:block;font-style:normal;font-weight:400;font-variant:normal;line-height:1;text-decoration:inherit;text-transform:none;position:absolute;right:10px;color:#12344d}.select-option.selected::after{content:url(\"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='12px' height='9px' viewBox='0 0 12 9' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 52.4 (67378) - http://www.bohemiancoding.com/sketch --%3E%3Ctitle%3ECheck%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3Cpath d='M4.17095654,7.28764233 C3.74936256,6.89579049 3.08481084,6.91447629 2.68663874,7.32937825 C2.28846663,7.7442802 2.30745383,8.39828338 2.72904782,8.79013522 L5.87904631,11.7179111 C6.3006403,12.109763 6.96519201,12.0910772 7.36336412,11.6761752 L13.3133613,5.47617918 C13.7115334,5.06127722 13.6925462,4.40727405 13.2709522,4.0154222 C12.8493582,3.62357036 12.1848065,3.64225616 11.7866344,4.05715812 L6.55759159,9.50590771 L4.17095654,7.28764233 Z' id='path-1'%3E%3C/path%3E%3C/defs%3E%3Cg id='TD-with-Freddy-4-Email' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='ticket-detail--open-copy-2' transform='translate(-1054.000000, -997.000000)'%3E%3Cg id='Group-92' transform='translate(880.000000, 828.000000)'%3E%3Cg id='Group-26'%3E%3Cg id='Group-7' transform='translate(0.000000, 54.000000)'%3E%3Cg id='Group-2' transform='translate(16.000000, 104.000000)'%3E%3Cg id='Icon/new/Check' transform='translate(156.000000, 8.000000)'%3E%3Cmask id='mask-2' fill='white'%3E%3Cuse xlink:href='%23path-1'%3E%3C/use%3E%3C/mask%3E%3Cuse id='save' fill='%23000000' fill-rule='nonzero' xlink:href='%23path-1'%3E%3C/use%3E%3Cg id='Color/Blue-(Hype)' mask='url(%23mask-2)' fill='%232C5CC5' fill-rule='evenodd'%3E%3Crect id='Color---Jade' x='0' y='0' width='15.8024691' height='15.8024691'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")}.select-option .description{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.select-option .description-text{font-weight:600}.select-option .description-subText{font-weight:400}.select-option .description.icon-margin{margin-left:18px}.select-option .description.standard-margin{margin-left:12px}.select-option fw-icon{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}";

let SelectOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwSelected = createEvent(this, "fwSelected", 7);
    /**
     * Sets the state of the option to selected. The selected option is highlighted and a check mark is displayed next to it. If the attribute’s value is undefined, the value is set to false.
     */
    this.selected = false;
    /**
     * Sets the state of the option to disabled. The selected option is disabled and greyed out. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * States that the option is an HTML value. If the attribute's value is undefined, the value is set to true.
     */
    this.html = false;
    /**
     * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
     * The props for the icon or avatar are passed as an object via the graphicsProps.
     */
    this.variant = 'standard';
    /**
     * Place a checkbox.
     */
    this.isCheckbox = false;
  }
  async setFocus() {
    this.rowContainer.focus();
  }
  onKeyDown(ev) {
    switch (ev.key) {
      case 'Enter':
        this.onOptionSelected();
        break;
    }
  }
  onOptionSelected() {
    if (this.disabled) {
      return;
    }
    this.selected = !this.selected;
    const { value, selected } = this;
    this.fwSelected.emit({ value, selected });
  }
  renderInnerHtml() {
    const description = this.createDescription();
    const checkbox = this.isCheckbox ? this.createCheckbox() : '';
    switch (this.variant) {
      case 'standard':
        return (h(Fragment, null, checkbox, description));
      case 'icon':
        return (h(Fragment, null, checkbox, this.createIcon(), description));
      default:
        break;
    }
  }
  createDescription() {
    return this.subText ? (h("div", { class: 'description ' +
        (this.variant === 'icon' ? 'icon-margin ' : 'standard-margin ') }, h("span", { class: 'description-text' }, this.text), h("span", { class: 'description-subText' }, this.subText))) : (h("span", { class: 'description ' +
        (this.variant === 'icon' ? 'icon-margin ' : 'standard-margin ') }, this.text));
  }
  createIcon() {
    return h("fw-icon", Object.assign({}, this.graphicsProps));
  }
  createCheckbox() {
    return h("fw-checkbox", { checked: this.selected });
  }
  render() {
    return (h("div", { role: 'button', tabindex: '0', ref: (el) => (this.rowContainer = el), class: 'select-option ' +
        (this.selected && !this.isCheckbox ? 'selected ' : '') +
        (this.disabled ? 'disabled ' : '') +
        (this.html
          ? ''
          : (this.subText ? 'multi-line ' : 'single-line ') +
            (this.variant + ' ' + 'select-center')), onMouseDown: () => this.onOptionSelected() }, this.html ? '' : this.text ? this.renderInnerHtml() : h("slot", null)));
  }
  componentDidLoad() {
    if (this.html) {
      this.rowContainer.innerHTML = this.htmlContent;
    }
  }
};
SelectOption.style = selectOptionCss;

export { SelectOption as fw_select_option };
