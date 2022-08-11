import { r as registerInstance, h as createEvent, i as h, k as Host, j as getElement } from './index-44c267ce.js';
import { d as debounce, c as cloneNodeWithEvents } from './index-a4741a9c.js';

//Global Variables
let dragElement;
const placeholders = [];
const DEFAULT_OPTIONS = {
  sortable: false,
  acceptFrom: '',
  placeholderClass: '',
  copy: true,
  addOnDrop: true,
};
class Draggable {
  constructor(container, options) {
    this.childElements = [];
    this.acceptFrom = [];
    this.dropped = false;
    this.debouncedSetElement = debounce((childElements, draggingElement, y) => {
      if (this.cancelDebouncedDrag) {
        return;
      }
      const afterElement = this.getDragAfterElement(childElements, y);
      let newElement;
      // dragging inside the same container, so no need to add placeholder
      if (draggingElement.parentElement.id === this.dragContainer.id) {
        newElement = draggingElement;
      }
      else {
        this.placeholder || (this.placeholder = this.createPlaceholder(draggingElement));
        newElement = this.placeholder;
      }
      this.addElement(newElement, afterElement);
    }, this, 5);
    this.onDragStart = (e) => {
      dragElement = e.target;
      this.dropped = false;
      this.cancelDebouncedDrag = false;
      // Set dragElementId for Firefox
      e.dataTransfer.setData('text/plain', dragElement.id);
      // Set all items inside the drag container except the current element
      this.childElements = Array.from(this.dragContainer.children);
      const draggingElementIndex = this.childElements.indexOf(dragElement);
      this.nextSibling = this.childElements[draggingElementIndex + 1];
      this.childElements.splice(draggingElementIndex, 1);
      e.stopPropagation();
    };
    this.onDragEnter = (e) => {
      if (!this.canAcceptDragElement()) {
        return;
      }
      const sortContainer = e
        .composedPath()
        .find((el) => el.id === this.dragContainer.id);
      if (sortContainer && sortContainer !== this.previousContainer) {
        this.childElements = Array.from(this.dragContainer.children);
        // the drag element have entered or re-entered current drag container
        this.cancelDebouncedDrag = false;
      }
      this.previousContainer = sortContainer;
    };
    this.onDragLeave = (e) => {
      if (!this.canAcceptDragElement()) {
        return;
      }
      const outTarget = e.fromElement || e.relatedTarget;
      if (!e.currentTarget.contains(outTarget)) {
        // Check whether the outTarget's host (in case of shadow dom) exists in currentTarget
        const parentHost = this.getMatchingHost(outTarget, this.dragContainer.children[0].tagName);
        if (!e.currentTarget.contains(parentHost)) {
          // the drag element have left the current container(this.host)
          this.previousContainer = undefined;
        }
      }
    };
    this.onDragOver = (e) => {
      e.preventDefault();
      if (!this.canAcceptDragElement()) {
        return;
      }
      this.debouncedSetElement(this.childElements, dragElement, e.clientY);
    };
    // Both dragend and drop need to used as the drop will be fired only on the container on which the drag is dropped
    // and no on the container where drag is originated.
    this.onDragEnd = (e) => {
      if ((!this.dropped || placeholders.length > 0) && dragElement) {
        // The drag element is dropped outside the drag container
        this.addElement(dragElement, this.nextSibling);
        this.removePlaceholder();
      }
      this.resetData(e);
    };
    this.onDrop = (e) => {
      if (!this.canAcceptDragElement()) {
        return;
      }
      this.dropped = true;
      const sortContainerId = dragElement.parentElement.id;
      const newElement = this.placeholder || dragElement;
      const droppedIndex = [...this.dragContainer.children].indexOf(newElement);
      if (this.placeholder) {
        if (this.options.addOnDrop) {
          const clone = this.options.copy
            ? cloneNodeWithEvents(dragElement, true, true)
            : dragElement;
          this.placeholder.replaceWith(clone);
        }
        else {
          this.removePlaceholder();
        }
      }
      this.dragContainer.dispatchEvent(new CustomEvent('fwDropBase', {
        cancelable: true,
        bubbles: false,
        detail: {
          droppedElement: dragElement,
          droppedIndex,
          dragFromId: sortContainerId,
          dropToId: this.dragContainer.id,
        },
      }));
      this.resetData(e);
    };
    this.dragContainer = container;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.acceptFrom = this.options.acceptFrom
      ? this.options.acceptFrom.split(',')
      : [];
    this.options.sortable && this.acceptFrom.push(this.dragContainer.id);
    this.addListeners();
  }
  addListeners() {
    this.dragContainer.addEventListener('dragstart', this.onDragStart);
    this.dragContainer.addEventListener('dragend', this.onDragEnd);
    this.dragContainer.addEventListener('dragenter', this.onDragEnter);
    this.dragContainer.addEventListener('dragleave', this.onDragLeave);
    this.dragContainer.addEventListener('dragover', this.onDragOver);
    this.dragContainer.addEventListener('drop', this.onDrop);
  }
  removeListeners() {
    this.dragContainer.removeEventListener('dragstart', this.onDragStart);
    this.dragContainer.removeEventListener('dragend', this.onDragEnd);
    this.dragContainer.removeEventListener('dragenter', this.onDragEnter);
    this.dragContainer.removeEventListener('dragleave', this.onDragLeave);
    this.dragContainer.removeEventListener('dragover', this.onDragOver);
    this.dragContainer.removeEventListener('drop', this.onDrop);
  }
  getDragAfterElement(elements, y) {
    return elements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      // Subtracting mouse y position with the middle of the element
      // to check whether the dragging element is above an element
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      }
      else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
  createPlaceholder(sourceElement) {
    const placeholderClass = this.options.placeholderClass;
    const containerTag = this.dragContainer.tagName;
    let placeholder;
    if (['UL', 'OL'].includes(containerTag)) {
      placeholder = document.createElement('li');
    }
    else if (['TABLE', 'TBODY'].includes(containerTag)) {
      placeholder = document.createElement('tr');
      // set colspan to always all rows, otherwise the item can only be dropped in first column
      placeholder.innerHTML = '<td colspan="100"></td>';
    }
    else {
      placeholder = document.createElement('div');
    }
    // set style for the placeholder
    if (typeof placeholderClass === 'string' && placeholderClass) {
      placeholder.classList.add(...placeholderClass.split(' '));
    }
    else {
      placeholder.style.height = this.getElementHeight(sourceElement) + 'px';
      placeholder.style.width = this.getElementWidth(sourceElement) + 'px';
    }
    placeholders.push(placeholder);
    return placeholder;
  }
  removePlaceholder() {
    placeholders.forEach((placeholder) => {
      placeholder.remove();
    });
    // TODO: better way of removing the this.placeholder
  }
  addElement(newElement, nextElement) {
    if (nextElement) {
      if (this.canInsertBefore(nextElement) &&
        !(newElement === null || newElement === void 0 ? void 0 : newElement.isSameNode(nextElement))) {
        this.dragContainer.insertBefore(newElement, nextElement);
      }
      return;
    }
    this.canAppendTo(this.dragContainer) &&
      this.dragContainer.appendChild(newElement);
  }
  canAcceptDragElement() {
    if (!dragElement) {
      return false;
    }
    const sortContainerId = dragElement.parentElement.id;
    return this.acceptFrom.includes(sortContainerId);
  }
  canInsertBefore(element) {
    return element && element.pinned !== 'top';
  }
  canAppendTo(container) {
    return container.lastElementChild.pinned !== 'bottom';
  }
  getHost(element) {
    return element.getRootNode().host;
  }
  getMatchingHost(element, tagName) {
    let matchingElement = element;
    while (matchingElement) {
      matchingElement = this.getHost(matchingElement);
      if (matchingElement && matchingElement.tagName === tagName) {
        return matchingElement;
      }
    }
    return undefined;
  }
  resetData(e) {
    e.dataTransfer.clearData();
    this.previousContainer = undefined;
    dragElement = undefined;
    this.placeholder = undefined;
    this.cancelDebouncedDrag = true;
  }
  getElementHeight(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('You must provide a valid dom element');
    }
    // get calculated style of element
    const style = window.getComputedStyle(element);
    // get only height if element has box-sizing: border-box specified
    if (style.getPropertyValue('box-sizing') === 'border-box') {
      return parseInt(style.getPropertyValue('height'), 10);
    }
    // pick applicable properties, convert to int and reduce by adding
    return ['height', 'padding-top', 'padding-bottom']
      .map(function (key) {
      const int = parseInt(style.getPropertyValue(key), 10);
      return isNaN(int) ? 0 : int;
    })
      .reduce(function (sum, value) {
      return sum + value;
    });
  }
  getElementWidth(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('You must provide a valid dom element');
    }
    // get calculated style of element
    const style = window.getComputedStyle(element);
    // pick applicable properties, convert to int and reduce by adding
    return ['width', 'padding-left', 'padding-right']
      .map(function (key) {
      const int = parseInt(style.getPropertyValue(key), 10);
      return isNaN(int) ? 0 : int;
    })
      .reduce(function (sum, value) {
      return sum + value;
    });
  }
  destroy() {
    this.removeListeners();
  }
}

const dragContainerCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.drag-container{display:block}";

let DragContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwDrop = createEvent(this, "fwDrop", 7);
    /**
     * Id of the fw-sortable element from which draggable content can be accepted. Add comma separated id's for multiple containers.
     */
    this.acceptFrom = '';
    /**
     * Whether the drag element should be added to the container on drop. If set to false, the placeholder will be retained.
     */
    this.addOnDrop = true;
    /**
     * Whether the drag element should be moved or copied.
     */
    this.copy = true;
    /**
     * The class name for the drag/drop placeholder. Add space separated class names for multiple classes
     */
    this.placeholderClass = '';
    /**
     * Whether the list should be sortable.
     */
    this.sortable = true;
  }
  componentWillLoad() {
    this.containerInstance = new Draggable(this.host, {
      acceptFrom: this.acceptFrom,
      addOnDrop: this.addOnDrop,
      copy: this.copy,
      placeholderClass: this.placeholderClass,
      sortable: this.sortable,
    });
    this.host.addEventListener('fwDropBase', this.emitFwDrop.bind(this));
  }
  emitFwDrop(ev) {
    this.fwDrop.emit(ev['detail']);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.containerInstance) === null || _a === void 0 ? void 0 : _a.destroy();
    this.host.removeEventListener('fwDropBase', this.emitFwDrop);
  }
  render() {
    return h(Host, { class: 'drag-container' });
  }
  get host() { return getElement(this); }
};
DragContainer.style = dragContainerCss;

export { DragContainer as fw_drag_container };
