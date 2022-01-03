import {
  Component,
  Element,
  Prop,
  h,
  Host,
  EventEmitter,
  Event,
  State,
} from '@stencil/core';

@Component({
  tag: 'fw-form-builder',
  styleUrl: 'form-builder.scss',
  shadow: true,
})
export class FormBuilder {
  @Element() host!: HTMLElement;

  private formValues;

  /**
   * State to store the selected tab
   */
  @State() selectedTabIndex = 0;
  /**
   * State to determine if the basic form is created
   */
  @State() isBasicCreated = false;
  /**
   * json data input to render the form builder
   */
  @Prop() jsonFormBuilder;
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Triggered when the field is expanded or collapsed
   */
  @Event() fwExpand!: EventEmitter;

  /**
   * Key bindings done for the event to keep them accessible in 'this' scope
   */
  componentWillLoad(): void {
    if (!this.formValues) {
      this.formValues = {};
    }
    this.onCancelHandler = this.onCancelHandler.bind(this);
  }

  /**
   * basic details update handler
   */
  private createBasicFormHandler(event: CustomEvent) {
    const objResponse = event.detail;
    console.log('Form builder create - ' + objResponse);
  }

  /**
   * cancel handler - will remove all the changes made to the field and close the expanded view
   */
  private onCancelHandler() {
    // if (this.expanded) {
    //   this.expanded = false;
    //   this.fwExpand.emit({
    //     expanded: false,
    //     index: this.index,
    //   });
    // }
  }

  /**
   * on Blur field name handler
   */
  // private onFieldNameChangeHandler() {
  // const strUpdateFieldName = this.fieldNameInput.value;
  // console.log('----' + strUpdateFieldName);
  // }

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
   */
  // private renderContent() {
  //   const objField = this.dataProvider;
  //   const strBaseClassName = 'fw-field-editor';
  //   const strInputValue = objField.label;
  //   const arrCheckboxes = objField.field_options.checkboxes;
  //   const checkboxItems =
  //     arrCheckboxes && arrCheckboxes.length > 0
  //       ? arrCheckboxes.map((dataItem) => this.renderCheckboxField(dataItem))
  //       : null;

  //   return (
  //     <div class={`${strBaseClassName}-content-required`}>
  //       <label class={`${strBaseClassName}-content-required-label`}>
  //         {'Field Name'}
  //       </label>
  //       <fw-input
  //         class={`${strBaseClassName}-content-required-input`}
  //         ref={(fieldNameInput) => (this.fieldNameInput = fieldNameInput)}
  //         placeholder='Enter the name of your lookup field here'
  //         value={strInputValue}
  //         onBlur={this.onFieldNameChangeHandler}
  //       ></fw-input>
  //       <div class={`${strBaseClassName}-content-checkboxes`}>
  //         {checkboxItems}
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    if (!this.jsonFormBuilder) {
      return null;
    }
    const objSchema = this.jsonFormBuilder;
    const strBaseClassName = 'fw-form-builder';

    return (
      <Host tabIndex='-1'>
        <div class={strBaseClassName}>
          <div class={`${strBaseClassName}-content`}>
            <label class={`${strBaseClassName}-header-label`}>
              {objSchema.header.label}
            </label>
            <fw-tabs class={`${strBaseClassName}-tabs`}>
              <fw-tab slot='tab' panel={objSchema.header.tabs[0].name}>
                {objSchema.header.tabs[0].label}
              </fw-tab>
              <fw-tab
                slot='tab'
                panel={objSchema.header.tabs[1].name}
                disabled={!this.isBasicCreated}
              >
                {objSchema.header.tabs[1].label}
              </fw-tab>
              <fw-tab-panel name={objSchema.header.tabs[0].name}>
                <fw-fb-basic-details
                  jsonFormBuilder={this.jsonFormBuilder}
                  onFwChange={this.createBasicFormHandler}
                ></fw-fb-basic-details>
              </fw-tab-panel>
              <fw-tab-panel name={objSchema.header.tabs[1].name}></fw-tab-panel>
            </fw-tabs>
          </div>
        </div>
      </Host>
    );
  }
}
