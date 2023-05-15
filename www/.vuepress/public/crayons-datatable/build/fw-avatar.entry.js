import { r as registerInstance, h } from './index-4996832f.js';

const avatarCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:inline-block;--size:3rem}.avatar{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;font-size:calc(var(--size) * 0.5);font-weight:400;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle}.avatar__initials{line-height:1;text-transform:uppercase}.avatar__image{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.avatar--dark{background-color:#527fa5;color:#fff}.avatar--light{background-color:#dff0ff;color:#000}.avatar--circle{border-radius:50%}.avatar--rounded{border-radius:4px}.avatar--square{border-radius:0}.avatar--xxlarge{width:96px;height:96px}.avatar--xlarge{width:72px;height:72px}.avatar--large{width:56px;height:56px}.avatar--medium{width:40px;height:40px}.avatar--small{width:32px;height:32px}.avatar--xsmall{width:24px;height:24px}";

let Avatar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.shape = 'circle';
    this.size = 'large';
    this.mode = 'dark';
  }
  render() {
    return (h("div", { class: `avatar 
     avatar--${this.shape}
     avatar--${this.size}
     avatar--${this.mode}
     `, "aria-label": this.alt }, this.image ? (h("img", { part: 'image', class: 'avatar__image', src: this.image, alt: this.alt })) : (h("div", { part: 'initials', class: 'avatar__initials' }, this.initials))));
  }
};
Avatar.style = avatarCss;

export { Avatar as fw_avatar };
