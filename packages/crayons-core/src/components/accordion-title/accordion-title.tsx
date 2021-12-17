import { Component, Prop, Element, h } from '@stencil/core';
import { handleKeyDown } from '../../utils';

const ChevronArrow = ({ expanded }) => {
  const iconSize = 14;
  const direction = expanded ? 'up' : 'down';

  return (
    <fw-icon
      class='accordion-icon'
      name={`chevron-${direction}`}
      size={iconSize}
      library='system'
    />
  );
};

@Component({
  tag: 'fw-accordion-title',
  styleUrl: 'accordion-title.scss',
  shadow: true,
})
export class AccordionTitle {
  @Element() el: HTMLFwAccordionTitleElement;

  /**
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @Prop() toggleState: any = () => {};

  /**
   * @internal
   */
  @Prop() expanded = true;

  /**
   * @internal
   */
  @Prop() type: 'default' | 'no_bounding_box' = 'default';

  /**
   * Truncate title on text overflow
   */
  @Prop() truncateOnOverflow = true;

  expandedIcon: HTMLElement;
  collapsedIcon: HTMLElement;

  componentWillLoad() {
    this.expandedIcon = this.el.querySelector('[slot="expanded-icon"');
    this.collapsedIcon = this.el.querySelector('[slot="collapsed-icon"');
  }

  /**
   * render the slot content directly
   * @returns {JSX.Element}
   */
  render(): JSX.Element {
    return (
      <div
        class={{
          'accordion-header': true,
          'collapsed': !this.expanded,
          'no-bounding-box': this.type === 'no_bounding_box',
        }}
        role='button'
        tabindex='0'
        onKeyDown={handleKeyDown(this.toggleState)}
        onClick={this.toggleState}
        aria-expanded={this.expanded.toString()}
      >
        <div
          class={{
            'accordion-title': true,
            'truncate': this.truncateOnOverflow,
          }}
        >
          <slot></slot>
        </div>
        {this.expandedIcon && this.collapsedIcon ? (
          <div class='accordion-icon'>
            <slot name={this.expanded ? 'expanded-icon' : 'collapsed-icon'} />
          </div>
        ) : (
          <ChevronArrow expanded={this.expanded} />
        )}
      </div>
    );
  }
}
