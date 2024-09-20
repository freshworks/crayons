import { r as registerInstance, i as h } from './index-44c267ce.js';

const avatarCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:inline-block;--size:3rem}.avatar{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:calc(var(--size) * 0.5);font-weight:400;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle}.avatar__initials{line-height:1;font-weight:600;font-size:32px;text-align:center;text-transform:uppercase}.avatar__image{position:absolute;inset-block-start:0;inset-inline-start:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.avatar--dark{background-color:#527fa5;color:#fff}.avatar--dark--initials{border:2px solid rgba(18, 52, 77, 0.16)}.avatar--dark--default{background-color:#90c6fe}.avatar--light{background-color:#dff0ff;color:#12344d}.avatar--light--initials{border:2px solid #bedbf5}.avatar--error{background-color:#ffd0d6;color:#12344d}.avatar--error--initials{border:2px solid #ffd0d6}.avatar--circle{border-radius:50%}.avatar--rounded{border-radius:4px}.avatar--square{border-radius:0}.avatar--xxlarge{width:96px;height:96px}.avatar--xxlarge .avatar__initials{font-size:32px}.avatar--xlarge{width:72px;height:72px}.avatar--xlarge .avatar__initials{font-size:24px}.avatar--large{width:56px;height:56px}.avatar--large .avatar__initials{font-size:20px}.avatar--medium{width:40px;height:40px}.avatar--medium .avatar__initials{font-size:16px}.avatar--small{width:32px;height:32px}.avatar--small .avatar__initials{font-size:14px}.avatar--xsmall{width:24px;height:24px}.avatar--xsmall .avatar__initials{font-size:12px}.avatar--xxsmall{width:20px;height:20px}.avatar--xxsmall .avatar__initials{font-size:10px}";

let Avatar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.shape = 'circle';
    this.name = '';
    this.size = 'large';
    this.mode = 'dark';
  }
  /**
   * Function to get the initials to display inside the avatar
   * @returns initials from either initials prop or from name prop
   */
  getInitials() {
    let initials = '';
    if (this.initials) {
      initials = this.initials;
    }
    else if (this.name.trim().length > 0) {
      const nameParts = this.name.trim().split(' ');
      if (nameParts.length === 1) {
        initials = nameParts.shift().charAt(0);
      }
      else if (nameParts.length > 1) {
        initials = nameParts.shift().charAt(0) + nameParts.pop().charAt(0);
      }
    }
    return initials;
  }
  renderAltIcon() {
    const color = this.mode === 'error' ? '#C82124' : '#283DA5';
    return (h("svg", { id: this.mode === 'error' ? 'error-svg' : 'default-svg', width: 24, height: 24, fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, h("g", { "clip-path": 'url(#a)', fill: color }, h("circle", { cx: 12, cy: 9, r: 5 }), h("ellipse", { cx: 12, cy: 24.5, rx: 11, ry: 9.5 })), h("defs", null, h("clipPath", { id: 'a' }, h("path", { fill: '#fff', d: 'M0 0h24v24H0z' })))));
  }
  render() {
    let strBaseClassName = `avatar 
    avatar--${this.shape}
    avatar--${this.size}
    avatar--${this.mode}
    `;
    if (!this.image && (this.initials || this.name)) {
      strBaseClassName += ` avatar--${this.mode}--initials`;
    }
    else if (!this.image) {
      strBaseClassName += ` avatar--${this.mode}--default`;
    }
    return (h("div", { class: strBaseClassName, "aria-label": this.alt }, this.image ? (h("img", { part: 'image', class: 'avatar__image', src: this.image, alt: this.alt })) : this.initials || this.name ? (h("div", { part: 'initials', class: 'avatar__initials' }, this.getInitials())) : (this.renderAltIcon())));
  }
};
Avatar.style = avatarCss;

export { Avatar as fw_avatar };
