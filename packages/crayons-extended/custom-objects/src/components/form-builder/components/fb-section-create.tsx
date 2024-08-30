import { Component, h, Prop, EventEmitter, Event, State } from '@stencil/core';
import { TranslationController } from '../../../global/Translation';
import { getMaxLimitProperty, i18nText } from '../utils/form-builder-utils';

@Component({
  tag: 'fb-section-create',
  styleUrl: 'fb-section-create.scss',
  shadow: true,
})
export class FormBuilderSection {
  /*
   * Handler function to create a new section
   */
  @Prop() showCreateOrEditSectionPane;
  /**
   * data source used to set and edit the field values
   */
  @Prop({ mutable: true }) dataProvider = null;
  /*
   * List of field options
   */
  @Prop() fieldChoices;
  /**
   * The db type used to determine the json to be used for CUSTOM_OBJECTS or CONVERSATION_PROPERTIES
   */
  @Prop() productName = 'CUSTOM_OBJECTS';
  /*
   * Name of the section
   */
  @Prop({ mutable: true }) sectionName = '';
  /*
   * Choosen field value for a section
   */
  @Prop({ mutable: true }) selectedFieldValue;
  /*
   * Flag to show section pane in edit mode
   */
  @Prop() isEditing;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;
  /*
   * Section name field error state
   */
  @State() sectionInputState;
  /*
   * Previously selected choice value while in edit mode
   */
  @State() previousSelectedValue;
  /**
   * State to show section input warning message
   */
  @State() sectionWarningMessage = '';
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
    this.sectionWarningMessage = '';
    this.sectionInputState = '';
    if (strInputText) {
      this.sectionName = strInputText;
      const objMaxLimitField = getMaxLimitProperty(
        this.productName,
        'maxLabelChars'
      );
      if (objMaxLimitField && strInputText.length >= objMaxLimitField.count) {
        this.sectionInputState = 'warning';
        this.sectionWarningMessage = i18nText(objMaxLimitField.message, {
          count: objMaxLimitField.count,
        });
      } else {
        this.sectionWarningMessage = '';
      }
    } else {
      this.sectionName = '';
    }
  }

  private fieldValueChangeHandler(event: CustomEvent) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const selectedValue = event.detail.value;
    if (selectedValue) {
      if (this.isEditing) {
        this.previousSelectedValue = this.selectedFieldValue;
      }
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
    const detail = {
      sectionName: this.sectionName,
      selectedFieldValue: this.selectedFieldValue,
      value: { ...this.dataProvider },
      index: this.index,
    };

    if (this.isEditing) {
      detail['editSection'] = true;
      detail['previousSelectedValue'] = this.previousSelectedValue;
    } else {
      detail['sectionCreation'] = true;
    }

    this.fwUpdate.emit(detail);
    this.showCreateOrEditSectionPane(false);
  }

  componentWillLoad() {
    if (this.isEditing) {
      this.previousSelectedValue = this.selectedFieldValue;
    } else {
      this.selectedFieldValue = this.fieldChoices[0].text;
      this.sectionExpandHandler(true);
    }
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
              value={this.sectionName}
              warningText={this.sectionWarningMessage}
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
              this.showCreateOrEditSectionPane(false);
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
