import { Component, Prop, h } from '@stencil/core';
import { handleKeyDown } from '../../utils';

const ChevronArrow = ({ expanded }) => {
  const iconSize = 14;
  const direction = expanded ? 'up' : 'down';
  const iconColor = expanded ? '#2C5CC5' : '#264966';

  return (
    <fw-icon
      class='accordion-icon'
      name={`chevron-${direction}`}
      size={iconSize}
      color={iconColor}
    >
      {' '}
    </fw-icon>
  );
};
@Component({
  tag: 'fw-accordion-title',
  styleUrl: 'accordion-title.scss',
})
export class AccordionTitle {
  @Prop() bold = true;

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
   * render the slot content directly
   * @returns {JSX.Element}
   */
  render(): JSX.Element {
    return (
      <div
        class={{ 'accordion-header': true, 'collapsed': !this.expanded }}
        role='button'
        tabindex='0'
        onKeyDown={handleKeyDown(this.toggleState)}
        onClick={this.toggleState}
      >
        <div class={{ 'accordion-title': true, 'bold': this.bold }}>
          <slot></slot>
        </div>
        <ChevronArrow expanded={this.expanded} />
      </div>
    );
  }
}
