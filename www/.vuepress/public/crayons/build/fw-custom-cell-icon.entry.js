import { r as registerInstance, i as h } from './index-44c267ce.js';

let CustomCellUser = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = '';
    this.size = 18;
    this.color = '#647A8E';
    this.library = 'crayons';
    this.src = null;
  }
  render() {
    return (h("fw-icon", { name: this.name, size: this.size, color: this.color, library: this.library, src: this.src }));
  }
};

export { CustomCellUser as fw_custom_cell_icon };
