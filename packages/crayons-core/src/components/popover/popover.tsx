import { Component, Element, State, Method, Prop, h } from '@stencil/core';
import { createPopper, Instance } from '@popperjs/core';

@Component({
  tag: 'fw-popover',
  styleUrl: 'popover.scss',
  shadow: true,
})
export class Popover {
  private contentRef: HTMLElement;
  private triggerRef: Element;
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

  @Method()
  async show() {
    if (!this.isOpen) {
      this.sameWidth &&
        (this.contentRef.style.width =
          String(this.triggerRef.getBoundingClientRect().width) + 'px');

      // Create popper instance if it's not available
      !this.popperInstance && this.createPopperInstance();

      this.contentRef.setAttribute('data-show', '');
      // Enable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true },
        ],
      }));
      this.popperInstance.update();
      this.overlay.style.display = 'block';
      this.isOpen = !this.isOpen;
    }
  }

  @Method()
  async hide() {
    if (this.isOpen) {
      this.contentRef.removeAttribute('data-show');
      // Disable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false },
        ],
      }));
      this.overlay.style.display = 'none';
      this.isOpen = !this.isOpen;
    }
  }

  componentDidLoad() {
    this.triggerRef = this.host.querySelector('[slot="popover-trigger"]');
    this.triggerRef.addEventListener('click', () => {
      if (this.isOpen) {
        this.hide();
      } else {
        this.show();
      }
    });
    this.popperOptions = {
      placement: this.placement,
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
    this.popperInstance.destroy();
  }

  createPopperInstance() {
    this.popperInstance = createPopper(
      this.triggerRef,
      this.contentRef,
      this.popperOptions
    );
  }

  render() {
    return [
      <slot name='popover-trigger' />,
      <div
        class='popper-content'
        ref={(contentRef) => (this.contentRef = contentRef)}
      >
        <slot name='popover-content' />
      </div>,
      <div
        aria-hidden='true'
        class='overlay'
        ref={(overlay) => (this.overlay = overlay)}
        onClick={() => this.hide()}
      />,
    ];
  }
}

export type PopoverPlacementType = 'top' | 'bottom' | 'left' | 'right';
