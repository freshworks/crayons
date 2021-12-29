/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Prop,
  h,
  Element,
  State,
  Listen,
  Event,
} from '@stencil/core';

import { hasSlot } from '../../utils';
@Component({
  tag: 'fw-form-control',
  styleUrl: 'form-control.scss',
  shadow: true,
})
export class FormControl {
  @Element() el;

  @Prop()
  label = '';
  @Prop()
  required = false;
  @Prop()
  placeholder = '';
  @Prop()
  touched = false;
  @Prop()
  error = '';
  @Prop()
  type:
    | 'TEXT'
    | 'PARAGRAPH'
    | 'NUMBER'
    | 'DECIMAL'
    | 'EMAIL'
    | 'URL'
    | 'DROPDOWN'
    | 'MULTI_SELECT'
    | 'RADIO'
    | 'CHECKBOX'
    | 'DATE'
    | 'TIME' = 'TEXT';
  @Prop()
  name = '';
  @Prop()
  hint = '';
  @Prop()
  choices: any;
  @Prop()
  controlProps: any;

  @State() hasSlot = false;

  @Event() fwControlChange: any;

  renderControl(): JSX.Element {
    if (this.hasSlot) return null;
    let cmp;
    let type = this.type.toLowerCase();
    if (this.type === 'DECIMAL') type = 'number';
    switch (this.type) {
      case 'TEXT':
      case 'NUMBER':
      case 'DECIMAL':
      case 'EMAIL':
        cmp = (
          <fw-input
            type={type}
            name={this.name}
            placeholder={this.placeholder}
            required={this.required}
            {...this.controlProps?.inputProps(this.name, type)}
          ></fw-input>
        );
        break;
      case 'PARAGRAPH':
        cmp = (
          <fw-textarea
            placeholder={this.placeholder}
            name={this.name}
            required={this.required}
            {...this.controlProps?.inputProps(this.name, type)}
          ></fw-textarea>
        );
        break;

      case 'DATE':
        cmp = (
          <fw-datepicker
            placeholder={this.placeholder}
            name={this.name}
            required={this.required}
            {...this.controlProps?.inputProps(this.name, type)}
          ></fw-datepicker>
        );
        break;

      case 'CHECKBOX':
        cmp = (
          <fw-checkbox
            name={this.name}
            required={this.required}
            {...this.controlProps?.checkboxProps(this.name, type)}
          >
            {this.label}
          </fw-checkbox>
        );
        break;

      case 'RADIO':
        cmp = (
          <fw-radio-group
            allow-empty
            label={this.label}
            name={this.name}
            required={this.required}
            {...this.controlProps?.radioProps(this.name, type)}
          >
            {this.choices?.map((ch) => {
              return <fw-radio value={ch.value}>{ch.value}</fw-radio>;
            })}
          </fw-radio-group>
        );
        break;

      case 'DROPDOWN':
      case 'MULTI_SELECT':
        cmp = (
          <fw-select
            placeholder={this.placeholder}
            name={this.name}
            required={this.required}
            options={this.choices.map((f) => ({
              ...f,
              text: f.value,
            }))}
            multiple={this.type === 'MULTI_SELECT'}
            {...this.controlProps?.selectProps(this.name, type)}
          ></fw-select>
        );
        break;
      case 'TIME':
        cmp = (
          <fw-timepicker
            name={this.name}
            required={this.required}
            {...this.controlProps?.inputProps(this.name, type)}
          ></fw-timepicker>
        );
        break;

      default:
        cmp = <div>Not found</div>;
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

  @Listen('fwChange')
  listenFwChange(e: CustomEvent): void {
    this.fwControlChange.emit({ value: e.detail.value });
  }

  render(): JSX.Element {
    return (
      <div class='form-control-container'>
        <div>
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
        {!(this.touched && this.error) && <div class='hint'>{this.hint}</div>}
        {this.touched && this.error && <div class='error'>{this.error}</div>}
      </div>
    );
  }
}
