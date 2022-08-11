import { r as registerInstance, i as h, k as Host, j as getElement } from './index-44c267ce.js';

const dragItemCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}.drag-item{display:-ms-flexbox;display:flex;background:#ffffff;border:1px solid #ebeff3;-webkit-box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06);box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06);border-radius:4px;padding-inline:12px;padding-block:8px;-ms-flex-align:center;align-items:center;margin-inline:0px;margin-block:8px}.drag-item .drag-item__label{-ms-flex:1 1 auto;flex:1 1 auto}.drag-item .drag-item__prefix{-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.drag-item .drag-item__suffix{-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.drag-item .drag-icon{-webkit-padding-end:12px;padding-inline-end:12px}.drag-item .drag-icon.drag:hover,.drag-item .drag-icon.drag:focus{cursor:-webkit-grab;cursor:grab}";

let DragItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.draggable = false;
    /**
     * Whether the drag is disabled or not.
     */
    this.disabled = false;
    /**
     * Whether the drag icon should be visible.
     */
    this.showDragIcon = true;
  }
  componentDidLoad() {
    var _a, _b;
    if (this.pinned)
      return;
    (_a = this.dragIcon) === null || _a === void 0 ? void 0 : _a.addEventListener('mousedown', this.toggleDraggable.bind(this));
    (_b = this.dragIcon) === null || _b === void 0 ? void 0 : _b.addEventListener('mouseout', this.toggleDraggable.bind(this));
  }
  toggleDraggable() {
    this.draggable = !this.draggable;
  }
  disconnectedCallback() {
    var _a, _b;
    (_a = this.dragIcon) === null || _a === void 0 ? void 0 : _a.removeEventListener('mousedown', this.toggleDraggable);
    (_b = this.dragIcon) === null || _b === void 0 ? void 0 : _b.removeEventListener('mouseout', this.toggleDraggable);
  }
  render() {
    return (h(Host, { draggable: this.draggable }, h("div", { class: {
        'drag-item': true,
      }, draggable: this.draggable }, this.showDragIcon && (h("span", { class: 'drag-item__prefix' }, h("fw-icon", { class: { 'drag-icon': true, 'drag': !this.pinned }, name: !this.pinned ? 'drag' : 'lock', ref: (dragIcon) => (this.dragIcon = dragIcon) }))), h("span", { class: 'drag-item__label' }, h("slot", null)), h("span", { class: 'drag-item__suffix' }, h("slot", { name: 'suffix' })))));
  }
  get el() { return getElement(this); }
};
DragItem.style = dragItemCss;

export { DragItem as fw_drag_item };
