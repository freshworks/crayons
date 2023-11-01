import {
  Component,
  Element,
  Prop,
  h,
  Host,
  EventEmitter,
  Event,
  Method,
  Watch,
  State,
} from '@stencil/core';
import {
  createUUID,
  deepCloneObject,
  getMaxLimitProperty,
  hasCustomProperty,
  i18nText,
} from '../utils/form-builder-utils';

@Component({
  tag: 'fw-fb-field-dependent',
  styleUrl: 'fb-field-dependent.scss',
  shadow: true,
})
export class FbFieldDependent {
  private errorType = '';

  @Element() host!: HTMLElement;
  @State() boolExceededChoiceLimit = false;

  /**
   * The db type used to determine the json to be used for CUSTOM_OBJECTS or CONVERSATION_PROPERTIES
   */
  @Prop() productName = 'CUSTOM_OBJECTS';
  /**
   * flag to notify if an api call is in progress
   */
  @Prop({ mutable: true }) isLoading = false;
  /**
   * variable to store the data source for all the choices
   */
  @Prop({ mutable: true }) dataProvider = null;
  /**
   * property to show the errors on click of the save/add button from the parent
   */
  @Prop({ mutable: true }) showErrors = false;
  /**
   * Disables all the options which can't be edited, reordered or deleted if set to true.
   */
  @Prop() disabled = false;
  /**
   * Triggered on data change for error handling on parent
   */
  @Event() fwChange!: EventEmitter;

  @Method()
  async validateErrors(): Promise<any> {
    this.validate();
  }

  @Watch('showErrors')
  watchShowErrorsChangeHandler(): void {
    this.validate();
  }

  componentWillLoad(): void {
    this.validate();
    if (this.errorType && this.errorType !== '') {
      this.fwChange.emit({
        type: 'VALUE_CHANGE',
        errorType: this.errorType,
        value: [...this.dataProvider],
      });
    }
  }

  private validate = () => {
    if (this.dataProvider && this.dataProvider.length > 0) {
      this.errorType = '';
      const strDuplicateErrorKey = i18nText('errors.duplicate');
      const arrChoices = deepCloneObject(this.dataProvider);
      let boolElementUpdated = false;
      const arrLookup = [];

      arrChoices.map((el) => {
        const strValue = el.value;

        if (!strValue || strValue === '') {
          this.errorType = i18nText('errors.formErrors');
          el.error = i18nText('errors.emptyChoice');
          boolElementUpdated = true;
        } else if (arrLookup.includes(strValue)) {
          this.errorType = strDuplicateErrorKey;
          el.error = strDuplicateErrorKey;
          boolElementUpdated = true;
        } else {
          if (hasCustomProperty(el, 'error')) {
            delete el.error;
            boolElementUpdated = true;
          }
          arrLookup.push(strValue);
        }
      });

      if (boolElementUpdated) {
        this.dataProvider = [...arrChoices];
      }
      this.validateMaximumChoiceLimits();
    } else {
      this.errorType = i18nText('errors.minimum');
    }
  };

  private validateMaximumChoiceLimits = () => {
    const objMaxLimitChoices = getMaxLimitProperty(
      this.productName,
      'maxDropdownChoices'
    );
    this.boolExceededChoiceLimit =
      this.dataProvider && this.dataProvider.length >= objMaxLimitChoices.count
        ? true
        : false;
  };

  private addNewChoiceHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();

    const objNewChoice = { value: '' };
    this.dataProvider = [...this.dataProvider, objNewChoice];
    this.errorType = i18nText('errors.emptyChoice');
    this.validateMaximumChoiceLimits();

    this.fwChange.emit({
      type: 'ADD',
      errorType: this.errorType,
      value: [...this.dataProvider],
    });
  };

  private deleteItemHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }

    const intDeleteIndex = event.detail.index;
    const isNewChoice = event.detail.isNewChoice;
    if (
      intDeleteIndex > -1 &&
      this.dataProvider &&
      intDeleteIndex < this.dataProvider.length
    ) {
      this.dataProvider = [
        ...this.dataProvider.slice(0, intDeleteIndex),
        ...this.dataProvider.slice(intDeleteIndex + 1),
      ];

      this.validate();
      if (!isNewChoice && (!this.errorType || this.errorType === '')) {
        this.errorType = i18nText('errors.deleteDropDownChoice');
      }
      this.fwChange.emit({
        type: 'DELETE',
        errorType: this.errorType,
        value: [...this.dataProvider],
      });
    }
  };

  /**
   * function to validate errors on name input field blur
   */
  private choiceValueChangeHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }

    const intIndex = event.detail.index;
    const strValue = event.detail.value;

    if (strValue === '') {
      this.dataProvider[intIndex].error = i18nText('errors.emptyChoice');
    }
    this.dataProvider[intIndex].value = strValue;
    this.validate();

    this.fwChange.emit({
      type: 'VALUE_CHANGE',
      errorType: this.errorType,
      value: [...this.dataProvider],
    });
  };

  /**
   * function to reposition the index of the dropped element
   */
  private elementDropHandler = (event: CustomEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    if (this.disabled) {
      return;
    }

    const objDetail = event.detail;
    const elFieldType = objDetail.droppedElement;
    const intDroppedIndex = objDetail.droppedIndex;

    if (
      objDetail.dragFromId === objDetail.dropToId &&
      elFieldType.index !== intDroppedIndex
    ) {
      const arrFields = [...this.dataProvider];
      const objField = arrFields.splice(elFieldType.index, 1)[0];
      arrFields.splice(intDroppedIndex, 0, objField);
      const intLength = arrFields.length;
      for (let i1 = intDroppedIndex; i1 < intLength; i1++) {
        // Fix for drag container to re-render on drop to change the key
        arrFields[i1].repositionKey = createUUID();
      }
      this.dataProvider = [...arrFields];
      this.fwChange.emit({
        type: 'REPOSITION',
        errorType: this.errorType,
        value: [...this.dataProvider],
      });
    }
  };

  private renderNameEditorElement(dataItem, intIndex) {
    const hasRepositionIndex = hasCustomProperty(dataItem, 'repositionKey');
    const boolNewChoice = !hasCustomProperty(dataItem, 'id');
    const itemKey = hasRepositionIndex
      ? dataItem.repositionKey
      : `new_choice_${intIndex + 1}`;

    return (
      <fw-fb-field-dropdown-item
        key={itemKey}
        index={intIndex}
        dataProvider={dataItem}
        isNewChoice={boolNewChoice}
        disabled={this.disabled}
        isLoading={this.isLoading}
        showErrors={this.showErrors}
        onFwChange={this.choiceValueChangeHandler}
        onFwDelete={this.deleteItemHandler}
      ></fw-fb-field-dropdown-item>
    );
  }

  render() {
    const dpSource = this.dataProvider;
    const strBaseClassName = 'fb-field-dropdown';

    const dropdownElements =
      dpSource.length > 0
        ? dpSource.map((dataItem, index) =>
            this.renderNameEditorElement(dataItem, index)
          )
        : null;

    const objMaxLimitChoices = getMaxLimitProperty(
      this.productName,
      'maxDropdownChoices'
    );
    const strExceedLimitChoicesWarning = this.boolExceededChoiceLimit
      ? i18nText(objMaxLimitChoices.message, {
          count: objMaxLimitChoices.count,
        })
      : '';

    return (
      <Host tabIndex='-1'>
        <div class={strBaseClassName}>
          <label class={`${strBaseClassName}-label`}>
            {i18nText('addChoices')}
          </label>
          <fw-drag-container
            id='dropdownElementsList'
            class={`${strBaseClassName}-list-container`}
            sortable={true}
            onFwDrop={this.elementDropHandler}
          >
            {dropdownElements}
          </fw-drag-container>
          <div class={`${strBaseClassName}-footer`}>
            {!this.disabled && (
              <fw-button
                id='addNewChoiceBtn'
                color='link'
                disabled={this.boolExceededChoiceLimit}
                onFwClick={this.addNewChoiceHandler}
              >
                {i18nText('addChoice')}
              </fw-button>
            )}
            {this.boolExceededChoiceLimit && (
              <label class={`${strBaseClassName}-warning-text`}>
                {strExceedLimitChoicesWarning}
              </label>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
