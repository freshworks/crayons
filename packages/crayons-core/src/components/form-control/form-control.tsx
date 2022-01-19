/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, h, Element, State } from '@stencil/core';

import { hasSlot } from '../../utils';
@Component({
  tag: 'fw-form-control',
  styleUrl: 'form-control.scss',
  shadow: true,
})
export class FormControl {
  @Element() el;

  @Prop()
  type:
    | 'TEXT'
    | 'NUMBER'
    | 'DECIMAL'
    | 'DROPDOWN'
    | 'MULTI_SELECT'
    | 'RADIO'
    | 'CHECKBOX'
    | 'DATE'
    | 'PARAGRAPH'
    | 'EMAIL'
    | 'URL'
    | 'TEL'
    | 'TIME' = 'TEXT';
  @Prop()
  name: any;
  @Prop()
  label: any;
  @Prop()
  required = false;
  @Prop()
  hint = '';
  @Prop()
  placeholder = '';
  @Prop()
  choices: any = [];
  /**
   * Additional props can be passed here for crayons components. Useful when rendering crayons components implicitly via form-control.
   */
  @Prop({ mutable: true })
  fieldProps?: any = {};
  /**
   * Contains value and Event handlers for crayons components. Useful when rendering crayons components implicitly via form-control.
   * Not required when using controls via slots.
   */
  @Prop()
  controlProps?: any;
  @Prop()
  touched = false;
  @Prop()
  error = '';

  @State() hasSlot = false;

  renderControl(): JSX.Element {
    if (this.hasSlot) return null;
    if (!this.name) return null;

    let cmp;
    switch (this.type) {
      case 'TEXT':
      case 'NUMBER':
      case 'DECIMAL':
      case 'EMAIL':
      case 'TEL':
      case 'URL': {
        const type =
          this.type === 'DECIMAL' ? 'number' : this.type?.toLowerCase();
        const componentProps = {
          ...this.fieldProps,
          name: this.name,
          placeholder: this.placeholder,
          label: '',
          required: this.required,
          hint: '',
          type: type,
          ...this.controlProps?.inputProps(this.name, type),
          state: this.touched && this.error && 'error',
        };

        cmp = <fw-input {...componentProps}></fw-input>;
        break;
      }
      case 'PARAGRAPH':
        {
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...this.controlProps?.inputProps(
              this.name,
              this.type?.toLowerCase()
            ),
            state: this.touched && this.error && 'error',
          };
          cmp = <fw-textarea {...componentProps}></fw-textarea>;
        }
        break;

      case 'DATE':
        {
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...this.controlProps?.inputProps(
              this.name,
              this.type?.toLowerCase()
            ),
            state: this.touched && this.error && 'error',
          };
          cmp = <fw-datepicker {...componentProps}></fw-datepicker>;
        }
        break;

      case 'CHECKBOX':
        {
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...this.controlProps?.checkboxProps(
              this.name,
              this.type?.toLowerCase()
            ),
            state: this.touched && this.error && 'error',
          };
          cmp = <fw-checkbox {...componentProps}>{this.label}</fw-checkbox>;
        }
        break;

      case 'RADIO':
        {
          const controlProps = this.controlProps?.radioProps(
            this.name,
            this.type?.toLowerCase()
          );
          const componentProps = {
            ...this.fieldProps,
            'name': this.name,
            'placeholder': this.placeholder,
            'label': '',
            'required': this.required,
            'hint': '',
            'allow-empty': true,
            ...controlProps,
          };
          cmp = (
            <fw-radio-group {...componentProps} label={this.name}>
              {this.choices?.map((ch) => {
                const val = ch[componentProps.optionValuePath] || ch.value;
                const label = ch[componentProps.optionLabelPath] || ch.value;
                console.log(this.touched && this.error);
                return (
                  <fw-radio
                    form-id={controlProps['form-id']}
                    name={this.name}
                    value={val}
                    state={this.touched && this.error ? 'error' : 'normal'}
                  >
                    {label}
                  </fw-radio>
                );
              })}
            </fw-radio-group>
          );
        }
        break;

      case 'DROPDOWN':
      case 'MULTI_SELECT':
        {
          const controlProps = this.controlProps?.selectProps(
            this.name,
            this.type?.toLowerCase()
          );

          console.log('CONTROL PROPS:', controlProps);
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...controlProps,
            state: this.touched && this.error && 'error',
          };
          cmp = (
            <fw-select
              {...componentProps}
              options={this.choices?.map((f) => ({
                ...f,
                text: f.value,
              }))}
              multiple={this.type === 'MULTI_SELECT'}
            ></fw-select>
          );
        }
        break;
      case 'TIME':
        {
          const componentProps = {
            ...this.fieldProps,
            name: this.name,
            placeholder: this.placeholder,
            label: '',
            required: this.required,
            hint: '',
            ...this.controlProps?.inputProps(
              this.name,
              this.type?.toLowerCase()
            ),
            state: this.touched && this.error && 'error',
          };
          cmp = <fw-timepicker {...componentProps}></fw-timepicker>;
        }
        break;
    }
    return cmp;
  }

  componentWillLoad(): void {
    this.handleSlotChange();
  }

  private handleSlotChange() {
    this.hasSlot = hasSlot(this.el);
  }

  render(): JSX.Element {
    return (
      <div class='form-control-container'>
        {this.type !== 'CHECKBOX' && (
          <label
            htmlFor={this.name}
            class={{
              label: true,
              required: this.required,
            }}
          >
            {this.label}
          </label>
        )}
        {this.renderControl()}
        <slot></slot>
        {!(this.touched && this.error) && <div class='hint'>{this.hint}</div>}
        {this.touched && this.error && <div class='error'>{this.error}</div>}
      </div>
    );
  }
}
