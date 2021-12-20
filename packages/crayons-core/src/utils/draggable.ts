import { debounce } from '.';

//Global Variables
let dragElement;
let cancelDebouncedDrag;
const DEFAULT_OPTIONS = {
  sortable: false,
  acceptFrom: '',
  placeholderClass: '',
  copy: true,
  addOnDrop: true,
};
export class Draggable {
  host: HTMLElement;
  options;
  childElements = [];
  acceptFrom = [];
  placeholder: HTMLElement;
  nextSibling: HTMLElement;
  previousContainer;

  debouncedSetElement = debounce(
    (childElements, draggingElement, y) => {
      if (cancelDebouncedDrag) {
        return;
      }
      const afterElement = this.getDragAfterElement(childElements, y);
      let newElement;
      // dragging inside the same container, so no need to add placeholder
      if (
        draggingElement.parentElement.id === this.host.id ||
        !this.options.copy
      ) {
        newElement = draggingElement;
      } else {
        this.placeholder =
          this.placeholder || this.createPlaceholder(draggingElement);
        newElement = this.placeholder;
      }
      // global variable dragElement is set to undefined during drop event.
      // Added the if condition to prevent the debounced function from firing after drop event
      if (dragElement) {
        if (afterElement) {
          this.host.insertBefore(newElement, afterElement);
        } else {
          this.host.appendChild(newElement);
        }
      }
    },
    this,
    5
  );

  constructor(container, options) {
    this.host = container;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.childElements = Array.from(this.host.children);
    this.acceptFrom = this.options.acceptFrom
      ? this.options.acceptFrom.split(',')
      : [];
    this.options.sortable && this.acceptFrom.push(this.host.id);
    this.addListeners();
  }

  private onDragStart = (e) => {
    dragElement = e.target;

    // Set dragElementId for Firefox
    e.dataTransfer.setData('text/plain', dragElement.id);

    // Set all items inside the drag container except the current element
    const draggingElementIndex = this.childElements.indexOf(dragElement);
    this.nextSibling = this.childElements[draggingElementIndex + 1];
    this.childElements.splice(draggingElementIndex, 1);
  };

  private onDragEnter = (e) => {
    const sortContainer = e.composedPath().find((el) => el.id === this.host.id);
    if (sortContainer && sortContainer !== this.previousContainer) {
      // the drag element have entered or re-entered current container(this.host)
      cancelDebouncedDrag = false;
    }
    this.previousContainer = sortContainer;
  };

  private onDragLeave = (e) => {
    const outTarget = e.relatedTarget || e.fromElement;
    if (!e.currentTarget.contains(outTarget)) {
      // the drag element have left the current container(this.host)
      this.previousContainer = undefined;
      cancelDebouncedDrag = true;
      if (dragElement.parentElement.id !== this.host.id) {
        // dragElement from another container
        this.removePlaceholder();
      } else {
        // Sort within the same container
        if (this.nextSibling) {
          this.host.insertBefore(dragElement, this.nextSibling);
        } else {
          this.host.appendChild(dragElement);
        }
      }
    }
  };

  private onDragOver = (e) => {
    e.preventDefault();
    const sortContainerId = dragElement.parentElement.id;
    if (this.acceptFrom.includes(sortContainerId)) {
      this.debouncedSetElement(this.childElements, dragElement, e.clientY);
    }
  };

  // Both dragend and drop need to used as the drop will be fired only on the container on which the drag is dropped
  // and no on the container where drag is originated.
  private onDragEnd = (e) => {
    this.resetData(e);
  };

  private onDrop = (e) => {
    const sortContainerId = dragElement.parentElement.id;
    if (this.acceptFrom.includes(sortContainerId)) {
      let droppedIndex;
      if (this.placeholder) {
        droppedIndex = [...this.host.children].indexOf(this.placeholder);
        if (this.options.addOnDrop) {
          const clone = dragElement.cloneNode(true);
          clone.id = dragElement.id + 'clone';
          this.placeholder.replaceWith(clone);
        }
      } else {
        droppedIndex = [...this.host.children].indexOf(dragElement);
      }
      this.host.dispatchEvent(
        new CustomEvent('fwDropBase', {
          cancelable: true,
          bubbles: false,
          detail: {
            droppedElement: dragElement,
            droppedIndex,
            placeholder: this.placeholder,
          },
        })
      );
      this.resetData(e);
    }
  };

  addListeners() {
    this.host.addEventListener('dragstart', (e) => this.onDragStart(e));
    this.host.addEventListener('dragend', (e) => this.onDragEnd(e));
    this.host.addEventListener('dragenter', (e) => this.onDragEnter(e));
    this.host.addEventListener('dragleave', (e) => this.onDragLeave(e));

    if (this.options.sortable) {
      this.host.addEventListener('dragover', (e) => this.onDragOver(e));
      this.host.addEventListener('drop', (e) => this.onDrop(e));
    }
  }

  removeListeners() {
    this.host.removeEventListener('dragstart', (e) => this.onDragStart(e));
    this.host.removeEventListener('dragend', (e) => this.onDragEnd(e));

    if (this.options.sortable) {
      this.host.removeEventListener('dragover', (e) => this.onDragOver(e));
      this.host.removeEventListener('drop', (e) => this.onDrop(e));
    }
  }

  getDragAfterElement(elements, y) {
    return elements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        // Subtracting mouse y position with the middle of the element
        // to check whether the dragging element is above an element
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  createPlaceholder(sourceElement) {
    const placeholderClass = this.options.placeholderClass;
    const containerTag = this.host.tagName;
    let placeholder;
    if (['UL', 'OL'].includes(containerTag)) {
      placeholder = document.createElement('li');
    } else if (['TABLE', 'TBODY'].includes(containerTag)) {
      placeholder = document.createElement('tr');
      // set colspan to always all rows, otherwise the item can only be dropped in first column
      placeholder.innerHTML = '<td colspan="100"></td>';
    } else {
      placeholder = document.createElement('div');
    }
    // set style for the placeholder
    if (typeof placeholderClass === 'string' && placeholderClass) {
      placeholder.classList.add(...placeholderClass.split(' '));
    } else {
      placeholder.style.height = this.getElementHeight(sourceElement) + 'px';
      placeholder.style.width = this.getElementWidth(sourceElement) + 'px';
    }

    return placeholder;
  }

  removePlaceholder(element?) {
    const removeElement = element || this.placeholder;
    this.host.contains(removeElement) && this.host.removeChild(removeElement);
  }

  resetData(e) {
    e.dataTransfer.clearData();
    this.childElements = Array.from(this.host.children);
    dragElement = undefined;
    this.placeholder = undefined;
    cancelDebouncedDrag = true;
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
