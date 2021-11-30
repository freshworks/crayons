import {
  Component,
  Element,
  Listen,
  State,
  Event,
  EventEmitter,
  Method,
  Prop,
  h,
} from '@stencil/core';
import { createPopper, Instance } from '@popperjs/core';
import { PopoverPlacementType, PopoverTriggerType } from '../../utils/types';

@Component({
  tag: 'fw-popover',
  styleUrl: 'popover.scss',
  shadow: true,
})
export class Popover {
  private popperDiv: HTMLElement;
  private contentRef: HTMLFwListOptionsElement | HTMLElement;
  private triggerRef: any;
  private triggerRefSlot: any = null;
  private escapeHandler: any = null;
  private overlay: HTMLElement;

  @Element() host: HTMLElement;

  @State() popperInstance: Instance;
  @State() isOpen = false;
  @State() popperOptions;

  /**
   * Placement of the popover content with respect to the popover trigger.
   */
  @Prop() placement: PopoverPlacementType = 'bottom';
  /**
   * Alternative placement for popover if the default placement is not possible.
   */
  @Prop() fallbackPlacements: [PopoverPlacementType] = ['top'];
  /**
   * The area that the popup will be checked for overflow relative to.
   */
  @Prop() boundary: HTMLElement;
  /**
   * Skidding defines the distance between the popover trigger and the popover content along x-axis.
   */
  @Prop() skidding = '0';
  /**
   * Distance defines the distance between the popover trigger and the popover content along y-axis.
   */
  @Prop() distance = '0';
  /**
   * Variant defines the style of the popover-content.
   */
  @Prop() variant: 'select' | 'date-picker' = 'select';
  /**
   * Whether the popover-content width to be same as that of the popover-trigger.
   */
  @Prop() sameWidth = true;
  /**
   * The trigger event on which the popover-content is displayed. The available options are
   * 'click' | 'manual' | 'hover', in case of 'manual' no trigger event will be set.
   */
  @Prop() trigger: PopoverTriggerType = 'click';
  /**
   * Option to determine if popover-content has a border.
   */
  @Prop() hasBorder = true;
  /**
   * Option to prevent the tooltip from being clipped when the component is placed inside a container with
   * `overflow: auto|hidden|scroll`.
   */
  @Prop() hoist = false;
  /**
   * Option to disable the popover animation on hide and show.
   */
  @Prop() disableTransition = false;
  /**
   * Triggered whenever the popover contents is open/displayed.
   */
  @Event() fwShow: EventEmitter;
  /**
   * Triggered whenever the popover contents is closed/hidden.
   */
  @Event() fwHide: EventEmitter;

  @Listen('keydown')
  onKeyDown(ev) {
    switch (ev.key) {
      case 'Escape':
        this.hide();
        break;
    }
  }

  @Method()
  async show() {
    if (!this.isOpen) {
      this.sameWidth &&
        (this.popperDiv.style.width =
          String(this.triggerRef.getBoundingClientRect().width) + 'px');

      // Create popper instance if it's not available
      !this.popperInstance && this.createPopperInstance();

      this.popperDiv.setAttribute('data-show', '');
      // Enable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      }));
      this.popperInstance.update();
      if (this.trigger !== 'hover') {
        this.overlay.style.display = 'block';
      }
      this.escapeHandler = ((e: any) => {
        if (e.keyCode === 27) {
          this.hide();
        }
      }).bind(this);
      document.addEventListener('keydown', this.escapeHandler);
      this.isOpen = !this.isOpen;
      if (this.contentRef?.tagName === 'FW-LIST-OPTIONS') {
        const listOptionsElement = this.contentRef as HTMLFwListOptionsElement;
        listOptionsElement.openHandler();
      }
      this.fwShow.emit();
    }
  }

  @Method()
  async hide() {
    if (this.isOpen) {
      this.popperDiv.removeAttribute('data-show');
      // Disable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false },
        ],
      }));
      if (this.trigger !== 'hover') {
        this.overlay.style.display = 'none';
      }
      if (this.escapeHandler) {
        document.removeEventListener('keydown', this.escapeHandler);
        this.escapeHandler = null;
      }
      this.isOpen = !this.isOpen;
      if (this.contentRef?.tagName === 'FW-LIST-OPTIONS') {
        const listOptionsElement = this.contentRef as HTMLFwListOptionsElement;
        listOptionsElement.closeHandler();
      }
      this.fwHide.emit();
    }
  }

  componentWillLoad() {
    this.contentRef = this.host.querySelector('[slot="popover-content"]');
    this.triggerRef = this.host.querySelector('[slot="popover-trigger"]');
    if (this.triggerRef.nodeName === 'SLOT') {
      const assignedElements = this.triggerRef.assignedElements();
      if (assignedElements.length) {
        this.triggerRefSlot = assignedElements[0];
      }
    }
    if (this.trigger === 'click') {
      this.triggerRef.addEventListener(this.trigger, () => {
        if (this.isOpen) {
          this.hide();
        } else {
          this.show();
        }
      });
    } else if (this.trigger === 'hover') {
      const trigger = this.triggerRefSlot || this.triggerRef;
      trigger.addEventListener('focus', this.show.bind(this));
      trigger.addEventListener('blur', this.hide.bind(this));
      trigger.addEventListener('mouseenter', this.show.bind(this));
      trigger.addEventListener('mouseleave', (event: any) => {
        /**
         * popovercontent might trigger mouseLeave callback of triggerRef during transition.
         * This condition avoids flicker that might happen because of the mentioned case.
         */
        if (!event.relatedTarget.matches('*[slot="popover-content"]')) {
          this.hide();
        }
      });
    }
    this.popperOptions = {
      placement: this.placement,
      strategy: this.hoist ? 'fixed' : 'absolute',
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: this.fallbackPlacements,
          },
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: this.boundary || 'clippingParents',
          },
        },
        {
          name: 'offset',
          options: {
            offset: [Number(this.skidding), Number(this.distance)],
          },
        },
      ],
    };
  }

  disconnectedCallback() {
    this.popperInstance?.destroy();
  }

  createPopperInstance() {
    const triggerRef = this.triggerRefSlot || this.triggerRef;
    this.popperInstance = createPopper(
      triggerRef,
      this.popperDiv,
      this.popperOptions
    );
  }

  render() {
    return [
      <slot name='popover-trigger' />,
      <div
        class={{
          'popper-content': true,
          'no-border': !this.hasBorder,
          'no-transition': this.disableTransition,
        }}
        ref={(popperDiv) => (this.popperDiv = popperDiv)}
      >
        <slot name='popover-content' />
      </div>,
      this.trigger !== 'hover' && (
        <div
          aria-hidden='true'
          class='overlay'
          ref={(overlay) => (this.overlay = overlay)}
          onClick={() => this.hide()}
        />
      ),
    ];
  }
}
