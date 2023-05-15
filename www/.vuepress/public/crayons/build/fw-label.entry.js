import { r as registerInstance, i as h } from './index-44c267ce.js';

const labelCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{--fw-label-padding-vertical:5px;--fw-label-padding-horizontal:8px}.label{color:#6f7c87;border:1px solid #dadfe3;background-color:#fff;font-weight:600;line-height:14px;font-size:12px;padding:var(--fw-label-padding-vertical) var(--fw-label-padding-horizontal);display:inline-block;border-radius:4px}.label--blue{background-color:#e5f2fd;color:#2c5cc5;border:1px solid #bbdcfe}.label--red{background-color:#ffecf0;color:#d72d30;border:1px solid #ffd0d6}.label--green{background-color:#e0f5f1;color:#00795b;border:1px solid #b4e5da}.label--yellow{background-color:#fef1e1;color:#e86f25;border:1px solid #fedcb3}.label--grey{background-color:#ebeff3;color:#475867;border:none}";

let Label = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Theme based on which the label is styled.
     */
    this.color = 'normal';
    /**
     * Display text in the label.
     */
    this.value = '';
  }
  render() {
    return (h("span", { class: 'label label--' + this.color.toLowerCase() }, this.value));
  }
};
Label.style = labelCss;

export { Label as fw_label };
