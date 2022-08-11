import { r as registerInstance, i as h } from './index-44c267ce.js';

const customCellUserCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.name-box-container{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}.name-box-container .name-box{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-positive:1;flex-grow:1;margin-inline:12px;margin-block:0}.name-box-container .name-box .name-box-text{font-weight:600;font-size:14px;line-height:20px;width:250px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.name-box-container .name-box .name-box-email{font-size:12px;color:#475867;line-height:18px;width:250px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}";

let CustomCellUser = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.image = null;
    this.name = '';
    this.email = '';
    this.alt = '';
  }
  render() {
    return (h("div", { class: 'name-box-container' }, h("div", { class: 'avatar' }, h("fw-avatar", { size: 'small', image: this.image, name: this.name, alt: this.alt })), h("div", { class: 'name-box' }, h("div", { class: 'name-box-text' }, this.name), h("div", { class: 'name-box-email' }, this.email))));
  }
};
CustomCellUser.style = customCellUserCss;

export { CustomCellUser as fw_custom_cell_user };
