/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Component,
  Event,
  Element,
  EventEmitter,
  Prop,
  h,
  Host,
  State,
  Method,
} from '@stencil/core';

@Component({
  tag: 'fw-fb-basic-details',
  styleUrl: 'fb-basic-details.scss',
  shadow: true,
})
export class FbBasicDetails {
  @Element() host!: HTMLElement;

  /**
   * variable to store form values
   */
  @Prop({ mutable: true }) formValues = null;
  /**
   * Prop to determine if the basic form is created
   */
  @Prop({ mutable: true }) isFormCreated = false;
  /**
   * json data input to render the form builder
   */
  @Prop() jsonPreset;
  /**
   * State to show the error message
   */
  @State() showNameError = false;
  /**
   * State to check the form creating status
   */
  @State() isEntityCreationInProgress = false;
  /**
   * Triggered on create button click
   */
  @Event() fwCreate!: EventEmitter;
  /**
   * Triggered on cancel button click
   */
  @Event() fwCancel!: EventEmitter<void>;

  // public method to show the error message
  @Method()
  async setFormCreated(value: boolean): Promise<void> {
    this.isEntityCreationInProgress = false;
    if (value) {
      this.showNameError = false;
    }
  }

  componentWillLoad(): void {
    if (!this.formValues) {
      this.formValues = { name: '', description: '', icon: '' };
    }
    this.createHandler = this.createHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.descBlurHandler = this.descBlurHandler.bind(this);
    this.nameBlurHandler = this.nameBlurHandler.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.iconSelectHandler = this.iconSelectHandler.bind(this);
  }

  private isNewForm() {
    if (
      this.formValues &&
      Object.prototype.hasOwnProperty.call(this.formValues, 'name') &&
      this.formValues.name !== ''
    ) {
      return false;
    }
    return true;
  }

  private createHandler(): void {
    if (!this.formValues || this.formValues.name === '') {
      this.showNameError = true;
      return;
    }
    this.isEntityCreationInProgress = true;
    this.showNameError = false;
    this.fwCreate.emit({
      value: { ...this.formValues },
    });
  }

  private cancelHandler(): void {
    this.fwCancel.emit();
  }

  private updateFormValue(strProperty, strUpdateValue) {
    if (strUpdateValue !== this.formValues[strProperty]) {
      this.formValues[strProperty] = strUpdateValue;

      if (strProperty === 'name' && strUpdateValue !== '') {
        this.showNameError = false;
      }
    }
  }

  private nameChangeHandler(event: CustomEvent): void {
    event.stopImmediatePropagation();
    event.stopPropagation();

    const strUpdateValue = event.detail.value.trim();
    this.updateFormValue('name', strUpdateValue);
  }

  private nameBlurHandler(event: CustomEvent): void {
    event.stopImmediatePropagation();
    event.stopPropagation();

    const strUpdateValue = event.detail.value.trim();
    this.updateFormValue('name', strUpdateValue);
  }

  private descBlurHandler(event: CustomEvent): void {
    const strUpdateValue = event.detail.value.trim();
    this.updateFormValue('description', strUpdateValue);
  }

  private iconSelectHandler(event: CustomEvent): void {
    this.updateFormValue('icon', event.detail.value);
  }

  /**
   * function to render icon buttons for Toggle group
   */
  private renderToggleIconElement(dataItem, intIndex) {
    return (
      <fw-toggle-group-button
        index={intIndex}
        key={dataItem.key}
        icon-name={dataItem.name}
        value={dataItem.name}
        type='icon'
      ></fw-toggle-group-button>
    );
  }

  render() {
    if (!this.jsonPreset) {
      return null;
    }
    const strBaseClassName = 'fb-basic-details';
    const objSchema = this.jsonPreset;
    const arrIcons = objSchema.iconSet;
    const boolNewForm = this.isNewForm();
    const strCreateBtnLabel =
      boolNewForm || !this.isFormCreated ? 'Create' : 'Update';

    const iconGroupItems =
      arrIcons && arrIcons.length > 0
        ? arrIcons.map((dataItem, index) =>
            this.renderToggleIconElement(dataItem, index)
          )
        : null;

    return (
      <Host tabIndex='-1'>
        <div class={strBaseClassName}>
          <div class={`${strBaseClassName}-content`}>
            <div class={`${strBaseClassName}-name-div`}>
              <fw-input
                class={`${strBaseClassName}-name-input`}
                required={true}
                label='Name'
                placeholder='Enter the name of your custom object'
                onFwBlur={this.nameBlurHandler}
                onFwChange={this.nameChangeHandler}
              ></fw-input>
              {this.showNameError && (
                <label class={`${strBaseClassName}-name-error-msg`}>
                  Name field cannot be empty
                </label>
              )}
            </div>
            <fw-textarea
              class={`${strBaseClassName}-desc-textarea`}
              label='Description'
              placeholder='Enter a description'
              onFwBlur={this.descBlurHandler}
            ></fw-textarea>
            <div class={`${strBaseClassName}-icon-container`}>
              <label class={`${strBaseClassName}-icon-header-label`}>
                Select Icon
              </label>
              <fw-toggle-group
                class={`${strBaseClassName}-icon-toggle-group`}
                onFwChange={this.iconSelectHandler}
              >
                {iconGroupItems}
              </fw-toggle-group>
            </div>
          </div>
          <div class={`${strBaseClassName}-footer`}>
            {boolNewForm && (
              <fw-button
                id='clearFieldBtn'
                color='secondary'
                onFwClick={this.cancelHandler}
              >
                Cancel
              </fw-button>
            )}
            <fw-button
              id='submitFieldBtn'
              color='primary'
              onFwClick={this.createHandler}
              loading={this.isEntityCreationInProgress}
            >
              {strCreateBtnLabel}
            </fw-button>
          </div>
        </div>
      </Host>
    );
  }
}
