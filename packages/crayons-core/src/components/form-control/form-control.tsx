import { Component, Prop, h, Element, State } from '@stencil/core';
import { hasSlot } from '../../utils';
@Component({
  tag: 'fw-form-control',
  styleUrl: 'form-control.scss',
})
export class FormControl {
  @Element() el;

  @Prop()
  label: any;
  @Prop()
  required: any;
  @Prop()
  placeholder: any;
  @Prop()
  touched: any;
  @Prop()
  error: any;
  @Prop()
  type: any;
  @Prop()
  inputType: any;
  @Prop()
  name = '';

  @State() hasSlot = false;

  renderControl() {
    if (this.hasSlot) return null;
    let cmp;
    switch (this.type) {
      case 'input':
        cmp = (
          <fw-input
            type={this.inputType}
            name={this.name}
            placeholder={this.placeholder}
          ></fw-input>
        );
        break;

      default:
        cmp = <div>Not found</div>;
        break;
    }
    return cmp;
  }

  componentWillLoad() {
    this.handleSlotChange();
  }

  private handleSlotChange() {
    this.hasSlot = hasSlot(this.el);
  }

  render() {
    return (
      <div>
        <div class='container'>
          <label
            htmlFor={this.name}
            class={{
              label: true,
              required: this.required,
            }}
          >
            {this.label}
          </label>
        </div>
        {this.renderControl()}
        <slot></slot>
        {JSON.stringify({ touched: this.touched, error: this.error })}
        {this.touched && this.error && <div class='error'> {this.error}</div>}
      </div>
    );
  }
}
