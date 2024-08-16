import { Component, h, Prop, State } from '@stencil/core';
import { TranslationController } from '../../../global/Translation';

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
    const options = this.dataProvider.choices.map((choice) => {
      return { text: choice.value, value: choice.value };
    });
    return (
      <section class='fb-section'>
        <header>
          <h4 class='fb-section-add'>
            {TranslationController.t('formBuilder.sections.new')}
          </h4>
          {/* <fw-button color='link'>
            {TranslationController.t(
              'formBuilder.fieldTypeRelationshipDescLinkLabel'
            )}
          </fw-button> */}
        </header>
        <div class='fb-section-content'>
          {this.sectionCreated && <slot name='sectiondragdrop'></slot>}
        </div>
      </section>
    );
  }
}
