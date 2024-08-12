import { Component, h } from '@stencil/core';
import { TranslationController } from '../../../global/Translation';

@Component({
  tag: 'fb-section',
  styleUrl: 'fb-section.scss',
  shadow: true,
})
export class FormBuilderSection {
  render() {
    return (
      <section class='fb-section'>
        <header>
          <h4 class='fb-section-add'>
            {TranslationController.t('formBuilder.sections.new')}
          </h4>
          <p class='fb-section-description'>
            <span>
              {TranslationController.t(
                'formBuilder.sections.sectionDescription'
              )}
            </span>
            <fw-button color='link'>
              {TranslationController.t(
                'formBuilder.fieldTypeRelationshipDescLinkLabel'
              )}
            </fw-button>
          </p>
        </header>
        <div class='fb-section-content'>
          <div class='fb-section-content-create'>
            <fw-input
              label='Name'
              placeholder='Section Name'
              class='fb-section-content-name'
            ></fw-input>
            <div class='fb-section-content-divider'></div>
            <fw-select
              class='fb-section-content-value'
              label='Show section if Type is'
              value='1'
            ></fw-select>
          </div>
        </div>
        <footer>
          <fw-button color='primary'>
            {' '}
            {TranslationController.t('formBuilder.sections.next')}{' '}
          </fw-button>
          <fw-button color='secondary'>
            {' '}
            {TranslationController.t('formBuilder.sections.cancel')}{' '}
          </fw-button>
        </footer>
      </section>
    );
  }
}
