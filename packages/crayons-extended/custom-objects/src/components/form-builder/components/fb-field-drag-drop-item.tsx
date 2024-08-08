import { Component, Prop, h, Host, State } from '@stencil/core';
import { TranslationController } from '../../../global/Translation';

@Component({
  tag: 'fb-field-drag-drop-item',
  styleUrl: 'fb-field-drag-drop-item.scss',
  shadow: true,
})
export class FormBuilderFieldDragDropItem {
  @Prop() fieldElement = null;

  @State() sectionsExpanded = true;

  render() {
    return (
      <Host tabIndex='-1'>
        {this.fieldElement}
        <section class='fb-section-container'>
          <div class='fb-section-visibility'>
            {this.sectionsExpanded ? (
              <span class='fb-section-hide'>
                {TranslationController.t('formBuilder.sections.hide')}
              </span>
            ) : (
              <span class='fb-section-show'>
                {TranslationController.t('formBuilder.sections.show')}
              </span>
            )}
            <i class='fb-section-count'>1</i>
            <fw-icon class='fb-section-' name='chevron-up'></fw-icon>
          </div>
        </section>
      </Host>
    );
  }
}
