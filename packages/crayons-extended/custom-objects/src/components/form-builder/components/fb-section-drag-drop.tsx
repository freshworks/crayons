import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'fb-section-drag-drop',
  styleUrl: 'fb-section-drag-drop.scss',
  shadow: true,
})
export class FormBuilderSection {
  /*
   * Handler function to create a new section
   */
  @Prop() setSectionsExpandStateHandler;
  /**
   * data source used to set and edit the field values
   */
  @Prop({ mutable: true }) dataProvider = null;

  @State() sectionCreated = true;

  render() {
    return <slot name='sectiondragdrop'></slot>;
  }
}
