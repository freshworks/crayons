/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Component,
  Event,
  Element,
  EventEmitter,
  Prop,
  h,
  Host,
} from '@stencil/core';

@Component({
  tag: 'fw-fb-basic-details',
  styleUrl: 'fb-basic-details.scss',
  shadow: true,
})
export class FbBasicDetails {
  @Element() host!: HTMLElement;

  private inputDesc?: HTMLFwTextareaElement;
  private inputName?: HTMLFwInputElement;
  private formValues;
  /**
   * json data input to render the form builder
   */
  @Prop() jsonFormBuilder;
  /**
   * Triggered when the card in focus is selected.
   */
  @Event() fwChange!: EventEmitter;

  componentWillLoad(): void {
    if (!this.formValues) {
      this.formValues = { name: '', description: '', icon: '' };
    }
    this.onAddItemHandler = this.onAddItemHandler.bind(this);
  }

  /**
   * function to emit the updated values
   */
  private onAddItemHandler(): void {
    this.fwChange.emit({
      type: 'CREATE',
      value: this.formValues,
    });
  }

  private nameBlurHandler(): void {
    const strUpdateValue1 = this.inputDesc.value;
    const strUpdateValue = this.inputName.value;
    this.formValues.name = strUpdateValue;
    console.log('---- ' + strUpdateValue);
    console.log('---- ' + strUpdateValue1);
  }

  private nameChangeHandler(event: CustomEvent): void {
    event.stopImmediatePropagation();
    event.stopPropagation();
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
    if (!this.jsonFormBuilder) {
      return null;
    }
    const strBaseClassName = 'fb-basic-details';
    const objSchema = this.jsonFormBuilder;
    const arrIcons = objSchema.iconSet;

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
            <fw-input
              ref={(inputName) => (this.inputName = inputName)}
              class={`${strBaseClassName}-name-input`}
              required={true}
              label='Name'
              placeholder='Enter the name of your custom object'
              onFwBlur={this.nameBlurHandler}
              onFwChange={this.nameChangeHandler}
            ></fw-input>
            <fw-textarea
              ref={(inputDesc) => (this.inputDesc = inputDesc)}
              class={`${strBaseClassName}-desc-textarea`}
              label='Description'
              placeholder='Enter a description'
            ></fw-textarea>
            <div class={`${strBaseClassName}-icon-container`}>
              <label class={`${strBaseClassName}-icon-header-label`}>
                Select Icon
              </label>
              <fw-toggle-group class={`${strBaseClassName}-icon-toggle-group`}>
                {iconGroupItems}
              </fw-toggle-group>
            </div>
          </div>
          <div class={`${strBaseClassName}-footer`}>
            <fw-button id='clearFieldBtn' color='secondary'>
              Cancel
            </fw-button>
            <fw-button id='submitFieldBtn' color='primary'>
              Create
            </fw-button>
          </div>
        </div>
      </Host>
    );
  }
}
