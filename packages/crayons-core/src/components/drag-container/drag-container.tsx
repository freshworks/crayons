import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';
import { Draggable } from '../../utils/draggable';

@Component({
  tag: 'fw-drag-container',
  styleUrl: 'drag-container.scss',
})
export class DragContainer {
  @Element() host: HTMLElement;
  private containerInstance: Draggable;

  /**
   * Id of the fw-sortable element from which draggable content can be accepted. Add comma separated id's for multiple containers.
   */
  @Prop() acceptFrom = '';
  /**
   * Whether the drag element should be added to the container on drop. If set to false, the placeholder will be retained.
   */
  @Prop() addOnDrop = true;
  /**
   * Whether the drag element should be moved or copied.
   */
  @Prop() copy = true;
  /**
   * The class name for the drag/drop placeholder. Add space separated class names for multiple classes
   */
  @Prop() placeholderClass = '';
  /**
   * Whether the list should be sortable.
   */
  @Prop() sortable = true;

  /**
   * Triggered when an draggable item is dropped inside the container.
   */
  @Event() fwDrop: EventEmitter<void>;

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
    this.containerInstance?.destroy();
    this.host.removeEventListener('fwDropBase', this.emitFwDrop);
  }

  render() {
    return <Host class='drag-container'></Host>;
  }
}
