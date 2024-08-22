import { Component, h, Prop, EventEmitter, Event, State } from '@stencil/core';
import { TranslationController } from '../../../global/Translation';

@Component({
  tag: 'fb-section-create',
  styleUrl: 'fb-section-create.scss',
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
  /*
   * List of field options
   */
  @Prop() fieldChoices;
  /*
   * Name of the section
   */
  @State() sectionName;
  /*
   * Choosen field value for a section
   */
  @State() selectedFieldValue;
  /*
   * Section name field error state
   */
  @State() sectionInputState;
  /**
   * Triggered when the section is expanded or collapsed
   */
  @Event() fwExpand!: EventEmitter;
  /**
   * Triggered when the section details need to be saved on the server
   */
  @Event() fwUpdate!: EventEmitter;

  private sectionExpandHandler(expanded) {
    const sectionKey = 'sectionCreate';
    this.fwExpand.emit({
      expanded: expanded,
      index: sectionKey,
      value: { id: sectionKey },
    });
  }

  private sectionNameChangeHandler(event: CustomEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const strInputText = event?.detail?.value?.trim() || '';
    if (strInputText) {
      this.sectionInputState = '';
      this.sectionName = strInputText;
    }
  }

  private fieldValueChangeHandler(event: CustomEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const selectedValue = event.detail.value;
    if (selectedValue) {
      this.selectedFieldValue = selectedValue;
    }
  }

  private sectionEditOrSave(event: CustomEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (!this.sectionName) {
      this.sectionInputState = 'error';
      return;
    }
    const value = { ...this.dataProvider };
    this.fwUpdate.emit({
      sectionCreation: true,
      sectionName: this.sectionName,
      selectedFieldValue: this.selectedFieldValue,
      value,
    });
    this.setSectionsExpandStateHandler(true, false);
  }

  componentWillLoad() {
    this.selectedFieldValue = this.fieldChoices[0].text;
    this.sectionExpandHandler(true);
  }

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
            {' '}
            <fw-input
              label='Name'
              placeholder='Section Name'
              class='fb-section-content-name'
              onFwInput={this.sectionNameChangeHandler.bind(this)}
              errorText={TranslationController.t(
                'formBuilder.sections.sectionNameEmpty'
              )}
              state={this.sectionInputState}
            ></fw-input>
            <div class='fb-section-content-divider'></div>
            <fw-select
              class='fb-section-content-value'
              label='Show section if Type is'
              value={this.selectedFieldValue}
              options={this.fieldChoices}
              onFwChange={this.fieldValueChangeHandler.bind(this)}
            ></fw-select>{' '}
          </div>
        </div>
        <footer>
          <fw-button
            color='primary'
            onFwClick={this.sectionEditOrSave.bind(this)}
          >
            {' '}
            {TranslationController.t('formBuilder.sections.save')}{' '}
          </fw-button>
          <fw-button
            color='secondary'
            onFwClick={() => {
              this.setSectionsExpandStateHandler(true, false);
              this.sectionExpandHandler(false);
            }}
          >
            {' '}
            {TranslationController.t('formBuilder.sections.cancel')}{' '}
          </fw-button>
        </footer>
      </section>
    );
  }
}
