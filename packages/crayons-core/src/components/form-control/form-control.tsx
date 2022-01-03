/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, h, Element, State } from '@stencil/core';

import { hasSlot } from '../../utils';

const CONTROL_PROPS = {
  'fw-input': [
    'label',
    'required',
    'name',
    'placeholder',
    'type',
    'autocomplete',
    'clearInput',
    'maxlength',
    'minlength',
    'max',
    'min',
    'step',
    'state',
    'stateText',
    'readonly',
    'disabled',
    'iconLeft',
    'iconRight',
  ],
  'fw-textarea': [
    'label',
    'required',
    'name',
    'placeholder',
    'cols',
    'rows',
    'maxlength',
    'minlength',
    'state',
    'stateText',
    'readonly',
    'disabled',
    'wrap',
  ],
  'fw-radio-group': ['label', 'required', 'name', 'allow-empty'],
  'fw-radio': ['value'],
  'fw-checkbox': ['label', 'required', 'name'],
  'fw-datepicker': ['label', 'required', 'name', 'placeholder'],
  'fw-select': [
    'label',
    'required',
    'name',
    'placeholder',
    'state',
    'stateText',
    'readonly',
    'forceSelect',
    'disabled',
    'max',
    'variant',
    'optionsVariant',
    'searchable',
    'checkbox',
    'notFoundText',
    'search',
    'noDataText',
    'debounceTimer',
    'selectedOptions',
    'sameWidth',
    'optionsPlacement',
    'tagVariant',
    'caret',
    'labelledBy',
    'options',
    'multiple',
  ],
  'fw-timepicker': ['label', 'required', 'name', 'placeholder'],
};
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
  /**
   * Additional props can be passed here for crayons components. Useful when rendering crayons components implicitly via form-control.
   */
  @Prop({ mutable: true })
  fieldProps?: any = {};
  /**
   * Value and Event handlers for crayons components. Useful when rendering crayons components implicitly via form-control.
   */
  @Prop()
  controlProps?: any;
  @Prop()
  touched = false;
  @Prop()
  error = '';

  @State() hasSlot = false;

  assignProps = (type: string, props: any): any => {
    const propList = CONTROL_PROPS[type] || [];
    let componentProps = propList.reduce((acc: any, prop: any) => {
      if (prop in props) acc[prop] = props[prop];
      return acc;
    }, {});

    switch (type) {
      case 'fw-input':
      case 'fw-textarea':
      case 'fw-datepicker':
      case 'fw-timepicker': {
        componentProps = {
          ...componentProps,
          ...this.controlProps?.inputProps(
            props.name,
            props.type?.toLowerCase()
          ),
        };
        // handle DECIMAL TYPE.
        if (type === 'fw-input')
          componentProps = {
            ...componentProps,
            type: this.type === 'DECIMAL' ? 'number' : this.type.toLowerCase(),
          };

        return componentProps;
      }

      case 'fw-checkbox': {
        componentProps = {
          ...componentProps,
          ...this.controlProps?.checkboxProps(
            props.name,
            props.type?.toLowerCase()
          ),
        };
        return componentProps;
      }
      case 'fw-radio-group': {
        componentProps = {
          'allow-empty': true,
          ...componentProps,
          ...this.controlProps?.radioProps(
            props.name,
            props.type?.toLowerCase()
          ),
        };
        return componentProps;
      }
      case 'fw-select': {
        componentProps = {
          ...componentProps,
          ...this.controlProps?.selectProps(
            props.name,
            props.type?.toLowerCase()
          ),
        };
        return componentProps;
      }
    }
  };

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
        cmp = (
          <fw-input
            {...this.assignProps('fw-input', {
              name: this.name,
              label: this.label,
              required: this.required,
              ...this.fieldProps,
            })}
          ></fw-input>
        );
        break;
      }
      case 'PARAGRAPH':
        cmp = (
          <fw-textarea
            {...this.assignProps('fw-textarea', {
              name: this.name,
              label: this.label,
              required: this.required,
              ...this.fieldProps,
            })}
          ></fw-textarea>
        );
        break;

      case 'DATE':
        cmp = (
          <fw-datepicker
            {...this.assignProps('fw-datepicker', {
              name: this.name,
              label: this.label,
              required: this.required,
              ...this.fieldProps,
            })}
          ></fw-datepicker>
        );
        break;

      case 'CHECKBOX':
        cmp = (
          <fw-checkbox
            {...this.assignProps('fw-checkbox', {
              name: this.name,
              label: this.label,
              required: this.required,
              ...this.fieldProps,
            })}
          >
            {this.fieldProps?.label}
          </fw-checkbox>
        );
        break;

      case 'RADIO':
        cmp = (
          <fw-radio-group
            {...this.assignProps('fw-radio-group', {
              name: this.name,
              label: this.label,
              required: this.required,
              ...this.fieldProps,
            })}
          >
            {this.fieldProps?.choices?.map((ch) => {
              return <fw-radio value={ch.value}>{ch.value}</fw-radio>;
            })}
          </fw-radio-group>
        );
        break;

      case 'DROPDOWN':
      case 'MULTI_SELECT':
        cmp = (
          <fw-select
            {...this.assignProps('fw-select', {
              name: this.name,
              label: this.label,
              required: this.required,
              ...this.fieldProps,
            })}
            options={this.fieldProps?.choices?.map((f) => ({
              ...f,
              text: f.value,
            }))}
            multiple={this.type === 'MULTI_SELECT'}
          ></fw-select>
        );
        break;
      case 'TIME':
        cmp = (
          <fw-timepicker
            {...this.assignProps('fw-timepicker', {
              name: this.name,
              label: this.label,
              required: this.required,
              ...this.fieldProps,
            })}
          ></fw-timepicker>
        );
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
