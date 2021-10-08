import {
    Component,
    Element,
    State,
    Method,
    Prop,
    h,
  } from '@stencil/core';
  import { createPopper, Instance } from '@popperjs/core';

  @Component({
    tag: 'fw-popover',
    styleUrl: 'popover.scss',
    shadow: true,
  })
  export class Popover {

    private content: HTMLElement;

    @Element() host: HTMLElement;

    @State() popperInstance: Instance;
    @State() isOpen: Boolean = false;
    @State() popperOptions: any;

    /**
     * The reference of the parent element to which the popup should be attached.
     */
    @Prop() parentRef: HTMLElement;
    /**
     * Placement of the popover with respect to the parent element (parentRef).
     */
    @Prop() placement: PopoverPlacementType = "bottom";
    /**
     * Alternative placement for popover if the default placement is not possible.
     */
     @Prop() fallbackPlacements: [PopoverPlacementType] = ['top'];
    /**
     * The area that the popup will be checked for overflow relative to.
     */
     @Prop() boundary: HTMLElement;
     /**
     * Skidding defines the distance between the parentRef and the popover along x-axis.
     */
    @Prop() skidding: number = 0;
    /**
     * Distance defines the distance between the parentRef and the popover along y-axis.
     */
    @Prop() distance: number = 0;

    
    @Method()
    async show() {
        if(!this.isOpen){
            this.popperInstance = createPopper(this.parentRef, this.content, this.popperOptions);
            this.content.setAttribute('data-show', '');
            this.popperInstance.update();
        }
    }
      
    @Method()
    async hide() {
        this.content.removeAttribute('data-show');
        this.popperInstance.destroy();
    }
  
    componentDidLoad() {
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
              boundary : this.boundary || "clippingParents",
            },
          },
          {
            name: 'offset',
            options: {
              offset: [this.skidding, this.distance],
            },
          },
        ],
      }
    }
  
    render() {
      return (
        <div class="popper" ref={(content) => (this.content = content)}>
            <slot />
        </div>
      );
    }
  }

  export type PopoverPlacementType = 'top' | 'bottom' | 'left' | 'right';
  