export class Sort {
  host: HTMLElement;
  dragElement: HTMLElement;
  siblingElement: HTMLElement;
  childElements = [];
  cancelDrop: boolean;

  constructor(container: HTMLElement) {
    this.host = container;
    this.cancelDrop = true;

    this.host.addEventListener('dragstart', this.onDragStart);
    this.host.addEventListener('dragover', this.onDragOver);
    this.host.addEventListener('dragend', this.onDragEnd);
    this.host.addEventListener('drop', this.onDrop);
  }

  private onDragStart = (e) => {
    this.dragElement = e.target;
    this.siblingElement = e.target.nextElementSibling;
    this.dragElement.classList.add('dragging');
    // setting the child elements for the host except the current selected element
    this.childElements = Array.from(this.host.children);
    const draggingElementIndex = this.childElements.indexOf(this.dragElement);
    this.childElements.splice(draggingElementIndex, 1);
  };

  private onDragOver = (e) => {
    e.preventDefault();
    const afterElement = this.getDragAfterElement(
      this.childElements,
      e.clientY
    );
    if (afterElement) {
      this.host.insertBefore(this.dragElement, afterElement);
    } else {
      this.host.appendChild(this.dragElement);
    }
  };

  private onDragEnd = () => {
    if (this.cancelDrop) {
      this.host.insertBefore(this.dragElement, this.siblingElement);
    }
    this.dragElement.classList.remove('dragging');
    this.cancelDrop = true;
  };

  private onDrop = () => {
    // This event won't be triggered if the user releases the dragElement outside the fw-sortable
    this.cancelDrop = false;
  };

  getDragAfterElement(elements, y): HTMLElement {
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

  destroy() {
    this.host.removeEventListener('dragstart', this.onDragStart);
    this.host.removeEventListener('dragover', this.onDragOver);
    this.host.removeEventListener('dragend', this.onDragEnd);
    this.host.removeEventListener('drop', this.onDrop);
  }
}
