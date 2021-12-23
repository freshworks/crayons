import {
  Component,
  Element,
  Prop,
  h,
  Host,
  EventEmitter,
  Event,
} from '@stencil/core';

@Component({
  tag: 'fw-field-creator',
  styleUrl: 'field-creator.scss',
  shadow: true,
})
export class FieldCreator {
  @Element() host!: HTMLElement;

  private fieldNameInput?: HTMLFwInputElement;

  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) disabled = false;
  /**
   * Property to determine expanded state or collapsed
   */
  @Prop({ mutable: true }) expanded = false;
  /**
   * index attached inside the parent group component
   */
  @Prop() index = -1;
  /**
   * data source used to set and edit the field values
   */
  @Prop() dataProvider = null;
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Triggered when the field is expanded or collapsed
   */
  @Event() fwExpand!: EventEmitter;
  /**
   * Triggered when the field details need to be submitted
   */
  @Event() fwSubmit!: EventEmitter;

  componentWillLoad(): void {
    this.onSubmitFieldHandler = this.onSubmitFieldHandler.bind(this);
    this.onCancelHandler = this.onCancelHandler.bind(this);
    this.onExpandHandler = this.onExpandHandler.bind(this);
    this.onExpandKeyPressHandler = this.onExpandKeyPressHandler.bind(this);
  }

  /**
   * submit handler - submit the changes made to the field and emit the changes
   */
  private onSubmitFieldHandler() {
    this.fwSubmit.emit({
      expanded: false,
      index: this.index,
    });
  }

  /**
   * cancel handler - will remove all the changes made to the field and close the expanded view
   */
  private onCancelHandler() {
    if (this.expanded) {
      this.expanded = false;
      this.fwExpand.emit({
        expanded: false,
        index: this.index,
      });
    }
  }

  /**
   * expand handler - will expand the field for editing
   */
  private onExpandHandler(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.detail && event.detail > 1) {
      return;
    }

    if (!this.expanded) {
      this.expanded = true;
      this.fwExpand.emit({
        expanded: true,
        index: this.index,
      });
    }
  }

  /**
   * key press handler - will remove all the changes made to the field and close the expanded view
   */
  private onExpandKeyPressHandler(event: KeyboardEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (!this.expanded) {
      this.expanded = true;
      this.fwExpand.emit({
        expanded: true,
        index: this.index,
      });
    }
  }

  /**
   * on Blur field name handler
   */
  private onFieldNameChangeHandler() {
    const strUpdateFieldName = this.fieldNameInput.value;
    console.log('----' + strUpdateFieldName);
  }

  // private renderOptional() {
  //   if (!this.dataProvider) {
  //     return null;
  //   }
  //   // const strFieldType = this.dataProvider.type;
  //   // switch (strFieldType) {
  //   //   case "DROPDOWN":
  //   //     return ();
  //   // }
  // }

  /**
   * function to render basic field details
   * @returns {JSX.Element}
   */
  private renderContent() {
    const strBaseClassName = 'fw-field-creator';
    const strInputValue = this.dataProvider ? this.dataProvider.label : '';

    return (
      <div class={`${strBaseClassName}-content-required`}>
        <label class={`${strBaseClassName}-content-required-label`}>
          {'Field Name'}
        </label>
        <fw-input
          class={`${strBaseClassName}-content-required-input`}
          ref={(fieldNameInput) => (this.fieldNameInput = fieldNameInput)}
          placeholder='Enter the name of your lookup field here'
          value={strInputValue}
          onBlur={this.onFieldNameChangeHandler}
        ></fw-input>
        <div class={`${strBaseClassName}-content-checkboxes`}>
          <fw-checkbox
            class={`${strBaseClassName}-content-checkbox-input`}
            value='required'
            checked={false}
          >
            This field is required
          </fw-checkbox>
          <fw-checkbox value='filterable' checked={true}>
            This field is filterable
          </fw-checkbox>
          <fw-checkbox value='unique' checked={false}>
            This field is unique
          </fw-checkbox>
        </div>
      </div>
    );
  }

  render() {
    if (!this.dataProvider) {
      return null;
    }
    const objField = this.dataProvider;
    const strBaseClassName = 'fw-field-creator';
    let strComponentClassName = strBaseClassName;
    if (this.expanded) {
      strComponentClassName += ' ' + strBaseClassName + '--expanded';
    }

    return (
      <Host tabIndex='-1'>
        <div class={strComponentClassName}>
          <div
            role='button'
            class={`${strBaseClassName}-header`}
            onClick={this.onExpandHandler}
            onKeyPress={this.onExpandKeyPressHandler}
            tabIndex={0}
          >
            <span class={`${strBaseClassName}-drag-container`}>
              <fw-icon size={14} name='drag' color='#CFD7DF' />
            </span>
            <span
              class={`${strBaseClassName}-icon-container`}
              style={{
                backgroundColor: objField.field_options.icon_bg_color,
              }}
            >
              <fw-icon
                size={14}
                name={objField.field_options.icon}
                color='#475867'
              />
            </span>
            <label class={`${strBaseClassName}-label`}>{objField.label}</label>
          </div>
          <div class={`${strBaseClassName}-body`}>
            <div class={`${strBaseClassName}-content`}>
              {this.renderContent()}
            </div>
            <div class={`${strBaseClassName}-footer`}>
              <fw-button
                id='clearFieldBtn'
                color='secondary'
                onClick={this.onCancelHandler}
              >
                Cancel
              </fw-button>
              <fw-button
                id='submitFieldBtn'
                color='primary'
                onClick={this.onSubmitFieldHandler}
              >
                Submit
              </fw-button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
